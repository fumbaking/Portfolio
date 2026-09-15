/**
 * @component  MotionProvider
 * @spec       design.md § C-00 (Motion Provider), § 10 A-05, § 11 P-01, § 15.10
 * @tokens     —
 * @motion     Root MotionConfig + LazyMotion for M-01…M-10
 */
"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, DUR } from "@/lib/motion";

/**
 * P-01 (§15.10): `domAnimation` ships animations, variants, exit and hover/tap gestures but
 * NOT layout projection — which is exactly why C-04 and C-18 no longer use `layoutId`.
 * `strict` makes any stray `motion.*` throw, so components must import `m` and the
 * ~44 kB saving cannot regress unnoticed.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: DUR.base, ease: EASE_OUT }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
