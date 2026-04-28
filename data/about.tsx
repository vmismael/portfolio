import { Stethoscope, Briefcase, Code2, TrendingUp, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type AboutBlock = { eyebrow: string; body: ReactNode };

export const ABOUT_BLOCKS: AboutBlock[] = [
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
        2027. Foco em Python, análise de dados e automação aplicados a
        contextos de saúde e finanças. Sou <em>founder</em> do{" "}
        <strong>Labsync</strong> — solução para gestão de insumos
        laboratoriais para a <strong>DASA</strong>, com app, dashboard e IA
        preditiva, que ajudei a construir. 4º lugar entre mais de 100
        projetos no FIAP Next 2025. Procuro vagas júnior, trainee ou estágio
        em healthtech, fintech ou empresas com forte componente operacional.
      </>
    ),
  },
];

export type TimelineEntry = {
  period: string;
  Icon: LucideIcon;
  title: string;
  body: string;
};

export const TIMELINE: TimelineEntry[] = [
  { period: "2019–22", Icon: Stethoscope, title: "Medicina (trancada)",      body: "UNINOVE + Cats Academy (Boston). Linguagem do setor saúde." },
  { period: "2022–23", Icon: TrendingUp,  title: "Administração (trancada)", body: "IBMEC + francês em Paris. Gestão financeira, controle, KPIs." },
  { period: "2024–27", Icon: Code2,       title: "Eng. Software · FIAP",     body: "Python, dados, automação. Onde tudo se cruza." },
  { period: "2025",    Icon: Sparkles,    title: "Labsync · FIAP Next",      body: "4º lugar entre 100+ projetos. Founder. Solução para a DASA." },
  { period: "2025",    Icon: Briefcase,   title: "Lab. Paulista",            body: "Auxiliar administrativo: caixa, conferências, automação." },
];
