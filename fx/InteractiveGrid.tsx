"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { palette, accents } from "@/tokens/tokens";

type Props = {
  cellSize?: number;
  /** Density (matches design system grid token). 0–1. */
  baseOpacity?: number;
  /** When true, lit decay is faster — use in content sections, not Hero. */
  light?: boolean;
};

/**
 * Canvas-based interactive grid. Lights up cells near the cursor with
 * accent-color fill + corner dots. Mouse trail decays each frame.
 *
 * Use:
 *   <InteractiveGrid />                       ← Hero (default)
 *   <InteractiveGrid light cellSize={64} />   ← Sobre/Habilidades/Projetos/Contato
 *
 * The component reads the active accent + theme tokens from <ThemeProvider>
 * so it auto-reacts to theme/accent changes — no JSX rerender needed.
 */
export function InteractiveGrid({ cellSize = 80, baseOpacity = 0.45, light = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, accent } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    const lit = new Map<string, number>();
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(parent);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= w && y <= h;
      mouse.x = x; mouse.y = y; mouse.active = inside;
    };
    window.addEventListener("mousemove", onMove);

    const hex = (h: string): [number, number, number] => {
      const m = h.replace("#", "");
      return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
    };
    const hslToRgb = (hDeg: number, s: number, l: number): [number, number, number] => {
      s /= 100; l /= 100;
      const k = (n: number) => (n + hDeg / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    };
    const aRGB = hex(accents[accent].c);
    const baseLine = palette[theme].rule;

    const radiusMul = light ? 1.8 : 2.6;
    const decay = light ? 0.88 : 0.92;
    const fillAlpha = light ? 0.04 : 0.06;
    const edgeAlpha = light ? 0.4  : 0.55;

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;
      const radius = cellSize * radiusMul;

      if (mouse.active) {
        const cMin = Math.max(0, Math.floor((mouse.x - radius) / cellSize));
        const cMax = Math.min(cols, Math.ceil((mouse.x + radius) / cellSize));
        const rMin = Math.max(0, Math.floor((mouse.y - radius) / cellSize));
        const rMax = Math.min(rows, Math.ceil((mouse.y + radius) / cellSize));
        for (let cx = cMin; cx <= cMax; cx++) {
          for (let cy = rMin; cy <= rMax; cy++) {
            const px = cx * cellSize + cellSize / 2;
            const py = cy * cellSize + cellSize / 2;
            const d = Math.hypot(px - mouse.x, py - mouse.y);
            if (d < radius) {
              const i = 1 - d / radius;
              const k = `${cx},${cy}`;
              const cur = lit.get(k) || 0;
              if (i > cur) lit.set(k, i);
            }
          }
        }
      }

      const drop: string[] = [];
      lit.forEach((v, k) => {
        const next = v * decay;
        if (next < 0.02) drop.push(k);
        else lit.set(k, next);
      });
      drop.forEach(k => lit.delete(k));

      // Base grid
      ctx.save();
      ctx.globalAlpha = baseOpacity;
      ctx.strokeStyle = baseLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += cellSize) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (let y = 0; y <= h; y += cellSize) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();
      ctx.restore();

      // Lit cells
      const currentRGB: [number, number, number] = accent === "wave"
        ? hslToRgb(
            parseFloat(document.documentElement.style.getPropertyValue("--accent-h") || "0"),
            parseFloat(document.documentElement.style.getPropertyValue("--accent-s") || "62"),
            parseFloat(document.documentElement.style.getPropertyValue("--accent-l") || "46"),
          )
        : aRGB;
      lit.forEach((i, key) => {
        const [cx, cy] = key.split(",").map(Number);
        const x = cx * cellSize, y = cy * cellSize;
        ctx.fillStyle = `rgba(${currentRGB[0]},${currentRGB[1]},${currentRGB[2]},${i * fillAlpha})`;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = `rgba(${currentRGB[0]},${currentRGB[1]},${currentRGB[2]},${i * edgeAlpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);
        const dotR = 1 + i * 1.4;
        ctx.fillStyle = `rgba(${currentRGB[0]},${currentRGB[1]},${currentRGB[2]},${i * 0.75})`;
        [[x, y], [x + cellSize, y], [x, y + cellSize], [x + cellSize, y + cellSize]].forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, dotR, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Erase grid inside the sphere and fade approaching lines.
      // Sphere: right-[-60px], size=780, drawn radius R=780*0.4=312.
      // Center in section canvas: X = w - (780/2 - 60) = w - 330, Y = h/2.
      if (w >= 768) {
        const sphX = w - 330;
        const sphY = h / 2;
        const innerR = 295; // fully erased core (R * 0.95)
        const outerR = 420; // fade ends here   (R * 1.35)
        const mask = ctx.createRadialGradient(sphX, sphY, innerR, sphX, sphY, outerR);
        mask.addColorStop(0, "rgba(0,0,0,1)");
        mask.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = mask;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [cellSize, baseOpacity, light, theme, accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none z-0"
      style={
        light
          ? {
              maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            }
          : undefined
      }
    />
  );
}
