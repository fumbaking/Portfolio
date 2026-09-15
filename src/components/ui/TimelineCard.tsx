/**
 * @component  TimelineCard
 * @spec       design.md § C-15 (Experience Timeline Card), § S-02
 * @tokens     T-09.grad-card, T-01.line/copper-300/copper-500/text-hi/text-low/text-mid/text-faint,
 *             T-01.a-copper-10, T-04.r-lg, T-05.glow-copper-md, T-02.numeral/d-3/b-sm/m-sm
 * @motion     M-04 cardLift, M-02 reveal (inherited stagger)
 */
"use client";

import { m } from "motion/react";
import { reveal } from "@/lib/motion";
import type { Experience } from "@/types";

interface TimelineCardProps {
  item: Experience;
  index: number;
}

export function TimelineCard({ item, index }: TimelineCardProps) {
  return (
    <m.article
      variants={reveal}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-r-lg border border-line bg-grad-card p-6 transition-shadow duration-base ease-out-spec hover:shadow-glow-copper-md"
    >
      {/* Ghost numeral — decorative (A-01) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-numeral leading-none text-text-faint opacity-[0.12]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="inline-block rounded-r-full bg-a-copper-10 px-3 py-1 font-mono text-m-sm uppercase text-copper-300">
        {item.period}
      </span>

      <h3 className="relative mt-5 font-display text-d-3 text-text-hi">{item.role}</h3>
      <p className="mt-1 text-b-sm text-text-low">{item.org}</p>

      <ul className="mt-5 flex flex-col gap-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-b-sm text-text-mid">
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-copper-500"
            />
            {bullet}
          </li>
        ))}
      </ul>
    </m.article>
  );
}
