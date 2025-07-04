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

    setMeals(Object.fromEntries(mealsArray.map(m => [m.id, m])));
    setIngredients(Object.fromEntries(ingredientsArray.map(i => [i.id, i])));
    setRecipes(Object.fromEntries(recipesArray.map(r => [r.id, r])));
    setPlan(plannerData);
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

  const calculateMealMacros = (mealId, portion = 1) => {
    const meal = meals[mealId];
    return meal ? computeMealMacros(meal, ingredients, recipes, portion) : null;
  };

  const calculateDayMacros = (dayKey) => {
    const slotMap = plan[dayKey] || {};
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
    for (const slot of slots) {
    const slotData = slotMap[slot];
    const mealId = slotData && typeof slotData === "object" ? slotData.id : slotData;
    const portion = slotData && typeof slotData === "object" ? slotData.portion || 1 : 1;
      if (!mealId) continue;
      const macros = calculateMealMacros(mealId, portion);
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

  const safeVal = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);

  const renderMacros = (macros) => (
    <div className="text-xs font-mono leading-tight text-gray-700 dark:text-gray-300">
      <div>Cals: {safeVal(macros.calories).toFixed(0)}</div>
      <div>P: {safeVal(macros.protein).toFixed(1)}g C: {safeVal(macros.carbs).toFixed(1)}g</div>
      <div>F: {safeVal(macros.fat).toFixed(1)}g Fbr: {safeVal(macros.fibre).toFixed(1)}g</div>
    </div>
  );

  const renderCell = (dayKey, slot, rowIndex, colIndex) => {
    const slotData = plan[dayKey]?.[slot] || "";
    const mealId = typeof slotData === "object" ? slotData.id : slotData;
    const portion = typeof slotData === "object" ? slotData.portion || 1 : 1;
    const macros = mealId ? calculateMealMacros(mealId, portion) : null;
    const allowedMeals = Object.values(meals).filter(m => slotCategories[slot]?.includes(m.category));
    const bgColor = (rowIndex + colIndex) % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--card)]";

    return (
      <td key={slot} className={`border border-border-default px-2 py-2 align-top ${bgColor}`}>
        <select
          value={mealId}
          onChange={(e) => handleSelect(dayKey, slot, { id: e.target.value, portion: 1 })}
          className="w-full border border-border-default px-1 py-0.5 text-sm rounded-md mb-1"
        >
          <option value="">--</option>
          {allowedMeals.map(meal => (
            <option key={meal.id} value={meal.id}>
              {meal.name}{portion !== 1 ? ` ×${portion}` : ""}
            </option>
          ))}
        </select>
        {macros && (
          <>
            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-0.5">
              Portion: ×{portion.toFixed(1)}
            </div>
            {renderMacros(macros)}
          </>
        )}
      </td>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-border-default text-sm mb-6 table-fixed">
        <thead className="bg-muted/10 dark:bg-muted/20">
          <tr>
            <th className="border border-border-default px-2 py-2 font-semibold text-left w-28">Day / Slot</th>
            {slots.map(slot => (
              <th key={slot} className="border border-border-default px-2 py-2 font-semibold text-left">{slot}</th>
            ))}
            <th className="border border-border-default px-2 py-2 font-semibold text-left">Total Macros</th>
            <th className="border border-border-default px-2 py-2 font-semibold text-left">Goal Macros</th>
          </tr>
        </thead>
        <tbody>
          {days.map(({ key, label }, rowIndex) => {
            const actual = calculateDayMacros(key);
            const goal = macroTargets?.[key] || { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };
            return (
              <tr key={key}>
                <td className={`border border-border-default px-2 py-2 font-semibold align-top sticky left-0 z-10 bg-[var(--card)]`}>{label}</td>
                {slots.map((slot, colIndex) => renderCell(key, slot, rowIndex, colIndex))}
                <td className={`border border-border-default px-2 py-2 ${(rowIndex + slots.length) % 2 === 0 ? "bg-[var(--background)]" : "bg-[var(--card)]"}`}>{renderMacros(actual)}</td>
                <td className={`border border-border-default px-2 py-2 ${(rowIndex + slots.length + 1) % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}`}>{renderMacros(goal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
