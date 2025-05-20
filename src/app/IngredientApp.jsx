import React, { useState, useEffect } from "react";
import IngredientEditor from "../components/IngredientEditor";
import IngredientList from "../components/IngredientList";
import ImportIngredientFromUrl from "../components/ImportIngredientFromUrl";
import { ingredients as ingredientSeed } from "../data/ingredients";

export default function IngredientApp() {
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("ingredients")) {
      const ingredientsArray = Object.values(ingredientSeed);
      localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));
    }
    const stored = localStorage.getItem("ingredients");
    if (stored) setIngredients(JSON.parse(stored));
  }, [refreshKey]);

  const handleSave = () => {
    setSelected(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ingredient Manager</h1>
      <ImportIngredientFromUrl />
      <IngredientEditor selectedIngredient={selected} onSave={handleSave} />
      <IngredientList ingredients={ingredients} onEdit={setSelected} />
    </div>
  );
}
