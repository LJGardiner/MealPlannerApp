import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function IngredientForm({ onSubmit }) {
  const [formData, setFormData] = useState({
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
  });

  const generateId = (name) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }

    const finalData = {
      ...formData,
      id: generateId(formData.name),
    };

    onSubmit(finalData);
    setFormData({
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
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-border-default p-4 rounded bg-card">
      <h3 className="text-lg font-semibold">Add Ingredient Manually</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Input
            type="text"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price per 100g (£)</label>
          <Input
            type="number"
            value={formData.pricePer100g}
            onChange={(e) => handleChange("pricePer100g", parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Calories</label>
          <Input
            type="number"
            value={formData.macrosPer100g.calories}
            onChange={(e) => handleMacroChange("calories", parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Protein (g)</label>
          <Input
            type="number"
            value={formData.macrosPer100g.protein}
            onChange={(e) => handleMacroChange("protein", parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Carbohydrates (g)</label>
          <Input
            type="number"
            value={formData.macrosPer100g.carbs}
            onChange={(e) => handleMacroChange("carbs", parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fat (g)</label>
          <Input
            type="number"
            value={formData.macrosPer100g.fat}
            onChange={(e) => handleMacroChange("fat", parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      </div>

      <Button type="submit">Add Ingredient</Button>
    </form>
  );
}
