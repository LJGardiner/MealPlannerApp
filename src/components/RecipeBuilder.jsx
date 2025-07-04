// /src/components/RecipeBuilder.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function RecipeBuilder({ onSave, selectedRecipe }) {
  const [recipeName, setRecipeName] = useState("");
  const [components, setComponents] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipeId, setRecipeId] = useState(null);

  useEffect(() => {
    setIngredients(JSON.parse(localStorage.getItem("ingredients")) || []);
  }, []);

  useEffect(() => {
    if (selectedRecipe) {
      setRecipeName(selectedRecipe.name);
      setComponents(selectedRecipe.components);
      setRecipeId(selectedRecipe.id);
    }
  }, [selectedRecipe]);

  const addComponent = (ingredientId) => {
    const newItem = { ingredientId, quantityGrams: 100 };
    setComponents((prev) => [...prev, newItem]);
  };

  const updateQuantity = (index, grams) => {
    const updated = [...components];
    updated[index].quantityGrams = grams;
    setComponents(updated);
  };

  const removeComponent = (index) => {
    const updated = [...components];
    updated.splice(index, 1);
    setComponents(updated);
  };

  const handleSave = () => {
    if (!recipeName.trim()) {
      alert("Recipe name cannot be empty.");
      return;
    }
    if (components.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }
    if (components.some(c => c.quantityGrams <= 0)) {
      alert("Component quantities must be greater than 0g.");
      return;
    }

    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const normalizedName = recipeName.trim().toLowerCase();
    const duplicate = allRecipes.some(r =>
      r.name.trim().toLowerCase() === normalizedName && r.id !== recipeId
    );
    if (duplicate) {
      alert("A recipe with this name already exists. Please choose a different name.");
      return;
    }

    let updated;
    if (recipeId !== null) {
      updated = allRecipes.map(r =>
        r.id === recipeId ? { id: recipeId, name: recipeName, components } : r
      );
    } else {
      const newId = allRecipes.length > 0 ? Math.max(...allRecipes.map(r => r.id)) + 1 : 1;
      updated = [...allRecipes, { id: newId, name: recipeName, components }];
    }

    localStorage.setItem("recipes", JSON.stringify(updated));
    setRecipeName("");
    setComponents([]);
    setRecipeId(null);
    if (onSave) onSave();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{recipeId ? "Edit Recipe" : "Create Recipe"}</h2>
      <Input
        type="text"
        placeholder="Recipe name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />

      <select
        onChange={(e) => addComponent(Number(e.target.value))}
        className="border border-border-default px-2 py-1 w-full"
        defaultValue=""
      >
        <option value="" disabled>Add Ingredient</option>
        {ingredients.map(i => (
          <option key={i.id} value={i.id}>{i.name}</option>
        ))}
      </select>

      {components.map((comp, index) => {
        const source = ingredients.find(i => i.id === comp.ingredientId);
        return (
          <div key={index} className="border border-border-default p-2 rounded">
            <div className="flex justify-between items-center mb-2">
              <strong>{source?.name || "Unknown Ingredient"}</strong>
              <Button
                onClick={() => removeComponent(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </Button>
            </div>
            <Input
              type="number"
              value={comp.quantityGrams}
              onChange={(e) => updateQuantity(index, Number(e.target.value))}
              placeholder="Quantity (g)"
            />
          </div>
        );
      })}

      <Button onClick={handleSave}>
        {recipeId ? "Update Recipe" : "Save Recipe"}
      </Button>
    </div>
  );
}

RecipeBuilder.propTypes = {
  onSave: PropTypes.func,
  selectedRecipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    components: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientId: PropTypes.number.isRequired,
        quantityGrams: PropTypes.number.isRequired,
      })
    ),
  }),
};
