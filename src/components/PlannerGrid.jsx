import React, { useEffect, useState } from "react";
import { computeMealMacros } from "../utils/macroUtils";

const days = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" }
];

const slots = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner", "Smoothie"];

export default function PlannerGrid({ macroTargets, setMacroTargets }) {
  const [meals, setMeals] = useState({});
  const [plan, setPlan] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const mealsArray = JSON.parse(localStorage.getItem("meals")) || [];
    const ingredientsArray = JSON.parse(localStorage.getItem("ingredients")) || [];
    const recipesArray = JSON.parse(localStorage.getItem("recipes")) || [];
    const plannerData = JSON.parse(localStorage.getItem("planner")) || {};

    const mealsMap = Object.fromEntries(mealsArray.map(m => [m.id, m]));
    setMeals(mealsMap);
    setIngredients(Object.fromEntries(ingredientsArray.map(i => [i.id, i])));
    setRecipes(Object.fromEntries(recipesArray.map(r => [r.id, r])));

    const cleaned = {};
    for (const day in plannerData) {
      cleaned[day] = {};
      for (const slot of slots) {
        const id = plannerData[day]?.[slot];
        cleaned[day][slot] = mealsMap[id] ? id : "";
      }
    }
    setPlan(cleaned);
  }, []);

  const handleSelect = (day, slot, mealId) => {
    const updated = {
      ...plan,
      [day]: {
        ...(plan[day] || {}),
        [slot]: mealId
      }
    };
    setPlan(updated);
    localStorage.setItem("planner", JSON.stringify(updated));
  };

  const calculateMealMacros = (mealId) => {
    if (!mealId || !meals[mealId]) return null;
    return computeMealMacros(meals[mealId], ingredients, recipes);
  };

  const calculateDayMacros = (dayKey) => {
    const slotMap = plan[dayKey] || {};
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
    for (const slot of slots) {
      const mealId = slotMap[slot];
      const macros = calculateMealMacros(mealId);
      if (macros) {
        Object.entries(macros).forEach(([k, v]) => {
          total[k] += typeof v === "number" && !isNaN(v) ? v : 0;
        });
      }
    }
    return total;
  };

  const slotCategories = {
    "Breakfast": ["BREAKFAST"],
    "Snack 1": ["SNACK"],
    "Lunch": ["LUNCH"],
    "Snack 2": ["SNACK"],
    "Dinner": ["DINNER"],
    "Smoothie": ["SMOOTHIE"]
  };

  const renderCell = (dayKey, slot) => {
    const mealId = plan[dayKey]?.[slot] || "";
    const macros = calculateMealMacros(mealId);

    const assigned = mealId && meals[mealId] ? [meals[mealId]] : [];
    const allowedMeals = Array.from(
      new Map(
        [...assigned, ...Object.values(meals).filter(m => slotCategories[slot]?.includes(m.category))]
          .map(m => [m.id, m])
      ).values()
    );

    return (
      <td key={slot} className="border border-border dark:border-border-dark px-2 py-1 align-top">
        <select
          value={mealId}
          onChange={(e) => handleSelect(dayKey, slot, e.target.value)}
          className="w-full border border-border dark:border-border-dark px-1 py-0.5 mb-1"
        >
          <option value="">--</option>
          {allowedMeals.map(meal => (
            <option key={meal.id} value={meal.id}>
              {meal.name || `[Missing: ${meal.id}]`}
            </option>
          ))}
        </select>
        {macros && (
          <div className="text-[0.7rem] leading-tight text-gray-600">
            <div>Cals: {safeVal(macros.calories).toFixed(0)}</div>
            <div>P: {safeVal(macros.protein).toFixed(1)}g C: {safeVal(macros.carbs).toFixed(1)}g</div>
            <div>F: {safeVal(macros.fat).toFixed(1)}g Fbr: {safeVal(macros.fibre).toFixed(1)}g</div>
          </div>
        )}
      </td>
    );
  };

  const safeVal = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);

  const renderMacros = (macros) => (
    <div className="text-[0.7rem] leading-tight text-gray-600">
      <div>Cals: {safeVal(macros.calories).toFixed(0)}</div>
      <div>P: {safeVal(macros.protein).toFixed(1)}g C: {safeVal(macros.carbs).toFixed(1)}g</div>
      <div>F: {safeVal(macros.fat).toFixed(1)}g Fbr: {safeVal(macros.fibre).toFixed(1)}g</div>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-border dark:border-border-dark text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-border dark:border-border-dark px-2 py-1">Day / Slot</th>
            {slots.map(slot => (
              <th key={slot} className="border border-border dark:border-border-dark px-2 py-1">{slot}</th>
            ))}
            <th className="border border-border dark:border-border-dark px-2 py-1">Total Macros</th>
            <th className="border border-border dark:border-border-dark px-2 py-1">Goal Macros</th>
          </tr>
        </thead>
        <tbody>
          {days.map(({ key, label }) => {
            const actual = calculateDayMacros(key);
            const goal = macroTargets?.[key] || {
              calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0
            };
            return (
              <tr key={key}>
                <td className="border border-border dark:border-border-dark px-2 py-1 font-semibold align-top">{label}</td>
                {slots.map(slot => renderCell(key, slot))}
                <td className="border border-border dark:border-border-dark px-2 py-1">{renderMacros(actual)}</td>
                <td className="border border-border dark:border-border-dark px-2 py-1">{renderMacros(goal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
