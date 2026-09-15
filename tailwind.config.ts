/**
 * @file    tailwind.config.ts
 * @spec    design.md § 3 (T-01…T-09), § 4 (L-03), § 13
 * @note    Maps the CSS custom properties declared in src/app/globals.css onto the
 *          Tailwind scale. Components must use these names, never raw values (R2).
 */

import type { Config } from "tailwindcss";

/** Binds a channel-triplet CSS var to Tailwind's alpha modifier (`bg-ink-800/80`). */
const withAlpha = (cssVar: string) => `rgb(var(${cssVar}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      /* ── T-01 Color ──────────────────────────────────────────────── */
      colors: {
        // `rgb(var(--x-c) / <alpha-value>)` is what makes `bg-ink-800/80` work.
        ink: {
          950: withAlpha("--ink-950-c"),
          900: withAlpha("--ink-900-c"),
          800: withAlpha("--ink-800-c"),
          700: withAlpha("--ink-700-c"),
          600: withAlpha("--ink-600-c"),
          500: withAlpha("--ink-500-c"),
        },
        line: withAlpha("--line-c"),
        copper: {
          700: withAlpha("--copper-700-c"),
          600: withAlpha("--copper-600-c"),
          500: withAlpha("--copper-500-c"),
          400: withAlpha("--copper-400-c"),
          300: withAlpha("--copper-300-c"),
          200: withAlpha("--copper-200-c"),
        },
        steel: {
          600: withAlpha("--steel-600-c"),
          500: withAlpha("--steel-500-c"),
          400: withAlpha("--steel-400-c"),
        },
        text: {
          hi: withAlpha("--text-hi-c"),
          mid: withAlpha("--text-mid-c"),
          low: withAlpha("--text-low-c"),
          faint: withAlpha("--text-faint-c"),
        },
        success: withAlpha("--success-c"),
        warning: withAlpha("--warning-c"),
        danger: withAlpha("--danger-c"),
        "a-copper": {
          "00": "var(--a-copper-00)",
          "04": "var(--a-copper-04)",
          10: "var(--a-copper-10)",
          20: "var(--a-copper-20)",
          35: "var(--a-copper-35)",
        },
        "a-steel-10": "var(--a-steel-10)",
        "a-white-06": "var(--a-white-06)",
      },

      /* ── T-09 Gradients ──────────────────────────────────────────── */
      backgroundImage: {
        "grad-accent": "var(--grad-accent)",
        "grad-card": "var(--grad-card)",
        "grad-proj-a": "var(--grad-proj-a)",
        "grad-proj-b": "var(--grad-proj-b)",
        "grad-proj-c": "var(--grad-proj-c)",
        "grad-text": "var(--grad-text)",
        "grad-rule": "var(--grad-rule)",
        "grad-veil": "var(--grad-veil)",
        "grad-veil-portrait": "var(--grad-veil-portrait)",
      },

      /* ── T-05 Elevation ──────────────────────────────────────────── */
      boxShadow: {
        "glow-copper-sm": "var(--glow-copper-sm)",
        "glow-copper-md": "var(--glow-copper-md)",
        "glow-copper-lg": "var(--glow-copper-lg)",
        card: "var(--shadow-card)",
        nav: "var(--shadow-nav)",
        hairline: "var(--inner-hairline)",
      },

      /* ── T-02 Typography ─────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "d-hero": ["clamp(3rem, 10vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "d-1": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "d-2": ["clamp(1.75rem, 3.2vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "d-3": ["clamp(1.25rem, 2vw, 1.6rem)", { lineHeight: "1.2" }],
        "b-lg": ["clamp(1rem, 1.3vw, 1.125rem)", { lineHeight: "1.7" }],
        "b-md": ["0.9375rem", { lineHeight: "1.75" }],
        "b-sm": ["0.875rem", { lineHeight: "1.6" }],
        "m-lg": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.25em" }],
        "m-md": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.3em" }],
        "m-sm": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.35em" }],
        numeral: ["clamp(4rem, 12vw, 9rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },

      /* ── T-04 Radius ─────────────────────────────────────────────── */
      borderRadius: {
        "r-xs": "4px",
        "r-sm": "8px",
        "r-md": "12px",
        "r-lg": "16px",
        "r-xl": "24px",
        "r-2xl": "32px",
      },

      /* ── T-07 Z-index ────────────────────────────────────────────── */
      zIndex: {
        base: "0",
        raised: "10",
        rails: "20",
        nav: "50",
        menu: "60",
        toast: "70",
        cursor: "90",
        preloader: "100",
      },

      /* ── T-06 Motion (CSS side; Framer side lives in lib/motion.ts) ─ */
      transitionDuration: {
        instant: "150ms",
        fast: "250ms",
        base: "400ms",
        slow: "800ms",
        slower: "900ms",
        flip: "700ms",
      },
      transitionTimingFunction: {
        "ease-out-spec": "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-in-out-spec": "cubic-bezier(0.65, 0, 0.35, 1)",
      },

      /* ── T-08 / L-02 Layout ──────────────────────────────────────── */
      maxWidth: { content: "1280px" },
      spacing: { section: "clamp(5rem, 12vh, 9rem)" },

      /* ── C-08 caret, C-22 availability ping ──────────────────────── */
      keyframes: {
        caret: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        ping: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        caret: "caret 1s step-end infinite",
        ping: "ping 2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
