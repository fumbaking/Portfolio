/**
 * @component  SkillsMarquee + SpeedSlider
 * @spec       design.md § C-17 (Skills Marquee), § C-16 (Speed Slider), § 15.3, § 10 A-05
 * @tokens     T-01.ink-600/line/copper-300/copper-500/text-mid/text-faint/ink-500,
 *             T-04.r-full, T-05.glow-copper-sm, T-02.m-md
 * @motion     M-06 marquee (duration driven by the slider)
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { marqueeDuration } from "@/lib/motion";
import { MARQUEE_DEFAULT_SPEED } from "@/config/theme";
import { skillsRow1, skillsRow2 } from "@/data/skills";
import type { Skill } from "@/types";

function Pill({ skill }: { skill: Skill }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-r-full border border-line bg-ink-600 px-5 py-2.5 font-mono text-m-md uppercase text-text-mid transition-colors duration-fast ease-out-spec hover:border-a-copper-20 hover:text-copper-300">
      {/* §15.3 — competencies have no brand icon; a copper diamond stands in. */}
      <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-copper-500" />
      {skill.name}
    </span>
  );
}

function Row({ items, reverse, speed }: { items: Skill[]; reverse: boolean; speed: number }) {
  const reduced = useReducedMotion();
  // Duplicated once so the -50% loop is seamless.
  const doubled = [...items, ...items];

  return (
    <div className="mask-edges overflow-hidden">
      <m.div
        className="flex w-max gap-3"
        animate={reduced ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={
          reduced
            ? undefined
            : {
                duration: marqueeDuration(speed),
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        {doubled.map((skill, i) => (
          <Pill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </m.div>
    </div>
  );
}

export function SkillsMarquee() {
  const [speed, setSpeed] = useState(MARQUEE_DEFAULT_SPEED);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-copper-500" aria-hidden="true" />
          <span className="font-mono text-m-md uppercase text-text-low">Skilled at</span>
        </div>

        {/* C-16 Speed Slider */}
        <label className="flex items-center gap-3">
          <span className="sr-only">Marquee speed</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="slider h-0.5 w-32 cursor-pointer appearance-none rounded-r-full bg-ink-500"
            style={{
              backgroundImage: "var(--grad-accent)",
              backgroundSize: `${speed}% 100%`,
              backgroundRepeat: "no-repeat",
            }}
          />
          <span className="w-10 font-mono text-m-md text-copper-300">{speed}%</span>
        </label>
      </div>

      <Row items={skillsRow1} reverse={false} speed={speed} />
      <Row items={skillsRow2} reverse speed={speed} />
    </div>
  );
}
