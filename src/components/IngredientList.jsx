import React, { useEffect, useState } from "react";

export default function IngredientList({ onEdit, refreshKey }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ingredients")) || [];
    setIngredients(stored);
  }, [refreshKey]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this ingredient?")) return;
    const updated = ingredients.filter((i) => i.id !== id);
    localStorage.setItem("ingredients", JSON.stringify(updated));
    setIngredients(updated);
  };

  const calcCalories = ({ protein, carbs, fat }) => (protein * 4 + carbs * 4 + fat * 9);

  const isMacroMismatch = (ingredient) => {
    const storedCals = ingredient.macrosPer100g?.calories ?? 0;
    const computedCals = calcCalories(ingredient.macrosPer100g || {});
    const diff = Math.abs(storedCals - computedCals);
    return diff > storedCals * 0.1;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Ingredient List</h2>
      {ingredients.length === 0 ? (
        <p>No ingredients found.</p>
      ) : (
        <table className="w-full border border-border dark:border-border-dark">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price/100g</th>
              <th className="border p-2">Macros</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id} className={isMacroMismatch(ingredient) ? "bg-red-100" : ""}>
                <td className="border p-2">{ingredient.name}</td>
                <td className="border p-2">{ingredient.category}</td>
                <td className="border p-2">£{(ingredient.pricePer100g ?? 0).toFixed(2)}</td>
                <td className="border p-2 text-sm">
                  {ingredient.macrosPer100g
                    ? Object.entries(ingredient.macrosPer100g).map(([k, v]) => (
                        <div key={k}>{k}: {(v ?? 0).toFixed(1)}</div>
                      ))
                    : "No macros"}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded"
                    onClick={() => onEdit(ingredient)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(ingredient.id)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
