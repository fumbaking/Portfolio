/**
 * @component  Icon
 * @spec       design.md § C-27 (Icon)
 * @tokens     inherits currentColor from the parent's T-01 token class
 * @motion     —
 */

import type { IconName } from "@/types";

const PATHS: Record<IconName, React.ReactNode> = {
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 6 7 5 7-5" />
    </>
  ),
  phone: (
    <path d="M5 2.5h3l1.5 4-2 1.2a10 10 0 0 0 4.8 4.8l1.2-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 3.5 4.1 1.5 1.5 0 0 1 5 2.5Z" />
  ),
  pin: (
    <>
      <path d="M10 17.5s5.5-5.2 5.5-9.3a5.5 5.5 0 1 0-11 0C4.5 12.3 10 17.5 10 17.5Z" />
      <circle cx="10" cy="8" r="2" />
    </>
  ),
  arrowUp: <path d="M10 16V4m0 0L5 9m5-5 5 5" />,
  arrowUpRight: <path d="M6 14 14 6m0 0H7m7 0v7" />,
  menu: <path d="M3 6h14M3 10h14M3 14h14" />,
  close: <path d="M5 5l10 10M15 5L5 15" />,
  refresh: (
    <>
      <path d="M16.5 10a6.5 6.5 0 1 1-1.9-4.6" />
      <path d="M16.5 3v3.5H13" />
    </>
  ),
  check: <path d="m4 10.5 4 4 8-9" />,
  alert: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6.5v4.5M10 13.5h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M3 17h14" />
      <path d="M6 17V9M10 17V4M14 17v-5" />
    </>
  ),
  users: (
    <>
      <circle cx="8" cy="7" r="2.8" />
      <path d="M2.5 17a5.5 5.5 0 0 1 11 0" />
      <path d="M14 5.2a2.8 2.8 0 0 1 0 5.4M15.5 17a5.5 5.5 0 0 0-2-4.2" />
    </>
  ),
  cup: (
    <>
      <path d="M4 5h10v6a5 5 0 0 1-10 0V5Z" />
      <path d="M14 6.5h1.5a2 2 0 0 1 0 4H14" />
      <path d="M3 18h12" />
    </>
  ),
  sprout: (
    <>
      <path d="M10 18v-7" />
      <path d="M10 11C10 7.7 7.8 5.5 4.5 5.5c0 3.3 2.2 5.5 5.5 5.5Z" />
      <path d="M10 11c0-2.8 1.9-4.7 4.7-4.7 0 2.8-1.9 4.7-4.7 4.7Z" />
    </>
  ),
  spinner: (
    <>
      <circle cx="10" cy="10" r="7" opacity="0.25" />
      <path d="M17 10a7 7 0 0 0-7-7" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
