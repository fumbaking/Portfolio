/**
 * @component  ContactRow
 * @spec       design.md § C-21 (Contact Info Row), § 15.5
 * @tokens     T-01.text-faint/text-hi/copper-300, T-02.m-sm/b-sm
 * @motion     x:4 lift on hover
 */
"use client";

import { m } from "motion/react";
import { IconTile } from "./IconTile";
import type { SocialLink } from "@/types";

export function ContactRow({ link }: { link: SocialLink }) {
  const inner = (
    <>
      <IconTile name={link.icon} />
      <span className="flex flex-col">
        <span className="font-mono text-m-sm uppercase text-text-faint">{link.label}</span>
        <span className="text-b-sm text-text-hi transition-colors duration-fast ease-out-spec group-hover:text-copper-300">
          {link.value}
        </span>
      </span>
    </>
  );

  // §15.5 — Location has no href; render it as plain text, not a dead link.
  if (!link.href) {
    return <div className="group flex items-center gap-4">{inner}</div>;
  }

  return (
    <m.a
      href={link.href}
      className="group flex items-center gap-4 rounded-r-sm"
      whileHover={{ x: 4 }}
    >
      {inner}
    </m.a>
  );
}
