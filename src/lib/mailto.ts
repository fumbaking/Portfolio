/**
 * @file  lib/mailto.ts
 * @spec  design.md § S-04 (C-23), § 15.12 (mailto compose)
 * @note  Builds an RFC 6068 mailto: URL so the viewer's own mail client composes the
 *        message. No server, no API key, and the reply-to is naturally correct because
 *        the message is sent FROM the viewer's own address.
 */

import type { ContactPayload } from "@/types";

/**
 * Practical ceiling. Browsers and mail clients disagree on URL limits; the narrowest
 * common one is ~2000 characters for the whole href. 1200 body characters leaves room
 * for the subject, the signature block and percent-encoding (which can triple the
 * length of non-ASCII text).
 */
export const MESSAGE_MAX = 1200;

interface BuildMailtoArgs extends Omit<ContactPayload, "website"> {
  to: string;
}

/** The plain-text body, also used verbatim by the clipboard fallback. */
export function composeBody({ name, email, message }: Omit<BuildMailtoArgs, "to" | "subject">) {
  return [message, "", "—", name, email].join("\r\n");
}

export function buildMailto({ to, name, email, subject, message }: BuildMailtoArgs): string {
  const params = new URLSearchParams({
    subject,
    body: composeBody({ name, email, message }),
  });

  // URLSearchParams serialises spaces as "+", which mail clients render literally
  // rather than as spaces. mailto: requires percent-encoding.
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Rough guard so an over-long draft never produces a silently truncated URL. */
export const isMailtoSafe = (url: string): boolean => url.length < 1900;
