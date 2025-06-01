import React from "react";

export default function MealList({ meals, recipes, ingredients, onEdit }) {
  if (!meals || !recipes || !ingredients) return <p>Loading...</p>;

  const calculateMacros = (meal) => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

    if (!meal?.components || !Array.isArray(meal.components)) return totals;

    meal.components.forEach(({ type, id, quantityGrams }) => {
      const source = type === "ingredient" ? ingredients[id] : recipes[id];
      if (!source || !source.macrosPer100g) return;

      if (type === "ingredient") {
        for (const key in totals) {
          totals[key] += (source.macrosPer100g[key] || 0) * (quantityGrams / 100);
        }
      } else if (type === "recipe") {
        if (!Array.isArray(source.ingredients)) return;
        const totalWeight = source.ingredients.reduce((sum, i) => sum + i.quantityGrams, 0);
        source.ingredients.forEach(({ ingredientId, quantityGrams: q }) => {
          const ing = ingredients[ingredientId];
          if (!ing || !ing.macrosPer100g) return;
          const scale = q / totalWeight;
          for (const key in totals) {
            totals[key] += (ing.macrosPer100g[key] || 0) * scale * (quantityGrams / 100);
          }
        });
      }
    });

    return totals;
  };

  const mealsArray = Object.values(meals);

  return (
    <div>
      {mealsArray.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        mealsArray.map((meal) => {
          const macros = calculateMacros(meal);
          const totalWeight = meal.components?.reduce(
            (sum, comp) => sum + (comp.quantityGrams || 0),
            0
          );

          return (
            <div key={meal.id} className="border p-4 rounded mb-4">
              <h3>{meal.name}</h3>
              <p>Category: {meal.category}</p>
              <p>Total Weight: {totalWeight}g</p>
              <p>
                Macros:{" "}
                {Object.entries(macros).map(
                  ([k, v]) => `${k}: ${v.toFixed(1)}g `
                )}
              </p>
              <button onClick={() => onEdit?.(meal)}>Edit</button>
            </div>
          );
        })
      )}
    </div>
  );
}
