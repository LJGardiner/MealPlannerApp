import React, { useEffect, useState } from "react";

export default function IngredientList({ onEdit }) {
  const [ingredients, setIngredients] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ingredients")) || [];
    setIngredients(stored);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this ingredient?")) return;
    const updated = ingredients.filter((i) => i.id !== id);
    localStorage.setItem("ingredients", JSON.stringify(updated));
    setIngredients(updated);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(ingredients, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ingredients.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = ingredients.filter(i => {
    const nameMatch = i.name.toLowerCase().includes(filter.toLowerCase());
    const categoryMatch = category ? i.category === category : true;
    return nameMatch && categoryMatch;
  });

  const uniqueCategories = [...new Set(ingredients.map(i => i.category))];

  const calcCalories = ({ protein, carbs, fat }) => (protein * 4 + carbs * 4 + fat * 9);

  const isMacroMismatch = (ingredient) => {
    const storedCals = ingredient.macrosPer100g.calories;
    const computedCals = calcCalories(ingredient.macrosPer100g);
    const diff = Math.abs(storedCals - computedCals);
    return diff > storedCals * 0.1;
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Ingredient List</h2>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Download JSON
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-border dark:border-border-dark px-2 py-1 w-1/2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-border dark:border-border-dark px-2 py-1 w-1/2"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No matching ingredients found.</p>
      ) : (
        <table className="w-full border border-border dark:border-border-dark">
          <thead>
            <tr>
              <th className="border border-border dark:border-border-dark p-2">Name</th>
              <th className="border border-border dark:border-border-dark p-2">Category</th>
              <th className="border border-border dark:border-border-dark p-2">Price/100g</th>
              <th className="border border-border dark:border-border-dark p-2">Macros</th>
              <th className="border border-border dark:border-border-dark p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ingredient) => (
              <tr key={ingredient.id} className={isMacroMismatch(ingredient) ? "bg-red-100" : ""}>
                <td className="border border-border dark:border-border-dark p-2">{ingredient.name}</td>
                <td className="border border-border dark:border-border-dark p-2">{ingredient.category}</td>
                <td className="border border-border dark:border-border-dark p-2">£{ingredient.pricePer100g.toFixed(2)}</td>
                <td className="border border-border dark:border-border-dark p-2 text-sm">
                  {Object.entries(ingredient.macrosPer100g).map(([k, v]) => (
                    <div key={k}>{k}: {v}</div>
                  ))}
                </td>
                <td className="border border-border dark:border-border-dark p-2 space-x-2">
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
