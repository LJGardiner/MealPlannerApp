import React, { useState, useEffect } from "react";
import MealList from "../components/MealList";
import MealPlanner from "../components/MealPlanner";
import mealsSeed from "../data/meals";
import recipeSeed from "../data/recipes";
import ingredientSeed from "../data/ingredients";

export default function MealApp() {
  const [meals, setMeals] = useState({});
  const [recipes, setRecipes] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const storedMeals = localStorage.getItem("meals");
    if (storedMeals) {
      const arr = JSON.parse(storedMeals);
      setMeals(Object.fromEntries(arr.map((m) => [m.id, m])));
    } else {
      setMeals(mealsSeed);
      localStorage.setItem("meals", JSON.stringify(Object.values(mealsSeed)));
    }

    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      const arr = JSON.parse(storedRecipes);
      setRecipes(Object.fromEntries(arr.map((r) => [r.id, r])));
    } else {
      setRecipes(recipeSeed);
      localStorage.setItem("recipes", JSON.stringify(Object.values(recipeSeed)));
    }

    const storedIngredients = localStorage.getItem("ingredients");
    if (storedIngredients) {
      const arr = JSON.parse(storedIngredients);
      setIngredients(Object.fromEntries(arr.map((i) => [i.id, i])));
    } else {
      setIngredients(ingredientSeed);
      localStorage.setItem("ingredients", JSON.stringify(Object.values(ingredientSeed)));
    }
  }, [refresh]);

  const handleSave = () => {
    setSelectedMeal(null);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meal Manager</h1>
      <MealPlanner
        key={refresh}
        onSave={handleSave}
        selectedMeal={selectedMeal}
        ingredients={ingredients}
        recipes={recipes}
      />
      <MealList
        key={`list-${refresh}`}
        meals={meals}
        recipes={recipes}
        ingredients={ingredients}
        onEdit={setSelectedMeal}
      />
    </div>
  );
}
