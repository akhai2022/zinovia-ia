'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolved: ResolvedTheme;
  setTheme: (value: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveMode(theme: Theme, systemPrefersDark: boolean): ResolvedTheme {
  if (theme === "system") {
    return systemPrefersDark ? "dark" : "light";
  }
  return theme;
}

function applyTheme(theme: Theme) {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = resolveMode(theme, systemPrefersDark);
  const root = document.documentElement;
  root.dataset.theme = mode;
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "system";
    setThemeState(stored);
    applyTheme(stored);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateResolved = () => {
      setResolved(resolveMode(stored, mediaQuery.matches));
    };
    updateResolved();
    mediaQuery.addEventListener("change", updateResolved);

    return () => {
      mediaQuery.removeEventListener("change", updateResolved);
    };
  }, []);

  const setTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    setThemeState(value);
    applyTheme(value);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setResolved(resolveMode(value, systemPrefersDark));
  };

  const toggleTheme = () => {
    setTheme(resolved === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

