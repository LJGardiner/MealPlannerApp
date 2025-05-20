// Existing exports...

export function loadMacroTargets() {
  const raw = localStorage.getItem("macroTargets");
  return raw ? JSON.parse(raw) : null;
}

export function saveMacroTargets(targets) {
  localStorage.setItem("macroTargets", JSON.stringify(targets));
}
