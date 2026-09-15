/**
 * @file  lib/cn.ts
 * @spec  agent.md § 4 — the only approved way to compose conditional classes.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
