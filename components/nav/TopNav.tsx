"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#sobre",       label: "01_sobre" },
  { href: "#habilidades", label: "02_habilidades" },
  { href: "#projetos",    label: "03_projetos" },
  { href: "#contato",     label: "04_contato" },
];

export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-nav h-nav",
        "border-b border-rule bg-bg/80 backdrop-blur-md",
        "font-mono text-tiny tracking-wider",
      )}
    >
      <nav className="max-w-content mx-auto h-full px-5 md:px-8 flex items-center justify-between">
        <Link href="#hero" className="text-ink font-semibold">VMI</Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className="text-muted hover:text-accent transition-colors duration-fast"
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
              "w-9 h-9 inline-flex items-center justify-center",
              "border border-transparent text-muted",
              "hover:text-accent hover:border-rule",
              "transition-colors duration-fast",
            )}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 inline-flex items-center justify-center text-muted"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-rule bg-bg">
          <ul className="px-5 py-4 flex flex-col gap-3">
            {NAV.map(n => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-accent block py-1"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
