/**
 * @file  hooks/useScrollProgress.ts
 * @spec  design.md § 5 M-09 (scrollProgress), § C-06 (SideRails), § C-26 (BackToTop)
 */
"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, type MotionValue } from "motion/react";
import { SCROLL_SPRING } from "@/lib/motion";

/** M-09 — smoothed 0…1 progress for the right rail's scaleY. */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, SCROLL_SPRING);
}

/** Plain percentage for the rail's numeric label (C-06). */
export function useScrollPercent(): number {
  const progress = useScrollProgress();
  const [percent, setPercent] = useState(0);

  useEffect(() => progress.on("change", (v) => setPercent(Math.round(v * 100))), [progress]);

  return percent;
}

/** C-26 — true once the page is scrolled past `threshold` of viewport height. */
export function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}
