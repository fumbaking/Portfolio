/**
 * @component  Starfield
 * @spec       design.md § C-03 (Starfield Canvas), § 11 P-01, § 10 A-05/A-06
 * @tokens     T-01.copper-300/steel-400/text-faint, T-07.z-base
 * @motion     ambient drift + sine twinkle (not a Framer variant — canvas rAF)
 */
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { STARFIELD } from "@/config/theme";

/**
 * R2 exemption (documented in scripts/lint-tokens.mjs): the canvas 2D API takes colour
 * strings, not Tailwind classes. The channels are still read from the T-01 custom
 * properties at runtime, so globals.css remains the single source of truth.
 */
const TOKEN_VARS = ["--copper-300-c", "--steel-400-c", "--text-faint-c"] as const;

/** Weighted 2:1:5 per design.md § C-03. */
const WEIGHTS = [2, 1, 5] as const;

function readTokens(): string[] {
  const styles = getComputedStyle(document.documentElement);
  return TOKEN_VARS.map((v) => styles.getPropertyValue(v).trim().replace(/\s+/g, ","));
}

function pickColor(colors: string[]): string {
  const fallback = colors[2] ?? "70,81,94";
  const total = WEIGHTS.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < WEIGHTS.length; i++) {
    r -= WEIGHTS[i] ?? 0;
    if (r <= 0) return colors[i] ?? fallback;
  }
  return fallback;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  drift: number;
  phase: number;
  speed: number;
  color: string;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const colors = readTokens();

    const seed = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count =
        window.innerWidth < 768 ? STARFIELD.countMobile : STARFIELD.countDesktop;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0.4 + Math.random() * 1.0,
        drift: -(0.02 + Math.random() * 0.06),
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.008,
        color: pickColor(colors),
      }));
    };

    const paint = (animate: boolean) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        if (animate) {
          p.y += p.drift;
          p.phase += p.speed;
          if (p.y < -2) p.y = window.innerHeight + 2;
        }
        const alpha = animate ? 0.15 + (Math.sin(p.phase) + 1) * 0.275 : 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      // P-01 — never burn frames on a hidden tab.
      if (!document.hidden) paint(true);
      raf = requestAnimationFrame(loop);
    };

    seed();

    // A-05 — one static frame, no rAF at all.
    if (reduced) {
      paint(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      seed();
      paint(!reduced);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-base"
      style={{ opacity: STARFIELD.opacity }}
    />
  );
}
