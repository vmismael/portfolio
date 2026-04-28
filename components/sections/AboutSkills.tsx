"use client";
import { Stethoscope, Briefcase, Code2, TrendingUp, Sparkles, Terminal, Wrench, BarChart2, Settings2, Languages, Package } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { InteractiveGrid } from "@/fx/InteractiveGrid";
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

const ABOUT_BLOCKS = [
  {
    eyebrow: "01 · de onde venho",
    body: (
      <>
        Comecei na <strong>Medicina</strong>, na UNINOVE. Depois migrei pra{" "}
        <strong>Administração no IBMEC</strong>. Em cada uma encontrei pedaços
        do que eu queria, mas nunca o todo. O que essas passagens deixaram foi
        vocabulário: aprendi a ler uma operação de saúde por dentro e a tratar
        número com a seriedade que ele pede.
      </>
    ),
  },
  {
    eyebrow: "02 · por que essa trajetória vira vantagem",
    body: (
      <>
        Trabalhei em <strong>laboratório de análises clínicas</strong> na rotina
        financeira — caixa, conciliação, planilhas, apoio em automação. Não
        preciso que me expliquem por que uma divergência de R$ 18 entre o
        sistema e a bancada importa, ou por que um relatório precisa rodar antes
        das oito da manhã. Construir software pra saúde e finanças fica mais
        rápido quando você já fez o trabalho que o software vai substituir.
      </>
    ),
  },
  {
    eyebrow: "03 · o que estou construindo agora",
    body: (
      <>
        Cursando <strong>Engenharia de Software na FIAP</strong>, formando em
        2027. Foco em <strong>Python, análise de dados e automação</strong>{" "}
        aplicados a contextos financeiros e de saúde. O{" "}
        <strong>Labsync</strong> foi o primeiro experimento sério nessa
        interseção — finalista do FIAP Next 2025. Procuro vagas júnior,
        trainee ou estágio em healthtech, fintech ou empresas com forte
        componente operacional.
      </>
    ),
  },
];

