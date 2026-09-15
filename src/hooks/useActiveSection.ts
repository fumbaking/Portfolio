/**
 * @file  hooks/useActiveSection.ts
 * @spec  design.md § C-04 (Navbar active state), § C-05 (MobileMenu)
 * @note  IntersectionObserver window comes from config/theme.ts so the value stays
 *        in one place (design.md § C-04).
 */
"use client";

import { useEffect, useState } from "react";
import { ACTIVE_SECTION_ROOT_MARGIN } from "@/config/theme";

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
