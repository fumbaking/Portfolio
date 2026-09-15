/**
 * @component  Typewriter
 * @spec       design.md § C-08 (Typewriter), § S-01
 * @tokens     T-02.d-3, T-01.copper-300/copper-500
 * @motion     caret blink (CSS steps), A-05 → static first role
 */
"use client";

import { useTypewriter, longest } from "@/hooks/useTypewriter";

export function Typewriter({ words }: { words: string[] }) {
  const text = useTypewriter(words);

  return (
    <p className="relative font-display text-d-3 italic text-copper-300">
      {/* Invisible sizer reserves the tallest/longest line — no CLS (P-01). */}
      <span aria-hidden="true" className="invisible">
        {longest(words)}
      </span>

      <span className="absolute inset-0 flex items-center justify-center">
        <span>{text}</span>
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[1em] w-0.5 animate-caret bg-copper-500 align-middle"
        />
      </span>
    </p>
  );
}
