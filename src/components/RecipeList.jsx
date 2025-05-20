// /src/components/RecipeList.jsx
import React, { useEffect, useState } from "react";

export default function RecipeList({ onEdit }) {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem("recipes")) || [];
    const i = JSON.parse(localStorage.getItem("ingredients")) || [];
    setRecipes(r);
    setIngredients(i);
  }, []);

  const calculateMacros = (recipe) => {
    const macros = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
    if (!Array.isArray(recipe.ingredients)) return macros;

    recipe.ingredients.forEach(({ ingredientId, quantityGrams }) => {
      const ing = ingredients.find((i) => i.id === ingredientId);
      if (!ing || !ing.macrosPer100g) return;
      const ratio = quantityGrams / 100;
      Object.entries(ing.macrosPer100g).forEach(([k, v]) => {
        macros[k] += v * ratio;
      });
    });
    return macros;
  };

  const deleteRecipe = (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    const updated = recipes.filter((r) => r.id !== id);
    localStorage.setItem("recipes", JSON.stringify(updated));
    setRecipes(updated);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Saved Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => {
            if (!Array.isArray(recipe.ingredients)) return null;
            const macros = calculateMacros(recipe);
            const totalWeight = recipe.ingredients.reduce((sum, i) => sum + i.quantityGrams, 0);
            return (
              <div key={recipe.id} className="border border-border dark:border-border-dark rounded p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-bold">{recipe.name}</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => onEdit?.(recipe)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >Edit</button>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >Delete</button>
                  </div>
                </div>
                <p className="text-sm mb-1">Total weight: {totalWeight}g</p>
                <p className="text-sm mb-2">Macros (total):
                  {Object.entries(macros).map(([k, v]) => ` ${k}: ${v.toFixed(1)}`)}</p>
                <ul className="list-disc list-inside text-sm">
                  {recipe.ingredients.map(({ ingredientId, quantityGrams }) => {
                    const ing = ingredients.find(i => i.id === ingredientId);
                    return <li key={ingredientId}>{ing?.name || 'Unknown'} — {quantityGrams}g</li>;
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
