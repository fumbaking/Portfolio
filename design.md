# design.md — Portfolio Design Specification

**Replica target:** `https://deborahingabireportfolio.netlify.app/`
**Palette:** replaced with **"Gunmetal & Copper"** — a masculine, warm-industrial scheme.
**Stack:** Next.js (App Router, TypeScript) + Tailwind CSS + **Framer Motion** (`motion/react`).

---

## 0. How to use this document (binding contract)

This file is the **single source of truth**. It is structured as an ID-addressed catalogue:

| Prefix | Meaning        | Example |
| ------ | -------------- | ------- |
| `T-xx` | Design token   | `T-01`  |
| `L-xx` | Layout rule    | `L-02`  |
| `M-xx` | Motion recipe  | `M-03`  |
| `C-xx` | Component      | `C-07`  |
| `S-xx` | Page section   | `S-02`  |
| `D-xx` | Data model     | `D-03`  |
| `A-xx` | Accessibility  | `A-01`  |

**Rule R1 — every component must cite this document.** Every file under `src/components/**`
and `src/app/**` opens with a reference header:

```tsx
/**
 * @component  ProjectFlipCard
 * @spec       design.md § C-19 (Project Flip Card)
 * @tokens     T-01.copper-500, T-01.ink-600, T-04.r-lg, T-05.glow-copper-md
 * @motion     M-05 (flip), M-02 (reveal)
 */
```

**Rule R2 — no unlisted values.** No raw hex, px font size, duration, or easing may appear in a
component. Everything resolves to a token in §3. If a value is missing, add it to this document
first, then use it.

**Rule R3 — no unlisted components.** If a UI element is needed that is not in §6/§7, append it
with a new ID before writing the code.

**Rule R4 — the traceability matrix (§13) must stay complete.** Every ID has exactly one
implementing file; every implementing file cites at least one ID.

---

## 1. Product overview

A single-page, dark, editorial-luxe developer portfolio. Four narrative sections scroll behind
persistent "chrome" (cursor, starfield, rails, nav). The tone is **quiet confidence: serif
headlines, molten copper accents, generous negative space.**

Route map (App Router):

| Route                  | Type             | Purpose                                 |
| ---------------------- | ---------------- | --------------------------------------- |
| `/`                    | Server Component | Composes S-01 → S-05                    |
| `/opengraph-image.jpg` | Static asset     | OG card (§15.9)                         |
| `/twitter-image.jpg`   | Static asset     | Twitter card (§15.9)                    |

There is **no API route**: C-23 composes a `mailto:` draft in the viewer's own client (§15.12),
so the site is fully static and holds no secrets.

---

## 2. Design principles

1. **Dark ground, single warm accent.** Copper carries every call-to-action. Steel blue is the
   only secondary. Nothing else is chromatic.
2. **Serif for statements, sans for substance, mono for labels.** Never mix roles (T-02).
3. **Motion reveals, it does not decorate.** Every animation is entrance, state change, or
   feedback. Ambient motion is limited to the starfield (C-03) and marquee (C-17).
4. **Numerals as architecture.** Oversized ghost numerals (`01`–`04`) anchor each section and
   timeline card. They are structure, not ornament.
5. **One idea per viewport.** Sections are `min-h-screen`; content breathes.
6. **Reduced motion is a first-class path,** not a fallback (A-05).

---

## 3. Design tokens

### T-01 — Color: "Gunmetal & Copper"

Replaces the source palette (`--bg:#080511`, `--purple:#7c3aed`, `--purple-lt:#a78bfa`).
Copper reads as forged metal, leather and whiskey; steel reads as blueprint and machined edge.
Both sit on a blue-black gunmetal ground, so the warm accent stays the only thing that glows.

**Ink (surfaces) — cool gunmetal ramp**

| Token       | Hex       | Use                                             |
| ----------- | --------- | ----------------------------------------------- |
| `ink-950`   | `#04060A` | Page backdrop behind starfield, footer floor     |
| `ink-900`   | `#080B11` | **Base background** (direct swap for `#080511`)  |
| `ink-800`   | `#0D121A` | Alternating section wash, scrolled nav fill      |
| `ink-700`   | `#131A24` | Card face, flip-card back                        |
| `ink-600`   | `#1B242F` | Elevated surface, input fill, chip rest          |
| `ink-500`   | `#27333F` | Strong border, divider on card                   |
| `line`      | `#1E2833` | Hairline border (default `border-color`)         |

**Copper (primary accent)**

| Token        | Hex       | Use                                               |
| ------------ | --------- | ------------------------------------------------- |
| `copper-700` | `#6E3A1C` | Pressed state, deep end of gradients               |
| `copper-600` | `#8A4A24` | Hover fill, gradient stop                          |
| `copper-500` | `#C2703F` | **Primary** (swap for `#7c3aed`) — buttons, rings  |
| `copper-400` | `#D98C4F` | Hover of `copper-500`, icon strokes                |
| `copper-300` | `#E3A063` | **Accent text** (swap for `#a78bfa`)               |
| `copper-200` | `#F0C48E` | Highlight word in headings, focus glow core        |

**Steel (secondary accent — ≤ 15% of accent surface area)**

| Token       | Hex       | Use                                              |
| ----------- | --------- | ------------------------------------------------ |
| `steel-600` | `#2F5670` | Project gradient cool stop, timeline rail         |
| `steel-500` | `#4A7C9B` | Secondary chip active, "Figma" category tint      |
| `steel-400` | `#7FB0CC` | Link hover on cool surfaces                       |

**Text**

| Token        | Hex       | On        | Contrast | Use                             |
| ------------ | --------- | --------- | -------- | ------------------------------- |
| `text-hi`    | `#EDF0F3` | `ink-900` | ~16:1    | Headings, input values           |
| `text-mid`   | `#A8B2BE` | `ink-900` | ~8:1     | Body paragraphs                  |
| `text-low`   | `#6B7684` | `ink-900` | ~4.1:1   | Meta, captions (≥ 14px only)     |
| `text-faint` | `#46515E` | `ink-900` | —        | Ghost numerals, decorative only  |

**Semantic**

| Token     | Hex       | Use                             |
| --------- | --------- | ------------------------------- |
| `success` | `#4E9A6B` | Toast success, availability dot  |
| `warning` | `#C9A227` | Form warning                     |
| `danger`  | `#C05A4B` | Field error, toast error         |

**Alpha utilities**

