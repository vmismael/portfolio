"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowDown, Github as GithubIcon, Linkedin, Mail, Copy, Check } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/Badge";
import { InteractiveGrid } from "@/fx/InteractiveGrid";
import { WireframeSphere } from "@/fx/WireframeSphere";
import { SystemInfoBar } from "@/components/hero/SystemInfoBar";

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
      <Button as="button" variant="icon" onClick={() => setOpen(o => !o)} aria-label="Email">
        <Mail size={15} />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-40 border border-rule bg-panel shadow-lg w-max">
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

/**
 * Hero — Direção B (técnico estruturado).
 *
 * Layout:
 *   ┌─────────────────────────────────────────────┐
 *   │ [grid lit-up bg]            [3D sphere bg]  │
 *   │                                             │
 *   │ $ profile/print --self                      │
 *   │ [● STATUS = "open_to_junior"]               │
 *   │                                             │
 *   │ Vitor Montemor                              │
 *   │ Ismael_                                     │
 *   │                                             │
 *   │ [ type Role = … inline-block code box ]     │
 *   │                                             │
 *   │ [./ver_projetos →] [GH] [LI] [mail]         │
 *   │                                             │
 *   │ [system_info | loc · edu · bg · lang …]     │
 *   └─────────────────────────────────────────────┘
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      data-screen-label="01 Hero"
    >
      {/* Layer 0: interactive grid */}
      <InteractiveGrid />

      {/* Layer 0b: 3D sphere — right half, decorative */}
      <div
        aria-hidden
        className="absolute right-[-140px] top-1/2 -translate-y-1/2 hidden md:block z-0 opacity-90"
      >
        <WireframeSphere size={780} />
      </div>

      {/* Layer 1: content */}
      <div className="relative z-raised max-w-content mx-auto pl-20 pr-8 pt-[100px] pb-section">
        <div className="max-w-[720px]">
          <FadeUp>
            <div className="font-mono text-body text-muted mb-6 tracking-wide">
              <span className="text-accent-soft">$</span> profile/print --self
              <span
                aria-hidden
                className="caret inline-block w-2 h-3.5 bg-accent ml-1 align-middle"
              />
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <StatusPill status='STATUS = "open_to_junior"' className="mb-8" />
          </FadeUp>

          <FadeUp delay={160}>
            <h1 className="font-sans font-semibold text-ink leading-[0.98] tracking-tighter text-display m-0 text-balance">
              Vitor Montemor<br />Ismael<span className="text-accent">_</span>
            </h1>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="mt-7 px-5 py-4 border border-rule bg-panel font-mono text-body leading-normal block max-w-[460px]">
              <div className="text-muted">
                <span className="text-accent-soft">type</span>{" "}
                <span className="text-code-type">Role</span> ={" "}
              </div>
              {[
                "Software Engineering",
                "Business Administration",
                "Healthcare Operations",
              ].map(s => (
                <div key={s} className="pl-4 text-body">
                  <span className="text-muted">|</span>{" "}
                  <span className="text-code-str">&quot;{s}&quot;</span>
                </div>
              ))}
              <div className="mt-2 text-muted">
                <span className="text-accent-soft">const</span>{" "}
                <span className="text-body">focus</span> ={" "}
                <span className="text-code-str">&quot;intersection&quot;</span>;
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            <div className="flex flex-wrap items-center gap-3 mt-9">
              <Button as="a" href="#projetos" trailingIcon={<ArrowDown size={13} />}>
                ./ver_projetos
              </Button>
              <div className="flex gap-1 ml-1">
                <Link href="https://github.com/vmismael" aria-label="GitHub">
                  <Button as="button" variant="icon"><GithubIcon size={15} /></Button>
                </Link>
                <Link href="https://linkedin.com/in/vitormontemorismael/" aria-label="LinkedIn">
                  <Button as="button" variant="icon"><Linkedin size={15} /></Button>
                </Link>
                <EmailPopover />
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={400}>
            <SystemInfoBar />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
