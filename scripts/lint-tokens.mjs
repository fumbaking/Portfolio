/**
 * @file  scripts/lint-tokens.mjs
 * @spec  agent.md § 6 — enforces design.md rules R1 (spec header) and R2 (no magic values).
 * @usage npm run lint:tokens
 */

import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCAN = ["src/components", "src/app"];
/**
 * globals.css / motion.ts — the sanctioned homes for raw values (design.md § 0 R2).
 * Starfield.tsx — canvas 2D takes colour strings, not Tailwind classes; it reads the
 *   T-01 channels from CSS custom properties at runtime, so tokens stay authoritative.
 */
const EXEMPT = ["globals.css", "motion.ts", "Starfield.tsx"];

const RULES = [
  { re: /#[0-9a-fA-F]{3,8}\b/g, msg: "raw hex colour — use a T-01 token" },
  { re: /\b(?:rgba?|hsla?)\(/g, msg: "raw colour function — use a T-01 token" },
  { re: /cubic-bezier\(/g, msg: "inline easing — use T-06 via lib/motion.ts" },
  { re: /\bduration:\s*[\d.]+/g, msg: "inline duration — use DUR from lib/motion.ts (M-xx)" },
  { re: /\btext-\[\d+(?:px|rem)\]/g, msg: "arbitrary font size — use a T-02 scale token" },
  { re: /\bfontSize:\s*["']?\d/g, msg: "inline font size — use a T-02 scale token" },
];

const SPEC_HEADER = /@spec\s+design\.md/;

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(tsx?|css)$/.test(e.name)) out.push(full);
  }
  return out;
}

const problems = [];

for (const base of SCAN) {
  for (const file of await walk(join(ROOT, base))) {
    const name = file.split(sep).pop();
    if (EXEMPT.includes(name)) continue;

    const src = readFileSync(file, "utf8");
    const rel = relative(ROOT, file).split(sep).join("/");
    const lines = src.split("\n");

    // R1 — spec header in the first 15 lines
    if (!SPEC_HEADER.test(lines.slice(0, 15).join("\n"))) {
      problems.push(`${rel}:1 — R1: missing "@spec design.md § …" header`);
    }

    // R2 — no magic values
    lines.forEach((line, i) => {
      if (line.trimStart().startsWith("*") || line.trimStart().startsWith("//")) return;
      for (const { re, msg } of RULES) {
        re.lastIndex = 0;
        if (re.test(line)) problems.push(`${rel}:${i + 1} — R2: ${msg}`);
      }
    });
  }
}

if (problems.length) {
  console.error(`\n✗ lint:tokens — ${problems.length} violation(s)\n`);
  for (const p of problems) console.error("  " + p);
  console.error("\nSee design.md § 0 (R1, R2) and § 3 (tokens).\n");
  process.exit(1);
}

console.log("✓ lint:tokens — all components cite design.md and use tokens only");
