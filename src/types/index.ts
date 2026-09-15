/**
 * @file  types/index.ts
 * @spec  design.md § 9 (Data model D-01…D-05), § 15 (CV adaptation)
 */

/* ── D-01 ─────────────────────────────────────────────────────────────── */
export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  monogram: string;
  roles: string[];
  tagline: string;
  quote: { text: string; accent: string };
  bio: string[];
  portrait: string;
  /** A-06 — descriptive alt text for C-13. */
  portraitAlt: string;
  location: string;
  certification: string;
  cvUrl: string;
  availability: boolean;
  responseTime: string;
}

/* ── D-02 ─────────────────────────────────────────────────────────────── */
export interface Experience {
  id: string;
  period: string;
  role: string;
  org: string;
  bullets: string[];
}

/* ── D-03 (§15.3 — icon optional) ─────────────────────────────────────── */
export interface Skill {
  name: string;
  row: 1 | 2;
  icon?: string;
}

/* ── D-04 (§15.2, §15.4) ──────────────────────────────────────────────── */
export type Category = "Marketing" | "Operations" | "Community";
export type Filter = "All" | Category;
export type ProjectArt = "a" | "b" | "c";
export type ProjectIcon = "chart" | "users" | "cup" | "sprout";

export interface Project {
  id: string;
  title: string;
  category: Category;
  year: number;
  org: string;
  description: string;
  stack: string[];
  /** Absent when the work has no public artefact — never fabricate one (§15.4). */
  href?: string;
  art: ProjectArt;
  icon: ProjectIcon;
}

/* ── D-05 (§15.12 — composed client-side into a mailto: URL, never POSTed) ─ */
export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ── Navigation (C-04, C-05) ──────────────────────────────────────────── */
export interface NavItem {
  id: string;
  label: string;
  index: string;
}

/* ── Contact rows (C-21, §15.5) ───────────────────────────────────────── */
export interface SocialLink {
  label: string;
  value: string;
  href?: string;
  icon: "mail" | "phone" | "pin";
}

/* ── C-27 Icon ────────────────────────────────────────────────────────── */
export type IconName =
  | "mail"
  | "phone"
  | "pin"
  | "arrowUp"
  | "arrowUpRight"
  | "menu"
  | "close"
  | "refresh"
  | "check"
  | "alert"
  | "chart"
  | "users"
  | "cup"
  | "sprout"
  | "spinner";
