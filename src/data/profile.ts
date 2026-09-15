/**
 * @file  data/profile.ts
 * @spec  design.md § 9 D-01, § 15 (CV adaptation), § S-01 (Hero), § S-02 (About)
 * @note  Every line here is evidenced by FUMBA HURIRO- Resume.pdf. Nothing is invented.
 */

import type { Profile, SocialLink } from "@/types";

export const profile: Profile = {
  name: "Fumba Huriro",
  firstName: "Fumba",
  lastName: "Huriro",
  monogram: "FH",

  /** C-08 typewriter — §15.1, all four evidenced by the CV. */
  roles: [
    "Marketing Executive",
    "Customer Experience Specialist",
    "CRM & Data Analyst",
    "Operations Consultant",
  ],

  /** S-01 tagline. */
  tagline:
    "Working where marketing meets information systems — mapping how data moves through an organisation, then making it serve the people who depend on it.",

  /** C-14 pull quote — `accent` renders italic in copper-300. */
  quote: {
    text: "I make information work for people,",
    accent: "not the other way round.",
  },

  /** S-02 body paragraphs. */
  bio: [
    "I'm a Business Information Management student at the Adventist University of Central Africa in Kigali, working at the point where customer-facing marketing meets the systems that keep it honest.",
    "Across CRM platforms for U.S. retail clients, HR information flows at a Kigali golf club, and a food startup I helped take to market, the thread is the same: understand the customer, clean up the process, and let reliable data drive the decision. I also co-founded HEYT, a youth initiative that helped genocide survivors in Rugende build a working business.",
  ],

  /** C-13 About portrait — best-centred of the three for the 4:5 crop. */
  portrait: "/fumba-portrait.jpg",
  portraitAlt: "Fumba Huriro working at his desk in Kigali",
  location: "Kigali, Rwanda",
  certification: "Digital Marketing Certification · 2021",

  /**
   * The typeset beige CV (public/cv.html), not the raw PDF — it reads better on screen
   * and prints to A4 from the browser. The original remains at /resume.pdf.
   */
  cvUrl: "/cv.html",
  availability: true,
  responseTime: "24 hours",
};

/**
 * The other two frames from `images of Fumba/`, kept addressable rather than orphaned:
 * `desk-wide` is the landscape-friendliest and serves as the OpenGraph/Twitter card
 * (src/app/opengraph-image.jpg); `desk-alt` is a spare — swap either into
 * `profile.portrait` above to change the About image in one line.
 */
export const photos = {
  portrait: "/fumba-portrait.jpg",
  deskWide: "/fumba-desk-wide.jpg",
  deskAlt: "/fumba-desk-alt.jpg",
} as const;

/** C-21 contact rows + C-25 footer — §15.5 (no LinkedIn/GitHub on the CV). */
export const socials: SocialLink[] = [
  {
    label: "Email",
    value: "fumbaking@gmail.com",
    href: "mailto:fumbaking@gmail.com",
    icon: "mail",
  },
  {
    label: "Phone",
    value: "+250 789 349 708",
    href: "tel:+250789349708",
    icon: "phone",
  },
  {
    label: "Location",
    value: "Kigali, Rwanda",
    icon: "pin",
  },
];
