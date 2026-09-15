/**
 * @file  data/nav.ts
 * @spec  design.md § C-04 (Navbar), § C-05 (MobileMenu)
 */

import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "works", label: "Works", index: "03" },
  { id: "contact", label: "Contact", index: "04" },
];
