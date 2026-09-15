/**
 * @component  Tag
 * @spec       design.md § C-20 (Tag)
 * @tokens     T-01.a-copper-10, T-01.copper-300, T-04.r-sm, T-02.m-sm
 * @motion     —
 */

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-r-sm bg-a-copper-10 px-2.5 py-1 font-mono text-m-sm uppercase text-copper-300">
      {children}
    </span>
  );
}