```
--a-copper-00: rgb(194 112 63 / 0)      /* animatable "transparent" (C-02) */
--a-copper-04: rgb(194 112 63 / 0.04)   /* card wash            */
--a-copper-10: rgb(194 112 63 / 0.10)   /* chip rest, tag fill  */
--a-copper-20: rgb(194 112 63 / 0.20)   /* border on hover      */
--a-copper-35: rgb(194 112 63 / 0.35)   /* focus ring           */
--a-steel-10:  rgb(74 124 155 / 0.10)
--a-white-06:  rgb(255 255 255 / 0.06)  /* glass border         */
```

### T-09 — Gradients

```
--grad-accent:  linear-gradient(135deg, #D98C4F 0%, #8A4A24 100%)          /* buttons, FAB */
--grad-card:    linear-gradient(160deg, #1B242F 0%, #0D121A 100%)          /* card face    */
--grad-proj-a:  linear-gradient(145deg, #8A4A24 0%, #2F5670 100%)          /* Front-end art */
--grad-proj-b:  linear-gradient(145deg, #6E3A1C 0%, #131A24 100%)          /* Java art     */
--grad-proj-c:  linear-gradient(145deg, #2F5670 0%, #131A24 100%)          /* Figma art    */
--grad-text:    linear-gradient(90deg, #EDF0F3 0%, #E3A063 60%, #C2703F 100%)
--grad-rule:    linear-gradient(90deg, transparent, #C2703F, transparent)  /* section rules */
--grad-veil:    linear-gradient(180deg, transparent 0%, #080B11 85%)       /* image bottoms */
--grad-veil-portrait: 0% → 45% clear, then to ink-900 at 100%  /* C-13: clears the face */
```

### T-05 — Elevation & glow

```
--glow-copper-sm: 0 0 0 1px rgb(194 112 63 / .20), 0 8px 24px rgb(110 58 28 / .18)
--glow-copper-md: 0 0 0 1px rgb(194 112 63 / .25), 0 24px 60px rgb(110 58 28 / .22)
--glow-copper-lg: 0 0 40px rgb(194 112 63 / .35)
--shadow-card:    0 18px 40px rgb(4 6 10 / .55)
--shadow-nav:     0 1px 0 rgb(255 255 255 / .04), 0 12px 32px rgb(4 6 10 / .45)
--inner-hairline: inset 0 1px 0 rgb(255 255 255 / .05)
```

### T-02 — Typography

The replica keeps the source's three-role type system. Only color changes.

| Role      | Family                                       | Loader             | Use                                          |
| --------- | -------------------------------------------- | ------------------ | -------------------------------------------- |
| `display` | **Cormorant Garamond** (400/600/700, italic) | `next/font/google` | H1, section titles, pull quote, card titles   |
| `body`    | **DM Sans** (400/500/700)                    | `next/font/google` | Paragraphs, buttons, form, nav                |
| `mono`    | **JetBrains Mono** (400/500)                 | `next/font/google` | Eyebrows, tags, meta, rails, numerals         |

> **Optional masculine display variant (documented, off by default):** swapping `display` to
> **Fraunces** (`wght 600`, `SOFT 0`, `WONK 0`) gives a heavier, squarer serif. Toggle is
> `FONT_DISPLAY` in `src/config/theme.ts`. Color is the only mandated change; this is opt-in.

**Scale** (fluid, `clamp(min, preferred, max)`):

| Token     | Size                             | Line | Tracking  | Role                     |
| --------- | -------------------------------- | ---- | --------- | ------------------------ |
| `d-hero`  | `clamp(3rem, 10vw, 7.5rem)`      | 0.95 | `-0.03em` | H1 (C-07)                |
| `d-1`     | `clamp(2.5rem, 6vw, 4.5rem)`     | 1.0  | `-0.02em` | Section titles (C-11)    |
| `d-2`     | `clamp(1.75rem, 3.2vw, 2.5rem)`  | 1.15 | `-0.01em` | Pull quote (C-14)        |
| `d-3`     | `clamp(1.25rem, 2vw, 1.6rem)`    | 1.2  | `0`       | Card titles (C-15, C-19) |
| `b-lg`    | `clamp(1rem, 1.3vw, 1.125rem)`   | 1.7  | `0`       | Hero sub, intro copy     |
| `b-md`    | `0.9375rem`                      | 1.75 | `0`       | Body default             |
| `b-sm`    | `0.875rem`                       | 1.6  | `0`       | Card body, list items    |
| `m-lg`    | `0.8125rem`                      | 1.4  | `0.25em`  | Nav links, buttons (mono, uppercase) |
| `m-md`    | `0.75rem`                        | 1.4  | `0.3em`   | Eyebrows, tags           |
| `m-sm`    | `0.6875rem`                      | 1.3  | `0.35em`  | Rails, footnotes         |
| `numeral` | `clamp(4rem, 12vw, 9rem)`        | 1    | `-0.04em` | Ghost numerals (C-11, C-15) |

### T-03 — Spacing

4px base. `s-1=4 · s-2=8 · s-3=12 · s-4=16 · s-5=20 · s-6=24 · s-8=32 · s-10=40 · s-12=48 ·
s-16=64 · s-20=80 · s-24=96 · s-32=128 · s-40=160`

Section rhythm: `py-[clamp(5rem,12vh,9rem)]`. Gutter: `px-6 md:px-12 lg:px-16`.

### T-04 — Radius

`r-xs=4 · r-sm=8 · r-md=12 · r-lg=16 · r-xl=24 · r-2xl=32 · r-full=9999`

### T-06 — Motion

