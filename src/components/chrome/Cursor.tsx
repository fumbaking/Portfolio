/**
 * @component  Cursor
 * @spec       design.md § C-02 (Custom Cursor), § 10 A-05
 * @tokens     T-01.copper-400/a-copper-10/a-copper-35, T-07.z-cursor
 * @motion     useSpring trailing ring (SPRING_OPTIONS)
 */
"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { SPRING_OPTIONS } from "@/lib/motion";
import { useFinePointer } from "@/hooks/useMediaQuery";

type CursorState = "default" | "hover" | "text";

export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING_OPTIONS);
  const ringY = useSpring(y, SPRING_OPTIONS);

  useEffect(() => {
    if (!enabled) return;

    // Native cursor is hidden only while the custom one is actually mounted.
    document.body.dataset.customCursor = "on";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea")) setState("text");
      else if (el?.closest("a, button, [data-cursor]")) setState("hover");
      else setState("default");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      delete document.body.dataset.customCursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring =
    state === "text"
      ? { width: 2, height: 40, borderRadius: 1 }
      : state === "hover"
        ? { width: 56, height: 56, borderRadius: 28 }
        : { width: 32, height: 32, borderRadius: 16 };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-cursor">
      <m.span
        className="absolute block bg-copper-400"
        style={{ x, y, width: 6, height: 6, borderRadius: 3, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      <m.span
        className="absolute block border border-a-copper-35"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          ...ring,
          opacity: visible ? 1 : 0,
          // Both ends must be the same colour space — `transparent` is not animatable.
          backgroundColor: state === "hover" ? "var(--a-copper-10)" : "var(--a-copper-00)",
        }}
      />
    </div>
  );
}
