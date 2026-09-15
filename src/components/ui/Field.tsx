/**
 * @component  Field
 * @spec       design.md § C-23 (Contact Form inputs), § 10 A-03/A-07
 * @tokens     T-01.ink-500/copper-300/copper-500/text-hi/text-faint/danger, T-02.b-md/m-sm
 * @motion     floating label + focus bar scaleX 0→1 over dur-fast
 */
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  name: string;
  type?: "text" | "email";
  textarea?: boolean;
  rows?: number;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  /** Shows a live counter and warns as the mailto: ceiling approaches (§15.12). */
  maxLength?: number;
}

export function Field({
  label,
  name,
  type = "text",
  textarea,
  rows = 5,
  value,
  error,
  onChange,
  maxLength,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const control = cn(
    "peer w-full border-0 border-b bg-transparent py-3 text-b-md text-text-hi",
    "outline-none transition-colors duration-fast ease-out-spec placeholder:text-transparent",
    error ? "border-danger" : "border-ink-500",
  );

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(control, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={control}
        />
      )}

      {/* A-07 — a real label, never a placeholder */}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 font-mono uppercase transition-all duration-fast ease-out-spec",
          floated ? "top-0 -translate-y-full text-m-sm" : "top-3 text-m-sm",
          error ? "text-danger" : floated ? "text-copper-300" : "text-text-faint",
        )}
      >
        {label}
      </label>

      {/* Focus bar */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-copper-500 transition-transform duration-fast ease-out-spec peer-focus:scale-x-100"
      />

      <div className="mt-2 flex items-start justify-between gap-4">
        {error ? (
          <p id={errorId} className="font-mono text-m-sm text-danger">
            {error}
          </p>
        ) : (
          <span />
        )}

        {maxLength && (
          <span
            className={cn(
              "shrink-0 font-mono text-m-sm tabular-nums",
              value.length > maxLength ? "text-danger" : "text-text-faint",
            )}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
