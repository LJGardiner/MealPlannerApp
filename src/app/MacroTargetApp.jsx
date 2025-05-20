import React, { useState, useEffect } from "react";
import MacroTargetEditor from "../components/MacroTargetEditor";
import { loadMacroTargets } from "../utils/dataLoader";
import { macroTargets as defaultMacroTargets } from "../data/macroTargets";

export default function MacroTargetApp() {
  const [macroTargets, setMacroTargets] = useState(() => {
    return loadMacroTargets() || defaultMacroTargets;
  });

  useEffect(() => {
    const stored = loadMacroTargets();
    if (stored) setMacroTargets(stored);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Macro Targets</h1>
      <MacroTargetEditor
        macroTargets={macroTargets}
        setMacroTargets={setMacroTargets}
      />
    </div>
  );
}
