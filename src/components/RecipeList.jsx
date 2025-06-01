import React from "react";

export default function RecipeList({ recipes, ingredients, onEdit }) {
  // Return loading state if recipes or ingredients props are missing
  if (!recipes || !ingredients) {
    return <p>Loading...</p>;
  }

  // Calculate total macros for a recipe
  // Uses keyed lookup (ingredients[ingredientId]) instead of array find
  const calculateMacros = (recipe) => {
    const macros = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
    if (!Array.isArray(recipe.ingredients)) return macros;

    recipe.ingredients.forEach(({ ingredientId, quantityGrams }) => {
      const ing = ingredients[ingredientId]; // keyed lookup
      if (!ing || !ing.macrosPer100g) return;
      const ratio = quantityGrams / 100;
      Object.entries(ing.macrosPer100g).forEach(([k, v]) => {
        macros[k] += v * ratio;
      });
    });
    return macros;
  };

  // Delete recipe by filtering out from object values and updating localStorage
  const deleteRecipe = (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    const updated = Object.values(recipes).filter((r) => r.id !== id);
    localStorage.setItem("recipes", JSON.stringify(updated));
    // TODO: Notify parent to refresh recipes state (not handled here)
  };

  // Convert recipes object to array for mapping
  const recipesArray = Object.values(recipes);

  if (recipesArray.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Saved Recipes</h2>
      <div className="space-y-4">
        {recipesArray.map((recipe) => {
          if (!Array.isArray(recipe.ingredients)) return null;
          const macros = calculateMacros(recipe);
          const totalWeight = recipe.ingredients.reduce(
            (sum, i) => sum + i.quantityGrams,
            0
          );
          return (
            <div
              key={recipe.id}
              className="border border-border dark:border-border-dark rounded p-4"
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-bold">{recipe.name}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit?.(recipe)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm mb-1">Total weight: {totalWeight}g</p>
              <p className="text-sm mb-2">
                Macros (total):
                {Object.entries(macros).map(([k, v]) => ` ${k}: ${v.toFixed(1)}`)}
              </p>
              <ul className="list-disc list-inside text-sm">
                {recipe.ingredients.map(({ ingredientId, quantityGrams }) => {
                  const ing = ingredients[ingredientId];
                  return (
                    <li key={ingredientId}>
                      {ing?.name || "Unknown"} — {quantityGrams}g
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
