# agent.md — Build Protocol

**Role:** You are the implementing agent for this portfolio.
**Source of truth:** [`design.md`](design.md). It outranks your own judgement, this file, and any
pattern you have seen elsewhere.
**Stack (fixed, do not substitute):** Next.js 15 App Router · TypeScript (strict) · Tailwind CSS ·
**Framer Motion** (`motion` package, imported as `motion/react`).

---

## 1. Operating rules

| #  | Rule                                                                                                                                                                        |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | **Read `design.md` before every task.** Re-read the specific `C-xx` / `S-xx` section you are about to implement. Do not work from memory of it.                                |
| 2  | **Header contract (R1).** Every file in `src/components/**`, `src/app/**`, `src/lib/motion.ts` opens with the `@component / @spec / @tokens / @motion` block shown in `design.md` §0. A file without it is incomplete. |
| 3  | **No magic values (R2).** No raw hex, `px` font size, duration, or easing in a component. Use Tailwind token classes or CSS vars from `globals.css`. `npm run lint:tokens` must pass. |
| 4  | **No unlisted components (R3).** Need something not in `design.md` §6/§7? Append the spec to `design.md` with a new ID, then implement it. Never the reverse order.            |
| 5  | **Motion lives in `src/lib/motion.ts`.** Components import variants by name (`sectionFlow`, `reveal`, `flip`…). No inline `transition={{ … }}` objects anywhere.               |
| 6  | **Content lives in `src/data/*`.** No headline, bullet, label, or URL is hard-coded in a component. Components take typed props (`design.md` §9).                              |
| 7  | **`"use client"` only where required** — anything using state, effects, refs, `motion` hooks, or browser APIs. Sections that are purely presentational stay server components. |
| 8  | **Accessibility is acceptance criteria, not polish.** `design.md` §10 A-01…A-07 must hold before a phase is called done.                                                       |
| 9  | **Verify before reporting.** Run the phase gate (§5). Report what actually passed, and name anything that did not.                                                             |
| 10 | **Ask only when blocked on a decision.** Missing personal content (name, links, résumé) → use the placeholders in `src/data/*` and flag them; do not stall the build.          |

---

## 2. Target architecture

Build exactly the tree in `design.md` §12 (F-01). Layer responsibilities:

```
app/layout.tsx        Fonts (next/font) · <MotionConfig reducedMotion="user"> · global chrome
                      (C-01 C-02 C-03 C-04 C-05 C-06 C-24 C-25 C-26) · skip-link · <main id="main">
app/page.tsx          Server component. Imports data, renders S-01…S-04 with typed props.
app/globals.css       Tailwind layers + all T-01…T-09 tokens as CSS custom properties + base reset
tailwind.config.ts    Maps CSS vars → Tailwind scale (colors, fontSize, radius, shadow, z-index)
lib/motion.ts         M-01…M-10 variants + EASE constants. The only place easing/duration exist.
hooks/*               One concern per hook. All SSR-safe (guard `window`, use useEffect).
data/*                Typed content (D-01…D-05). Swappable without touching components.
components/chrome/*   Persistent, page-level, client.
components/ui/*       Reusable primitives. Pure, prop-driven, no data imports.
components/sections/* Composition only — arrange ui/* primitives, own no visual constants.
```

**Dependency direction is one-way:** `sections → ui → lib/hooks → tokens`. A `ui/` component must
never import from `sections/` or `data/`.

---

## 3. Build phases

Work in order. **Do not begin a phase until the previous phase's gate (§5) passes.** Commit at
each gate with the message shown.

### Phase 0 — Scaffold

```bash
npx create-next-app@latest . --ts --tailwind --app --src-dir --import-alias "@/*" --eslint
npm i motion clsx tailwind-merge
npm i -D @types/node prettier prettier-plugin-tailwindcss
```

- Create every directory in F-01, each with an `index.ts` barrel where it helps.
- `tsconfig.json`: `"strict": true`, `"noUncheckedIndexedAccess": true`.
- Add scripts to `package.json`:
  ```json
  "lint:tokens": "node scripts/lint-tokens.mjs",
  "check": "tsc --noEmit && next lint && npm run lint:tokens"
  ```
- Write `scripts/lint-tokens.mjs` (§6).

**Commit:** `chore: scaffold Next.js + Framer Motion architecture per design.md F-01`

### Phase 1 — Token layer (T-01…T-09)

- `app/globals.css`: declare every color, gradient, shadow, duration, easing, and z-index from
  `design.md` §3 as CSS custom properties on `:root`.
- `tailwind.config.ts`: map them so `bg-ink-900`, `text-copper-300`, `border-line`,
  `shadow-glow-copper-md`, `text-d-hero`, `rounded-r-lg`, `z-nav` all resolve.