| Token         | Value                                             | Use                       |
| ------------- | ------------------------------------------------- | ------------------------- |
| `dur-instant` | `0.15s`                                           | Chip/tag toggle           |
| `dur-fast`    | `0.25s`                                           | Hover, focus              |
| `dur-base`    | `0.4s`                                            | Card lift, nav shift      |
| `dur-slow`    | `0.8s`                                            | Reveal (C-12)             |
| `dur-slower`  | `0.9s`                                            | Section flow (M-01)       |
| `dur-flip`    | `0.7s`                                            | Flip card (M-05)          |
| `ease-out`    | `cubic-bezier(0.22, 1, 0.36, 1)`                  | **Default** — all reveals |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`                  | Flip, menu                |
| `ease-spring` | `{ type: "spring", stiffness: 260, damping: 26 }` | Cursor, FAB, magnetic     |
| `stagger`     | `0.08s`                                           | Child delay in lists      |

### T-07 — Z-index

`z-base=0 · z-raised=10 · z-rails=20 · z-nav=50 · z-menu=60 · z-toast=70 · z-cursor=90 ·
z-preloader=100`

### T-08 — Breakpoints

`sm=640 · md=768 · lg=1024 · xl=1280 · 2xl=1536`. Mobile-first. Max content width `1280px`.

---

## 4. Layout system

**L-01 — Page shell.** `<body>` is `bg-ink-900 text-text-mid font-body antialiased`, with
`overflow-x-hidden` and smooth scrolling (disabled under A-05). Chrome components (C-01–C-06,
C-24, C-25, C-26) render in `app/layout.tsx`; sections render in `app/page.tsx`.

**L-02 — Section container.** Every section: `id`, `min-h-screen`, `relative`,
`px-6 md:px-12 lg:px-16`, inner `mx-auto w-full max-w-[1280px]`, and `scroll-mt-24` so anchor
jumps clear the fixed nav.

**L-03 — Grid conventions.**

| Context                | Mobile | md    | lg                          |
| ---------------------- | ------ | ----- | --------------------------- |
| About (C-13 ↔ copy)    | 1 col  | 1 col | 2 col `5fr 7fr`, gap `s-16` |
| Timeline (C-15)        | 1 col  | 2 col | 3 col, gap `s-6`            |
| Projects (C-19)        | 1 col  | 2 col | 4 col, gap `s-5`            |
| Contact (C-21 ↔ C-23)  | 1 col  | 1 col | 2 col `2fr 3fr`, gap `s-16` |

---

## 5. Motion system (Framer Motion)

All variants live in `src/lib/motion.ts` and are imported by ID. **No component defines an inline
transition object.** The root wraps children in `<MotionConfig reducedMotion="user">`.

**M-01 — `sectionFlow`** (replaces the source's `.section-flow` CSS class)

```ts
hidden:  { opacity: 0, y: 60 }
visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT, staggerChildren: 0.08 } }
```

Applied with `whileInView` + `viewport={{ once: true, amount: 0.2 }}`.

**M-02 — `reveal`** (replaces `.reveal`) — `{ opacity:0, y:28 } → { opacity:1, y:0 }`,
`dur-slow`, `ease-out`. Child variant of M-01; inherits stagger.

**M-03 — `heroEnter`** — orchestrated sequence after C-01 exits: eyebrow (`delay 0`) → H1 words
(`stagger 0.06`, `y:40`, `filter: blur(8px) → blur(0)`) → typewriter mounts (`0.5`) → paragraph
(`0.6`) → buttons (`0.75`) → scroll cue (`0.9`).

**M-04 — `cardLift`** — `whileHover={{ y: -6 }}` + `boxShadow: glow-copper-md`, `dur-base`.

**M-05 — `flip`** — `rotateY: 0 → 180` on the inner wrapper, `dur-flip`, `ease-in-out`, parent
`perspective: 1400px`, faces `backface-visibility: hidden`.

**M-06 — `marquee`** — `animate={{ x: ["0%", "-50%"] }}`, `repeat: Infinity`, `ease: "linear"`,
`duration` derived from C-16 slider: `40 - speed * 0.3` seconds (range 10–40s).

**M-07 — `menuOverlay`** — `clipPath: circle(0% at 100% 0%) → circle(150% at 100% 0%)`,
`dur-base`, `ease-in-out`; links stagger in at `0.06`.

**M-08 — `toast`** — `{ opacity:0, y:24, scale:0.96 } → { opacity:1, y:0, scale:1 }`,
`ease-spring`; auto-dismiss 4s; exits via `AnimatePresence`.

**M-09 — `scrollProgress`** — `useScroll()` → `scaleY` on the right rail, smoothed with
`useSpring({ stiffness: 120, damping: 30 })`.

**M-10 — `magnetic`** — pointer offset → `x/y` within ±8px, `ease-spring`, snaps back on
`pointerleave`. Disabled on coarse pointers and under A-05.

---

## 6. Global chrome components

### C-00 — Motion Provider

**File** `src/components/chrome/MotionProvider.tsx` · client
Thin client boundary wrapping the whole tree in `<MotionConfig reducedMotion="user">` with the
default transition `{ duration: dur-base, ease: ease-out }`. It exists so `app/layout.tsx` can stay
a server component while every descendant still honours A-05 without its own reduced-motion check.
Renders no markup of its own.

### C-01 — Preloader

**File** `src/components/chrome/Preloader.tsx` · client
**Anatomy** Full-bleed `ink-950` panel · monogram mark drawn in `copper-500` · letters of the full
name fade up with `stagger 0.05` · 1px progress rule (`grad-rule`) grows `scaleX 0→1` over 1.2s.
**Exit** `clipPath: inset(0 0 0% 0) → inset(0 0 100% 0)`, `ease-out`, `0.6s`; unmounts via
`AnimatePresence`, then signals the hero so M-03 begins.
**Rules** Max lifetime 2.0s regardless of load. Once per session (`sessionStorage["preloaded"]`).
Under A-05 it is skipped entirely.
**Tokens** `ink-950`, `copper-500`, `grad-rule`, `z-preloader`.

### C-02 — Custom Cursor

**File** `src/components/chrome/Cursor.tsx` · client
**Anatomy** 6px `copper-400` dot tracking the pointer 1:1 · 32px ring, `1px solid a-copper-35`,
trailing via `useSpring`.
**States** `default` · `hover` (ring → 56px, fill `a-copper-10`) over `a`, `button`,
`[data-cursor]` · `text` (ring → 2×40px bar) over inputs · `hidden` when the pointer leaves.
**Rules** Rendered only under `(pointer: fine)`. The native cursor is hidden **only** on that media
query, never on touch. Disabled under A-05. `pointer-events: none`, `z-cursor`.

### C-03 — Starfield Canvas

**File** `src/components/chrome/Starfield.tsx` · client
**Anatomy** `<canvas>` fixed, `z-base`, behind all content, `opacity .55`.
**Behaviour** 90 particles (60 below `md`), radius 0.4–1.4px, colors sampled from
`[copper-300, steel-400, text-faint]` weighted `2:1:5`. Drift `y -0.02…-0.08 px/frame`, sine
twinkle `opacity .15….7`. Parallax: canvas translates `-2%` of scroll progress.
**Rules** `requestAnimationFrame` paused when `document.hidden`. Single static frame under A-05.
Respects the CPU budget in P-01.

### C-04 — Navbar

**File** `src/components/chrome/Navbar.tsx` · client
**Anatomy** `fixed inset-x-0 top-0 z-nav` · `px-6 md:px-12 py-4` · left monogram (mono, bold,
`copper-300`) · right links `HOME · ABOUT · WORKS · CONTACT` (`m-lg`, uppercase, `text-low`).
**States**

- `top` — transparent, no border.
- `scrolled` (`scrollY > 40`) — `bg-ink-800/80`, `backdrop-blur-md`, `border-b border-line`,
  `shadow-nav`; transitions over `dur-base`.
- `active link` — `text-copper-300` + a 1px `copper-500` bar beneath, using
  `layoutId="nav-underline"` so it slides between items.
- `hover` — `text-text-hi`; underline grows `scaleX 0→1` from the left, `dur-fast`.

**Behaviour** Active section from `useActiveSection` (IntersectionObserver,
`rootMargin: "-45% 0px -55% 0px"`). Click → smooth scroll to `#id` and update the hash without a
jump.
**Responsive** Below `md`, links collapse into a hamburger that opens C-05.
**A11y** `<nav aria-label="Primary">`, real `<a href="#id">` links, `aria-current` on the active
one, focus ring per A-03.

