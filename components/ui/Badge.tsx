import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "ok" | "warn" | "accent";

const tones: Record<Tone, string> = {
  neutral: "text-muted border-rule",
  ok:      "text-code-ok border-rule",
  warn:    "text-code-str border-rule",
  accent:  "text-accent border-accent/40",
};

export function Badge({
  tone = "neutral", className, children, ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5",
        "border font-mono text-tiny tracking-wider uppercase",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/** Status pill with pulsing dot — used in Hero and section headers. */
export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <Badge tone="ok" className={cn("normal-case tracking-wider", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-code-ok status-pulse" />
      <span className="text-code-ok">{status}</span>
    </Badge>
  );
}
