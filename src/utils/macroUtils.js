import { ingredients } from "../data/ingredients";
import { recipes } from "../data/recipes";

// Calculate total macros and weight for a recipe
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

  for (const comp of meal.components) {
    const grams = comp.quantityGrams;

    if (comp.type === "ingredient") {
      const ing = ingredients[comp.id];
      if (!ing) continue;
      for (const key in totals) {
        totals[key] += (ing.macrosPer100g[key] || 0) * grams / 100;
      }
    }

    if (comp.type === "recipe") {
      const recipe = recipes[comp.id];
      if (!recipe) continue;
      const { totalMacros, totalWeight } = computeRecipeMacros(recipe);
      const scale = grams / totalWeight;
      for (const key in totals) {
        totals[key] += totalMacros[key] * scale;
      }
    }
  }

  return totals;
}

export function computePlannerMacroSumsByDay(planner) {
  const result = {};

  for (const day in planner) {
    const meals = planner[day];
    const dayTotals = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

    for (const meal of meals) {
      if (!meal) continue;
      const mealMacros = computeMealMacros(meal);
      for (const key in dayTotals) {
        dayTotals[key] += mealMacros[key] || 0;
      }
    }

    result[day] = dayTotals;
  }

  return result;
}