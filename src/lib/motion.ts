/**
 * @file       lib/motion.ts
 * @spec       design.md § 5 (Motion system M-01…M-10), § 3 T-06
 * @motion     M-01…M-10 — the ONLY place durations and easings may be declared (agent.md rule 5)
 */

import type { SpringOptions, Transition, Variants } from "motion/react";

/* ── T-06 primitives ──────────────────────────────────────────────────── */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** For variants and `transition` props. */
export const SPRING: Transition = { type: "spring", stiffness: 260, damping: 26 };

/** Same curve, shaped for `useSpring()` (which takes SpringOptions, not Transition). */
export const SPRING_OPTIONS: SpringOptions = { stiffness: 260, damping: 26 };

export const DUR = {
  instant: 0.15,
  fast: 0.25,
  base: 0.4,
  slow: 0.8,
  slower: 0.9,
  flip: 0.7,
} as const;

export const STAGGER = 0.08;

/* ── M-01 sectionFlow — replaces the source's .section-flow class ─────── */

export const sectionFlow: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slower, ease: EASE_OUT, staggerChildren: STAGGER },
  },
};

/** Standard viewport config for M-01 / M-02 (design.md § 5). */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/* ── M-02 reveal — replaces the source's .reveal class ────────────────── */

export const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

/** Delay helper for one-off reveals; keeps components free of inline transitions. */
export const revealDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT, delay } },
});

/* ── M-03 heroEnter — orchestrated after the preloader (C-01) exits ───── */

export const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

/** Stack order from design.md § S-01: eyebrow → h1 → typewriter → copy → buttons → cue. */
export const HERO_DELAY = {
  eyebrow: 0,
  typewriter: 0.5,
  paragraph: 0.6,
  buttons: 0.75,
  scrollCue: 0.9,
} as const;

/* ── M-04 cardLift ────────────────────────────────────────────────────── */

export const cardLift = {
  whileHover: { y: -6 },
  transition: { duration: DUR.base, ease: EASE_OUT },
} as const;

/**
 * C-19 enter/exit for the S-03 filter (§15.10). Replaces `layout` + `mode="popLayout"`,
 * which both need layout projection and so are unavailable under `domAnimation`.
 */
export const projectCard: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

/* ── M-05 flip (C-19) ─────────────────────────────────────────────────── */

export const flip: Variants = {
  front: { rotateY: 0, transition: { duration: DUR.flip, ease: EASE_IN_OUT } },
  back: { rotateY: 180, transition: { duration: DUR.flip, ease: EASE_IN_OUT } },
};

/** A-05 fallback: reduced motion turns the flip into a crossfade. */
export const flipReduced: Variants = {
  front: { opacity: 1, transition: { duration: DUR.fast } },
  back: { opacity: 1, transition: { duration: DUR.fast } },
};

export const PERSPECTIVE = 1400;

/* ── M-06 marquee (C-17), speed driven by C-16 ────────────────────────── */

/** slider 0–100 → 40s…10s (design.md § M-06). */
export const marqueeDuration = (speed: number): number =>
  Math.max(10, 40 - speed * 0.3);

export const marqueeAnimate = (reverse: boolean, speed: number) => ({
  x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
  transition: {
    duration: marqueeDuration(speed),
    ease: "linear" as const,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
});

/* ── M-07 menuOverlay (C-05) ──────────────────────────────────────────── */

export const menuOverlay: Variants = {
  closed: {
    clipPath: "circle(0% at 100% 0%)",
    transition: { duration: DUR.base, ease: EASE_IN_OUT },
  },
  open: {
    clipPath: "circle(150% at 100% 0%)",
    transition: { duration: DUR.base, ease: EASE_IN_OUT, staggerChildren: 0.06 },
  },
};

export const menuLink: Variants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

/* ── M-08 toast (C-24) ────────────────────────────────────────────────── */

export const toast: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

export const TOAST_TTL_MS = 4000;

/* ── M-09 scrollProgress (C-06) ───────────────────────────────────────── */

export const SCROLL_SPRING: SpringOptions = { stiffness: 120, damping: 30, restDelta: 0.001 };

/* ── M-10 magnetic (C-09, C-26) ───────────────────────────────────────── */

export const MAGNET_RADIUS = 8;
export const MAGNET_SPRING: SpringOptions = SPRING_OPTIONS;

/* ── C-01 preloader exit ──────────────────────────────────────────────── */

export const preloader: Variants = {
  visible: { clipPath: "inset(0 0 0% 0)" },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const PRELOADER_MAX_MS = 2000;
/** C-01 progress rule sweep, in seconds. */
export const PRELOADER_RULE_S = 1.2;
/** C-01 per-letter stagger, in seconds. */
export const PRELOADER_LETTER_S = 0.05;

/** C-10 scroll-cue segment sweep, in seconds. */
export const SCROLL_CUE_S = 2;
