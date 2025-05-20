import React, { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import IngredientApp from "./app/IngredientApp";
import RecipeApp from "./app/RecipeApp";
import MealApp from "./app/MealApp";
import PlannerApp from "./app/PlannerApp";
import MacroTargetApp from "./app/MacroTargetApp";
import ShoppingList from "./components/ShoppingList";

export default function App() {
  const [tab, setTab] = useState("planner");

  const handleResetAll = () => {
    localStorage.removeItem("ingredients");
    localStorage.removeItem("recipes");
    localStorage.removeItem("meals");
    localStorage.removeItem("planner");
    localStorage.removeItem("macroTargets");
    window.location.reload();
  };

  return (
    <div className="p-4 md:p-6 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <ThemeToggle />
        <div className="flex gap-2">
          <button onClick={() => setTab("planner")}>Planner</button>
          <button onClick={() => setTab("ingredients")}>Ingredients</button>
          <button onClick={() => setTab("recipes")}>Recipes</button>
          <button onClick={() => setTab("meals")}>Meals</button>
          <button onClick={() => setTab("macros")}>Macro Targets</button>
          <button onClick={() => setTab("shopping")}>Shopping List</button>
		  <div className="p-4 bg-white dark:bg-black dark:bg-black text-black dark:text-white dark:text-white">
  ✅ If you see this block go from white to black when toggling: dark mode works.
</div>

        </div>
        <button
          onClick={handleResetAll}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Reset All Data
        </button>
      </div>

      {tab === "planner" && <PlannerApp />}
      {tab === "ingredients" && <IngredientApp />}
      {tab === "recipes" && <RecipeApp />}
      {tab === "meals" && <MealApp />}
      {tab === "macros" && <MacroTargetApp />}
      {tab === "comparison" && <MacroComparisonTable />}
      {tab === "shopping" && <ShoppingList />}
    </div>
  );
}
