import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-toggle">Dark Mode</label>
      <input
        id="theme-toggle"
        type="checkbox"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />
    </div>
  );
}
