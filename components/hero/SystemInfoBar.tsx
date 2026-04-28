/**
 * Horizontal system_info bar shown below the Hero buttons.
 * Glassmorphic — backdrop-blur lets the WireframeSphere bleed through.
 */
const ITEMS = [
  ["loc",    "São Paulo · BR"],
  ["edu",    "FIAP · Eng. Software · 2027"],
  ["bg",     "Lab. clínico · admin"],
  ["lang",   "PT · EN(C1) · ES(B2)"],
  ["stack",  "Python · TS · React · SQL"],
  ["domain", "healthtech · fintech"],
] as const;

export function SystemInfoBar() {
  return (
    <div
      className={[
        "mt-9 px-5 py-3.5",
        "border border-rule",
        "bg-bg/70 backdrop-blur-md",
        "font-mono text-small text-body",
        "flex flex-wrap items-center gap-x-[18px] gap-y-2",
      ].join(" ")}
    >
      <span className="text-muted text-micro uppercase tracking-widest border-r border-rule pr-4">
        system_info
      </span>

      {ITEMS.map(([k, v], i) => (
        <span key={k} className="inline-flex items-baseline gap-1.5">
          <span className="text-muted">{k}:</span>
          <span className="text-body">{v}</span>
          {i < ITEMS.length - 1 && (
            <span className="text-rule-strong ml-3">|</span>
          )}
        </span>
      ))}

      <span className="ml-auto inline-flex items-center gap-1.5 text-micro text-code-ok border-l border-rule pl-4">
        <span className="w-1.5 h-1.5 rounded-full bg-code-ok status-pulse" />
        uptime: 2y · build OK
      </span>
    </div>
  );
}
