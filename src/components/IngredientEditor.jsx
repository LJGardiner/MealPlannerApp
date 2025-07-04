import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function IngredientEditor({ selectedIngredient, onSave }) {
  const [formData, setFormData] = useState(getEmptyForm());

  useEffect(() => {
    if (selectedIngredient) {
      setFormData({
        id: selectedIngredient.id,
        name: selectedIngredient.name || "",
        category: selectedIngredient.category || "",
        pricePer100g: selectedIngredient.pricePer100g ?? 0,
        macrosPer100g: {
          calories: selectedIngredient.macrosPer100g?.calories ?? 0,
          protein: selectedIngredient.macrosPer100g?.protein ?? 0,
          carbs: selectedIngredient.macrosPer100g?.carbs ?? 0,
          fat: selectedIngredient.macrosPer100g?.fat ?? 0,
        },
      });
    }
  }, [selectedIngredient]);

  function getEmptyForm() {
    return {
      id: "",
      name: "",
      category: "",
      pricePer100g: 0,
      macrosPer100g: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    };
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMacroChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      macrosPer100g: {
        ...prev.macrosPer100g,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const stored = JSON.parse(localStorage.getItem("ingredients")) || [];
    const updated = stored.map((i) =>
      i.id === formData.id ? formData : i
    );
    localStorage.setItem("ingredients", JSON.stringify(updated));
    onSave();
  };

  if (!formData.id) return null;

  return (
    <div className="mb-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Edit Ingredient</h3>

      <div className="grid grid-cols-2 gap-4">
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Name"
        />
        <Input
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="Category"
        />
        <Input
          type="number"
          value={formData.pricePer100g}
          onChange={(e) => handleChange("pricePer100g", parseFloat(e.target.value) || 0)}
          placeholder="Price per 100g"
        />
        <Input
          type="number"
          value={formData.macrosPer100g.calories}
          onChange={(e) => handleMacroChange("calories", parseFloat(e.target.value) || 0)}
          placeholder="Calories"
        />
        <Input
          type="number"
          value={formData.macrosPer100g.protein}
          onChange={(e) => handleMacroChange("protein", parseFloat(e.target.value) || 0)}
          placeholder="Protein"
        />
        <Input
          type="number"
          value={formData.macrosPer100g.carbs}
          onChange={(e) => handleMacroChange("carbs", parseFloat(e.target.value) || 0)}
          placeholder="Carbs"
        />
        <Input
          type="number"
          value={formData.macrosPer100g.fat}
          onChange={(e) => handleMacroChange("fat", parseFloat(e.target.value) || 0)}
          placeholder="Fat"
        />
      </div>

      <Button onClick={handleSubmit} className="mt-4">Save Changes</Button>
    </div>
  );
}