### C-05 — Mobile Menu Overlay

**File** `src/components/chrome/MobileMenu.tsx` · client
**Anatomy** Full-screen `ink-900/97` + `backdrop-blur-lg`; links at `d-3` display serif with mono
`text-faint` numerals `01–04` to their left; socials row pinned to the bottom.
**Motion** M-07. Body scroll locked while open. `Esc` closes, focus is trapped, and focus returns
to the toggle on close.

### C-06 — Side Rails

**File** `src/components/chrome/SideRails.tsx` · client · `hidden lg:block`, `z-rails`

- **Left rail** — vertical text `PORTFOLIO · 2026` (`m-sm`, `text-faint`,
  `writing-mode: vertical-rl`, rotated 180°) above a 1px `line` stem.
- **Right rail** — 1px `line` track, 120px tall, with a `copper-500` fill scaled by M-09; mono
  `text-faint` percentage label below.

**A11y** `aria-hidden="true"` — purely decorative.

### C-24 — Toast

**File** `src/components/chrome/Toast.tsx` · client
Bottom-center, `z-toast`. `bg-ink-700`, `border border-line`, `r-md`, `shadow-card`, 16px status
icon (`success` / `danger`), `b-sm` copy. Motion M-08. `role="status" aria-live="polite"`.

### C-25 — Footer

**File** `src/components/chrome/Footer.tsx` · server
`py-8 border-t border-line` on `ink-950`. Left: `© 2026 · <Name>` (mono `m-md`, name in
`copper-300`). Right: `GitHub` / `LinkedIn` text links, `text-low → copper-300` on hover with a
1px underline growing from the left (`dur-fast`).

### C-26 — Back-to-Top FAB

**File** `src/components/chrome/BackToTop.tsx` · client
48px circle, `grad-accent`, `glow-copper-sm`, arrow icon in `ink-950`. Fixed `bottom-6 right-6`,
`z-raised`. Fades and scales in past `60vh` via `AnimatePresence`; `whileHover {scale:1.08}`,
`whileTap {scale:0.94}`, M-10 magnetic. `aria-label="Back to top"`.

---

## 7. UI primitives

### C-09 — Button

**File** `src/components/ui/Button.tsx`
**Props** `variant: "primary" | "ghost"`, `href?`, `icon?`, `external?`.

| Variant   | Rest                                                                          | Hover                                                               | Active      |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------- |
| `primary` | `grad-accent`, `text-ink-950`, `r-full`, `px-7 py-3`, `m-lg`, `glow-copper-sm` | `glow-copper-lg`, `y:-2`, gradient shifts to `copper-400 → copper-600` | `scale .97` |
| `ghost`   | transparent, `1px border-ink-500`, `text-text-hi`, `r-full`                    | `border-copper-500`, `text-copper-300`, `bg-a-copper-04`              | `scale .97` |

Shared: M-10 magnetic, `dur-fast`, focus ring A-03. External links get a 12px ↗ glyph that
translates `x:2 y:-2` on hover. Renders `<a>` when `href` is set, otherwise `<button>`.

### C-11 — Section Header

**File** `src/components/ui/SectionHeader.tsx`
**Props** `index` (`"01"`…), `eyebrow`, `title`, `accentWord`.
**Anatomy** Ghost numeral (`numeral`, `text-faint`, `opacity .18`, absolutely positioned
`-left-2 -top-8`, `-z-10`) · eyebrow: 32px `copper-500` rule + `m-md` uppercase `text-low` ·
title `d-1` display `text-hi` with `accentWord` in *italic* `copper-300`.
**Motion** M-02 for the block; the numeral additionally drifts `y: 24 → 0` over `dur-slower`.

### C-12 — Reveal

**File** `src/components/ui/Reveal.tsx` · client
Generic wrapper: `<motion.div variants={reveal} initial="hidden" whileInView="visible"
viewport={{ once: true, amount: 0.25 }}>`. Props `as`, `delay`, `y`. Under A-05 it renders a plain
element with no variants.

### C-18 — Filter Chip

**File** `src/components/ui/Chip.tsx`
`r-full`, `px-4 py-1.5`, mono `m-md` uppercase.

- rest: `bg-ink-600`, `text-low`, `border border-line`
- hover: `text-text-hi`, `border-a-copper-20`
- active: `grad-accent`, `text-ink-950`, `glow-copper-sm`, with `layoutId="chip-pill"` so the
  active pill slides between chips.

**A11y** `role="tab"` inside a `role="tablist"`, `aria-selected`, arrow-key roving tabindex.

### C-27 — Icon

**File** `src/components/ui/Icon.tsx`
Single inline-SVG set, so the page ships no icon-font, no sprite sheet, and no network request
(P-01). One `name` union covers every glyph the design calls for: `mail · phone · pin · arrowUp ·
arrowUpRight · menu · close · refresh · check · alert · chart · users · cup · sprout · spinner`.
Props `name`, `size` (default 18), `className`. All paths use `stroke="currentColor"`,
`strokeWidth={1.5}`, `fill="none"` so colour comes from the parent's token class. Always
`aria-hidden` — every icon in this design sits beside a real text label.

