export type ThumbKey = "ledger" | "grid" | "dots" | "helix" | "toolkit";

export type Project = {
  id: string;
  featured?: boolean;
  placeholder?: boolean;
  title: string;
  subtitle: string;
  description: string;
  stack: readonly string[];
  github: string | null;
  live: string | null;
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
    live: null,
    badge: "case study",
    thumb: "ledger",
  },
  {
    id: "lab-paulista",
    title: "Laboratório Paulista",
    subtitle: "Site institucional · Rio Claro · SG",
    description: "Site institucional do Laboratório Paulista de Análises Clínicas. Sete rotas com busca em tempo real em ~650 exames, animação de hélice de DNA em Canvas, e páginas de qualidade (ONA III), compliance e unidades. Next.js 14 App Router, sem dependência de animação externa.",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "Canvas"],
    github: "https://github.com/vmismael/Site-teste-Labpaulista",
    live: "https://www.labpaulistarc.com.br",
    badge: null,
    thumb: "helix",
  },
  {
    id: "in1",
    title: "ALLIN1",
    subtitle: "in1.services · SaaS de ferramentas",
    description: "SaaS gratuito que reúne dezenas de ferramentas utilitárias (PDF, imagem, vídeo, texto, web) rápidas e otimizadas para SEO. Processamento client-first — a maioria roda inteiramente no navegador, sem upload. Engine config-driven: cada ferramenta nasce de um registry, com metadata, sitemap e JSON-LD gerados automaticamente.",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Supabase", "SEO"],
    github: null,
    live: "https://in1.services",
    badge: null,
    thumb: "toolkit",
  },
  {
    id: "portfolio",
    title: "Portfólio Pessoal",
    subtitle: "Esta página · v.2026",
    description: "Aplicação Next.js com App Router, tema claro/escuro, animações Framer Motion e estética técnica-editorial. Tipografia Geist.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/vmismael/portfolio",
    live: null,
    badge: null,
    thumb: "grid",
  },
];
