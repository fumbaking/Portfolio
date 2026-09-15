/**
 * @component  ScrollCue
 * @spec       design.md § C-10 (Scroll Cue), § S-01
 * @tokens     T-01.line/copper-500/text-faint, T-02.m-sm
 * @motion     segment loops y -100% → 100% (2s linear)
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import { SCROLL_CUE_S } from "@/lib/motion";

export function ScrollCue() {
  const reduced = useReducedMotion();

  return (
    <a
      href="#about"
      className="group flex flex-col items-center gap-3 rounded-r-sm"
      aria-label="Scroll to About"
    >
      <span className="font-mono text-m-sm uppercase text-text-faint">Scroll</span>
      <span className="relative block h-12 w-px overflow-hidden bg-line">
        <m.span
          className="absolute inset-x-0 block h-1/2 bg-copper-500"
          initial={{ y: "-100%" }}
          animate={reduced ? { y: "0%" } : { y: ["-100%", "100%"] }}
          transition={
            reduced ? undefined : { duration: SCROLL_CUE_S, ease: "linear", repeat: Infinity }
          }
        />
      </span>
    </a>
  );
}
