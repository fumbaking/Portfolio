/**
 * @component  Button
 * @spec       design.md § C-09 (Button), § 10 A-03
 * @tokens     T-09.grad-accent, T-01.ink-950, T-01.copper-300/500, T-01.ink-500,
 *             T-04.r-full, T-05.glow-copper-sm/lg, T-02.m-lg
 * @motion     M-10 magnetic, whileTap scale
 */
"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Icon } from "./Icon";

type Variant = "primary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-r-full px-7 py-3 " +
  "font-mono text-m-lg uppercase transition-colors duration-fast ease-out-spec " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-grad-accent text-ink-950 shadow-glow-copper-sm hover:shadow-glow-copper-lg",
  ghost:
    "border border-ink-500 text-text-hi hover:border-copper-500 hover:bg-a-copper-04 hover:text-copper-300",
};

export function Button({
  children,
  variant = "primary",
  href,
  external,
  type = "button",
  disabled,
  onClick,
  className,
}: ButtonProps) {
  const magnet = useMagnetic<HTMLElement>();

  const content = (
    <>
      {children}
      {external && (
        <Icon
          name="arrowUpRight"
          size={12}
          className="transition-transform duration-fast ease-out-spec group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  const shared = {
    className: cn("group", BASE, VARIANTS[variant], className),
    style: magnet.enabled ? magnet.style : undefined,
    onPointerMove: magnet.onPointerMove,
    onPointerLeave: magnet.onPointerLeave,
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
  } as const;

  if (href) {
    return (
      <m.a
        ref={magnet.ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...shared}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button
      ref={magnet.ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...shared}
    >
      {content}
    </m.button>
  );
}
