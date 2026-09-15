/**
 * @component  ProjectFlipCard
 * @spec       design.md § C-19 (Project Flip Card), § S-03, § 15.4, § 10 A-04/A-05
 * @tokens     T-09.grad-proj-a|b|c, T-01.ink-700/ink-800/copper-300/text-hi/text-mid/text-faint,
 *             T-04.r-lg, T-05.glow-copper-md, T-02.d-3/b-sm/m-sm
 * @motion     M-05 flip (crossfade under A-05), M-04 cardLift
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { DUR, EASE_IN_OUT, PERSPECTIVE, projectCard } from "@/lib/motion";
import { Icon } from "./Icon";
import { Tag } from "./Tag";
import { Button } from "./Button";
import type { Project, ProjectArt } from "@/types";

const ART: Record<ProjectArt, string> = {
  a: "bg-grad-proj-a",
  b: "bg-grad-proj-b",
  c: "bg-grad-proj-c",
};

const FACE = "absolute inset-0 backface-hidden overflow-hidden rounded-r-lg border border-line";

export function ProjectFlipCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();

  const meta = `${project.category} · ${project.year}`;

  return (
    <m.article
      // §15.10 — `layout` needs layout projection, absent from domAnimation. Enter/exit
      // is now a variant, so the S-03 filter still animates without it.
      variants={projectCard}
      exit="exit"
      whileHover={reduced ? undefined : { y: -6 }}
      className="group relative aspect-[3/4] rounded-r-lg transition-shadow duration-base ease-out-spec hover:shadow-glow-copper-md"
      style={{ perspective: PERSPECTIVE }}
      onHoverStart={() => !reduced && setFlipped(true)}
      onHoverEnd={() => !reduced && setFlipped(false)}
    >
      <m.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduced ? undefined : { rotateY: flipped ? 180 : 0 }}
        transition={{ duration: DUR.flip, ease: EASE_IN_OUT }}
      >
        {/* ── Front ──────────────────────────────────────────────────── */}
        <div className={cn(FACE, reduced && flipped && "opacity-0")}>
          <div className={cn("flex h-full w-full items-center justify-center", ART[project.art])}>
            <Icon name={project.icon} size={48} className="text-text-hi/85" />
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-ink-800/80 p-5 backdrop-blur-sm">
            <p className="font-mono text-m-sm uppercase text-copper-300">{meta}</p>
            <h3 className="mt-1 font-display text-d-3 text-text-hi">{project.title}</h3>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-m-sm uppercase text-text-faint">
              <Icon name="refresh" size={12} />
              {reduced ? "tap" : "hover"}
            </p>
          </div>
        </div>

        {/* ── Back ───────────────────────────────────────────────────── */}
        <div
          className={cn(FACE, "flex flex-col bg-ink-700 p-6", reduced && !flipped && "opacity-0")}
          style={reduced ? undefined : { transform: "rotateY(180deg)" }}
          // A-04 — the hidden face must not be tabbable (React 19 boolean `inert`).
          inert={!flipped}
        >
          <p className="font-mono text-m-sm uppercase text-copper-300">{meta}</p>
          <h3 className="mt-1 font-display text-d-3 text-text-hi">{project.title}</h3>
          <p className="mt-4 line-clamp-4 text-b-sm text-text-mid">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mt-auto pt-5">
            {project.href ? (
              <Button
                href={project.href}
                variant="ghost"
                external
                className="w-full px-4 py-2.5"
              >
                View Project
              </Button>
            ) : (
              // §15.4 — no public artefact; credit the organisation instead of a dead link.
              <p className="font-mono text-m-sm uppercase text-text-faint">{project.org}</p>
            )}
          </div>
        </div>
      </m.div>

      {/* A-04 — the flip control; covers the face but sits under the back-face link. */}
      <button
        type="button"
        aria-expanded={flipped}
        aria-label={`${project.title} — show details`}
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "absolute inset-0 rounded-r-lg",
          flipped && "pointer-events-none",
        )}
      />
    </m.article>
  );
}
