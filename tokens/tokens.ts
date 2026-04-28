/**
 * Design tokens — single source of truth.
 * Imported by `tailwind.config.ts` and (optionally) consumed at runtime
 * for the theme toggle / accent picker. Mirrors `globals.css` CSS vars.
 *
 * Direção: B — Técnico Estruturado
 * Paleta: petróleo / off-white / terracota
 */

export const palette = {
  light: {
    bg:         "#FAFAF7",
    bgAlt:      "#F2F1EC",
    panel:      "#FFFFFF",
    rule:       "#E6E4DC",
    ruleStrong: "#C9C5B5",
    ruleDashed: "#D6D3C7",
    ink:        "#0F2940",
    inkHi:      "#1B3A52",
    body:       "#2E343C",
    muted:      "#6B7079",
    mutedHi:    "#4A4F58",
    code:       "#0F2940",
    codeStr:    "#9C5A2A",
    codeKey:    "#3D6E84",
    codeType:   "#1F5566",
    codeOk:     "#5C7A4B",
  },
  dark: {
    bg:         "#0A0F14",
    bgAlt:      "#0F1620",
    panel:      "#0D131A",
    rule:       "#1C2630",
    ruleStrong: "#293646",
    ruleDashed: "#1F2A36",
    ink:        "#F0F2F4",
    inkHi:      "#FFFFFF",
    body:       "#B8C0CC",
    muted:      "#6F7784",
    mutedHi:    "#90989F",
    code:       "#E2E6EC",
    codeStr:    "#D7B475",
    codeKey:    "#7FB8C9",
    codeType:   "#9FC9D6",
    codeOk:     "#88B074",
  },
} as const;

export const accents = {
  terracotta: { c: "#B8552E", soft: "#D88864", contrast: "#FFF8F2" },
  amber:      { c: "#B8862E", soft: "#D8A864", contrast: "#FFF8E8" },
  teal:       { c: "#1B3A52", soft: "#3D6E84", contrast: "#FAFAF7" },
  wave:       { c: "#B8552E", soft: "#D88864", contrast: "#FFFFFF" }, // JS overrides via inline style
} as const;

export type AccentName = keyof typeof accents;
export type ThemeName  = keyof typeof palette;

export const fonts = {
  sans:  "'Geist', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
  mono:  "'Geist Mono', ui-monospace, 'JetBrains Mono', Menlo, monospace",
  serif: "'Newsreader', 'Iowan Old Style', Georgia, serif",
} as const;

/** Type ramp (px). Pair `mono` with status/labels, `sans` with body & headings. */
export const fontSize = {
  // labels & micro
  micro:   "10px",  // status bar text
  tiny:    "11px",  // status pill
  small:   "12px",  // captions, system_info values
  body:    "13px",  // mono body, btn label
  bodyLg:  "14px",  // sans body
  // titles
  h6:      "16px",
  h5:      "20px",
  h4:      "24px",
  h3:      "32px",
  h2:      "40px",
  h1:      "56px",  // section heads
  display: "clamp(40px, 7vw, 80px)",  // hero name
} as const;

export const lineHeight = {
  tight:    "0.98",
  snug:     "1.2",
  normal:   "1.55",
  relaxed:  "1.65",
  loose:    "1.75",
} as const;

export const letterSpacing = {
  tighter: "-0.035em",
  tight:   "-0.02em",
  normal:  "0",
  wide:    "0.02em",
  wider:   "0.04em",
  widest:  "0.1em",
} as const;

/** Spacing scale — 4-px base. Use these in padding/margin/gap. */
export const space = {
  0:   "0",
  1:   "4px",
  2:   "8px",
  3:   "12px",
  4:   "16px",
  5:   "20px",
  6:   "24px",
  8:   "32px",
  10:  "40px",
  12:  "48px",
  14:  "56px",
  16:  "64px",
  20:  "80px",
  24:  "96px",
  32:  "128px",
} as const;

/** Three vertical-rhythm density presets — surfaces map onto the design's tweak panel. */
export const density = {
  compact:     { sectionPad: "64px",  contentGap: "32px", cardPad: "18px", lineHeight: "1.55" },
  comfortable: { sectionPad: "96px",  contentGap: "48px", cardPad: "24px", lineHeight: "1.65" },
  airy:        { sectionPad: "128px", contentGap: "64px", cardPad: "32px", lineHeight: "1.75" },
} as const;

/**
 * Border-radius scale — Direção B is intentionally squared.
 * Almost everything uses `0`. Only pills/avatars use `full`.
 */
export const radius = {
  none: "0",
  sm:   "2px",
  md:   "4px",
  lg:   "6px",
  full: "9999px",
} as const;

/** Border styles — most lines are 1px solid `--rule`. Dashed used for inner separators. */
export const borders = {
  width: { hairline: "1px", thick: "2px" },
  style: { solid: "solid", dashed: "dashed" },
} as const;

/**
 * Shadow tokens. Direção B uses NO drop shadows by default — depth comes
 * from rules and layered backgrounds. Hover/focus may use a thin ring instead.
 */
export const shadow = {
  none:   "none",
  ring:   "0 0 0 1px var(--accent)",
  ringHi: "0 0 0 2px var(--accent)",
  glow:   "0 0 24px rgba(184, 85, 46, 0.18)", // accent glow @ 18% — only for active states
} as const;

/** Animation tokens — all in cubic-bezier(0.2, 0.6, 0.2, 1) (technical, snappy). */
export const motion = {
  duration: {
    instant: "0ms",
    fast:    "150ms",
    base:    "300ms",
    slow:    "500ms",
    slower:  "800ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0.6, 0.2, 1)",
    enter:    "cubic-bezier(0, 0, 0.2, 1)",
    exit:     "cubic-bezier(0.4, 0, 1, 1)",
  },
  fadeUp: {
    distance: "14px",
    duration: "500ms",
    stagger:  "80ms",
  },
} as const;

/** Z-index scale. */
export const z = {
  base:    0,
  raised:  1,
  sticky:  10,
  overlay: 20,
  nav:     50,
  modal:   100,
  toast:   200,
} as const;

/** Layout */
export const layout = {
  maxContent: "1280px",
  navHeight:  "56px",
  hpadDesktop: "32px",
  hpadMobile:  "20px",
} as const;

export type Tokens = {
  palette: typeof palette;
  accents: typeof accents;
  fonts: typeof fonts;
  fontSize: typeof fontSize;
  space: typeof space;
  radius: typeof radius;
  motion: typeof motion;
};
