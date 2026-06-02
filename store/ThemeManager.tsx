"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./index";
import { setThemeMode } from "./themeSlice";

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}

export function ThemeManager() {
  const dispatch = useDispatch();
  const accentColor = useSelector((state: RootState) => state.theme.accentColor);
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Sync initial theme mode from localStorage on client side mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as "dark" | "light";
    if (savedMode === "dark" || savedMode === "light") {
      dispatch(setThemeMode(savedMode));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dispatch(setThemeMode(prefersDark ? "dark" : "light"));
    }
  }, [dispatch]);

  // Update accent color and rgb channels
  useEffect(() => {
    document.documentElement.style.setProperty("--color-primary-container", accentColor);
    const rgb = hexToRgb(accentColor);
    if (rgb) {
      document.documentElement.style.setProperty("--color-primary-container-rgb", rgb);
    }
  }, [accentColor]);

  // Apply dark/light classes to root document when mode changes
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme-mode", "light");
    }
  }, [mode]);

  return null;
}
