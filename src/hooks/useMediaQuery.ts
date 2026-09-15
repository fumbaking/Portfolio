/**
 * @file  hooks/useMediaQuery.ts
 * @spec  design.md § 3 T-08 (Breakpoints), § C-02 (pointer: fine), § 10 A-05
 * @note  SSR-safe: returns `false` on the server and syncs on mount.
 */
"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** C-02 — the custom cursor renders only on fine pointers. */
export const useFinePointer = () => useMediaQuery("(pointer: fine)");

/** T-08 — lg and up (side rails C-06, magnetic buttons M-10). */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
