"use client";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline" | "icon";
type Size    = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center font-mono tracking-wider " +
  "transition-[transform,filter,background,color,border-color] duration-fast ease-standard " +
  "focus-visible:outline-none focus-visible:shadow-ring " +
  "disabled:opacity-40 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast border border-accent " +
    "hover:brightness-110 hover:-translate-y-px " +
    "active:translate-y-0 active:brightness-95",
  outline:
    "bg-transparent text-ink border border-rule-strong " +
    "hover:border-accent hover:text-accent " +
    "active:translate-y-px",
  ghost:
    "bg-transparent text-muted border border-transparent " +
    "hover:text-ink hover:border-rule " +
    "active:translate-y-px",
  icon:
    "bg-transparent text-muted border border-transparent " +
    "hover:text-accent hover:border-rule " +
    "w-[38px] h-[38px] p-0",
};

const sizes: Record<Size, string> = {
  sm: "h-[32px] px-3 text-tiny gap-1.5",
  md: "h-[44px] px-[22px] py-[14px] text-body gap-2.5",
  lg: "h-[52px] px-7 text-bodyLg gap-3",
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };
export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", leadingIcon, trailingIcon, className, children, ...props },
  ref,
) {
  const cls = cn(base, variants[variant], variant !== "icon" && sizes[size], className);
  if ((props as ButtonAsAnchor).as === "a") {
    const { as: _as, ...rest } = props as ButtonAsAnchor;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...rest}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    );
  }
  const { as: _as, ...rest } = props as ButtonAsButton;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...rest}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