- `app/layout.tsx`: load the three fonts with `next/font/google` → CSS vars
  `--font-display`, `--font-body`, `--font-mono`; wire `src/config/theme.ts`.
- Build a temporary `/styleguide` route rendering every color swatch, type size, shadow, and
  radius. **Keep it until Phase 7, then delete it.**

**Gate:** every token in §3 is visible on `/styleguide` and named correctly.
**Commit:** `feat(tokens): Gunmetal & Copper palette + type scale (T-01…T-09)`

### Phase 2 — Motion layer (M-01…M-10)

- `lib/motion.ts`: export `EASE_OUT`, `EASE_IN_OUT`, `SPRING`, `DUR`, and the ten variants.
- Hooks: `useMediaQuery`, `useActiveSection`, `useScrollProgress`, `useTypewriter`,
  `useLockBodyScroll`, `useMagnetic`.
- `MotionConfig reducedMotion="user"` in `layout.tsx`; every variant must degrade per A-05.

**Gate:** `/styleguide` gains a motion row demoing M-01…M-10; toggling OS reduced-motion visibly
flattens them.
**Commit:** `feat(motion): Framer Motion variant library (M-01…M-10)`

### Phase 3 — Primitives (C-09…C-12, C-18, C-20, C-21b)

Order: `Reveal C-12` → `Button C-09` → `SectionHeader C-11` → `Chip C-18` → `Tag C-20` →
`IconTile C-21b`. Each gets a `/styleguide` entry showing **all** states from `design.md`.

**Gate:** all states render; keyboard focus visible on every interactive primitive.
**Commit:** `feat(ui): base primitives (C-09, C-11, C-12, C-18, C-20, C-21b)`

### Phase 4 — Chrome (C-01…C-06, C-24…C-26)

Order: `Starfield C-03` → `Navbar C-04` → `MobileMenu C-05` → `SideRails C-06` → `BackToTop C-26`
→ `Toast C-24` → `Footer C-25` → `Cursor C-02` → `Preloader C-01` (last — it gates the hero).

Watch for: SSR guards on all window/canvas access; `AnimatePresence` for C-01/C-05/C-24/C-26;
focus trap + `Esc` + scroll lock in C-05; `aria-hidden` on C-03 and C-06.

**Gate:** scroll the empty page — nav switches to `scrolled`, rails track progress, FAB appears
past 60vh, mobile menu traps focus, no hydration warning.
**Commit:** `feat(chrome): persistent page chrome (C-01…C-06, C-24…C-26)`

### Phase 5 — Sections

One section per commit, in order:

| Order | Section        | Components built along the way          |
| ----- | -------------- | --------------------------------------- |
| 5a    | Hero S-01      | C-07, C-08 Typewriter, C-10 ScrollCue   |
| 5b    | About S-02     | C-13, C-14, C-15, C-16, C-17            |
| 5c    | Works S-03     | C-19 ProjectFlipCard                    |
| 5d    | Contact S-04   | C-21, C-22, C-23 + `ui/Field`, `/api/contact` |

Fill `src/data/*` with real content as you go (placeholders flagged with `// TODO:CONTENT`).

**Gate per section:** matches its `design.md` spec at 390 / 768 / 1440px; reveals fire once;
`npm run check` passes.
**Commits:** `feat(hero): S-01 …` · `feat(about): S-02 …` · `feat(works): S-03 …` ·
`feat(contact): S-04 …`

### Phase 6 — Wiring & polish

- `app/page.tsx` composes S-01…S-04; `next/dynamic` for Works and Contact (P-01).
- Metadata, `opengraph-image.tsx`, favicon, `robots.ts`, `sitemap.ts`.
- `/api/contact`: zod-style validation (`lib/validate.ts`), honeypot, rate limit, typed responses.

**Commit:** `feat(app): compose page, metadata, contact API`

### Phase 7 — Audit & handoff

- Delete `/styleguide`.
- Run the full gate (§5) plus Lighthouse on a production build.
- Verify `design.md` §13 traceability matrix: every ID → exactly one file, every file → ≥ 1 ID.
- Produce the handoff report (§7).

**Commit:** `chore: audit pass — a11y, perf, traceability`

---

## 4. Code conventions

```tsx
/**
 * @component  ProjectFlipCard
 * @spec       design.md § C-19 (Project Flip Card), § S-03 (Works)
 * @tokens     T-01.ink-700, T-01.copper-300, T-04.r-lg, T-09.grad-proj-a
 * @motion     M-05 (flip), M-04 (cardLift)
 */
"use client";

import { motion, AnimatePresence } from "motion/react";
import { flip, cardLift } from "@/lib/motion";
import type { Project } from "@/types";

interface ProjectFlipCardProps {
  project: Project;
  index: number;
}

export function ProjectFlipCard({ project, index }: ProjectFlipCardProps) { … }
```

