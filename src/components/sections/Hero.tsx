/**
 * @component  Hero
 * @spec       design.md § S-01 / C-07 (Hero), § 15.6, § 10 A-02
 * @tokens     T-02.d-hero/m-md/b-lg, T-01.text-hi/text-mid/text-low/copper-300/copper-400,
 *             T-01.a-copper-10
 * @motion     M-03 heroEnter (heroContainer / heroWord), HERO_DELAY
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import { heroContainer, heroWord, revealDelayed, HERO_DELAY } from "@/lib/motion";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/Typewriter";
import { ScrollCue } from "@/components/ui/ScrollCue";

/** First letter of each name renders in copper-300, as the source design does. */
function AccentedName({ word }: { word: string }) {
  const [first, ...rest] = word;
  return (
    <span className="inline-block">
      <span className="text-copper-300">{first}</span>
      {rest.join("")}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center px-6 py-section text-center md:px-12"
    >
      {/* Copper bloom behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[40vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-r-full bg-a-copper-10 blur-[120px]"
      />

      <m.div
        className="mx-auto flex w-full max-w-content flex-col items-center gap-6"
        variants={heroContainer}
        initial={reduced ? false : "hidden"}
        animate="visible"
      >
        <m.p
          variants={heroWord}
          className="font-mono text-m-md uppercase text-text-low"
        >
          <span className="text-copper-400">✦</span> Hello, I&apos;m
        </m.p>

        {/* A-02 — the page's only <h1> */}
        <h1 className="font-display text-d-hero text-text-hi">
          <m.span variants={heroWord} className="inline-block">
            <AccentedName word={profile.firstName} />
          </m.span>{" "}
          <m.span variants={heroWord} className="inline-block">
            <AccentedName word={profile.lastName} />
          </m.span>
        </h1>

        <m.div variants={revealDelayed(HERO_DELAY.typewriter)}>
          <Typewriter words={profile.roles} />
        </m.div>

        <m.p
          variants={revealDelayed(HERO_DELAY.paragraph)}
          className="max-w-[52ch] text-b-lg text-text-mid"
        >
          {profile.tagline}
        </m.p>

        <m.div
          variants={revealDelayed(HERO_DELAY.buttons)}
          className="mt-2 flex flex-wrap items-center justify-center gap-4"
        >
          {/* §15.6 — no LinkedIn on the CV, so this scrolls to the contact form. */}
          <Button href="#contact" variant="primary">
            Hire Me
          </Button>
          <Button href={profile.cvUrl} variant="ghost" external>
            View CV
          </Button>
        </m.div>

        <m.div variants={revealDelayed(HERO_DELAY.scrollCue)} className="mt-10">
          <ScrollCue />
        </m.div>
      </m.div>
    </section>
  );
}
