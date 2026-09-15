/**
 * @component  Footer
 * @spec       design.md § C-25 (Footer), § 15.5
 * @tokens     T-01.ink-950/line/copper-300/text-low, T-02.m-md
 * @motion     underline grows from left on hover (CSS)
 */

import { profile, socials } from "@/data/profile";

export function Footer() {
  const mail = socials.find((s) => s.icon === "mail");

  return (
    <footer className="relative z-raised border-t border-line bg-ink-950 px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-m-md uppercase text-text-low">
          © 2026 · <span className="text-copper-300">{profile.name}</span>
        </p>

        <div className="flex items-center gap-6">
          {/* §15.5 — no social profiles on the CV; show location + email instead. */}
          <span className="font-mono text-m-md uppercase text-text-low">{profile.location}</span>
          {mail?.href && (
            <a
              href={mail.href}
              className="group relative rounded-r-sm font-mono text-m-md uppercase text-text-low transition-colors duration-fast ease-out-spec hover:text-copper-300"
            >
              Email
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper-500 transition-transform duration-fast ease-out-spec group-hover:scale-x-100" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
