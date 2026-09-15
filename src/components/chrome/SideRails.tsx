/**
 * @component  SideRails
 * @spec       design.md § C-06 (Side Rails), § 10 A-06
 * @tokens     T-01.line/copper-500/text-faint, T-02.m-sm, T-07.z-rails
 * @motion     M-09 scrollProgress
 */
"use client";

import { m } from "motion/react";
import { useScrollPercent, useScrollProgress } from "@/hooks/useScrollProgress";

export function SideRails() {
  const progress = useScrollProgress();
  const percent = useScrollPercent();

  return (
    <div aria-hidden="true" className="pointer-events-none hidden lg:block">
      {/* Left rail */}
      <div className="fixed bottom-0 left-6 z-rails flex flex-col items-center gap-6 xl:left-10">
        <span className="writing-vertical rotate-180 font-mono text-m-sm uppercase text-text-faint">
          Portfolio · 2026
        </span>
        <span className="h-20 w-px bg-line" />
      </div>

      {/* Right rail — scroll progress */}
      <div className="fixed bottom-0 right-6 z-rails flex flex-col items-center gap-4 xl:right-10">
        <div className="relative h-[120px] w-px overflow-hidden bg-line">
          <m.span
            className="absolute inset-x-0 top-0 block h-full origin-top bg-copper-500"
            style={{ scaleY: progress }}
          />
        </div>
        <span className="font-mono text-m-sm text-text-faint">
          {String(percent).padStart(2, "0")}
        </span>
        <span className="h-16 w-px bg-line" />
      </div>
    </div>
  );
}
