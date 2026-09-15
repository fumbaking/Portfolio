/**
 * @file  hooks/useMagnetic.ts
 * @spec  design.md § 5 M-10 (magnetic), § C-09 (Button), § C-26 (BackToTop)
 * @note  Disabled on coarse pointers and under A-05 — returns zeroed motion values.
 */
"use client";

import { useCallback, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { MAGNET_RADIUS, MAGNET_SPRING } from "@/lib/motion";
import { useFinePointer } from "./useMediaQuery";

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, MAGNET_SPRING);
  const y = useSpring(rawY, MAGNET_SPRING);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      rawX.set(Math.max(-MAGNET_RADIUS, Math.min(MAGNET_RADIUS, dx * 0.3)));
      rawY.set(Math.max(-MAGNET_RADIUS, Math.min(MAGNET_RADIUS, dy * 0.3)));
    },
    [enabled, rawX, rawY],
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, style: { x, y }, onPointerMove, onPointerLeave, enabled };
}
