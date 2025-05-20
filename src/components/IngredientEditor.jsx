
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function IngredientEditor({ selectedIngredient = null, onSave }) {
  const [ingredient, setIngredient] = useState({
    name: "",
    pricePer100g: 0,
    macrosPer100g: { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 },
    category: "Other",
  });

  useEffect(() => {
    if (selectedIngredient) {
      setIngredient(selectedIngredient);
    }
  }, [selectedIngredient]);

  const handleChange = (field, value) => {
    if (field in ingredient.macrosPer100g) {
      setIngredient({
        ...ingredient,
        macrosPer100g: {
          ...ingredient.macrosPer100g,
          [field]: parseFloat(value) || 0,
        },
      });
    } else {
      setIngredient({ ...ingredient, [field]: value });
    }
  };

  const handleSubmit = () => {
    onSave(ingredient);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={ingredient.name} onChange={(e) => handleChange("name", e.target.value)} />
      </div>
      <div>
        <Label>Price per 100g (£)</Label>
        <Input type="number" value={ingredient.pricePer100g} onChange={(e) => handleChange("pricePer100g", e.target.value)} />
      </div>
      {["calories", "protein", "carbs", "fat", "fibre"].map((m) => (
        <div key={m}>
          <Label>{m.charAt(0).toUpperCase() + m.slice(1)}</Label>
          <Input
            type="number"
            value={ingredient.macrosPer100g[m]}
            onChange={(e) => handleChange(m, e.target.value)}
          />
        </div>
      ))}
      <Button onClick={handleSubmit}>{selectedIngredient ? "Update" : "Add"} Ingredient</Button>
    </div>
  );
}
