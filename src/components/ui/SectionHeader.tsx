/**
 * @component  SectionHeader
 * @spec       design.md § C-11 (Section Header), § 10 A-01/A-02
 * @tokens     T-02.numeral/d-1/m-md, T-01.text-faint/text-low/text-hi/copper-300/copper-500
 * @motion     M-02 reveal
 */

import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  accentWord: string;
  /** Optional mono caption shown to the right of the eyebrow (§15.8). */
  caption?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  accentWord,
  caption,
}: SectionHeaderProps) {
  return (
    <header className="relative mb-16 md:mb-20">
      {/* Ghost numeral — decorative, A-01 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-10 -z-10 select-none font-display text-numeral text-text-faint opacity-[0.18] md:-left-2 md:-top-12"
      >
        {index}
      </span>

      <Reveal>
        <div className="flex flex-wrap items-center gap-4">
          <span className="h-px w-8 bg-copper-500" aria-hidden="true" />
          <span className="font-mono text-m-md uppercase text-text-low">{eyebrow}</span>
          {caption && (
            <span className="font-mono text-m-sm uppercase text-text-faint">{caption}</span>
          )}
        </div>

        <h2 className="mt-5 font-display text-d-1 text-text-hi">
          {title} <span className="italic text-copper-300">{accentWord}</span>
        </h2>
      </Reveal>
    </header>
  );
}
