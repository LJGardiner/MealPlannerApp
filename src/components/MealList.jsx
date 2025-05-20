// /src/components/MealList.jsx
import React, { useEffect, useState } from "react";

export default function MealList({ onEdit }) {
  const [meals, setMeals] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setMeals(JSON.parse(localStorage.getItem("meals")) || []);
    setRecipes(JSON.parse(localStorage.getItem("recipes")) || []);
    setIngredients(JSON.parse(localStorage.getItem("ingredients")) || []);
  }, []);

  const deleteMeal = (id) => {
    if (!window.confirm("Delete this meal?")) return;
    const updated = meals.filter((m) => m.id !== id);
    localStorage.setItem("meals", JSON.stringify(updated));
    setMeals(updated);
  };

  const calculateMacros = (meal) => {
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

    meal.components.forEach(({ type, id, quantityGrams }) => {
      let item = null;
      if (type === "ingredient") {
        item = ingredients.find(i => i.id === id);
        if (item) {
          const ratio = quantityGrams / 100;
          Object.entries(item.macrosPer100g).forEach(([k, v]) => {
            total[k] += v * ratio;
          });
        }
      } else if (type === "recipe") {
        item = recipes.find(r => r.id === id);
        if (item) {
          item.ingredients.forEach(({ ingredientId, quantityGrams: q }) => {
            const ing = ingredients.find(i => i.id === ingredientId);
            if (ing) {
              const totalGrams = q * (quantityGrams / 100);
              const ratio = totalGrams / 100;
              Object.entries(ing.macrosPer100g).forEach(([k, v]) => {
                total[k] += v * ratio;
              });
            }
          });
        }
      }
    });

    return total;
  };

  const handleEdit = (meal) => {
    const allMeals = JSON.parse(localStorage.getItem("meals")) || [];
    const existing = allMeals.find(m => m.id === meal.id);
    if (existing) {
      onEdit?.(existing);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Saved Meals</h2>
      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => {
            const macros = calculateMacros(meal);
            return (
              <div key={meal.id} className="border border-border dark:border-border-dark p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{meal.name}</h3>
                    <p className="text-sm text-gray-600">Category: {meal.category}</p>
                    <p className="text-sm mt-1">
                      Macros: {Object.entries(macros).map(([k, v]) => `${k}: ${v.toFixed(1)}`).join(", ")}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded"
                      onClick={() => handleEdit(meal)}
                    >Edit</button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteMeal(meal.id)}
                    >Delete</button>
                  </div>
                </div>
                <ul className="list-disc list-inside text-sm">
                  {meal.components.map((comp, i) => {
                    const source = comp.type === "ingredient"
                      ? ingredients.find(x => x.id === comp.id)
                      : recipes.find(x => x.id === comp.id);
                    return (
                      <li key={i}>{source?.name || "Unknown"} ({comp.type}) — {comp.quantityGrams}g</li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
