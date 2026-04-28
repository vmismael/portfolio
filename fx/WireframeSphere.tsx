"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { palette, accents } from "@/tokens/tokens";

type Props = {
  size?: number;       // CSS px
  className?: string;
};

/**
 * Pure Canvas 2D wireframe sphere — no THREE.js dep.
 *
 * - 110 points distributed via Fibonacci spiral
 * - Each point connects to its 3 nearest neighbors (organic, sparse net)
 * - 3 great circles cross the axes
 * - Auto-rotates + parallaxes toward the cursor
 * - Front-hemisphere points glow; back fade
 *
 * Place inside a `position: relative` parent. Decorative — `aria-hidden`.
 */
export function WireframeSphere({ size = 520, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, accent } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.width = `${size}px`; canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fibonacci spiral on sphere
    const N = 110;
    const phi = Math.PI * (3 - Math.sqrt(5));
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = phi * i;
      points.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
    }
    // 3 nearest neighbors per point
    const edges: [number, number][] = [];
    const pairKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
    const seen = new Set<string>();
    points.forEach((p, i) => {
      const dists = points
        .map((q, j) => ({ j, d: i === j ? Infinity : Math.hypot(p.x - q.x, p.y - q.y, p.z - q.z) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      dists.forEach(({ j }) => {
        const k = pairKey(i, j);
        if (!seen.has(k)) { seen.add(k); edges.push([i, j]); }
      });
    });

    // Great circles
    const circle = (axis: "x" | "y" | "z") => {
      const pts: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        const c = Math.cos(a), s = Math.sin(a);
        if (axis === "x") pts.push({ x: 0, y: c, z: s });
        if (axis === "y") pts.push({ x: c, y: 0, z: s });
        if (axis === "z") pts.push({ x: c, y: s, z: 0 });
      }
      return pts;
    };
    const circles = [circle("x"), circle("y"), circle("z")];

    const aHex = accents[accent].c;
    const aSoftHex = accents[accent].soft;
    const inkLine = palette[theme].ruleStrong;

    const mouse = { mx: 0, my: 0 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.mx = ((e.clientX - r.left) / r.width  - 0.5) * 0.6;
      mouse.my = ((e.clientY - r.top)  / r.height - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let tilt = 0;
    let yaw = 0;
    const start = performance.now();

    const project = (p: { x: number; y: number; z: number }, ry: number, rx: number) => {
      // Rotate Y
      let x = p.x * Math.cos(ry) + p.z * Math.sin(ry);
      let z = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
      // Rotate X
      let y = p.y * Math.cos(rx) - z * Math.sin(rx);
      z = p.y * Math.sin(rx) + z * Math.cos(rx);
      return { x, y, z };
    };

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      yaw  = t * 0.18 + mouse.mx;
      tilt = Math.sin(t * 0.12) * 0.25 + mouse.my;

      ctx.clearRect(0, 0, size, size);
      const cx = size / 2, cy = size / 2;
      const R = size * 0.4;

let currentHex: string = aHex;
      let currentSoft: string = aSoftHex;
      if (accent === "wave") {
        const h = parseFloat(document.documentElement.style.getPropertyValue("--accent-h") || "0");
        const ws = parseFloat(document.documentElement.style.getPropertyValue("--accent-s") || "62");
        const wl = parseFloat(document.documentElement.style.getPropertyValue("--accent-l") || "46");
        currentHex  = `hsl(${h}, ${ws}%, ${wl}%)`;
        currentSoft = `hsl(${h}, ${Math.round(ws * 0.8)}%, ${Math.round(wl + 16)}%)`;
      }

      const proj = points.map(p => project(p, yaw, tilt));

      // Great circles (behind)
      ctx.lineWidth = 1;
      ctx.strokeStyle = inkLine;
      ctx.globalAlpha = 0.5;
      circles.forEach(c => {
        ctx.beginPath();
        c.forEach((p, i) => {
          const r = project(p, yaw, tilt);
          const px = cx + r.x * R;
          const py = cy + r.y * R;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Edges
      ctx.lineWidth = 1;
      edges.forEach(([a, b]) => {
        const pa = proj[a], pb = proj[b];
        const avgZ = (pa.z + pb.z) / 2;
        const alpha = (avgZ + 1) / 2 * 0.5 + 0.05;
        ctx.strokeStyle = avgZ > 0 ? currentHex : currentSoft;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(cx + pa.x * R, cy + pa.y * R);
        ctx.lineTo(cx + pb.x * R, cy + pb.y * R);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Points
      proj.forEach(p => {
        const px = cx + p.x * R;
        const py = cy + p.y * R;
        const front = (p.z + 1) / 2;
        const r = 1 + front * 2.2;
        ctx.fillStyle = currentHex;
        ctx.globalAlpha = 0.3 + front * 0.6;
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
        // Glow on front-hemi points
        if (p.z > 0.2) {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
          grad.addColorStop(0, currentHex);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.globalAlpha = 0.25 * front;
          ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [size, theme, accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
    />
  );
}
