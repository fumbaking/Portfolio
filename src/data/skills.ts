/**
 * @file  data/skills.ts
 * @spec  design.md § 9 D-03, § C-17 (SkillsMarquee), § 15.3
 * @note  Row 1 = professional capability, row 2 = tools & languages. No icon assets exist
 *        for competencies, so C-17 renders a copper diamond marker instead (§15.3).
 */

import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Row 1 — capability (scrolls left)
  { name: "CRM Systems", row: 1 },
  { name: "Customer Experience", row: 1 },
  { name: "Digital Marketing", row: 1 },
  { name: "Email Campaigns", row: 1 },
  { name: "Mobile Marketing", row: 1 },
  { name: "Data Management", row: 1 },
  { name: "Reporting & Insights", row: 1 },
  { name: "Procurement", row: 1 },
  { name: "Process Design", row: 1 },

  // Row 2 — tools & languages (scrolls right)
  { name: "MS Word", row: 2 },
  { name: "MS PowerPoint", row: 2 },
  { name: "MS Excel", row: 2 },
  { name: "Website Design", row: 2 },
  { name: "Computer Maintenance", row: 2 },
  { name: "Kinyarwanda", row: 2 },
  { name: "English", row: 2 },
  { name: "French", row: 2 },
];

export const skillsRow1 = skills.filter((s) => s.row === 1);
export const skillsRow2 = skills.filter((s) => s.row === 2);
