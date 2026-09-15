/**
 * @component  MobileMenu
 * @spec       design.md § C-05 (Mobile Menu Overlay), § 10 A-04
 * @tokens     T-01.ink-900/text-faint/text-hi/copper-300, T-02.d-3/m-sm, T-07.z-menu
 * @motion     M-07 menuOverlay
 */
"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { menuLink, menuOverlay } from "@/lib/motion";
import { NAV_ITEMS } from "@/data/nav";
import { profile, socials } from "@/data/profile";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Icon } from "@/components/ui/Icon";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);

  // A-04 — Esc closes, focus is trapped, focus returns to the opener on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(t);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={menuOverlay}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-menu flex flex-col bg-ink-900/[0.97] px-6 py-4 backdrop-blur-lg md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-m-lg font-bold text-copper-300">
              {profile.monogram}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-r-sm p-1 text-text-hi"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <m.li key={item.id} variants={menuLink} className="flex items-baseline gap-4">
                <span className="font-mono text-m-sm text-text-faint" aria-hidden="true">
                  {item.index}
                </span>
                <a
                  href={`#${item.id}`}
                  onClick={onClose}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-r-sm font-display text-d-3",
                    active === item.id ? "italic text-copper-300" : "text-text-hi",
                  )}
                >
                  {item.label}
                </a>
              </m.li>
            ))}
          </ul>

          <m.div variants={menuLink} className="flex flex-wrap gap-x-6 gap-y-2 pb-4">
            {socials
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-r-sm font-mono text-m-sm uppercase text-text-low"
                >
                  {s.label}
                </a>
              ))}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
