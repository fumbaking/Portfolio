/**
 * @component  Preloader
 * @spec       design.md § C-01 (Preloader), § 10 A-05
 * @tokens     T-01.ink-950/copper-500/text-hi, T-09.grad-rule, T-07.z-preloader
 * @motion     M-03 trigger, preloader clip-path exit
 */
"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  preloader,
  PRELOADER_MAX_MS,
  PRELOADER_RULE_S,
  PRELOADER_LETTER_S,
  EASE_OUT,
  DUR,
} from "@/lib/motion";
import { profile } from "@/data/profile";

const SESSION_KEY = "preloaded";

export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(true);

  useEffect(() => {
    // A-05 — skipped entirely. Also once per session only.
    if (reduced) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    setDone(false);
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode — showing it again is harmless */
      }
    }, PRELOADER_MAX_MS);

    return () => clearTimeout(t);
  }, [reduced]);

  const letters = profile.name.split("");

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          variants={preloader}
          initial="visible"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-preloader flex flex-col items-center justify-center gap-8 bg-ink-950"
        >
          <span className="font-mono text-m-lg font-bold tracking-[0.4em] text-copper-500">
            {profile.monogram}
          </span>

          {/* A-02 — not a heading; the page's only <h1> belongs to the Hero. */}
          <p className="flex font-display text-d-2 text-text-hi" aria-label={profile.name}>
            {letters.map((ch, i) => (
              <m.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * PRELOADER_LETTER_S, duration: DUR.fast, ease: EASE_OUT }}
                aria-hidden="true"
              >
                {ch === " " ? " " : ch}
              </m.span>
            ))}
          </p>

          <m.span
            className="h-px w-40 origin-left bg-grad-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: PRELOADER_RULE_S, ease: EASE_OUT }}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}
