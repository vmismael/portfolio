"use client";
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { ThemeName, AccentName } from "@/tokens/tokens";

type Density = "compact" | "comfortable" | "airy";

type ThemeState = {
  theme: ThemeName;
  accent: AccentName;
  density: Density;
};

type ThemeApi = ThemeState & {
  setTheme:   (t: ThemeName) => void;
  setAccent:  (a: AccentName) => void;
  setDensity: (d: Density) => void;
  toggleTheme: () => void;
};

const Ctx = createContext<ThemeApi | null>(null);

const KEY = "portfolio.theme.v1";

export function ThemeProvider({
  children,
  defaultTheme   = "dark",
  defaultAccent  = "terracotta",
  defaultDensity = "comfortable",
}: {
  children: ReactNode;
  defaultTheme?:   ThemeName;
  defaultAccent?:  AccentName;
  defaultDensity?: Density;
}) {
  const [state, setState] = useState<ThemeState>({
    theme:   defaultTheme,
    accent:  defaultAccent,
    density: defaultDensity,
  });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...state, ...JSON.parse(raw) });
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to <html> attributes + persist
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme   = state.theme;
    html.dataset.accent  = state.accent;
    html.dataset.density = state.density;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const api: ThemeApi = {
    ...state,
    setTheme:    useCallback((t: ThemeName)   => setState(s => ({ ...s, theme: t })),    []),
    setAccent:   useCallback((a: AccentName)  => setState(s => ({ ...s, accent: a })),   []),
    setDensity:  useCallback((d: Density)     => setState(s => ({ ...s, density: d })),  []),
    toggleTheme: useCallback(() => setState(s => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" })), []),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used inside <ThemeProvider>");
  return v;
}
