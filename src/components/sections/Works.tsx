/**
 * @component  Works
 * @spec       design.md § S-03 (Works), § C-18, § C-19, § L-03, § 15.2
 * @tokens     T-01.text-faint, T-09.grad-rule, T-02.m-md
 * @motion     M-01 sectionFlow, projectCard enter/exit via AnimatePresence (§15.10)
 */
"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { sectionFlow, VIEWPORT_ONCE } from "@/lib/motion";
import { CATEGORIES, projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChipGroup } from "@/components/ui/Chip";
import { ProjectFlipCard } from "@/components/ui/ProjectFlipCard";
import type { Filter } from "@/types";

export function Works() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section
      id="works"
      className="relative min-h-screen scroll-mt-24 px-6 py-section md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader index="03" eyebrow="Selected Work" title="My" accentWord="Works" />
          <div className="mb-16 md:mb-20">
            <ChipGroup
              options={CATEGORIES}
              value={filter}
              onChange={setFilter}
              label="Filter works by category"
            />
          </div>
        </div>

        {/* L-03 Projects — 1 / 2 / 4 columns */}
        <m.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={sectionFlow}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {/* §15.10 — mode="popLayout" requires layout projection; plain presence instead. */}
          <AnimatePresence>
            {visible.map((project) => (
              <ProjectFlipCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </m.div>

        <div className="mt-10">
          <span className="block h-px w-full bg-grad-rule" aria-hidden="true" />
          <p className="mt-4 text-right font-mono text-m-md uppercase text-text-faint">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>
    </section>
  );
}
