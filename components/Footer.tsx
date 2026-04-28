"use client";
import { Code2, Github as GithubIcon, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-rule px-8 py-8">
      <div className="max-w-content mx-auto flex flex-wrap gap-4 justify-between items-center font-mono text-[12px] text-muted">
        <div>
          © 2026 Vitor Montemor Ismael · construído com{" "}
          <span className="text-body">Next.js</span>
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
          <a href="https://github.com/vmismael" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors duration-fast">
            <GithubIcon size={14} />
          </a>
          <a href="mailto:vitor.montemor.ismael@gmail.com" className="text-muted hover:text-accent transition-colors duration-fast">
            <Mail size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
