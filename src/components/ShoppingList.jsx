import React, { useEffect, useState } from "react";

export default function ShoppingList() {
  const [planner, setPlanner] = useState({});
  const [meals, setMeals] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    setPlanner(JSON.parse(localStorage.getItem("planner")) || {});
    setMeals(JSON.parse(localStorage.getItem("meals")) || []);
    setRecipes(JSON.parse(localStorage.getItem("recipes")) || []);
    setIngredients(JSON.parse(localStorage.getItem("ingredients")) || []);
  }, []);

  useEffect(() => {
    if (!meals.length || !ingredients.length) return;

    const slotKeys = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner", "Smoothie"];
    const flat = {};

    const addIngredient = (id, grams) => {
      flat[id] = (flat[id] || 0) + grams;
    };

    const expandRecipe = (recipeId, recipeGrams) => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return;
      const totalWeight = recipe.ingredients.reduce((sum, i) => sum + i.quantityGrams, 0);
      recipe.ingredients.forEach(ing => {
        const scaled = (ing.quantityGrams / totalWeight) * recipeGrams;
        addIngredient(ing.ingredientId, scaled);
      });
    };

    Object.values(planner).forEach(dayPlan => {
      slotKeys.forEach(slot => {
        const mealId = dayPlan?.[slot];
        if (!mealId) return;
        const meal = meals.find(m => m.id === mealId); // ✅ fixed from Number(mealId)
        if (!meal) return;
        meal.components.forEach(comp => {
          if (comp.type === "ingredient") {
            addIngredient(comp.id, comp.quantityGrams);
          } else if (comp.type === "recipe") {
            expandRecipe(comp.id, comp.quantityGrams);
          }
        });
      });
    });

    setTotals(flat);
  }, [planner, meals, recipes, ingredients]);

  const grouped = {};
  Object.entries(totals).forEach(([id, grams]) => {
    const ing = ingredients.find(i => i.id === id);
    if (!ing) return;
    if (!grouped[ing.category]) grouped[ing.category] = [];
    grouped[ing.category].push({
      ...ing,
      totalGrams: grams
    });
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
      {Object.keys(grouped).length === 0 ? (
        <p>No ingredients required (empty planner).</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <table className="w-full border border-border dark:border-border-dark text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-border dark:border-border-dark p-2 text-left">Ingredient</th>
                  <th className="border border-border dark:border-border-dark p-2 text-right">Total (g)</th>
                  <th className="border border-border dark:border-border-dark p-2 text-right">Price/100g</th>
                  <th className="border border-border dark:border-border-dark p-2 text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="border border-border dark:border-border-dark p-2">{item.name}</td>
                    <td className="border border-border dark:border-border-dark p-2 text-right">{item.totalGrams.toFixed(0)}g</td>
                    <td className="border border-border dark:border-border-dark p-2 text-right">£{(item.pricePer100g ?? 0).toFixed(2)}</td>
                    <td className="border border-border dark:border-border-dark p-2 text-right">£{((item.totalGrams / 100) * (item.pricePer100g ?? 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      <div className="mt-6 text-right text-lg font-semibold">
        Total Estimated Cost: £{
          Object.values(grouped).flat().reduce((sum, item) =>
            sum + ((item.totalGrams / 100) * (item.pricePer100g ?? 0)), 0
          ).toFixed(2)
        }
      </div>
    </div>
  );
}
