"use client";
import { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from "react";
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

  const rafRef = useRef<number | null>(null);
  const hueRef = useRef<number>(Date.now() % 360);
  const lastTimeRef = useRef<number>(0);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(s => ({ ...s, ...JSON.parse(raw) }));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync theme/density/accent-name to <html> attributes + persist
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme   = state.theme;
    html.dataset.accent  = state.accent;
    html.dataset.density = state.density;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  // Wave animation loop
  useEffect(() => {
    const html = document.documentElement;

    if (state.accent === "wave") {
      lastTimeRef.current = 0;

      function frame(time: number) {
        if (lastTimeRef.current === 0) lastTimeRef.current = time;
        const delta = time - lastTimeRef.current;
        lastTimeRef.current = time;

        // ~0.012 deg/ms → full rotation in ~30s
        hueRef.current = (hueRef.current + delta * 0.012) % 360;
        const h = hueRef.current;

        // Perceptual correction: green/yellow hues look brighter at the same HSL lightness.
        // sin curve peaks at h=120° (green) and tapers off toward red/blue.
        const perc = Math.max(0, Math.sin(((h - 30) * Math.PI) / 180));
        const s = Math.round(62 - perc * 10);
        const l = Math.round(46 - perc * 8);
        html.style.setProperty("--accent",          `hsl(${h}, ${s}%, ${l}%)`);
        html.style.setProperty("--accent-soft",     `hsl(${h}, ${Math.round(s * 0.8)}%, ${Math.round(l + 16)}%)`);
        html.style.setProperty("--accent-contrast", "#FFFFFF");
        html.style.setProperty("--accent-h",        String(h));
        html.style.setProperty("--accent-s",        String(s));
        html.style.setProperty("--accent-l",        String(l));

        rafRef.current = requestAnimationFrame(frame);
      }

      rafRef.current = requestAnimationFrame(frame);
    } else {
      // Stop animation and restore CSS cascade
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      html.style.removeProperty("--accent");
      html.style.removeProperty("--accent-soft");
      html.style.removeProperty("--accent-contrast");
      html.style.removeProperty("--accent-h");
      html.style.removeProperty("--accent-s");
      html.style.removeProperty("--accent-l");
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [state.accent]);

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
