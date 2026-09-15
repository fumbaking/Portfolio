/**
 * @component  About
 * @spec       design.md § S-02 (About), § L-02, § L-03, § 15.7, § 15.8
 * @tokens     T-01.text-mid/text-hi/text-low/copper-500, T-02.b-md/m-md
 * @motion     M-01 sectionFlow, M-02 reveal
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import { sectionFlow, VIEWPORT_ONCE, reveal } from "@/lib/motion";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortraitCard } from "@/components/ui/PortraitCard";
import { PullQuote } from "@/components/ui/PullQuote";
import { TimelineCard } from "@/components/ui/TimelineCard";
import { SkillsMarquee } from "@/components/ui/SkillsMarquee";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative min-h-screen scroll-mt-24 px-6 py-section md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-content">
        <SectionHeader index="02" eyebrow="Who I Am" title="About" accentWord="Me" />

        {/* L-03 About — 5fr / 7fr at lg */}
        <m.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16"
          variants={sectionFlow}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <m.div variants={reveal}>
            {/* §15.9 — omit `src` to fall back to the monogram plate. */}
            <PortraitCard src={profile.portrait} />
          </m.div>

          <m.div variants={reveal} className="flex flex-col gap-8">
            <PullQuote text={profile.quote.text} accent={profile.quote.accent} />
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-b-md text-text-mid">
                {paragraph}
              </p>
            ))}
          </m.div>
        </m.div>

        {/* Sub-block A — Experience */}
        <div className="mt-24">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span className="h-px w-8 bg-copper-500" aria-hidden="true" />
              <h3 className="font-mono text-m-md uppercase text-text-low">Experience</h3>
              {/* §15.8 */}
              <span className="font-mono text-m-sm uppercase text-text-faint">
                {profile.certification}
              </span>
            </div>
          </Reveal>

          <m.div
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={sectionFlow}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {experience.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </m.div>
        </div>

        {/* Sub-block B — Skills */}
        <div className="mt-24">
          <SkillsMarquee />
        </div>
      </div>
    </section>
  );
}
