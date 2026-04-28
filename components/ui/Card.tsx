import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "panel" | "outline";
  interactive?: boolean;  // adds hover ring
  children: ReactNode;
};

export function Card({ variant = "default", interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "border border-rule p-card",
        variant === "default" && "bg-bg",
        variant === "panel"   && "bg-panel",
        variant === "outline" && "bg-transparent",
        interactive && "transition-colors duration-fast ease-standard hover:border-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-rule pb-3 mb-4",
        "font-mono text-micro uppercase tracking-widest text-muted",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardRow({
  label, value, dashed = true, className, ...rest
}: HTMLAttributes<HTMLDivElement> & { label: string; value: ReactNode; dashed?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[70px_1fr] gap-4 py-2.5 leading-normal font-mono text-small",
        dashed ? "border-b border-dashed border-rule-dashed" : "border-b border-rule",
        "last:border-0",
        className,
      )}
      {...rest}
    >
      <span className="text-muted">{label}</span>
      <span className="text-body">{value}</span>
    </div>
  );
}
