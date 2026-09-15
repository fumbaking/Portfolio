/**
 * @component  Reveal
 * @spec       design.md § C-12 (Reveal), § 10 A-05
 * @tokens     —
 * @motion     M-02 reveal
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { reveal, revealDelayed, VIEWPORT_ONCE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();

  // A-05 — no transform, no variants, just the content.
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      variants={delay ? revealDelayed(delay) : reveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </m.div>
  );
}

/**
 * Section-level wrapper carrying M-01 sectionFlow. Children that use the `reveal`
 * variant inherit its stagger automatically.
 */
export function RevealGroup({ children, className }: Omit<RevealProps, "delay">) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </m.div>
  );
}
