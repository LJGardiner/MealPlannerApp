import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ImportIngredientFromUrl({ onImport }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!url) return;
    setLoading(true);

    try {
      let newIngredient = null;

      if (url.includes("waitrose.com")) {
        console.log("Fetching ingredient from Waitrose:", url);
        newIngredient = await fetchWaitroseIngredient(url);
      } else {
        alert("Unsupported URL. Currently only Waitrose is supported.");
      }

      if (newIngredient) {
        console.log("Imported ingredient:", newIngredient);
        onImport(newIngredient);
        setUrl("");
      } else {
        alert("Failed to import ingredient — check console.");
      }
    } catch (err) {
      console.error("Import error:", err);
      alert("An error occurred while importing the ingredient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Paste Waitrose ingredient link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleImport} disabled={loading}>
        {loading ? "Importing..." : "Import"}
      </Button>
    </div>
  );
}

async function fetchWaitroseIngredient(url) {
  try {
    const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
    const res = await fetch(proxyUrl);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const name = doc.querySelector("h1")?.innerText.trim();
    if (!name) throw new Error("Failed to extract product name");

    console.log("Product name:", name);

    const nutritionTable =
      doc.querySelector('[data-test="nutritionTable"]') ||
      doc.querySelector("table.nutrition") ||
      doc.querySelector("table");

    console.log("Nutrition table found:", nutritionTable);

    const rows = nutritionTable?.querySelectorAll("tr") || [];
    console.log("Parsed nutrition rows:", rows);

    const macros = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    rows.forEach((row) => {
      const th = row.querySelector("th")?.innerText?.toLowerCase().trim();
      const td = row.querySelector("td")?.innerText?.trim();

      console.log("Row:", th, "→", td);

      if (!th || !td) return;
      if (th.startsWith("of which")) return;

      if (th === "energy" && td.toLowerCase().includes("kcal")) {
        const match = td.match(/(\d+)\s*kcal/i);
        if (match) macros.calories = parseInt(match[1]);
      } else if (th === "fat") {
        macros.fat = parseFloat(td);
      } else if (th === "carbohydrate") {
        macros.carbs = parseFloat(td);
      } else if (th === "protein") {
        macros.protein = parseFloat(td);
      }
    });

    const values = Object.values(macros);
    const invalid = values.some((v) => isNaN(v) || v === null || v === undefined);
    if (invalid) {
      console.warn("Parsed macros appear invalid:", macros);
      throw new Error("Invalid or incomplete nutrition data");
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

    return {
      id,
      name,
      macrosPer100g: macros,
      category: "Food Cupboard",
    };
  } catch (err) {
    console.error("Waitrose fetch failed:", err);
    return null;
  }
}
