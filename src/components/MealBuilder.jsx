import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const categoryOptions = ["BREAKFAST", "LUNCH", "DINNER", "SNACK", "SMOOTHIE"];

export default function MealBuilder({ onSave, selectedMeal }) {
  const [mealName, setMealName] = useState("");
  const [category, setCategory] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [components, setComponents] = useState([]);
  const [mealId, setMealId] = useState(null);

  useEffect(() => {
    setIngredients(JSON.parse(localStorage.getItem("ingredients")) || []);
    setRecipes(JSON.parse(localStorage.getItem("recipes")) || []);
  }, []);

  useEffect(() => {
    if (selectedMeal) {
      setMealName(selectedMeal.name);
      setCategory(selectedMeal.category);
      setComponents(selectedMeal.components);
      setMealId(selectedMeal.id);
    }
  }, [selectedMeal]);

  const addComponent = (type, id) => {
    const newItem = { type, id, quantityGrams: 100 };
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
    if (!mealName.trim()) {
      alert("Meal name cannot be empty.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    if (components.length === 0) {
      alert("Please add at least one ingredient or recipe.");
      return;
    }
    if (components.some(c => c.quantityGrams <= 0)) {
      alert("Component quantities must be greater than 0g.");
      return;
    }

    const allMeals = JSON.parse(localStorage.getItem("meals")) || [];
    const normalizedName = mealName.trim().toLowerCase();
    const duplicate = allMeals.some(m =>
      m.name.trim().toLowerCase() === normalizedName && m.id !== mealId
    );
    if (duplicate) {
      alert("A meal with this name already exists. Please choose a different name.");
      return;
    }

    let updated;
    if (mealId !== null) {
      updated = allMeals.map(m =>
        m.id === mealId ? { id: mealId, name: mealName, category, components } : m
      );
    } else {
      const newId = allMeals.length > 0 ? Math.max(...allMeals.map(m => m.id)) + 1 : 1;
      updated = [...allMeals, { id: newId, name: mealName, category, components }];
    }

    localStorage.setItem("meals", JSON.stringify(updated));
    setMealName("");
    setCategory("");
    setComponents([]);
    setMealId(null);
    if (onSave) onSave();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{mealId ? "Edit Meal" : "Create Meal"}</h2>
      <input
        type="text"
        placeholder="Meal name"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        className="border border-border dark:border-border-dark px-2 py-1 w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-border dark:border-border-dark px-2 py-1 w-full"
      >
        <option value="" disabled>Select Category</option>
        {categoryOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <select
          onChange={(e) => addComponent("ingredient", Number(e.target.value))}
          className="border border-border dark:border-border-dark px-2 py-1 w-1/2"
          defaultValue=""
        >
          <option value="" disabled>Add Ingredient</option>
          {ingredients.map(i => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>

        <select
          onChange={(e) => addComponent("recipe", Number(e.target.value))}
          className="border border-border dark:border-border-dark px-2 py-1 w-1/2"
          defaultValue=""
        >
          <option value="" disabled>Add Recipe</option>
          {recipes.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      {components.map((comp, index) => {
        const source = comp.type === "ingredient"
          ? ingredients.find(i => i.id === comp.id)
          : recipes.find(r => r.id === comp.id);

        return (
          <div key={index} className="border border-border dark:border-border-dark p-2 rounded">
            <div className="flex justify-between items-center mb-2">
              <strong>
                {source?.name
                  ? source.name
                  : comp.type === "ingredient"
                    ? "Unknown Ingredient"
                    : "Unknown Recipe"}
                ({comp.type})
              </strong>
              <button
                onClick={() => removeComponent(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
            <input
              type="number"
              value={comp.quantityGrams}
              onChange={(e) => updateQuantity(index, Number(e.target.value))}
              className="border border-border dark:border-border-dark px-2 py-1 w-full"
              placeholder="Quantity (g)"
            />
          </div>
        );
      })}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {mealId ? "Update Meal" : "Save Meal"}
      </button>
    </div>
  );
}

MealBuilder.propTypes = {
  onSave: PropTypes.func,
  selectedMeal: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    components: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        quantityGrams: PropTypes.number.isRequired,
      })
    ),
  }),
};
