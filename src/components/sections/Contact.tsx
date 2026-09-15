/**
 * @component  Contact
 * @spec       design.md § S-04 (Contact), § C-21, § C-22, § C-23, § L-03, § 15.5
 * @tokens     T-01.text-mid/text-hi/copper-300/text-faint, T-02.b-md/m-sm
 * @motion     M-01 sectionFlow, M-02 reveal
 */
"use client";

import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { sectionFlow, VIEWPORT_ONCE, reveal } from "@/lib/motion";
import { validateContact, hasErrors, type FieldErrors } from "@/lib/validate";
import { buildMailto, composeBody, isMailtoSafe, MESSAGE_MAX } from "@/lib/mailto";
import { profile, socials } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactRow } from "@/components/ui/ContactRow";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/chrome/Toast";
import type { ContactPayload } from "@/types";

/** C-21 already surfaces this address; the form composes to the same inbox. */
const MAIL_TO = socials.find((s) => s.icon === "mail")?.value ?? "";

const EMPTY: ContactPayload = { name: "", email: "", subject: "", message: "" };

type Status = "idle" | "opening" | "copied";

export function Contact() {
  const reduced = useReducedMotion();
  const toast = useToast();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof ContactPayload) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /**
   * §15.12 — the message is handed to the viewer's own mail client rather than POSTed.
   * Nothing is transmitted from this page, so the draft is never lost to a network or
   * provider failure; the only failure mode is "no mail client", which the clipboard
   * fallback below covers.
   */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validateContact(values);
    if (hasErrors(found)) {
      setErrors(found);
      return;
    }

    const url = buildMailto({ to: MAIL_TO, ...values });

    if (!isMailtoSafe(url)) {
      setErrors({ message: "This message is a little too long to open in a mail app." });
      return;
    }

    setStatus("opening");
    toast("success", "Opening your email app — your message is in the draft.");
    window.location.href = url;
    setTimeout(() => setStatus("idle"), 3000);
  };

  /** Fallback for viewers with no mail client configured (§15.12). */
  const onCopy = async () => {
    const text = `To: ${MAIL_TO}\r\nSubject: ${values.subject}\r\n\r\n${composeBody(values)}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      toast("success", "Message copied — paste it into your email app.");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      toast("error", `Couldn't copy. My address is ${MAIL_TO}.`);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen scroll-mt-24 px-6 py-section md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-content">
        <SectionHeader index="04" eyebrow="Let's Connect" title="Get In" accentWord="Touch" />

        <m.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16"
          variants={sectionFlow}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {/* ── Left ───────────────────────────────────────────────── */}
          <m.div variants={reveal} className="flex flex-col gap-10">
            <p className="max-w-[46ch] text-b-md text-text-mid">
              Have a project in mind, a question, or just want to say hello? My inbox is always
              open. I typically respond within{" "}
              <span className="font-medium text-copper-300">{profile.responseTime}</span>.
            </p>

            <div className="flex flex-col gap-6">
              {socials.map((link) => (
                <ContactRow key={link.label} link={link} />
              ))}
            </div>

            {profile.availability && (
              <div>
                <AvailabilityPill label="Available for new projects" />
              </div>
            )}
          </m.div>

          {/* ── Right — C-23 ───────────────────────────────────────── */}
          <m.form variants={reveal} onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <Field
                label="Your Name"
                name="name"
                value={values.name}
                error={errors.name}
                onChange={set("name")}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={set("email")}
              />
            </div>

            <Field
              label="Subject"
              name="subject"
              value={values.subject}
              error={errors.subject}
              onChange={set("subject")}
            />

            <Field
              label="Message"
              name="message"
              textarea
              value={values.message}
              error={errors.message}
              onChange={set("message")}
              maxLength={MESSAGE_MAX}
            />

            {/*
              §15.12 — no honeypot: nothing is POSTed anywhere, so there is no endpoint
              for a bot to abuse. Spam protection belongs to the mail provider now.
            */}

            <div className="flex flex-col gap-4">
              <p className="font-mono text-m-sm uppercase text-text-faint">
                * Opens in your email app — nothing is sent from this page
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" variant="primary">
                  {status === "opening" && <Icon name="check" size={14} />}
                  {status === "opening" ? "Opening…" : "Compose Email"}
                </Button>

                {/* Fallback when no mail client is configured */}
                <Button type="button" variant="ghost" onClick={onCopy}>
                  {status === "copied" && <Icon name="check" size={14} />}
                  {status === "copied" ? "Copied" : "Copy Instead"}
                </Button>
              </div>
            </div>
          </m.form>
        </m.div>
      </div>
    </section>
  );
}
