"use client";
import { useState } from "react";
import { Mail, Linkedin, ExternalLink, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { InteractiveGrid } from "@/fx/InteractiveGrid";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

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
   PROJECT THUMBNAILS — geometric SVG, no fake screenshots
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

/* ============================================================
   PROJECTS
   ============================================================ */
const PROJECTS = [
  {
    id: "labsync",
    featured: true,
    title: "Labsync",
    subtitle: "Finalista FIAP Next 2025",
    description: "Aplicação em Python para consolidação financeira e conferência de caixa em laboratórios de análises clínicas. Automatiza o cruzamento de lançamentos diários, identifica divergências e gera relatórios consolidados — reduzindo o tempo da rotina administrativa e a margem de erro humano.",
    stack: ["Python", "SQLite", "pandas", "openpyxl", "rich"],
    github: "https://github.com/vmismael",
    badge: "case study",
    Thumb: ThumbLedger,
  },
  {
    id: "portfolio",
    featured: false,
    title: "Portfólio Pessoal",
    subtitle: "Esta página · v.2026",
    description: "Aplicação Next.js com App Router, tema claro/escuro, animações Framer Motion e estética técnica-editorial. Tipografia Geist.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/vmismael/portfolio",
    badge: null,
    Thumb: ThumbGrid,
  },
  {
    id: "placeholder-3",
    featured: false,
    placeholder: true,
    title: "Próximo projeto",
    subtitle: "em construção",
    description: "Espaço reservado para o próximo case — em breve um experimento com agentes autônomos / análise de dados em saúde.",
    stack: ["Python", "LLM", "data"],
    github: null,
    badge: null,
    Thumb: ThumbDots,
  },
] as const;

export function Projects() {
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

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeUp
              key={p.id}
              delay={i * 80}
              style={p.featured ? { gridColumn: "1 / -1" } : undefined}
            >
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: typeof PROJECTS[number] }) {
  const [hover, setHover] = useState(false);
  const isPlaceholder = "placeholder" in p && p.placeholder;
  const Thumb = p.Thumb;

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
      <div
        className="absolute top-0 left-0 right-0 h-8 px-4 flex items-center justify-between font-mono text-[10px] text-muted border-b border-rule bg-bg-alt z-10 uppercase tracking-[0.12em]"
      >
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
          {p.featured && (
            <a
              href="#"
              className="font-mono text-[12px] text-accent inline-flex items-center gap-2 pb-px border-b border-accent"
            >
              ler case study →
            </a>
          )}
          {isPlaceholder && (
            <span className="font-mono text-[11px] text-muted">
              [ placeholder · adicionar depois ]
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

const CHANNELS: { icon: LucideIcon; label: string; val: string; href: string }[] = [
  { icon: Mail,          label: "Email",    val: "vitor.montemor.ismael@gmail.com", href: "mailto:vitor.montemor.ismael@gmail.com" },
  { icon: Linkedin,      label: "LinkedIn", val: "/in/vitormontemorismael",          href: "https://linkedin.com/in/vitormontemorismael/" },
  { icon: MessageCircle, label: "WhatsApp", val: "+55 (19) 98105-7925",              href: "https://wa.me/5519981057925" },
  { icon: ExternalLink,  label: "GitHub",   val: "github.com/vmismael",              href: "https://github.com/vmismael" },
];

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

function ContactChannels() {
  return (
    <div className="border border-rule bg-panel mb-4">
      <div className="px-[18px] py-3 border-b border-rule flex justify-between font-mono text-[10px] text-muted uppercase tracking-[0.14em]">
        <span>canais_diretos.json</span>
        <span>{CHANNELS.length} entries</span>
      </div>
      {CHANNELS.map((ch, i) => {
        const Icon = ch.icon;
        return (
          <a
            key={ch.label}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid gap-3 items-center px-[18px] py-4 text-body no-underline transition-colors duration-fast hover:bg-bg-alt [grid-template-columns:auto_1fr_auto] md:[grid-template-columns:auto_90px_1fr_auto]"
            style={{ borderBottom: i < CHANNELS.length - 1 ? "1px dashed var(--rule-dashed)" : "none" }}
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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

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
      setStatus("idle");
      setErrors({ message: "Falha ao enviar. Tente novamente." });
    }
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
        style={{
          border: `1px solid ${error ? "var(--accent)" : "var(--rule)"}`,
        }}
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
