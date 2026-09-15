/**
 * @file  lib/validate.ts
 * @spec  design.md § S-04 (C-23 validation), § 9 D-05
 * @note  Shared by the client form and the route handler so both enforce the same rules.
 */

import type { ContactPayload } from "@/types";
import { MESSAGE_MAX } from "./mailto";

export const MESSAGE_MIN = 20;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export function validateContact(input: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name?.trim()) errors.name = "Your name is required.";
  if (!input.email?.trim()) errors.email = "An email address is required.";
  else if (!EMAIL_RE.test(input.email.trim())) errors.email = "That email doesn't look right.";
  if (!input.subject?.trim()) errors.subject = "A subject is required.";

  const message = input.message?.trim() ?? "";
  if (!message) errors.message = "A message is required.";
  else if (message.length < MESSAGE_MIN) {
    errors.message = `Please write at least ${MESSAGE_MIN} characters.`;
  } else if (message.length > MESSAGE_MAX) {
    // §15.12 — a longer body risks a truncated mailto: URL in some clients.
    errors.message = `Please keep this under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

export const hasErrors = (errors: FieldErrors): boolean => Object.keys(errors).length > 0;
