/**
 * @component  Toast / ToastProvider
 * @spec       design.md § C-24 (Toast), § 10 A-07 (live region)
 * @tokens     T-01.ink-700/line/success/danger/text-mid, T-04.r-md, T-05.shadow-card, T-07.z-toast
 * @motion     M-08 toast
 */
"use client";

import { AnimatePresence, m } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast as toastVariants, TOAST_TTL_MS } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";

type ToastKind = "success" | "error";
interface ToastState {
  id: number;
  kind: ToastKind;
  message: string;
}

const ToastContext = createContext<(kind: ToastKind, message: string) => void>(() => {});

/** Raise a toast from anywhere below ToastProvider. */
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ToastState | null>(null);

  const show = useCallback((kind: ToastKind, message: string) => {
    const id = Date.now();
    setCurrent({ id, kind, message });
    setTimeout(() => {
      setCurrent((c) => (c?.id === id ? null : c));
    }, TOAST_TTL_MS);
  }, []);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* A-07 — live region announces submit results */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-toast flex justify-center px-6"
      >
        <AnimatePresence>
          {current && (
            <m.div
              key={current.id}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center gap-3 rounded-r-md border border-line bg-ink-700 px-5 py-3 shadow-card"
            >
              <Icon
                name={current.kind === "success" ? "check" : "alert"}
                size={16}
                className={current.kind === "success" ? "text-success" : "text-danger"}
              />
              <span className="text-b-sm text-text-mid">{current.message}</span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
