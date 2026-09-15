/**
 * @component  HomePage
 * @spec       design.md § 1 (Route map), § 8 (S-01…S-05), § 11 P-01
 * @tokens     —
 * @motion     each section carries its own M-01 sectionFlow
 */

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

// P-01 — below-the-fold client sections are split out of the initial bundle.
const Works = dynamic(() => import("@/components/sections/Works").then((m) => m.Works));
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Works />
      <Contact />
    </>
  );
}
