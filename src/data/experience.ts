/**
 * @file  data/experience.ts
 * @spec  design.md § 9 D-02, § C-15 (TimelineCard), § 15.7
 * @note  The CV's three professional roles, newest first — fits the 3-up L-03 grid unchanged.
 */

import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    id: "kguc",
    period: "Jul 2025 — Present",
    role: "System Consultant, Marketing Operations",
    org: "KGUC — Kigali Golf Ultimate Course",
    bullets: [
      "Redesigned employee filing systems after an external audit, improving document accessibility and compliance",
      "Mapped information flows across departments to support faster, better-informed decisions",
      "Maintained employee records to Government Labor policy standards",
    ],
  },
  {
    id: "cci",
    period: "Aug 2024 — May 2025",
    role: "Marketing Executive, CX & CRM",
    org: "CCI Rwanda — U.S. retail clients",
    bullets: [
      "Managed customer engagement across email, live chat and CRM platforms",
      "Analysed feedback and behavioural patterns to inform retention initiatives",
      "Resolved checkout and payment issues, reducing barriers to purchase",
      "Reported weekly on engagement metrics and service trends",
    ],
  },
  {
    id: "juicylicius",
    period: "Jan 2023 — Aug 2024",
    role: "Marketing & Procurement Manager",
    org: "Juicylicius, Kigali",
    bullets: [
      "Marketed the startup across WhatsApp, Twitter, Instagram and VubaVuba",
      "Procured food inputs for juice, burgers and hotdogs at controlled cost",
      "Built the framework for delivering products to customers at home",
    ],
  },
];
