"use client";
import { useState } from "react";
import Link from "next/link";
import { Code2, Github as GithubIcon, Mail, Copy, Check } from "lucide-react";

const EMAIL = "vitor.montemor.ismael@gmail.com";

function EmailPopover() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Email"
        className="text-muted hover:text-accent transition-colors duration-fast focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <Mail size={14} />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />

          {/* box */}
          <div className="absolute bottom-7 right-0 z-40 border border-rule bg-panel shadow-lg w-max">
            <div className="px-3 py-2 border-b border-rule font-mono text-[10px] text-muted uppercase tracking-[0.12em]">
              email
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="font-mono text-[12px] text-ink select-all">{EMAIL}</span>
              <button
                onClick={copy}
                aria-label="Copiar email"
                className="flex-shrink-0 w-7 h-7 inline-flex items-center justify-center border border-rule text-muted hover:text-accent hover:border-accent transition-colors duration-fast focus:outline-none"
              >
                {copied ? <Check size={12} className="text-code-ok" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule px-8 py-8">
      <div className="max-w-content mx-auto flex flex-wrap gap-4 justify-between items-center font-mono text-[12px] text-muted">
        <div className="flex items-center gap-5">
          <span>© 2026 Vitor Montemor Ismael · construído com{" "}
            <span className="text-body">Next.js</span>
          </span>
          <Link
            href="/blog"
            className="text-muted hover:text-accent transition-colors duration-fast border-l border-rule pl-5"
          >
            notas técnicas →
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/vmismael/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-fast inline-flex items-center gap-1.5"
          >
            <Code2 size={12} /> ver fonte
          </a>
          <a
            href="https://github.com/vmismael"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-fast"
          >
            <GithubIcon size={14} />
          </a>
          <EmailPopover />
        </div>
      </div>
    </footer>
  );
}
