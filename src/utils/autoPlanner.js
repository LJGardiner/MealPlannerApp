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
      "Breakfast": ["BREAKFAST"],
      "Snack 1": ["SNACK"],
      "Lunch": ["LUNCH"],
      "Snack 2": ["SNACK"],
      "Dinner": ["DINNER"],
      "Smoothie": ["SMOOTHIE"]
    };

    for (let slot = 0; slot < slotKeys.length; slot++) {
      const slotKey = slotKeys[slot];
      const allowedCategories = slotCategories[slotKey];

      const candidates = [];

      for (const m of mealData) {
        if (!allowedCategories.includes(m.category)) continue;
        if (used.has(m.id)) continue;

        if (
          m.macros.calories > dayTarget.calories * 1.5 ||
          m.macros.protein > dayTarget.protein * 1.5 ||
          m.macros.fat > dayTarget.fat * 1.5
        ) continue;

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
      } else {
        const fallback = getFallbackMeal(allowedCategories, used, mealData);
        const fallbackId = fallback || meals[0]?.id || null;

        if (!fallbackId) {
          console.warn(`⚠️ No fallback meal found for slot "${slotKey}" on ${day}`);
        }

        slots.push(fallbackId);
        if (fallbackId) used.add(fallbackId);
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

function getFallbackMeal(categories, usedSet, meals) {
  const valid = meals.filter(m => categories.includes(m.category));
  const unused = valid.find(m => !usedSet.has(m.id));
  return (unused || valid[0])?.id || null;
}
