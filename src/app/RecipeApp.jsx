import React, { useState, useEffect } from "react";
import RecipeBuilder from "../components/RecipeBuilder";
import RecipeList from "../components/RecipeList";
import ingredientSeed from "../data/ingredients";
import recipeSeed from "../data/recipes";

export default function RecipeApp() {
  const [ingredients, setIngredients] = useState({});
  const [recipes, setRecipes] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // Load ingredients from localStorage or seed data
    const storedIngredients = localStorage.getItem("ingredients");
    if (storedIngredients) {
      const arr = JSON.parse(storedIngredients);
      const map = Object.fromEntries(arr.map((i) => [i.id, i]));
      setIngredients(map);
    } else {
      setIngredients(ingredientSeed);
      localStorage.setItem("ingredients", JSON.stringify(Object.values(ingredientSeed)));
    }

    // Load recipes from localStorage or seed data
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      const arr = JSON.parse(storedRecipes);
      const map = Object.fromEntries(arr.map((r) => [r.id, r]));
      setRecipes(map);
    } else {
      setRecipes(recipeSeed);
      localStorage.setItem("recipes", JSON.stringify(Object.values(recipeSeed)));
    }
  }, [refresh]);

  const handleSave = () => {
    setSelectedRecipe(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recipe Manager</h1>
      <RecipeBuilder
        key={refresh}
        onSave={handleSave}
        selectedRecipe={selectedRecipe}
      />
      <RecipeList
        key={`list-${refresh}`}
        recipes={recipes}
        ingredients={ingredients}
        onEdit={setSelectedRecipe}
      />
    </div>
  );
}
