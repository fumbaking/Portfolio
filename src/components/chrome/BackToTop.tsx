/**
 * @component  BackToTop
 * @spec       design.md § C-26 (Back-to-Top FAB), § 10 A-03/A-04
 * @tokens     T-09.grad-accent, T-05.glow-copper-sm, T-01.ink-950, T-07.z-raised
 * @motion     AnimatePresence fade/scale, M-10 magnetic
 */
"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { BACK_TO_TOP_AT } from "@/config/theme";
import { useScrolledPast } from "@/hooks/useScrollProgress";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Icon } from "@/components/ui/Icon";

export function BackToTop() {
  const visible = useScrolledPast(BACK_TO_TOP_AT);
  const magnet = useMagnetic<HTMLButtonElement>();
  const reduced = useReducedMotion();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          ref={magnet.ref}
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={magnet.enabled ? magnet.style : undefined}
          onPointerMove={magnet.onPointerMove}
          onPointerLeave={magnet.onPointerLeave}
          className="fixed bottom-6 right-6 z-raised flex h-12 w-12 items-center justify-center rounded-r-full bg-grad-accent text-ink-950 shadow-glow-copper-sm"
        >
          <Icon name="arrowUp" size={18} />
        </m.button>
      )}
    </AnimatePresence>
  );
}