### C-20 — Tag

`bg-a-copper-10`, `text-copper-300`, `r-sm`, `px-2.5 py-1`, mono `m-sm`. Non-interactive.

### C-21b — Icon Tile

40px `r-md` square, `bg-ink-600`, `border border-line`, 18px `copper-400` icon. On parent hover:
`bg-a-copper-10`, `border-a-copper-20`, `scale 1.05`.

---

## 8. Section specifications

### S-01 / C-07 — Hero (`#home`)

**File** `src/components/sections/Hero.tsx`
**Layout** `min-h-screen`, centered column, `text-center`.
**Stack (top → bottom)**

1. Eyebrow `✦ Hello, I'm` — mono `m-md`, `text-low`, sparkle in `copper-400`.
2. **H1** `d-hero` display, `text-hi`; the **first letter of each name** is `copper-300` (the
   source does this with `D` and `I`). Words animate per M-03.
3. **C-08 Typewriter** — `d-3` display italic `copper-300`, cycling
   `["Java Developer", "Backend Engineer", "UI/UX Designer", "Problem Solver"]`; typing 70ms/char,
   hold 1600ms, delete 40ms/char; caret 2px `copper-500` blinking on a 1s step. Height is reserved
   by an invisible longest-string sizer so the layout never jumps.
4. Tagline — `b-lg`, `text-mid`, `max-w-[52ch]`.
5. Button row — `primary` "Hire Me" → LinkedIn; `ghost` "View CV ↗" → résumé.
6. **C-10 Scroll cue** — 1px 48px vertical track (`line`) with a `copper-500` segment looping
   `y: -100% → 100%` (2s, linear) + `SCROLL` label in mono `m-sm` `text-faint`.

**Background** Radial `a-copper-10` bloom at 50%/38%, 60vw wide, `blur-[120px]`, above the
starfield.

### S-02 — About (`#about`)

**File** `src/components/sections/About.tsx`
**Header** C-11 — index `02`, eyebrow `WHO I AM`, title `About` + accent `Me`.
**Grid** L-03 About.

- **Left — C-13 Portrait Card.** `r-xl`, `grad-card`, `border border-line`, `overflow-hidden`,
  `aspect-[4/5]`. Image via `next/image` `fill object-cover`; `grad-veil` overlay; on hover the
  image scales to `1.04` over `dur-slow` and the veil lightens. 1px `copper-500` corner ticks
  (top-left and bottom-right, 24px each).
- **Right —** C-14 pull quote (`d-2` display, `text-hi`, emphasised clause italic `copper-300`,
  flanked by a left 2px `copper-500` rule) followed by two `b-md` `text-mid` paragraphs with key
  terms in `text-hi font-medium`.

**Sub-block A — Experience (C-15).** Eyebrow rule + `EXPERIENCE`. Three cards on the L-03 Timeline
grid. Each card: `grad-card`, `r-lg`, `border border-line`, `p-6`; ghost numeral `01/02/03`
top-right (`numeral`, `text-faint`, `opacity .12`); date pill (`bg-a-copper-10`, `text-copper-300`,
`r-full`, mono `m-sm`); role `d-3` display `text-hi`; org `b-sm` `text-low`; bullets `b-sm`
`text-mid` with custom 4px `copper-500` square markers. Motion: M-01 stagger + M-04 on hover.

**Sub-block B — Skills.**

- **C-16 Speed Slider.** `<input type="range" min=0 max=100 defaultValue=45>`; 2px `ink-500` track
  with a `copper-500` fill up to the thumb; 16px thumb, `copper-500`, 2px `text-hi` border,
  `glow-copper-sm`, growing to 18px on `:active`. Live value in mono `m-md` `copper-300`. Drives
  the M-06 duration. `aria-label="Marquee speed"`, keyboard steps of 5.
- **C-17 Skills Marquee.** Two rows — row 1 scrolls left, row 2 right. Each row duplicates its item
  list twice for a seamless `-50%` loop. Item: `r-full`, `bg-ink-600`, `border border-line`,
  `px-5 py-2.5`, 20px icon + label in mono `m-md` `text-mid`. Hover: `border-a-copper-20`,
  `text-copper-300`, `y:-2`. Rows pause on hover. Edges masked with
  `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`. Content per
  D-03.

### S-03 — Works (`#works`)

**File** `src/components/sections/Works.tsx`
**Header** C-11 — `03`, `SELECTED WORK`, `My` + accent `Works`.
**Filters** C-18 row: `All · Front-end · Java · Figma`. Filtering uses Framer `layout` +
`AnimatePresence` so cards reflow rather than pop.

**C-19 Project Flip Card** — `src/components/ui/ProjectFlipCard.tsx`

- Wrapper: `perspective: 1400px`, `aspect-[3/4]`, `cursor: pointer`, `data-cursor="hover"`.
- Inner `motion.div` rotates per M-05 on hover (fine pointer) **and** on click / `Enter` / `Space`
  (touch + keyboard). Both faces are `absolute inset-0 backface-hidden r-lg overflow-hidden`.
- **Front** — art panel filled with `grad-proj-a|b|c` by category, a centered 48px line icon in
  `rgb(255 255 255 / .85)`, and a noise overlay at `opacity .05`. Bottom bar on `ink-800/80`
  backdrop-blur: meta in mono `m-sm` `copper-300` (`Front-end · 2024`), title `d-3` `text-hi`, and
  a `hover` hint in mono `m-sm` `text-faint` with a ↻ glyph.
- **Back** — `rotateY(180deg)`, `bg-ink-700`, `p-6`, column layout: meta, title, description
  (`b-sm` `text-mid`, 4-line clamp), C-20 tag row, and a `ghost` C-09 "View Project ↗" pinned to
  the bottom that `stopPropagation`s so it never re-flips the card.
- Hover lift M-04 on the wrapper.

**Footer meta** `4 projects` in mono `m-md` `text-faint`, right-aligned, with a `grad-rule` divider
above.
**A11y** The card is an `<article>`; the flip control is a `<button aria-expanded>` covering the
face; the back face's link is in DOM order and `inert` while hidden.

### S-04 — Contact (`#contact`)

**File** `src/components/sections/Contact.tsx`
**Header** C-11 — `04`, `LET'S CONNECT`, `Get In` + accent `Touch`.
**Grid** L-03 Contact.

