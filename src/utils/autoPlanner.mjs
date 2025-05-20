import { loadMacroTargets } from "./dataLoader.js";

function sumMealMacros(meal, recipes, ingredients) {
  const total = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

  meal.components.forEach(({ type, id, quantityGrams }) => {
    if (type === "ingredient") {
      const ing = ingredients.find(i => i.id === id);
      if (!ing) return;
      const ratio = quantityGrams / 100;
      Object.entries(ing.macrosPer100g).forEach(([k, v]) => {
        total[k] += v * ratio;
      });
    } else if (type === "recipe") {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;
      const totalWeight = recipe.ingredients.reduce((sum, i) => sum + i.quantityGrams, 0);
      recipe.ingredients.forEach(({ ingredientId, quantityGrams: q }) => {
        const ing = ingredients.find(i => i.id === ingredientId);
        if (!ing) return;
        const scaled = (q / totalWeight) * (quantityGrams / 100);
        Object.entries(ing.macrosPer100g).forEach(([k, v]) => {
          total[k] += v * scaled;
        });
      });
    }
  });

  return total;
}

function macroDeviationScore(projected, target) {
  const weights = { calories: 1.5, protein: 2, carbs: 1, fat: 1, fibre: 1 };
  let score = 0;
  for (let k in target) {
    const delta = Math.abs(target[k] - projected[k]);
    score += weights[k] * delta;
  }
  return score;
}

export function autoGeneratePlan(meals, recipes, ingredients) {
  const targets = loadMacroTargets() || {};
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const plan = {};

  const mealData = meals.map(m => ({
    category: m.category,
    id: m.id,
    name: m.name,
    macros: sumMealMacros(m, recipes, ingredients)
  }));

  for (const day of days) {
    const dayTarget = targets[day] || {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 60,
      fibre: 25
    };

    const slots = [];
    const used = new Set();
    let cumulative = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

    const slotKeys = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner", "Smoothie"];
    const slotCategories = {
      "Breakfast": ["BREAKFAST", "SNACK"],
      "Snack 1": ["SNACK", "SMOOTHIE"],
      "Lunch": ["LUNCH", "DINNER"],
      "Snack 2": ["SNACK", "SMOOTHIE"],
      "Dinner": ["DINNER"],
      "Smoothie": ["SMOOTHIE"]
    };

    for (let slot = 0; slot < 6; slot++) {
      const slotKey = slotKeys[slot];
      const allowedCategories = slotCategories[slotKey];

      const candidates = [];

      for (const m of mealData) {
        if (!allowedCategories.includes(m.category)) continue;
        if (used.has(m.id)) continue;

        const projected = {};
        for (let k in cumulative) {
          projected[k] = cumulative[k] + m.macros[k];
        }

        const score = macroDeviationScore(projected, dayTarget);
        candidates.push({ meal: m, score });
      }

      if (candidates.length > 0) {
        candidates.sort((a, b) => a.score - b.score);
        const top = candidates.slice(0, 8);

        const weights = top.map(c => 1 / (c.score + 0.001));
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const rand = Math.random() * totalWeight;

        let acc = 0;
        let chosen = null;
        for (let i = 0; i < top.length; i++) {
          acc += weights[i];
          if (rand <= acc) {
            chosen = top[i].meal;
            break;
          }
        }

        const best = chosen;

        slots.push(best.id);
        used.add(best.id);
        for (let k in cumulative) {
          cumulative[k] += best.macros[k];
        }
      }
    }

    plan[day] = {
      "Breakfast": slots[0] || null,
      "Snack 1": slots[1] || null,
      "Lunch": slots[2] || null,
      "Snack 2": slots[3] || null,
      "Dinner": slots[4] || null,
      "Smoothie": slots[5] || null
    };
  }

  return plan;
}
