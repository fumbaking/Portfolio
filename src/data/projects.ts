/**
 * @file  data/projects.ts
 * @spec  design.md § 9 D-04, § C-19 (ProjectFlipCard), § S-03 (Works), § 15.2, § 15.4
 * @note  These are the CV's real initiatives. None has a public URL, so `href` is omitted
 *        everywhere — a fabricated link would be worse than no link (§15.4).
 */

import type { Filter, Project } from "@/types";

export const CATEGORIES: Filter[] = ["All", "Marketing", "Operations", "Community"];

export const projects: Project[] = [
  {
    id: "hr-information-redesign",
    title: "HR Information Redesign",
    category: "Operations",
    year: 2025,
    org: "KGUC, Kigali",
    description:
      "Reorganised an entire employee filing system around how information actually moves through the business — audit-driven, compliance-safe, and far faster to search.",
    stack: ["Information Mapping", "Compliance", "Process Design"],
    art: "b",
    icon: "chart",
  },
  {
    id: "customer-experience-programme",
    title: "Customer Experience Programme",
    category: "Marketing",
    year: 2024,
    org: "CCI Rwanda",
    description:
      "Ran email, live chat and CRM engagement for U.S. retail clients, turning feedback and behavioural patterns into retention initiatives and weekly insight reporting.",
    stack: ["CRM", "Customer Journey", "Reporting"],
    art: "a",
    icon: "users",
  },
  {
    id: "juicylicius-go-to-market",
    title: "Juicylicius Go-to-Market",
    category: "Marketing",
    year: 2023,
    org: "Juicylicius",
    description:
      "Took a Kigali food startup to market across social channels and built the delivery framework that got juice, burgers and hotdogs to customers' doors.",
    stack: ["Social Media", "Procurement", "Delivery Ops"],
    art: "a",
    icon: "cup",
  },
  {
    id: "heyt-community-enterprise",
    title: "HEYT Community Enterprise",
    category: "Community",
    year: 2023,
    org: "Help Empower Youth Today",
    description:
      "Co-founded a youth initiative and managed its finances, helping genocide survivors in Rugende, Kabuga start a working chicken business.",
    stack: ["Co-Founder", "Finance", "Community"],
    art: "c",
    icon: "sprout",
  },
];
