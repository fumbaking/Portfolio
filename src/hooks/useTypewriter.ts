/**
 * @file  hooks/useTypewriter.ts
 * @spec  design.md § C-08 (Typewriter), § S-01
 * @note  Timings are spec constants: type 70ms/char, hold 1600ms, delete 40ms/char.
 *        Under A-05 the hook returns the full string and never animates.
 */
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 70;
const HOLD_MS = 1600;
const DELETE_MS = 40;

export function useTypewriter(words: string[]): string {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;

    const word = words[index % words.length] ?? "";

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduced]);

  if (reduced) return words[0] ?? "";
  return text;
}

/** C-08 — reserve height with the longest role so the layout never shifts. */
export const longest = (words: string[]): string =>
  words.reduce((a, b) => (b.length > a.length ? b : a), "");
