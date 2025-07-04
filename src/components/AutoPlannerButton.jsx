import React from "react";
import { Button } from "./ui/button";
import { autoGeneratePlan } from "../utils/autoPlanner.mjs";

export default function AutoPlannerButton({ onRefresh }) {
  const handleClick = () => {
    try {
      const mealsRaw = JSON.parse(localStorage.getItem("meals") || "[]");
      const recipesRaw = JSON.parse(localStorage.getItem("recipes") || "[]");
      const ingredientsRaw = JSON.parse(localStorage.getItem("ingredients") || "[]");

      const meals = Array.isArray(mealsRaw) ? mealsRaw : Object.values(mealsRaw || {});
      const recipes = Array.isArray(recipesRaw) ? recipesRaw : Object.values(recipesRaw || {});
      const ingredients = Array.isArray(ingredientsRaw) ? ingredientsRaw : Object.values(ingredientsRaw || {});

      const plan = autoGeneratePlan(meals, recipes, ingredients);
      localStorage.setItem("planner", JSON.stringify(plan));

      onRefresh?.();
    } catch (e) {
      console.error("Auto plan generation failed:", e);
    }
  };

  return (
    <div className="my-4">
      <Button onClick={handleClick}>Auto-Generate Plan</Button>
    </div>
  );
}
