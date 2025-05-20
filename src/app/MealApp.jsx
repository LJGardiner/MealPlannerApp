import React, { useState, useEffect } from "react";
import MealBuilder from "../components/MealBuilder";
import MealList from "../components/MealList";
import { meals as mealSeed } from "../data/meals";

export default function MealApp() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("meals")) {
      const mealsArray = Object.values(mealSeed);
      localStorage.setItem("meals", JSON.stringify(mealsArray));
    }
    const stored = localStorage.getItem("meals");
    if (stored) setMeals(JSON.parse(stored));
  }, [refresh]);

  const handleSave = () => {
    setSelectedMeal(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meal Manager</h1>
      <MealBuilder key={refresh} onSave={handleSave} selectedMeal={selectedMeal} />
      <MealList key={`list-${refresh}`} meals={meals} onEdit={setSelectedMeal} />
    </div>
  );
}
