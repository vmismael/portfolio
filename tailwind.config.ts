import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./fx/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        "var(--bg)",
        "bg-alt":  "var(--bg-alt)",
        panel:     "var(--panel)",
        rule:      "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        "rule-dashed": "var(--rule-dashed)",
        ink:       "var(--ink)",
        "ink-hi":  "var(--ink-hi)",
        body:      "var(--body)",
        muted:     "var(--muted)",
        "muted-hi": "var(--muted-hi)",
        code:      "var(--code)",
        "code-str":  "var(--code-str)",
        "code-key":  "var(--code-key)",
        "code-type": "var(--code-type)",
        "code-ok":   "var(--code-ok)",
        accent:           "var(--accent)",
        "accent-soft":    "var(--accent-soft)",
        "accent-contrast": "var(--accent-contrast)",
      },
      fontFamily: {
        sans:  ["var(--font-sans)"],
        mono:  ["var(--font-mono)"],
        serif: ["var(--font-serif)"],
      },
      fontSize: {
        micro:   ["10px", { lineHeight: "1.4" }],
        tiny:    ["11px", { lineHeight: "1.4" }],
        small:   ["12px", { lineHeight: "1.55" }],
        body:    ["13px", { lineHeight: "1.55" }],
        bodyLg:  ["14px", { lineHeight: "1.65" }],
        h6:      ["16px", { lineHeight: "1.4" }],
        h5:      ["20px", { lineHeight: "1.35" }],
        h4:      ["24px", { lineHeight: "1.25" }],
        h3:      ["32px", { lineHeight: "1.15" }],
        h2:      ["40px", { lineHeight: "1.1" }],
        h1:      ["56px", { lineHeight: "1.05" }],
        display: ["clamp(40px,7vw,80px)", { lineHeight: "0.98" }],
      },
      letterSpacing: {
        tighter: "-0.035em",
        tight:   "-0.02em",
        wide:    "0.02em",
        wider:   "0.04em",
        widest:  "0.1em",
      },
      spacing: {
        "section": "var(--section-pad)",
        "gap":     "var(--content-gap)",
        "card":    "var(--card-pad)",
        "nav":     "var(--nav-height)",
      },
      maxWidth: {
        content: "var(--max-content)",
      },
      borderRadius: {
        none: "0",
        sm:   "2px",
        md:   "4px",
        lg:   "6px",
      },
      boxShadow: {
        ring:   "0 0 0 1px var(--accent)",
        ringHi: "0 0 0 2px var(--accent)",
        glow:   "0 0 24px rgba(184, 85, 46, 0.18)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms",
      },
      zIndex: {
        nav:    "50",
        raised: "10",
      },
      keyframes: {
        "status-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.45" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "fade-up":      "fade-up 500ms cubic-bezier(0.2, 0.6, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