- **Left** — intro `b-md` `text-mid` with `24 hours` in `copper-300 font-medium`; three **C-21
  contact rows** (Email / LinkedIn / GitHub), each = C-21b icon tile + label (mono `m-sm`
  `text-faint`) + value (`b-sm` `text-hi`); the whole row is the link, hover lifts it `x:4` and
  tints the value `copper-300`. Then **C-22 Availability Pill**: `r-full`,
  `border border-a-copper-20`, `bg-a-copper-04`, an 8px `success` dot with a 2s ping ring, and the
  label `AVAILABLE FOR NEW PROJECTS` in mono `m-sm` `text-mid`.
- **Right — C-23 Contact Form.** Fields: Name, Email (2-col at `md`), Subject, Message (`rows=5`).
  Style: **underline inputs** — transparent fill, 1px bottom `ink-500`, no radius, `py-3`, value
  `b-md` `text-hi`. Floating label: mono `m-sm` `text-faint` resting on the line, animating to
  `y:-22 scale:.92 text-copper-300` on focus/filled. Focus: the bottom border becomes `copper-500`
  and a 1px `copper-500` bar scales `scaleX 0→1` from the left over `dur-fast`. Error: border and
  label in `danger`, message in `m-sm` below. Footnote `* I read every message personally` in mono
  `m-sm` `text-faint`. Submit is C-09 `primary` "Send Message ↗" with `pending` (spinner, label
  `SENDING…`) and `done` (✓ `MESSAGE SENT`) states; the result raises C-24.
  **Validation** client-side: required fields, RFC-lite email, message ≥ 20 chars. The server
  re-validates in `/api/contact` (D-05) with a honeypot field and a 5-request / 10-minute IP rate
  limit.

### S-05 — Footer

C-25.

---

## 9. Data model

All content is typed and lives in `src/data/*` — **no copy is hard-coded in components.**

> **Subject:** Fumba Huriro — Business Information Management, AUCA Kigali. Marketing
> operations, customer experience and CRM. See §15 for how this reshaped D-03/D-04.

```ts
// D-01 profile.ts
export interface Profile {
  name: string; firstName: string; lastName: string; monogram: string;
  roles: string[];                  // C-08 typewriter
  tagline: string;                  // S-01
  quote: { text: string; accent: string };
  bio: string[];                    // S-02 paragraphs
  portrait: string;                 // /public path
  location: string;                 // S-04 contact row
  certification: string;            // S-02, under the Experience eyebrow
  cvUrl: string; availability: boolean; responseTime: string;
}

// D-02 experience.ts
export interface Experience {
  id: string; period: string; role: string; org: string; bullets: string[];
}

// D-03 skills.ts — icon optional (§15.3)
export interface Skill { name: string; row: 1 | 2; icon?: string }

// D-04 projects.ts — CV-derived categories (§15.2); href optional (§15.4)
export type Category = "Marketing" | "Operations" | "Community";
export interface Project {
  id: string; title: string; category: Category; year: number;
  org: string;                      // employer / initiative the work belongs to
  description: string; stack: string[];
  href?: string;                    // omitted when there is no public artefact
  art: "a" | "b" | "c";             // T-09 gradient key
  icon: ProjectIcon;
}

// D-05 contact
export interface ContactPayload {
  name: string; email: string; subject: string; message: string;
  website?: string;                 // honeypot — must be empty
}
```

---

## 10. Accessibility (non-negotiable)

- **A-01** Body text ≥ 4.5:1, large text ≥ 3:1. `text-low` only at ≥ 14px. `text-faint` is
  decorative and must be `aria-hidden` or duplicated in accessible text.
- **A-02** One `<h1>` (Hero). Sections use `<h2>`; cards use `<h3>`. No level skipping.
- **A-03** Focus ring everywhere: `outline: 2px solid copper-400; outline-offset: 3px`. Never
  `outline: none` without a replacement. A skip-link to `#main` is the first focusable node.
- **A-04** Everything keyboard-reachable: nav, chips (roving tabindex), flip cards
  (`Enter`/`Space`), form, FAB, mobile menu (focus trapped, `Esc` closes).
- **A-05** `prefers-reduced-motion: reduce` ⇒ marquee static, starfield one frame, cursor off,
  preloader skipped, flip becomes a crossfade, and all `y`/`scale` transforms become opacity-only
  at `dur-fast`. Implemented centrally via `useReducedMotion()` and a root
  `<MotionConfig reducedMotion="user">`.
- **A-06** Images carry real alt text; the canvas and rails are `aria-hidden`.
- **A-07** Form inputs have a real `<label>` (visually floating, never `placeholder`-only),
  `aria-invalid`, `aria-describedby` for errors, and a live region for submit status.

---

## 11. Performance budget (P-01)

| Metric                              | Budget        |
| ----------------------------------- | ------------- |
| LCP (mobile, 4G)                    | < 2.0s        |
| CLS                                 | < 0.02        |
| INP                                 | < 200ms       |
| First-load JS (route `/`)           | < 140 kB gzip |
| Lighthouse Perf / A11y / Best / SEO | ≥ 95 each     |

Rules: below-the-fold client sections (Works, Contact) load via `next/dynamic`; `next/font` with
`display: "swap"`, preloading display + body only; `next/image` with explicit `sizes` and
AVIF/WebP; Framer Motion imported from `motion/react` so it tree-shakes, and kept out of server
components; starfield capped per C-03.

---

## 12. File architecture (F-01)

```
.
├─ design.md                      ← this file (source of truth)
├─ agent.md                       ← build protocol
├─ next.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
├─ public/
│  ├─ portrait.jpg  favicon.png  resume.pdf
│  └─ icons/…                     (skill logos, D-03)
└─ src/
   ├─ app/
   │  ├─ layout.tsx               chrome + fonts + MotionConfig
   │  ├─ page.tsx                 composes S-01…S-05
   │  ├─ globals.css              Tailwind + T-01…T-09 CSS vars + base
   │  ├─ opengraph-image.tsx
   │  └─ api/contact/route.ts     D-05
   ├─ components/
   │  ├─ chrome/   Preloader C-01 · Cursor C-02 · Starfield C-03 · Navbar C-04 ·
   │  │            MobileMenu C-05 · SideRails C-06 · Toast C-24 · Footer C-25 ·
   │  │            BackToTop C-26
   │  ├─ ui/       Button C-09 · SectionHeader C-11 · Reveal C-12 · Chip C-18 · Tag C-20 ·
   │  │            IconTile C-21b · ContactRow C-21 · ProjectFlipCard C-19 ·
   │  │            TimelineCard C-15 · Typewriter C-08 · ScrollCue C-10 · PullQuote C-14 ·
   │  │            PortraitCard C-13 · SpeedSlider C-16 · SkillsMarquee C-17 ·
   │  │            AvailabilityPill C-22 · Field (C-23 input)
   │  └─ sections/ Hero S-01 · About S-02 · Works S-03 · Contact S-04
   ├─ config/      theme.ts        (FONT_DISPLAY toggle, T-02)
   ├─ data/        profile.ts experience.ts skills.ts projects.ts nav.ts
   ├─ hooks/       useActiveSection · useScrollProgress · useTypewriter ·
   │               useLockBodyScroll · useMediaQuery · useMagnetic
   ├─ lib/         motion.ts (M-01…M-10) · validate.ts · cn.ts
   └─ types/       index.ts (D-01…D-05)
```

