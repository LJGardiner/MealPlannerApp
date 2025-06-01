import ingredients from "../data/ingredients";
import recipes from "../data/recipes";

// Compute macros for a recipe
function computeRecipeMacros(recipe) {
  const totalMacros = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
  let totalWeight = 0;

  for (const item of recipe.ingredients) {
    const ing = ingredients[item.ingredientId];
    if (!ing) continue;
    const grams = item.quantityGrams;
    totalWeight += grams;

    for (const key in totalMacros) {
      totalMacros[key] += (ing.macrosPer100g[key] || 0) * grams / 100;
    }
  }

  return { totalMacros, totalWeight };
}

// Compute macros for a meal
export function computeMealMacros(meal) {
  const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

  if (!meal?.components || !Array.isArray(meal.components)) return totals;

  meal.components.forEach((comp) => {
    const grams = comp.quantityGrams || 0;
    let source;

    if (comp.type === "ingredient") {
      source = ingredients[comp.id];
      if (!source || !source.macrosPer100g) return;
      for (const key in totals) {
        totals[key] += (source.macrosPer100g[key] || 0) * grams / 100;
      }
    } else if (comp.type === "recipe") {
      source = recipes[comp.id];
      if (!source || !source.ingredients) return;
      const { totalMacros, totalWeight } = computeRecipeMacros(source);
      const scale = grams / totalWeight;
      for (const key in totals) {
        totals[key] += totalMacros[key] * scale;
      }
    }
  });

  return totals;
}
