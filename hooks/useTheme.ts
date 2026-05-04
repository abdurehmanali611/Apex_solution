"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("apex-theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function applyTheme(t: "dark" | "light") {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(t);
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("apex-theme", next);
  }

  return { theme, toggle };
}