---

## 13. Traceability matrix

| ID        | Component             | File                                              |
| --------- | --------------------- | ------------------------------------------------- |
| C-00      | MotionProvider        | `components/chrome/MotionProvider.tsx`            |
| C-01      | Preloader             | `components/chrome/Preloader.tsx`                 |
| C-02      | Cursor                | `components/chrome/Cursor.tsx`                    |
| C-03      | Starfield             | `components/chrome/Starfield.tsx`                 |
| C-04      | Navbar                | `components/chrome/Navbar.tsx`                    |
| C-05      | MobileMenu            | `components/chrome/MobileMenu.tsx`                |
| C-06      | SideRails             | `components/chrome/SideRails.tsx`                 |
| C-07      | Hero                  | `components/sections/Hero.tsx`                    |
| C-08      | Typewriter            | `components/ui/Typewriter.tsx`                    |
| C-09      | Button                | `components/ui/Button.tsx`                        |
| C-10      | ScrollCue             | `components/ui/ScrollCue.tsx`                     |
| C-11      | SectionHeader         | `components/ui/SectionHeader.tsx`                 |
| C-12      | Reveal                | `components/ui/Reveal.tsx`                        |
| C-13      | PortraitCard          | `components/ui/PortraitCard.tsx`                  |
| C-14      | PullQuote             | `components/ui/PullQuote.tsx`                     |
| C-15      | TimelineCard          | `components/ui/TimelineCard.tsx`                  |
| C-16      | SpeedSlider           | `components/ui/SpeedSlider.tsx`                   |
| C-17      | SkillsMarquee         | `components/ui/SkillsMarquee.tsx`                 |
| C-18      | Chip                  | `components/ui/Chip.tsx`                          |
| C-19      | ProjectFlipCard       | `components/ui/ProjectFlipCard.tsx`               |
| C-20      | Tag                   | `components/ui/Tag.tsx`                           |
| C-21      | ContactRow / IconTile | `components/ui/ContactRow.tsx`, `ui/IconTile.tsx` |
| C-22      | AvailabilityPill      | `components/ui/AvailabilityPill.tsx`              |
| C-23      | ContactForm           | `components/sections/Contact.tsx` + `ui/Field.tsx` |
| C-24      | Toast                 | `components/chrome/Toast.tsx`                     |
| C-25      | Footer                | `components/chrome/Footer.tsx`                    |
| C-26      | BackToTop             | `components/chrome/BackToTop.tsx`                 |
| C-27      | Icon                  | `components/ui/Icon.tsx`                          |
| S-01…S-04 | Sections              | `components/sections/*`                           |
| T-01…T-09 | Tokens                | `app/globals.css` + `tailwind.config.ts`          |
| M-01…M-10 | Motion                | `lib/motion.ts`                                   |
| D-01…D-05 | Data                  | `data/*`, `types/index.ts`                        |

---

## 15. CV adaptation — deviation log

The replica's content model assumed a software-engineering portfolio. The subject's CV
(`FUMBA HURIRO- Resume.pdf`) is marketing operations, customer experience and CRM. **Every visual
decision in §3–§8 is unchanged.** These are the data-layer changes, recorded per R3/R4.

**15.1 — Typewriter roles (C-08).** `["Marketing Executive", "Customer Experience Specialist",
"CRM & Data Analyst", "Operations Consultant"]` — all four are titles or functions evidenced in the
CV. No aspirational or unearned titles.

**15.2 — Project categories (D-04).** `Front-end | Java | Figma` → `Marketing | Operations |
Community`. The four works are the CV's real initiatives (KGUC HR information redesign, CCI Rwanda
customer-experience programme, Juicylicius go-to-market, HEYT community enterprise), not invented
software projects. `Project.org` is added so each card credits where the work happened.

**15.3 — Skill icons (D-03).** The CV's skills are competencies (CRM, digital marketing,
procurement, languages) rather than branded technologies, and no icon assets exist in the repo.
`Skill.icon` is therefore optional; C-17 renders a 4px `copper-500` diamond marker in its place.
Row 1 = professional capability, row 2 = tools and languages.

**15.4 — Project links (C-19).** `Project.href` is optional. Operations and community work has no
public URL, and **no link may be fabricated.** When `href` is absent, the back face shows the C-20
tag row and a mono `text-faint` line naming the organisation instead of the "View Project" button.
The card remains flippable and keyboard-operable either way.

**15.5 — Contact rows (C-21).** `LinkedIn | GitHub` → `Email | Phone | Location`. The CV lists no
LinkedIn or GitHub. `SocialLink.icon` becomes `mail | phone | pin`. C-25 (Footer) drops its social
links for the same reason and shows the location instead.

**15.6 — Hero primary CTA (S-01).** "Hire Me" pointed at a LinkedIn profile that does not exist;
it now scrolls to `#contact`. "View CV ↗" points at `/cv.html` (§15.13) — the typeset CV, which
reads better on screen and prints to A4. The source PDF stays at `/resume.pdf`.

**15.13 — Typeset CV (`public/cv.html`).** A standalone document, outside the T-01 dark palette
by design: it is paper, not UI. Linen beige `#EDE6D8` on `#E4DCC9`, warm ink `#26261F`, deep olive
accent `#4F5B45` — olive rather than the terracotta that beige is usually paired with. Serif role
is **Lora** (700 masthead and closing line, 600 role titles), body **IBM Plex Sans**, dates
**IBM Plex Mono** with tabular figures in a left register rail. **No underlines and no rules
anywhere** — section hierarchy comes from tracked olive capitals with a square marker. Committed
single-theme (no dark variant); A4 print styles with `break-inside: avoid` on every entry.
Content is verbatim from the source PDF, with one exception recorded below.

