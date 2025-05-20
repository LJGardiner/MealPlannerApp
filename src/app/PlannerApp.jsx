import React, { useEffect, useState } from "react";
import PlannerGrid from "../components/PlannerGrid";
import AutoPlannerButton from "../components/AutoPlannerButton";
import { loadMacroTargets } from "../utils/dataLoader";
import { macroTargets as defaultMacroTargets } from "../data/macroTargets";

export default function PlannerApp() {
  const [macroTargets, setMacroTargets] = useState(() => {
    return loadMacroTargets() || defaultMacroTargets;
  });

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const storedTargets = loadMacroTargets();
    if (storedTargets) setMacroTargets(storedTargets);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Weekly Meal Planner</h1>
        <AutoPlannerButton onRefresh={() => setRefreshKey(prev => prev + 1)} />
      </div>
      <PlannerGrid
        key={refreshKey}
        macroTargets={macroTargets}
        setMacroTargets={setMacroTargets}
      />
    </div>
  );
}
