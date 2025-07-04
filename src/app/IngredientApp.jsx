import React, { useState, useEffect } from "react";
import IngredientEditor from "../components/IngredientEditor";
import IngredientForm from "../components/IngredientForm";
import IngredientList from "../components/IngredientList";
import ImportIngredientFromUrl from "../components/ImportIngredientFromUrl";
import ingredientSeed from "../data/ingredients";

export default function IngredientApp() {
  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("ingredients")) {
      const ingredientsArray = Object.values(ingredientSeed);
      localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));
    }
  }, [refreshKey]);

  const handleSave = () => {
    setSelected(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleImport = (newIngredient) => {
    const stored = localStorage.getItem("ingredients");
    const ingredientsArray = stored ? JSON.parse(stored) : [];

    const alreadyExists = ingredientsArray.some(item => item.id === newIngredient.id);
    if (alreadyExists) {
      alert("This ingredient already exists.");
      return;
    }

    const updated = [...ingredientsArray, newIngredient];
    localStorage.setItem("ingredients", JSON.stringify(updated));
    console.log("Ingredient saved to localStorage:", newIngredient);
    setRefreshKey(prev => prev + 1);
  };

  const handleCreate = (ingredient) => {
    const stored = localStorage.getItem("ingredients");
    const ingredientsArray = stored ? JSON.parse(stored) : [];

    const alreadyExists = ingredientsArray.some(item => item.id === ingredient.id);
    if (alreadyExists) {
      alert("This ingredient already exists.");
      return;
    }

    const updated = [...ingredientsArray, ingredient];
    localStorage.setItem("ingredients", JSON.stringify(updated));
    console.log("Manually added ingredient:", ingredient);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Ingredient Manager</h1>

      <ImportIngredientFromUrl onImport={handleImport} />
      <IngredientForm onSubmit={handleCreate} />
      <IngredientEditor selectedIngredient={selected} onSave={handleSave} />
      <IngredientList refreshKey={refreshKey} onEdit={setSelected} />
    </div>
  );
}
