// /src/components/PlannerMacroSummary.jsx
import React, { useEffect, useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function PlannerMacroSummary() {
  const [planner, setPlanner] = useState({});
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setPlanner(JSON.parse(localStorage.getItem("planner")) || {});
    setMeals(JSON.parse(localStorage.getItem("meals")) || []);
    setIngredients(JSON.parse(localStorage.getItem("ingredients")) || []);
    setRecipes(JSON.parse(localStorage.getItem("recipes")) || []);
  }, []);

  const calculateMealMacros = (mealId, portion = 1) => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return null;

    const total = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

    meal.components.forEach(({ type, id, quantityGrams }) => {
      const grams = (quantityGrams || 0) * portion;
      const source = type === "ingredient"
        ? ingredients.find(i => i.id === id)
        : recipes.find(r => r.id === id);

      if (!source) return;

      if (type === "ingredient") {
        const ratio = grams / 100;
        Object.entries(source.macrosPer100g).forEach(([k, v]) => {
          total[k] += v * ratio;
        });
      } else if (type === "recipe") {
        source.ingredients.forEach(({ ingredientId, quantityGrams: q }) => {
          const ing = ingredients.find(i => i.id === ingredientId);
          if (ing) {
            const scaled = (q * grams) / 10000; // scale to recipe ratio
            Object.entries(ing.macrosPer100g).forEach(([k, v]) => {
              total[k] += v * scaled;
            });
          }
        });
      }
    });

    return total;
  };

  const calculateDailyMacros = (day) => {
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
    const slotsForDay = planner[day] || {};

    Object.values(slotsForDay).forEach(slotData => {
      const mealId = slotData && typeof slotData === "object" ? slotData.id : slotData;
      const portion = slotData && typeof slotData === "object" ? slotData.portion || 1 : 1;
      const macros = mealId ? calculateMealMacros(mealId, portion) : null;
      if (!macros) return;
      Object.entries(macros).forEach(([k, v]) => total[k] += v);
    });

    return total;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Macro Summary (per Day)</h2>
      <table className="min-w-full border border-border-default text-sm">
        <thead>
          <tr>
            <th className="border border-border-default px-2 py-1">Day</th>
            <th className="border border-border-default px-2 py-1">Calories</th>
            <th className="border border-border-default px-2 py-1">Protein</th>
            <th className="border border-border-default px-2 py-1">Carbs</th>
            <th className="border border-border-default px-2 py-1">Fat</th>
            <th className="border border-border-default px-2 py-1">Fibre</th>
          </tr>
        </thead>
        <tbody>
          {days.map(day => {
            const macros = calculateDailyMacros(day);
            return (
              <tr key={day}>
                <td className="border border-border-default px-2 py-1 font-semibold">{day}</td>
                <td className="border border-border-default px-2 py-1">{macros.calories.toFixed(0)}</td>
                <td className="border border-border-default px-2 py-1">{macros.protein.toFixed(1)}g</td>
                <td className="border border-border-default px-2 py-1">{macros.carbs.toFixed(1)}g</td>
                <td className="border border-border-default px-2 py-1">{macros.fat.toFixed(1)}g</td>
                <td className="border border-border-default px-2 py-1">{macros.fibre.toFixed(1)}g</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