- **Named exports** for components; default export only for Next.js route files.
- **`interface XProps`** declared directly above the component. No `React.FC`.
- **`cn()`** (`clsx` + `tailwind-merge`) for every conditional class.
- Tailwind class order: layout → box → typography → color → effects → state variants → responsive.
- Files: `PascalCase.tsx` for components, `camelCase.ts` for hooks/lib, `kebab-case` for routes.
- No `any`. No `// @ts-ignore`. No `!` non-null assertions without a comment saying why.

**Framer Motion specifics**

- Import from `"motion/react"` (Framer Motion v11+). If the installed version only exposes
  `"framer-motion"`, use that path consistently everywhere — never mix the two.
- `whileInView` + `viewport={{ once: true, amount }}` for reveals — never a manual
  IntersectionObserver where a variant will do.
- `layoutId` for the nav underline (C-04) and the active chip pill (C-18).
- `AnimatePresence` requires a stable `key` and an `exit` variant on the direct child.
- Prefer `transform`/`opacity`. Never animate `width`, `height`, `top`, or `left`.

---

## 5. Phase gate (run before declaring any phase done)

```bash
npm run check          # tsc --noEmit && next lint && lint:tokens
npm run build          # must succeed with zero warnings
```

> **Stop the dev server before running `npm run build`.** `next dev` and `next build` share the
> `.next` directory; running them concurrently corrupts the dev cache and produces misleading
> failures such as `Could not find the module …#SegmentViewNode in the React Client Manifest` or
> `__webpack_modules__[moduleId] is not a function`, usually surfacing as a `GET / 500`. These are
> cache artefacts, not code defects — recover with `npm run dev:clean`, which wipes `.next` first.

Then verify by hand:

- [ ] Every new file has the `@spec` header (R1).
- [ ] No raw hex / px font size / duration outside `globals.css` + `tailwind.config.ts` (R2).
- [ ] Renders correctly at 390px, 768px, 1440px.
- [ ] Tab through the whole page — focus is always visible and never trapped unintentionally.
- [ ] OS reduced-motion on: no marquee, no starfield animation, no cursor, no preloader.
- [ ] Console is clean — no hydration mismatch, no key warnings.
- [ ] `design.md` §13 updated.

---

## 6. `scripts/lint-tokens.mjs` (enforces R2)

Scan `src/components/**` and `src/app/**` (excluding `globals.css`) and fail the build on:

| Pattern                                              | Why it fails               |
| ---------------------------------------------------- | -------------------------- |
| `/#[0-9a-fA-F]{3,8}\b/`                              | raw hex → use a token       |
| `/\b(rgb|rgba|hsl)\(/`                               | raw color → use a token     |
| `/\bduration:\s*[\d.]+/` outside `lib/motion.ts`     | inline duration → M-xx      |
| `/cubic-bezier\(/` outside `lib/motion.ts`           | inline easing → T-06        |
| `/\btext-\[\d+px\]/`, `/\bfontSize:\s*['"]?\d/`      | arbitrary type size → T-02  |
| File in `components/` without `@spec` in first 15 lines | R1 violation             |

Exit code 1 with `file:line — rule` for each hit.

---

## 7. Handoff report (Phase 7 output)

```
BUILD REPORT
├─ Phases completed      : 0–7
├─ Components            : 26 / 26 implemented, 26 / 26 spec-referenced
├─ Gate                  : tsc ✓  lint ✓  lint:tokens ✓  build ✓
├─ Lighthouse (prod)     : Perf __  A11y __  Best __  SEO __       (target ≥ 95, P-01)
├─ First-load JS on "/"  : __ kB gzip                              (budget < 140 kB)
├─ Reduced-motion path   : verified ✓ / issues: …
├─ Placeholders left     : list every `// TODO:CONTENT`
└─ design.md deviations  : ID · what changed · why · spec updated? (must be yes)
```

Report honestly. A failed metric named is worth more than a passed metric assumed.

---

## 8. Quick reference

| Need                    | Go to                        |
| ----------------------- | ---------------------------- |
| A color / size / shadow | `design.md` §3 (T-01…T-09)   |
| An animation            | `design.md` §5 (M-01…M-10) → `lib/motion.ts` |
| A component's states    | `design.md` §6 / §7 (C-xx)   |
| Section layout          | `design.md` §4 (L-xx), §8 (S-xx) |
| Content shape           | `design.md` §9 (D-xx)        |
| A11y requirement        | `design.md` §10 (A-xx)       |
| "Is this done?"         | `design.md` §14 + `agent.md` §5 |
