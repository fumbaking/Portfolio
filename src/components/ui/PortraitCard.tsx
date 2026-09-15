/**
 * @component  PortraitCard
 * @spec       design.md § C-13 (About Portrait Card), § 15.9, § 10 A-06
 * @tokens     T-09.grad-card/grad-veil, T-01.line/copper-500/text-faint, T-04.r-xl
 * @motion     image scale 1.04 on hover over dur-slow
 */

import Image from "next/image";
import { profile } from "@/data/profile";

/** Corner ticks — 24px 1px copper rules, top-left and bottom-right. */
function Ticks() {
  return (
    <>
      <span aria-hidden="true" className="absolute left-4 top-4 h-6 w-px bg-copper-500" />
      <span aria-hidden="true" className="absolute left-4 top-4 h-px w-6 bg-copper-500" />
      <span aria-hidden="true" className="absolute bottom-4 right-4 h-6 w-px bg-copper-500" />
      <span aria-hidden="true" className="absolute bottom-4 right-4 h-px w-6 bg-copper-500" />
    </>
  );
}

interface PortraitCardProps {
  /** §15.9 — when no photo exists, the card falls back to a monogram plate. */
  src?: string;
}

export function PortraitCard({ src }: PortraitCardProps) {
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-r-xl border border-line bg-grad-card">
      {src ? (
        <>
          <Image
            src={src}
            alt={profile.portraitAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top transition-transform duration-slow ease-out-spec group-hover:scale-[1.04]"
            // Below the fold — deliberately NOT `priority`, so it cannot compete with the
            // hero for LCP (P-01).
          />
          <span aria-hidden="true" className="absolute inset-0 bg-grad-veil-portrait" />
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <span className="font-display text-numeral leading-none text-text-faint opacity-40">
            {profile.monogram}
          </span>
          <span className="font-mono text-m-sm uppercase text-text-faint">
            {profile.location}
          </span>
        </div>
      )}
      <Ticks />
    </figure>
  );
}
