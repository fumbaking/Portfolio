/**
 * @file  config/theme.ts
 * @spec  design.md § 3 T-02 (optional masculine display variant), § 11 P-01
 */

/**
 * Display typeface. "cormorant" is the replica default (matches the source site).
 * "fraunces" is the documented masculine alternative — heavier, squarer serif.
 * Changing this is the ONLY sanctioned typography deviation (design.md § T-02).
 */
export const FONT_DISPLAY: "cormorant" | "fraunces" = "cormorant";

/**
 * Browser-chrome theme colour. Mirrors T-01.ink-900 (--ink-900).
 * Lives here, not in layout.tsx, because a <meta> value cannot be a CSS var —
 * this keeps R2 intact by giving the literal exactly one home. Keep in sync with globals.css.
 */
export const THEME_COLOR = "#080B11";

/** C-03 particle counts, per design.md § C-03 and the P-01 CPU budget. */
export const STARFIELD = {
  countDesktop: 90,
  countMobile: 60,
  opacity: 0.55,
  parallax: -0.02,
} as const;

/** C-16 default marquee speed (matches the source site's 45%). */
export const MARQUEE_DEFAULT_SPEED = 45;

/** C-04 scroll threshold for the `scrolled` state. */
export const NAV_SCROLL_THRESHOLD = 40;

/** C-04 IntersectionObserver window for active-section detection. */
export const ACTIVE_SECTION_ROOT_MARGIN = "-45% 0px -55% 0px";

/** C-26 reveal threshold, as a fraction of viewport height. */
export const BACK_TO_TOP_AT = 0.6;
