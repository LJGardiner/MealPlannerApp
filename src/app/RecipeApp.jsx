import React, { useState, useEffect } from "react";
import RecipeBuilder from "../components/RecipeBuilder";
import RecipeList from "../components/RecipeList";
import { recipes as recipeSeed } from "../data/recipes";
import { ingredients as ingredientSeed } from "../data/ingredients";

export default function RecipeApp() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("recipes")) {
      const recipesArray = Object.values(recipeSeed);
      localStorage.setItem("recipes", JSON.stringify(recipesArray));
    }
    if (!localStorage.getItem("ingredients")) {
      const ingredientsArray = Object.values(ingredientSeed);
      localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));
    }

    const r = localStorage.getItem("recipes");
    if (r) setRecipes(JSON.parse(r));

    const i = localStorage.getItem("ingredients");
    if (i) {
      const arr = JSON.parse(i);
      const map = Object.fromEntries(arr.map((ing) => [ing.id, ing]));
      setIngredients(map);
    }
  }, [refresh]);

  const handleSave = () => {
    setSelectedRecipe(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recipe Manager</h1>
      <RecipeBuilder key={refresh} onSave={handleSave} selectedRecipe={selectedRecipe} />
      <RecipeList key={`list-${refresh}`} recipes={recipes} ingredients={ingredients} onEdit={setSelectedRecipe} />
    </div>
  );
}
