"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { ExternalLink, Send, CheckCircle2, AlertCircle, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { InteractiveGrid } from "@/fx/InteractiveGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { PROJECTS, type ThumbKey } from "@/data/projects";
import { CHANNELS } from "@/data/contact";
import type { Project } from "@/data/projects";

function SectionHeader({ num, kicker, title, subtitle }: {
  num: string; kicker: string; title: string; subtitle?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3.5 font-mono text-tiny text-muted uppercase tracking-[0.16em] mb-[18px]">
        <span className="text-accent font-semibold">§ {num}</span>
        <span className="w-8 h-px bg-rule-strong inline-block flex-shrink-0" />
        <span>{kicker}</span>
      </div>
      <h2
        className="font-sans font-semibold text-ink tracking-tight m-0 leading-none"
        style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[18px] text-[17px] leading-[1.6] text-muted max-w-[640px] font-sans m-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   PROJECT THUMBNAILS
   ============================================================ */
function ThumbLedger() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <rect width="400" height="200" fill="var(--bg)" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1="20" y1={28 + i * 20} x2="380" y2={28 + i * 20} stroke="var(--rule-strong)" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <rect x="28" y={20 + i * 20} width="40" height="2" fill="var(--ink)" opacity="0.3" />
          <rect x="90" y={20 + i * 20} width={120 + (i % 3) * 40} height="2" fill="var(--ink)" opacity="0.5" />
          <rect x="320" y={20 + i * 20} width={i % 2 ? 40 : 28} height="2" fill="var(--accent)" opacity="0.7" />
        </g>
      ))}
      <text x="20" y="14" fontFamily="ui-monospace,monospace" fontSize="8" fill="var(--ink)" opacity="0.4">
        conf_caixa.log · 2025-03-14
      </text>
    </svg>
  );
}

function ThumbGrid() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <defs>
        <pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 L0 0 0 20" fill="none" stroke="var(--rule)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="var(--bg)" />
      <rect width="400" height="200" fill="url(#pgrid)" />
      <rect x="40" y="40" width="80" height="6" fill="var(--ink)" opacity="0.5" />
      <rect x="40" y="56" width="140" height="3" fill="var(--ink)" opacity="0.3" />
      <rect x="40" y="64" width="120" height="3" fill="var(--ink)" opacity="0.3" />
      <rect x="280" y="40" width="80" height="80" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1" />
      <rect x="40" y="140" width="20" height="20" fill="var(--accent)" opacity="0.5" />
      <rect x="64" y="140" width="40" height="20" fill="var(--rule-strong)" opacity="0.6" />
    </svg>
  );
}

function ThumbDots() {
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <rect width="400" height="200" fill="var(--bg)" />
      {Array.from({ length: 18 }, (_, x) =>
        Array.from({ length: 9 }, (_, y) => (
          <circle key={`${x}-${y}`} cx={20 + x * 22} cy={20 + y * 20} r="1.2" fill="var(--rule-strong)" />
        ))
      )}
    </svg>
  );
}

