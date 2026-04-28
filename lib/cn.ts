/** Tiny `clsx`-style helper to avoid an extra dep. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
