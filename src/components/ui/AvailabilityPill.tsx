/**
 * @component  AvailabilityPill
 * @spec       design.md § C-22 (Availability Pill)
 * @tokens     T-01.a-copper-04/a-copper-20/success/text-mid, T-04.r-full, T-02.m-sm
 * @motion     2s ping ring (Tailwind keyframe)
 */

export function AvailabilityPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-r-full border border-a-copper-20 bg-a-copper-04 px-4 py-2">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-r-full bg-success" />
        <span className="relative h-2 w-2 rounded-r-full bg-success" />
      </span>
      <span className="font-mono text-m-sm uppercase text-text-mid">{label}</span>
    </div>
  );
}