**15.14 — Duplicate KGUC entry removed.** The source PDF listed the KGUC role twice: once as a
prose paragraph, then again with bullets, same title and dates. It was a drafting leftover.
Preserved verbatim in v1 and flagged; removed on the author's instruction. The bulleted version
is kept — it is the more specific of the two. No other content was altered.

**15.7 — Experience count (C-15).** The CV has exactly three professional roles, which fits the
3-up L-03 Timeline grid unchanged. HEYT (co-founder, finance manager) is surfaced as a Works entry
under the `Community` category and in the About copy, rather than as a fourth card that would break
the grid.

**15.8 — Certification.** `profile.certification` renders as a mono caption beside the Experience
eyebrow ("Digital Marketing Certification · 2021").

**15.12 — C-23 submits via `mailto:`, not a server.**
The form no longer POSTs. On submit it validates client-side, builds an RFC 6068 `mailto:` URL
(`lib/mailto.ts`) and hands it to the viewer's mail client, which opens a pre-filled draft. The
viewer presses send themselves.

Consequences, all deliberate:

- **`/api/contact` deleted.** It validated, rate-limited and honeypotted a request that no longer
  exists. Keeping a route that logs personal data and sends nothing would be worse than removing it.
- **Honeypot and rate limiting removed.** Both defended an endpoint. With no endpoint there is no
  surface to abuse; spam filtering belongs to the receiving mail provider.
- **`ContactResponse` removed; `ContactPayload` loses `website`.**
- **`MESSAGE_MAX = 1200`** enforced in `validate.ts` and shown as a live counter on the Message
  field. Percent-encoding can triple the length of non-ASCII text, and the narrowest common URL
  ceiling is ~2000 characters; `isMailtoSafe()` blocks submission past ~1900 rather than letting a
  client truncate the draft silently.
- **`URLSearchParams` output is post-processed**, replacing `+` with `%20` — mail clients render a
  literal `+` where a space was intended.
- **A "Copy Instead" fallback** writes the whole addressed message to the clipboard. This is the
  one real weakness of `mailto:` — a viewer with no configured mail client would otherwise click
  send and see nothing happen — so the fallback is required, not optional.
- The reply-to is correct by construction: the mail originates from the viewer's own address.

**15.11 — Residual bundle gap: 145 kB vs 140 kB (5 kB / 3.6% over). OPEN.**
§15.10 closed 22 kB of the original 27 kB overage. The remaining 5 kB is the Framer Motion runtime
itself, which is already at its `domAnimation` floor. Two further levers were tested or considered
and rejected:

- `experimental.optimizePackageImports: ["motion"]` — measured 145 kB with **and** without it.
  No benefit once LazyMotion tree-shakes; the flag was removed.
- Deferring Works and Contact with `dynamic(..., { ssr: false })` — would clear the 5 kB, but
  costs server-rendered markup for half the page's content. **Rejected:** a portfolio's work
  history and contact details must be in the HTML for crawlers and no-JS readers.

Recommendation: raise the §11 budget to **150 kB** and record 145 kB as the measured baseline.
That is an honest re-baseline against a number chosen before the motion library was specified —
not a target quietly moved to match the result. Left for the author to approve; §11 is unchanged
until then.

**15.9 — Portrait (C-13) — RESOLVED.** Three 1280×1280 frames were supplied in
`images of Fumba/`. `/fumba-portrait.jpg` is wired to C-13: it is the best-centred of the three
for the 4:5 `object-cover` crop, and its warm desk light suits the copper palette — sampled
mid-tones land on `rgb(170,99,63)`, within a few points of `copper-500`. Because the source is
square and the frame is 4:5, `object-cover` crops **width**, not height, so `object-top` is a
defensive no-op at this ratio rather than the thing keeping the face in frame. What actually
protects the subject is `--grad-veil-portrait` (T-09), which holds clear past the face before
fading. Deliberately **not** `priority` — it sits below the fold and must not compete with the
hero for LCP (P-01). `/fumba-desk-wide.jpg` serves as
the OpenGraph and Twitter card via Next's file convention (`src/app/opengraph-image.jpg`,
`twitter-image.jpg`); `/fumba-desk-alt.jpg` is a spare. All three are addressable through
`photos` in `data/profile.ts`, so swapping the About image is a one-line change.
`PortraitCard` still falls back to the monogram plate when `src` is omitted.

**15.10 — P-01 first-load budget: RESOLVED via option (b).**
The first build measured 167 kB against the 140 kB target, because Framer Motion shipped its full
bundle to support shared-layout animation (`layoutId`). `LazyMotion` + `domAnimation` — the normal
remedy — excludes layout animations, so the two had to be traded against each other. Layout
animation was dropped:

- **C-04 nav underline** — `layoutId="nav-underline"` → a per-link 1px rule that scales
  `scaleX 0→1` from the left via CSS transition. The bar no longer slides *between* items; each
  one grows in place. Visually near-identical at `dur-fast`, and it now animates on hover too.
- **C-18 chip pill** — `layoutId="chip-pill"` → the active chip paints `grad-accent` directly,
  with a CSS colour/shadow transition. No sliding pill.
- **C-19 / S-03** — `layout` on the card and `mode="popLayout"` on `AnimatePresence` both require
  layout projection; replaced with an opacity/scale enter-exit.

The whole tree is then wrapped in `<LazyMotion features={domAnimation} strict>` (C-00), and every
component imports `m` instead of `motion`. `strict` makes a stray `motion.*` throw at runtime, so
the saving cannot silently regress.

**Measured result: 167 kB → 145 kB (−22 kB).** See §15.11 for the remaining gap.

---

## 14. Definition of done

A component is done when **all** of the following are true:

1. Its header comment cites its `design.md` ID(s) (R1).
2. Zero raw hex / px font-size / duration literals (R2) — verified by `npm run lint:tokens`.
3. Every listed state is implemented and visually checked at 390px, 768px, and 1440px.
4. It is keyboard-operable end to end with a visible focus ring (A-03, A-04).
5. It behaves correctly under `prefers-reduced-motion: reduce` (A-05).
6. No layout shift on mount and no hydration warning in the console.
7. Its row in §13 is present and accurate.
