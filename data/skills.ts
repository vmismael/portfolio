import { Code2, Package, Wrench, BarChart2, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillGroup = { label: string; Icon: LucideIcon; items: string[] };

export const TECH_GROUPS: SkillGroup[] = [
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

export const BIZ_GROUPS: SkillGroup[] = [
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

export const LANGS = [
  ["Português", "Nativo"],
  ["Inglês",    "C1"],
  ["Espanhol",  "B2"],
  ["Francês",   "B1"],
] as const;
