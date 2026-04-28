export type ThumbKey = "ledger" | "grid" | "dots";

export type Project = {
  id: string;
  featured?: boolean;
  placeholder?: boolean;
  title: string;
  subtitle: string;
  description: string;
  stack: readonly string[];
  github: string | null;
  badge: string | null;
  thumb: ThumbKey;
};

export const PROJECTS: Project[] = [
  {
    id: "labsync",
    featured: true,
    title: "Labsync",
    subtitle: "4º lugar · FIAP Next 2025 · +100 projetos",
    description: "Solução para gestão de insumos laboratoriais desenvolvida para a DASA. Aplicativo de controle e retirada de insumos, dashboard completo para tomada de decisão e IA preditiva de consumo e demanda. Mitigação de riscos logísticos e redução de situações emergenciais em operações de laboratório.",
    stack: ["Founder", "IA preditiva", "Dashboard", "Mobile App", "Gestão de insumos"],
    github: "https://github.com/vmismael",
    badge: "case study",
    thumb: "ledger",
  },
  {
    id: "portfolio",
    title: "Portfólio Pessoal",
    subtitle: "Esta página · v.2026",
    description: "Aplicação Next.js com App Router, tema claro/escuro, animações Framer Motion e estética técnica-editorial. Tipografia Geist.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/vmismael/portfolio",
    badge: null,
    thumb: "grid",
  },
  {
    id: "placeholder-3",
    placeholder: true,
    title: "Próximo projeto",
    subtitle: "em construção",
    description: "Espaço reservado para o próximo case — em breve um experimento com agentes autônomos / análise de dados em saúde.",
    stack: ["Python", "LLM", "data"],
    github: null,
    badge: null,
    thumb: "dots",
  },
];