function ThumbHelix() {
  const N = 64;
  const x0 = 20, x1 = 380, amp = 52, cy = 100, turns = 4;
  const xAt = (i: number) => x0 + (x1 - x0) * (i / N);
  const tAt = (i: number) => (i / N) * Math.PI * turns;
  const yA = (i: number) => cy + amp * Math.sin(tAt(i));
  const yB = (i: number) => cy - amp * Math.sin(tAt(i));
  const line = (fy: (i: number) => number) =>
    Array.from({ length: N + 1 }, (_, i) => `${xAt(i).toFixed(1)},${fy(i).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <rect width="400" height="200" fill="var(--bg)" />
      {Array.from({ length: N + 1 }, (_, i) =>
        i % 4 === 0 ? (
          <line key={i} x1={xAt(i)} y1={yA(i)} x2={xAt(i)} y2={yB(i)} stroke="var(--rule-strong)" strokeWidth="0.6" opacity="0.7" />
        ) : null,
      )}
      <polyline points={line(yA)} fill="none" stroke="var(--ink)" strokeWidth="1.4" opacity="0.55" />
      <polyline points={line(yB)} fill="none" stroke="var(--accent)" strokeWidth="1.4" opacity="0.8" />
      <text x="20" y="14" fontFamily="ui-monospace,monospace" fontSize="8" fill="var(--ink)" opacity="0.4">
        helix · 650 exames
      </text>
    </svg>
  );
}

function ThumbToolkit() {
  const cols = 7, rows = 3, bw = 44, bh = 44, gap = 8, startX = 20, startY = 24;
  const accents = new Set([2, 6, 9, 15, 18]);
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const x = startX + c * (bw + gap);
      const y = startY + r * (bh + gap);
      const on = accents.has(idx);
      tiles.push(
        <g key={idx}>
          <rect x={x} y={y} width={bw} height={bh} fill={on ? "var(--accent)" : "var(--rule)"} opacity={on ? 0.18 : 0.5} stroke={on ? "var(--accent)" : "var(--rule-strong)"} strokeWidth="1" />
          <rect x={x + 10} y={y + 14} width={bw - 20} height="2.5" fill={on ? "var(--accent)" : "var(--ink)"} opacity={on ? 0.7 : 0.3} />
          <rect x={x + 10} y={y + 22} width={bw - 26} height="2.5" fill="var(--ink)" opacity="0.25" />
        </g>,
      );
    }
  }
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <rect width="400" height="200" fill="var(--bg)" />
      {tiles}
    </svg>
  );
}

function ThumbCircuit() {
  const nodes = [
    [60, 50], [150, 40], [250, 70], [340, 45],
    [40, 120], [130, 150], [230, 140], [320, 160], [370, 110],
    [90, 100], [200, 100], [290, 100],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 9], [9, 10], [10, 11], [11, 3],
    [4, 5], [5, 6], [6, 7], [7, 8], [4, 9], [5, 10], [6, 11], [8, 3],
    [9, 1], [10, 2], [11, 8],
  ];
  const accent = new Set([2, 10, 6]);
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <rect width="400" height="200" fill="var(--bg)" />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--rule-strong)" strokeWidth="0.7" opacity="0.6" />
      ))}
      {nodes.map(([x, y], i) => {
        const on = accent.has(i);
        return (
          <g key={i}>
            {on && <circle cx={x} cy={y} r="7" fill="var(--accent)" opacity="0.15" />}
            <circle cx={x} cy={y} r={on ? 3 : 2} fill={on ? "var(--accent)" : "var(--ink)"} opacity={on ? 0.9 : 0.45} />
          </g>
        );
      })}
      <text x="20" y="188" fontFamily="ui-monospace,monospace" fontSize="8" fill="var(--ink)" opacity="0.4">
        telemetry · obd2
      </text>
    </svg>
  );
}

function ThumbSector() {
  const panels = [
    { x: 20, y: 24, w: 150, h: 74, accent: true },
    { x: 178, y: 24, w: 90, h: 74 },
    { x: 276, y: 24, w: 104, h: 74 },
    { x: 20, y: 106, w: 104, h: 70 },
    { x: 132, y: 106, w: 136, h: 70, accent: true },
    { x: 276, y: 106, w: 104, h: 70 },
  ];
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
      <rect width="400" height="200" fill="var(--bg)" />
      {panels.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={p.accent ? "var(--accent)" : "var(--rule)"} opacity={p.accent ? 0.12 : 0.4} stroke={p.accent ? "var(--accent)" : "var(--rule-strong)"} strokeWidth="1" />
          <rect x={p.x + 10} y={p.y + 12} width={p.w * 0.5} height="3" fill={p.accent ? "var(--accent)" : "var(--ink)"} opacity={p.accent ? 0.7 : 0.35} />
          <rect x={p.x + 10} y={p.y + 22} width={p.w * 0.7} height="2" fill="var(--ink)" opacity="0.22" />
          <rect x={p.x + 10} y={p.y + 30} width={p.w * 0.35} height="2" fill="var(--ink)" opacity="0.22" />
        </g>
      ))}
    </svg>
  );
}

const THUMBS: Record<ThumbKey, () => React.JSX.Element> = {
  ledger:  ThumbLedger,
  grid:    ThumbGrid,
  dots:    ThumbDots,
  helix:   ThumbHelix,
  toolkit: ThumbToolkit,
  circuit: ThumbCircuit,
  sector:  ThumbSector,
};

/* ============================================================
   PROJECTS
   ============================================================ */
export function Projects() {
  const featured = PROJECTS.filter(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section
      id="projetos"
      className="relative overflow-hidden py-section px-8"
      data-screen-label="04 Projetos"
    >
      <InteractiveGrid light cellSize={64} baseOpacity={0.18} />
      <div className="relative z-raised max-w-content mx-auto">
        <FadeUp>
          <SectionHeader
            num="03"
            kicker="// projetos"
            title="O que estou construindo"
            subtitle="Soluções nascidas da intersecção entre operação real e código."
          />
        </FadeUp>

        {featured.map((p, i) => (
          <FadeUp key={p.id} delay={i * 80} className="mt-14">
            <ProjectCard project={p} />
          </FadeUp>
        ))}

        {rest.length > 0 && (
          <FadeUp delay={120} className="mt-6">
            <ProjectCarousel projects={rest} />
          </FadeUp>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   PROJECT CAROUSEL
   ============================================================ */
function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, clientWidth, scrollWidth } = track;
    const cards = Array.from(track.children) as HTMLElement[];
    // Active = card whose left edge is closest to the current scroll position.
    let nearest = 0;
    let min = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.offsetLeft - scrollLeft);
      if (d < min) { min = d; nearest = i; }
    });
    setActive(nearest);
    setEdges({
      start: scrollLeft <= 1,
      end: scrollLeft + clientWidth >= scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    syncState();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);
    return () => {
      track.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, projects.length - 1));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [projects.length, reduced]);

  const canPrev = !edges.start;
  const canNext = !edges.end;

  return (
    <div
      role="group"
      aria-roledescription="carrossel"
      aria-label="Outros projetos"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
      }}
    >
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[11px] text-muted tracking-[0.08em]">
          <span className="text-accent">{String(active + 1).padStart(2, "0")}</span>
          <span className="opacity-50"> / {String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="flex gap-2">
          <CarouselButton dir="prev" disabled={!canPrev} onClick={() => goTo(active - 1)} />
          <CarouselButton dir="next" disabled={!canNext} onClick={() => goTo(active + 1)} />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]"
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            aria-label={`Ir para projeto ${i + 1}: ${p.title}`}
            aria-current={active === i}
            className="h-1.5 rounded-full transition-all duration-base cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            style={{
              width: active === i ? 24 : 8,
              background: active === i ? "var(--accent)" : "var(--rule-strong)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselButton({ dir, disabled, onClick }: {
  dir: "prev" | "next"; disabled: boolean; onClick: () => void;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Projeto anterior" : "Próximo projeto"}
      className="w-9 h-9 inline-flex items-center justify-center border transition-colors duration-fast cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-accent enabled:hover:text-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      style={{ borderColor: "var(--rule)", color: "var(--body)" }}
    >
      <Icon size={16} />
    </button>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const isPlaceholder = !!p.placeholder;
  const Thumb = THUMBS[p.thumb];

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "relative border bg-panel overflow-hidden transition-[border-color,transform,box-shadow] duration-base flex flex-col",
        p.featured && "md:flex-row",
      )}
      style={{
        borderColor: hover ? "var(--accent)" : "var(--rule)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 12px 28px -16px rgba(184,85,46,0.4)" : "none",
        opacity: isPlaceholder ? 0.7 : 1,
      }}
    >
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-8 px-4 flex items-center justify-between font-mono text-[10px] text-muted border-b border-rule bg-bg-alt z-10 uppercase tracking-[0.12em]">
        <div className="flex items-center gap-2.5">
          <span className="opacity-50">◻</span>
          {p.id}.md
          {p.badge && (
            <span className="px-2 py-px border border-accent text-accent text-[9px] tracking-[0.14em] ml-1">
              {p.badge}
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rule-strong" />
          <span className="w-1.5 h-1.5 rounded-full bg-rule-strong" />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isPlaceholder ? "var(--rule-strong)" : "var(--code-ok)" }}
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div
        className={cn(
          "bg-bg flex-shrink-0",
          p.featured
            ? "w-full h-[200px] border-b border-rule md:w-[44%] md:min-w-[320px] md:h-auto md:border-r md:border-b-0"
            : "w-full h-[180px] border-b border-rule",
        )}
        style={{ marginTop: 32 }}
      >
        <Thumb />
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col gap-4 flex-1 px-7 pb-6",
          p.featured ? "pt-7 md:pt-[60px]" : "pt-7",
        )}
      >
        <div>
          <div className="font-mono text-[11px] text-muted tracking-[0.06em] mb-1.5">
            {p.subtitle}
          </div>
          <h3
            className={cn(
              "m-0 font-sans font-semibold text-ink leading-[1.1] tracking-tight",
              p.featured ? "text-[22px] md:text-[32px]" : "text-[22px]",
            )}
          >
            {p.title}
          </h3>
        </div>

        <p className="m-0 text-body text-[15px] leading-[1.65] font-sans max-w-[520px]">
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {p.stack.map(s => (
            <span
              key={s}
              className="font-mono text-[11px] px-2 py-0.5 border border-rule text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-3.5 mt-auto pt-2 items-center">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-accent inline-flex items-center gap-1.5 pb-px border-b border-rule transition-colors duration-fast hover:border-accent"
            >
              visitar
              <ExternalLink size={12} />
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-body inline-flex items-center gap-2 pb-px border-b border-rule transition-colors duration-fast hover:text-accent hover:border-accent"
            >
              github
            </a>
          )}
          {isPlaceholder && (
            <span className="font-mono text-[11px] text-muted">
              [ placeholder ]
            </span>
          )}
          {!isPlaceholder && !p.live && !p.github && (
            <span className="font-mono text-[11px] text-muted">
              [ acesso restrito ]
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
type ContactVariant = "channels" | "form" | "hybrid";

export function Contact() {
  const [variant, setVariant] = useState<ContactVariant>("hybrid");

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-section px-8 bg-bg-alt border-t border-rule"
      data-screen-label="05 Contato"
    >
      <InteractiveGrid light cellSize={64} baseOpacity={0.22} />
      <div className="relative z-raised max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,460px)_1fr] gap-12 md:gap-20 items-start">
          {/* Editorial copy */}
          <FadeUp>
            <SectionHeader num="04" kicker="// contato" title="Aberto a oportunidades" />
            <p className="mt-6 font-sans text-[17px] leading-[1.65] text-body max-w-[420px]">
              Disponível para vagas júnior, trainee ou estágio em TI —
              especialmente em healthtech, fintech ou empresas com forte
              componente de operação financeira. Respondo em até 48h.
            </p>

            {/* Variant toggle */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-2.5 border border-dashed border-rule-dashed font-mono text-[11px] text-muted">
              <span>view:</span>
              {(["channels", "form", "hybrid"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setVariant(k)}
                  className="px-2.5 py-1 border font-mono text-[11px] tracking-[0.04em] transition-colors duration-fast cursor-pointer"
                  style={{
                    background: variant === k ? "var(--accent)" : "transparent",
                    color: variant === k ? "var(--accent-contrast)" : "var(--body)",
                    borderColor: variant === k ? "var(--accent)" : "var(--rule)",
                  }}
                >
                  {k === "channels" ? "links" : k === "form" ? "form" : "ambos"}
                </button>
              ))}
            </div>

            <div className="mt-8 font-mono text-[12px] text-muted leading-[1.9]">
              <div className="inline-flex items-center gap-2">
                <span>◻</span>
                São Paulo · BR
              </div>
              <div>{`{ status: "open_to_junior" }`}</div>
            </div>
          </FadeUp>

          {/* Right column */}
          <FadeUp delay={120}>
            {(variant === "channels" || variant === "hybrid") && (
              <ContactChannels />
            )}
            {(variant === "form" || variant === "hybrid") && (
              <ContactForm />
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function CopyRow({ ch, isLast }: { ch: (typeof CHANNELS)[number]; isLast: boolean }) {
  const [copied, setCopied] = useState(false);
  const Icon = ch.icon;

  function copy() {
    navigator.clipboard.writeText(ch.val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="grid gap-3 items-center px-[18px] py-4 transition-colors duration-fast hover:bg-bg-alt [grid-template-columns:auto_1fr_auto] md:[grid-template-columns:auto_90px_1fr_auto]"
      style={{ borderBottom: !isLast ? "1px dashed var(--rule-dashed)" : "none" }}
    >
      <Icon size={16} className="text-muted" />
      <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] hidden md:block">{ch.label}</span>
      <span className="font-mono text-[12px] text-ink truncate">{ch.val}</span>
      <button
        onClick={copy}
        aria-label="Copiar email"
        className="w-6 h-6 inline-flex items-center justify-center text-muted hover:text-accent transition-colors duration-fast focus:outline-none focus-visible:ring-1 focus-visible:ring-accent flex-shrink-0"
      >
        {copied ? <Check size={13} className="text-code-ok" /> : <Copy size={13} />}
      </button>
    </div>
  );
}

function ContactChannels() {
  return (
    <div className="border border-rule bg-panel mb-4">
      <div className="px-[18px] py-3 border-b border-rule flex justify-between font-mono text-[10px] text-muted uppercase tracking-[0.14em]">
        <span>canais_diretos.json</span>
        <span>{CHANNELS.length} entries</span>
      </div>
      {CHANNELS.map((ch, i) => {
        const isLast = i === CHANNELS.length - 1;
        if (ch.copyable) return <CopyRow key={ch.label} ch={ch} isLast={isLast} />;
        const Icon = ch.icon;
        return (
          <a
            key={ch.label}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid gap-3 items-center px-[18px] py-4 text-body no-underline transition-colors duration-fast hover:bg-bg-alt [grid-template-columns:auto_1fr_auto] md:[grid-template-columns:auto_90px_1fr_auto]"
            style={{ borderBottom: !isLast ? "1px dashed var(--rule-dashed)" : "none" }}
          >
            <Icon size={16} className="text-muted" />
            <span className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] hidden md:block">{ch.label}</span>
            <span className="font-mono text-[12px] text-ink truncate">{ch.val}</span>
            <ExternalLink size={13} className="text-muted flex-shrink-0" />
          </a>
        );
      })}
    </div>
  );
}

type FormState = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<FormState>;

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (form.name.trim().length < 2) e.name = "nome muito curto";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "email inválido";
    if (form.subject.trim().length < 3) e.subject = "obrigatório";
    if (form.message.trim().length < 10) e.message = "mensagem muito curta";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro no envio");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "error") {
    return (
      <div className="border border-accent bg-panel p-8 flex flex-col items-center gap-3 text-center">
        <AlertCircle size={32} className="text-accent" />
        <p className="font-sans text-[16px] text-ink m-0">Falha ao enviar.</p>
        <p className="font-mono text-[12px] text-muted m-0">
          Tente pelo <a href="mailto:vitor.montemor.ismael@gmail.com" className="text-accent underline underline-offset-2">email direto</a> ou{" "}
          <a href="https://wa.me/5519981057925" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">WhatsApp</a>.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 border border-rule text-body font-mono text-[12px] px-4 py-2 hover:border-accent hover:text-accent transition-colors duration-fast cursor-pointer bg-transparent"
        >
          tentar novamente
        </button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="border border-rule bg-panel p-8 flex flex-col items-center gap-3 text-center">
        <CheckCircle2 size={32} className="text-accent" />
        <p className="font-sans text-[16px] text-ink m-0">Mensagem enviada.</p>
        <p className="font-mono text-[12px] text-muted m-0">retornarei em até 48h</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 border border-rule text-body font-mono text-[12px] px-4 py-2 hover:border-accent hover:text-accent transition-colors duration-fast cursor-pointer bg-transparent"
        >
          enviar outra
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-rule bg-panel">
      <div className="px-[18px] py-3 border-b border-rule flex justify-between font-mono text-[10px] text-muted uppercase tracking-[0.14em]">
        <span>send_message.tsx</span>
        <span>zod · validated</span>
      </div>
      <div className="p-6 grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="name" value={form.name} error={errors.name}
            placeholder="Seu nome"
            onChange={v => setForm(f => ({ ...f, name: v }))}
          />
          <Field
            label="email" type="email" value={form.email} error={errors.email}
            placeholder="seu@email.com"
            onChange={v => setForm(f => ({ ...f, email: v }))}
          />
        </div>
        <Field
          label="subject" value={form.subject} error={errors.subject}
          placeholder="Oportunidade · parceria · dúvida"
          onChange={v => setForm(f => ({ ...f, subject: v }))}
        />
        <Field
          label="message" textarea value={form.message} error={errors.message}
          placeholder="Sua mensagem..."
          onChange={v => setForm(f => ({ ...f, message: v }))}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2.5 font-mono text-[13px] tracking-[0.04em] py-3.5 px-4 cursor-pointer border-0 transition-opacity"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          <Send size={13} />
          {status === "loading" ? "./enviando..." : "./enviar_mensagem"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = "text", textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label className="flex justify-between font-mono text-[10px] text-muted uppercase tracking-[0.14em] mb-1.5">
        <span>{label}</span>
        {error && <span className="text-accent normal-case tracking-normal">{error}</span>}
      </label>
      <Tag
        type={type}
        rows={textarea ? 5 : undefined}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full box-border px-3.5 py-3 font-mono text-[13px] text-ink bg-bg transition-colors duration-fast focus:outline-none resize-y"
        style={{ border: `1px solid ${error ? "var(--accent)" : "var(--rule)"}` }}
        onFocus={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          e.currentTarget.style.borderColor = "var(--accent)";
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          e.currentTarget.style.borderColor = error ? "var(--accent)" : "var(--rule)";
        }}
      />
    </div>
  );
}