const TIMELINE: { period: string; Icon: LucideIcon; title: string; body: string }[] = [
  { period: "2019–22", Icon: Stethoscope, title: "Medicina (trancada)",      body: "UNINOVE + Cats Academy (Boston). Linguagem do setor saúde." },
  { period: "2022–23", Icon: TrendingUp,  title: "Administração (trancada)", body: "IBMEC + francês em Paris. Gestão financeira, controle, KPIs." },
  { period: "2024–27", Icon: Code2,       title: "Eng. Software · FIAP",     body: "Python, dados, automação. Onde tudo se cruza." },
  { period: "2025",    Icon: Sparkles,    title: "Labsync · FIAP Next",      body: "Finalista. Solução real para um problema vivido." },
  { period: "2025",    Icon: Briefcase,   title: "Lab. Paulista",            body: "Auxiliar administrativo: caixa, conferências, automação." },
];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden py-section px-8" data-screen-label="02 Sobre">
      <InteractiveGrid light cellSize={64} baseOpacity={0.18} />
      <div className="relative z-raised max-w-content mx-auto">
        <FadeUp>
          <SectionHeader
            num="01"
            kicker="// sobre"
            title="Trajetória"
            subtitle="Não-linear de propósito. Cheguei aqui depois de explorar — e isso é parte do diferencial."
          />
        </FadeUp>

        <div className="mt-16 grid md:grid-cols-[minmax(0,600px)_1fr] gap-20 items-start">
          {/* Editorial column */}
          <div>
            {ABOUT_BLOCKS.map((b, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="mb-12">
                  <div className="font-mono text-[11px] text-muted uppercase tracking-[0.16em] mb-3.5">
                    {b.eyebrow}
                  </div>
                  <p className="font-sans text-[17px] leading-[1.7] text-body m-0 max-w-[580px]">
                    {b.body}
                  </p>
                </div>
              </FadeUp>
            ))}

            <FadeUp delay={ABOUT_BLOCKS.length * 80}>
              <div className="mt-2 pl-5 py-4 pr-5 border-l-2 border-accent bg-bg-alt font-mono text-[12px] text-body leading-[1.7]">
                <span className="text-muted">{"// procurando"}</span>
                <br />
                Analista Júnior · Trainee · Estágio em TI
                <br />
                <span className="text-muted">preferencialmente:</span>{" "}
                <span className="text-accent">healthtech · fintech · labtech</span>
              </div>
            </FadeUp>
          </div>

          {/* Milestone timeline */}
          <FadeUp delay={120}>
            <div className="font-mono border border-rule bg-panel sticky top-[110px]">
              <div className="px-[18px] py-3 border-b border-rule flex justify-between text-[10px] text-muted uppercase tracking-[0.12em]">
                <span>milestones.log</span>
                <span>{TIMELINE.length} entries</span>
              </div>
              <div className="py-2">
                {TIMELINE.map((t, i) => {
                  const Icon = t.Icon;
                  return (
                    <div
                      key={i}
                      className="grid gap-3 px-[18px] py-3.5 items-start"
                      style={{
                        gridTemplateColumns: "78px 28px 1fr",
                        borderBottom: i < TIMELINE.length - 1 ? "1px dashed var(--rule-dashed)" : "none",
                      }}
                    >
                      <span className="text-muted text-[11px] pt-0.5">{t.period}</span>
                      <span className="text-accent pt-0.5"><Icon size={14} /></span>
                      <div>
                        <div className="text-ink text-[13px] font-sans font-medium">{t.title}</div>
                        <div className="text-muted text-[11px] mt-1 leading-[1.6]">{t.body}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */

type SkillGroup = { label: string; Icon: LucideIcon; items: string[] };

const TECH_GROUPS: SkillGroup[] = [
  {
    label: "linguagens",
    Icon: Code2,
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML", "CSS", "C"],
  },
  {
    label: "frameworks & libs",
    Icon: Package,
    items: ["React.js", "Next.js", "Node.js", "pandas", "openpyxl"],
  },
  {
    label: "ferramentas",
    Icon: Wrench,
    items: ["Git / GitHub", "VSCode", "IntelliJ", "Figma", "Oracle DB", "SQLite", "Excel · Sheets"],
  },
];

const BIZ_GROUPS: SkillGroup[] = [
  {
    label: "financeiro & administrativo",
    Icon: BarChart2,
    items: ["Análise financeira", "Controle de caixa", "Conciliação", "KPIs administrativos", "Lançamentos contábeis", "Conferência de planilhas"],
  },
  {
    label: "processos & metodologias",
    Icon: Settings2,
    items: ["Automação de processos", "Scrum / Agile", "Design Thinking", "POO", "Análise de dados"],
  },
];

const LANGS = [
  ["Português", "Nativo"],
  ["Inglês", "C1"],
  ["Espanhol", "B2"],
  ["Francês", "B1"],
] as const;

export function Skills() {
  return (
    <section
      id="habilidades"
      className="relative overflow-hidden py-section px-8 bg-bg-alt border-y border-rule"
      data-screen-label="03 Habilidades"
    >
      <InteractiveGrid light cellSize={64} baseOpacity={0.22} />
      <div className="relative z-raised max-w-content mx-auto">
        <FadeUp>
          <SectionHeader
            num="02"
            kicker="// habilidades"
            title="Stack & domínio"
            subtitle="Técnico e operacional, lado a lado — porque na prática, o trabalho é feito assim."
          />
        </FadeUp>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <FadeUp delay={80}>
            <SkillColumn title="grupo_01: tecnologia" Icon={Terminal} groups={TECH_GROUPS} />
          </FadeUp>
          <FadeUp delay={160}>
            <SkillColumn title="grupo_02: negócio & saúde" Icon={Briefcase} groups={BIZ_GROUPS} />
          </FadeUp>
        </div>

        <FadeUp delay={240}>
          <div
            className="mt-8 border border-rule bg-panel px-6 py-5 grid gap-8 items-center"
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted uppercase tracking-[0.14em]">
              <Languages size={14} className="text-accent" />
              idiomas
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-[13px] text-body">
              {LANGS.map(([lang, level], i) => (
                <span key={lang} className="inline-flex items-baseline gap-2">
                  <span className="text-ink font-medium">{lang}</span>
                  <span className="text-muted text-[11px]">· {level}</span>
                  {i < LANGS.length - 1 && (
                    <span className="text-rule-strong ml-4">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function SkillColumn({ title, Icon, groups }: { title: string; Icon: LucideIcon; groups: SkillGroup[] }) {
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className="border border-rule bg-panel h-full">
      <div className="px-5 py-3.5 border-b border-rule flex items-center justify-between font-mono text-[11px] text-muted uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2.5">
          <Icon size={13} className="text-accent" />
          {title}
        </span>
        <span>{total} items</span>
      </div>
      <div className="px-6 py-5">
        {groups.map((g, gi) => {
          const GroupIcon = g.Icon;
          return (
            <div
              key={g.label}
              className="pb-5 mb-5 last:pb-0 last:mb-0"
              style={{ borderBottom: gi < groups.length - 1 ? "1px dashed var(--rule-dashed)" : "none" }}
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted uppercase tracking-[0.12em] mb-3">
                <GroupIcon size={11} />
                {g.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 border border-rule bg-bg text-body font-mono text-[12px] transition-colors duration-fast hover:border-accent hover:text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
