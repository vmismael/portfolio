"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import type { AccentName } from "@/tokens/tokens";

const NAV = [
  { href: "#sobre",       label: "01_sobre",      id: "sobre" },
  { href: "#habilidades", label: "02_habilidades", id: "habilidades" },
  { href: "#projetos",    label: "03_projetos",    id: "projetos" },
  { href: "#contato",     label: "04_contato",     id: "contato" },
];

const SECTION_IDS = ["hero", "sobre", "habilidades", "projetos", "contato"];

const ACCENTS: { name: AccentName; color: string; conic?: boolean }[] = [
  { name: "terracotta", color: "#B8552E" },
  { name: "amber",      color: "#B8862E" },
  { name: "teal",       color: "#3D6E84" },
  { name: "wave",       color: "conic-gradient(from 0deg, #f87171, #fb923c, #facc15, #4ade80, #38bdf8, #818cf8, #e879f9, #f87171)", conic: true },
];

export function TopNav() {
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-nav h-nav",
        "border-b border-rule bg-bg/80 backdrop-blur-md",
        "font-mono text-tiny tracking-wider",
      )}
    >
      <nav className="max-w-content mx-auto h-full px-5 md:px-8 flex items-center justify-between">
        <Link href={isHome ? "#hero" : "/"} className="text-ink font-semibold">VMI</Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={isHome ? n.href : `/${n.href}`}
              className={cn(
                "transition-colors duration-fast",
                isHome && activeId === n.id
                  ? "text-accent"
                  : "text-muted hover:text-accent",
              )}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Accent picker — desktop only */}
          <div className="hidden md:flex items-center gap-2 mr-1">
            {ACCENTS.map(a => (
              <button
                key={a.name}
                onClick={() => setAccent(a.name)}
                aria-label={`Accent ${a.name}`}
                className="w-3 h-3 rounded-full transition-all duration-fast hover:scale-110"
                style={{
                  background: a.color,
                  boxShadow: accent === a.name
                    ? a.conic
                      ? "0 0 0 1.5px var(--bg), 0 0 0 3px #b87be0"
                      : `0 0 0 1.5px var(--bg), 0 0 0 3px ${a.color}`
                    : "none",
                  opacity: accent === a.name ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
              "w-9 h-9 inline-flex items-center justify-center",
              "border border-transparent text-muted",
              "hover:text-accent hover:border-rule",
              "transition-colors duration-fast",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-accent",
            )}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 inline-flex items-center justify-center text-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — animated */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
            className="md:hidden border-t border-rule bg-bg overflow-hidden"
          >
            <ul className="px-5 py-4 flex flex-col gap-3">
              {NAV.map(n => (
                <li key={n.href}>
                  <Link
                    href={isHome ? n.href : `/${n.href}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-1 transition-colors duration-fast",
                      isHome && activeId === n.id
                        ? "text-accent"
                        : "text-muted hover:text-accent",
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
