import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { saveMacroTargets } from "../utils/dataLoader";

const days = [
  "monday", "tuesday", "wednesday",
  "thursday", "friday", "saturday", "sunday"
];

const fields = ["calories", "protein", "carbs", "fat", "fibre"];

export default function MacroTargetEditor({ macroTargets, setMacroTargets }) {
  if (!macroTargets) return null; // Prevent crash if macroTargets is undefined

  const handleChange = (day, field, value) => {
    const updated = {
      ...macroTargets,
      [day]: {
        ...macroTargets[day],
        [field]: Number(value)
      }
    };
    setMacroTargets(updated);
    saveMacroTargets(updated);
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-2">Edit Macro Targets</h2>
      <table className="min-w-full border border-border-default text-sm">
        <thead>
          <tr>
            <th className="border border-border-default px-2 py-1">Day</th>
            {fields.map(field => (
              <th key={field} className="border border-border-default px-2 py-1 capitalize">{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td className="border border-border-default px-2 py-1 font-semibold capitalize">{day}</td>
              {fields.map(field => (
                <td key={field} className="border border-border-default px-2 py-1">
                  <Input
                    type="number"
                    className="w-full border-border-default px-1 py-0.5"
                    value={macroTargets?.[day]?.[field] ?? ""}
                    onChange={(e) => handleChange(day, field, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
