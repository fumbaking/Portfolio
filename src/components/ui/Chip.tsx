/**
 * @component  Chip
 * @spec       design.md § C-18 (Filter Chip), § 10 A-04 (roving tabindex)
 * @tokens     T-01.ink-600/text-low/line, T-09.grad-accent, T-05.glow-copper-sm, T-02.m-md
 * @motion     layoutId pill slide
 */
"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

interface ChipProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
  label: string;
}

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  label,
}: ChipProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  // A-04 — roving tabindex: arrows move focus and selection together.
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + options.length) % options.length;
    const option = options[next];
    if (option === undefined) return;
    onChange(option);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option, i) => {
        const active = option === value;
        return (
          <button
            key={option}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative rounded-r-full border px-4 py-1.5 font-mono text-m-md uppercase",
              "transition-all duration-fast ease-out-spec",
              // §15.10 — was a layoutId="chip-pill" sliding pill; layout projection is not in
              // the domAnimation feature set, so the active chip paints the gradient directly.
              active
                ? "border-transparent bg-grad-accent text-ink-950 shadow-glow-copper-sm"
                : "border-line bg-ink-600 text-text-low hover:border-a-copper-20 hover:text-text-hi",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
