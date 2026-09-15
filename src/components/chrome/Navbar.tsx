/**
 * @component  Navbar
 * @spec       design.md § C-04 (Navbar), § C-05 (MobileMenu), § 10 A-03/A-04
 * @tokens     T-01.ink-800/line/copper-300/copper-500/text-low/text-hi, T-05.shadow-nav, T-07.z-nav
 * @motion     layoutId nav-underline, scrolled state over dur-base
 */
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/data/nav";
import { profile } from "@/data/profile";
import { NAV_SCROLL_THRESHOLD } from "@/config/theme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "./MobileMenu";

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-nav px-6 py-4 transition-all duration-base ease-out-spec md:px-12",
          scrolled
            ? "border-b border-line bg-ink-800/80 shadow-nav backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between">
          <a
            href="#home"
            className="rounded-r-sm font-mono text-m-lg font-bold text-copper-300"
            aria-label={`${profile.name} — home`}
          >
            {profile.monogram}
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative block rounded-r-sm py-1 font-mono text-m-lg uppercase transition-colors duration-fast ease-out-spec",
                      isActive ? "text-copper-300" : "text-text-low hover:text-text-hi",
                    )}
                  >
                    {item.label}
                    {/*
                      §15.10 — was layoutId="nav-underline". Layout projection is excluded from
                      the domAnimation feature set, so the bar now scales in place instead of
                      sliding between items. Same duration, and it covers hover too.
                    */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-copper-500",
                        "transition-transform duration-fast ease-out-spec",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="rounded-r-sm p-1 text-text-hi md:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
