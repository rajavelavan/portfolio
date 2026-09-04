# "Sketchbook Narrative" Engineering Portfolio

A personal engineering portfolio built as a hand-drawn **sketchbook narrative** — each project is a
page in a notebook rather than a card in a grid. The data model enforces a strict separation between
three kinds of work:

- **Organization** — work delivered for a company or client.
- **Personal** — self-driven, full builds.
- **Experiment** — small, throwaway learning stubs.

That distinction is a first-class type in the data layer, not a label bolted on later, so every view
in the site can group and filter by it without special-casing.

## Status

**Phase 1 complete** — project scaffold + typed data architecture.

**Phase 2 complete** — the sketchbook UI and its design system. The site ships as a **single
scrolling route** (`/`): a cover plus eight numbered chapters, not the multi-route
(`/projects/[slug]`, `/experiments`) structure originally sketched. See
[Phase 2 — the sketchbook UI & design system](#phase-2--the-sketchbook-ui--design-system).

**Phase 3 complete** — the interactive Sketch Engine. The `.sketch-placeholder` slots in chapters
**03** and **04** are replaced with real hand-drawn diagrams that draw themselves on scroll —
generated in the browser with **Rough.js**, animated with **Framer Motion**. The engine
(`components/ui/animated-sketch.tsx`) is factored out and exported so the remaining slots can be
filled the same way. See
[Phase 3 — the interactive Sketch Engine](#phase-3--the-interactive-sketch-engine).

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.4 (App Router) |
| UI runtime | React 19.2 |
| Language | TypeScript 5.9 (strict mode) |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Fonts | `next/font/google` — Caveat (handwriting) + JetBrains Mono (technical), both variable |
| Animation | `framer-motion` ^13.2.0 — scroll-linked draw-on, reduced-motion aware _(Phase 3)_ |
| Sketch rendering | `roughjs` ^4.6.6 — hand-drawn SVG for the architecture & stack diagrams _(Phase 3)_ |
| Linting | ESLint 9 (`eslint-config-next`) |
| Package manager | pnpm 10 (pinned via `packageManager`) |
| Dev bundler | Turbopack |

`framer-motion` and `roughjs` are the only dependencies added after the scaffold (both runtime, no
new dev dependencies). `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, and
`eslint.config.mjs` are still the create-next-app defaults.

The project was scaffolded with:

```bash
pnpm create next-app@latest . \
  --typescript --tailwind --app --eslint \
  --no-src-dir --import-alias "@/*" --turbopack --use-pnpm
```

`--no-src-dir` keeps `app/`, `components/`, `data/`, `lib/`, and `types/` at the repo root.
`--import-alias "@/*"` maps `@/*` to the repo root (see `tsconfig.json`).

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project structure

```
app/
  layout.tsx                      # fonts (next/font/google) + metadata + <body> shell
  globals.css                     # the design system — tokens, @theme, textured bg, .sketch-placeholder
  page.tsx                        # the whole site: cover + 8 chapters, one scrolling route
  projects/[slug]/                # empty — single-page design, no detail routes
  experiments/                    # empty — folded into chapter 05
components/
  layout/                         # empty (.gitkeep) — page.tsx inlines its own <main>/<footer>
  projects/
    architecture-diagram.tsx      # <ArchitectureDiagram/> — file-upload system, Rough.js  (Phase 3)
    stack-diagram.tsx             # <StackDiagram/> — Jewelry Merchant Platform stack       (Phase 3)
  ui/
    animated-sketch.tsx           # the scroll-driven Rough.js + framer-motion engine       (Phase 3)
data/
  projects.ts                     # single source of truth — the typed project array
lib/
  projects.ts                     # selector layer over data/ (UI imports from here, never data/)
types/
  project.ts                      # Project, ProjectType, ProjectCategory
public/
  sketches/                       # empty — .sketch-placeholder slots + the two Rough.js diagrams stand in
```

The `@/*` path alias resolves to the repo root, so imports read as `@/data/projects`,
`@/lib/projects`, `@/types/project`.

## Data architecture

### The three-way separation

```ts
export type ProjectType = 'personal' | 'organization' | 'experiment';
```

This is the discriminator the whole site groups by:

- `organization` — client / company deliverables. Kept visibly distinct from personal work.
- `personal` — self-initiated projects taken to a working state.
- `experiment` — deliberately small stubs that capture a single thing being learned.

### Category buckets

```ts
export type ProjectCategory =
  | 'Full-Stack Platform'
  | 'AI / ML'
  | 'Security'
  | 'Infrastructure';
```

`category` is a **closed literal union**, not free text, so any grouping or filtering UI is
exhaustive by construction — adding a project can never introduce an unhandled category.

### The `Project` interface

Defined in `types/project.ts`:

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | `string` | URL-safe unique id; also the `/projects/[slug]` route param. |
| `title` | `string` | Display name. |
| `description` | `string[]` | One short paragraph per entry — rendered as stacked notebook lines. |
| `category` | `ProjectCategory` | Fixed bucket used for grouping and filters. |
| `type` | `ProjectType` | Strict separation of work kinds. |
| `techStack` | `string[]` | Technologies, roughly frontend → backend → data → tooling. |
| `architectureNotes` | `string[]` | Notes on system shape, trade-offs, and key decisions. |
| `githubUrl` | `string` (optional) | Public repository URL, when one exists. |
| `liveUrl` | `string` (optional) | Deployed instance URL, when one exists. |

### Project inventory

`data/projects.ts` exports a single typed array, `projects: Project[]`, with 10 entries:

| Slug | Title | Type | Category |
| --- | --- | --- | --- |
| `jewelry-merchant-platform` | Jewelry Merchant Platform | organization | Full-Stack Platform |
| `handloom-materials-management-system` | Handloom Materials Management System | personal | Full-Stack Platform |
| `file-upload-ai-analysis` | File Upload System / AI Analysis | personal | AI / ML |
| `autonomous-cloud-security-agent` | Autonomous Cloud Security Agent | personal | Security |
| `cryptographic-ai-governance-gateway` | Cryptographic AI Governance Gateway | personal | Security |
| `authentication-system` | Authentication System | personal | Security |
| `exp-mail-inbox` | Mail Inbox | experiment | Full-Stack Platform |
| `exp-docker-demo` | Docker Demo | experiment | Infrastructure |
| `exp-aws-amplify-practice` | AWS Amplify Practice | experiment | Infrastructure |
| `exp-jenkins-ci` | Jenkins CI | experiment | Infrastructure |

**Totals: 10 projects — 1 organization, 5 personal, 4 experiments.** The four experiment entries are
intentionally minimal stubs (single-line `description` and `architectureNotes`).

### Selector API

`lib/projects.ts` is the only module UI code should import project data from — components never touch
`data/projects.ts` directly. This keeps the data source swappable (file today, CMS or API later)
without touching call sites.

| Function | Signature | Purpose |
| --- | --- | --- |
| `getAllProjects` | `() => Project[]` | Every project, unfiltered. |
| `getProjectsByType` | `(type: ProjectType) => Project[]` | Projects of a single kind. |
| `getProjectBySlug` | `(slug: string) => Project \| undefined` | One project by slug, or `undefined`. |

### Design decisions

- **pnpm over npm** — lockfile committed and the version pinned via `packageManager`.
- **`githubUrl` / `liveUrl` are optional keys** (omitted when absent) rather than `string | null`,
  so entries without links stay uncluttered.
- **`category` is a closed union**, not free text — see above.
- **Beyond the original brief:** added `slug` (a stable id for the `/projects/[slug]` route, so the
  UI never has to derive one from the title) and typed `architectureNotes` as `string[]` to mirror
  `description`, so both render the same way.

## Phase 2 — the sketchbook UI & design system

Phase 2 turns the typed data layer into the actual site: a **digital engineering notebook** you
read top to bottom.

### Shape of it

One route — `app/page.tsx` at `/` — rendered as a cover plus eight numbered chapters. There is no
`/projects` index, no `/projects/[slug]` detail page, no `/experiments` route; every project shows
up inside the scroll. The chapters that break down an architecture (**03 The Systems**, **04
Professional Experience**) use CSS `position: sticky` so the narrative pins to one side of the
viewport while its diagram scrolls past — the "explain while you point at the drawing" motion of a
real notebook. Because sticky is pure CSS, `page.tsx` stays a **React Server Component** and reads
its data straight from the `lib/projects` selectors.

`app/projects/[slug]/`, `app/experiments/`, and `components/layout/` exist only as empty
placeholders; `page.tsx` inlines its own `<main>` / `<footer>`.

### Design system — `app/globals.css`

Tailwind v4, CSS-first: `@import "tailwindcss"` then a token block on `:root` and an
`@theme inline` bridge. No `tailwind.config.js`.

| Token | Value | Role |
| --- | --- | --- |
| `--canvas` | `#0d1117` | dark slate "paper" — the page background |
| `--canvas-raised` | `#131a24` | cards, pinned panels |
| `--ink` | `#e7e3da` | off-white — handwriting and headings |
| `--ink-dim` | `#93a1b1` | faded pencil — body copy, captions |
| `--edge` | `#26313f` | component borders / hairlines |
| `--edge-strong` | `#33414f` | dashed sketch frames |
| `--accent` | `#8ab4f8` | ballpoint blue — kickers, links, the architecture diagram |
| `--accent-warm` | `#e8b17a` | red-pen orange — the org project, the stack diagram |
| `--rule` / `--rule-major` | `rgba(148,163,184,0.05)` / `0.09` | graph-paper ruling |

`@theme inline` re-exports the palette as `--color-*` and the two families as `--font-hand` /
`--font-mono`, which is what generates the utilities used throughout `page.tsx`: `bg-canvas`,
`bg-canvas-raised`, `text-ink`, `text-ink-dim`, `border-edge`, `border-edge-strong`,
`text-accent`, `text-accent-warm`, `font-hand`, `font-mono`. `inline` is deliberate — the raw
`:root` vars stay the single source of truth, and `SKETCH_PALETTE` (see below) references them
directly at runtime.

- **Textured background** — `body` stacks four `linear-gradient`s into engineering graph paper: a
  fine 32px grid in `--rule` plus a heavier 160px grid in `--rule-major`. Over that,
  `body::before` is a fixed, `pointer-events: none` overlay at `opacity: 0.04` whose image is an
  inline `feTurbulence` SVG (`fractalNoise`, `baseFrequency 0.8`) — paper grain.
- **`.sketch-placeholder`** — the "diagram not drawn yet" slot. Defined inside
  `@layer components` so per-instance `aspect-*` / `min-h-*` utilities still win: a `1.5px` dashed
  `--edge-strong` frame, a 45° hachure fill, a `::before` corner crop-mark in `--accent`, and a
  `::after` "✎ sketch goes here" label set in the hand font.
- `html { scroll-behavior: smooth; scroll-padding-top: 6rem }` so the chapter anchors land clear
  of the top.

### Fonts — `app/layout.tsx`

Both loaded with `next/font/google` as **variable** fonts (no weight array), self-hosted at build
time:

- **Caveat** → `--font-caveat` / the `font-hand` utility — headings, chapter titles, notes,
  marginalia.
- **JetBrains Mono** → `--font-jetbrains-mono` / `font-mono` and the `body` default — body copy,
  labels, code, captions.

`<html>` carries both `.variable` classes; `<body>` is `bg-canvas text-ink`. `metadata`
(`title`, `description`) is set here.

### Layout engine — `app/page.tsx`

A Server Component built from a small vocabulary of local helper components:

| Helper | Renders |
| --- | --- |
| `Chapter({ id, no, kicker, title, lead?, children })` | numbered `<section>` shell — a mono kicker row with a hairline rule, a `font-hand` `<h2>`, an optional lead paragraph |
| `Sketch({ caption })` | a `<figure>` wrapping a bare `<div className="sketch-placeholder" />` and a captioned `<figcaption>` |
| `TechRow({ items })` | `techStack` as a row of bordered mono pills |
| `NoteList({ items })` | `architectureNotes` as a zero-padded numbered list (`01`, `02`, …) |
| `ProjectCard({ project })` | a `type`-agnostic card — title, category, a sketch slot, `description` lines, `TechRow` |
| `DeepDive({ project, children })` | the sticky-scroll layout — a `md:sticky md:top-24 md:self-start` narrative column (title, description, `NoteList`, `TechRow`) beside a scrolling column of `children` (the diagrams) |

Everything sits in an `mx-auto max-w-5xl` container.

### The narrative — cover + 8 chapters

| # | `id` | Kicker — title | Data source | Diagram slot |
| --- | --- | --- | --- | --- |
| — | `cover` | Field notebook · 2026 — "Building systems, end to end." | `NAME` | `Sketch` placeholder |
| 01 | `foundation` | The Foundation — "Understand the whole system first." | static prose (Angular / React / Express / MySQL / REST) | 2× `Sketch` |
| 02 | `workbench` | The Workbench — "Personal builds — each one a full slice." | `getProjectsByType("personal")` → `ProjectCard` grid | per-card `Sketch` |
| 03 | `systems` | The Systems — "Two deep dives." | `getProjectBySlug("file-upload-ai-analysis")` and `getProjectBySlug("autonomous-cloud-security-agent")` | **`<ArchitectureDiagram/>`** (file upload) + 3× `Sketch` (security agent) — sticky |
| 04 | `experience` | Professional Experience — "Architecture, translated into code." | `getProjectsByType("organization")[0]` | **`<StackDiagram/>`** — sticky |
| 05 | `cloud` | The Cloud — "Where it actually runs." | static prose + `getProjectsByType("experiment")` as "lab tickets" | 2× `Sketch` |
| 06 | `next-layer` | The Next Layer — "The pivot to AI engineering." | prose referencing the security-agent and gateway project titles | 2× `Sketch` |
| 07 | `notebook` | Engineering Notebook — "Notes on what I'm learning now." | `learningNotes` (5 dated one-line entries) | 1× `Sketch` |
| 08 | `contact` | Contact — "Close the notebook — let's talk." | `CONTACT` | — |

### Animated diagrams

The two real diagrams, and the engine that draws them, shipped in Phase 3 — see
[Phase 3 — the interactive Sketch Engine](#phase-3--the-interactive-sketch-engine).

### Still placeholder

Honest list of what Phase 2 leaves for later:

- 6 of the 8 chapters still use `.sketch-placeholder` slots — only **03** (partly) and **04** have
  real diagrams.
- `NAME`, `CONTACT.github`, and `CONTACT.linkedin` in `app/page.tsx` are `TODO` placeholders.
- No `components/layout` shell, no per-project routes, no assets in `public/sketches/`.

## Phase 3 — the interactive Sketch Engine

Phase 3 replaces the two most load-bearing `.sketch-placeholder` slots — the file-upload deep dive
in chapter **03** and the Jewelry Merchant stack in chapter **04** — with real hand-drawn diagrams
that draw themselves on scroll. The geometry is generated in the browser with **Rough.js** and
animated with **Framer Motion**; the shared engine is factored out so the remaining placeholder
slots can be filled the same way with no new infrastructure.

All three files are Client Components (`"use client"`). `app/page.tsx` stays a **React Server
Component** and imports them directly as client entry points — no `next/dynamic`, no `ssr: false`.

### Strict rules, and how each is met

| Requirement | Implementation |
| --- | --- |
| No hydration mismatch | `rough.generator()` is seeded with a **fixed integer** per diagram. Rough.js's roughening PRNG is a pure-JS seeded LCG, so every generated `<path d="…">` string is byte-identical on the server and the client. The diagrams render into the SSR HTML and hydrate with no `next/dynamic` / `ssr: false` bail-out. |
| Mobile scaling | Every `<svg>` sets a coordinate-space `viewBox`, `preserveAspectRatio="xMidYMid meet"`, and `class="block h-auto w-full"` — no fixed pixel width. The drawing scales to its column and is never cropped or distorted. |
| Scroll-linked drawing | `useScroll({ target, offset })` yields a `0 → 1` progress value as the figure crosses the viewport; `useTransform` maps a per-shape slice of that progress onto each stroke's `pathLength`. |
| Reduced motion | `useReducedMotion()` is read behind a hydration guard. When set, every animated `pathLength` / `opacity` is pinned to `1` — the diagram renders fully drawn, with no animation. |

### The engine — `components/ui/animated-sketch.tsx`

| Export | Purpose |
| --- | --- |
| `AnimatedSketch` | Renders one `<svg role="img" aria-label={label}>` and hands scroll progress + the Rough.js generator to its children through React context. Props: `viewBox`, `label`, `seed?` (default `1`), `offset?` (default `["start 0.85", "end 0.3"]`), `className?`. |
| `RoughShape` | A `rect` / `ellipse` / `line` / `polyline` / `path` spec → a Rough drawable → one `motion.path` per stroke Rough.js emits. Outline strokes animate `pathLength`; hachure-fill strokes animate `opacity`. Draws over its `draw={[start, end]}` slice of the parent progress. Takes its own `seed` so repeated geometry still varies by hand. |
| `RoughArrow` | A shaft (`RoughShape` line over the first 60% of its `draw` range) plus a hand-drawn arrowhead (`polyline` over the last 40%, on `seed + 7`). |
| `SketchText` | A `motion.text` label in the `hand` (Caveat) or `mono` (JetBrains Mono) variant that fades in over its `draw` range. |
| `SKETCH_PALETTE` | Maps `ink` / `inkDim` / `accent` / `accentWarm` / `edge` / `raised` to the raw `:root` CSS custom properties (`var(--ink)` …). The `@theme inline` `--color-*` tokens are not emitted at runtime, so the SVG references the `:root` vars directly. |
| types | `RoughShapeSpec`, `AnimatedSketchProps`, `RoughShapeProps`, `RoughArrowProps`, `SketchTextProps` are all exported for downstream diagrams. |

**Deterministic geometry.** `AnimatedSketch` builds its generator once, memoised on `seed`:

```ts
rough.generator({ options: { seed, roughness: 1.35, bowing: 1.1, strokeWidth: 1.6 } })
```

Because the seed is constant across renders and machines, server and client produce identical path
data. Scroll progress is `0` on the server and on the first client paint, so the `pathLength`
attributes Framer Motion serialises (`stroke-dasharray` / `stroke-dashoffset`) match too.

**Context plumbing.** `SketchContext` carries `{ generator, progress: MotionValue<number>,
reducedMotion: boolean }`. `useSketch()` throws a clear error if `RoughShape` / `RoughArrow` /
`SketchText` are rendered outside an `AnimatedSketch`.

**Staggered draw-in.** Each child is handed a `draw={[start, end]}` pair in progress units.
`useTransform(progress, [start, end], [0, 1], { clamp: true })` gives that child its own local
`0 → 1`, so boxes, then labels, then arrows draw in sequence as the chapter scrolls — and reverse
on scroll-up. `RoughShape` splits Rough.js's `toPaths()` output: entries with a real `fill`
(`p.fill && p.fill !== "none"`) are solid regions and animate `opacity`; the rest are outline /
hachure strokes and animate `pathLength`.

**Reduced motion without a hydration mismatch.** `useReducedMotion()` reads `matchMedia`
synchronously on the client, which would disagree with the server for a visitor who prefers reduced
motion. It is gated behind `useHydrated()` — a `useSyncExternalStore` whose server snapshot is
`false` and client snapshot is `true` (no `setState`-in-effect, which the React Compiler lint that
`next dev` enables forbids). Server render equals first client render; the value flips once,
post-hydration.

**Type derivation.** Rough.js and Framer Motion don't expose their internal types through the
package `exports` map under `moduleResolution: "bundler"`, so the engine derives what it needs from
the public entry points with `ReturnType` / `Parameters` (`RoughGenerator`, `Drawable`, `PathInfo`,
`RoughOptions`). `useScroll`'s `offset` type is derived the same way rather than typed
`[string, string]`, which `useScroll` rejects.

### The two diagrams — `components/projects/`

**`<ArchitectureDiagram/>`** (`architecture-diagram.tsx`, named export, no props). The File Upload
System, as a `<figure>` + `<figcaption>` drop-in for the old `<Sketch>`. `viewBox="0 0 820 340"`,
`seed={13}`. Three node boxes — **Next.js** route handler → **AWS S3** object store → **OpenAI**
analysis · Q&A — in ballpoint-blue (`--accent`) hachure (`{ hachureGap: 20, fillWeight: 0.5 }`),
each box + its two labels staggered at `i * 0.22`. Forward arrows labelled "pre-signed PUT" and
"object → prompt"; a warm-accent (`--accent-warm`) polyline response path loops from OpenAI back to
the Next.js box, labelled "summary · grounded answers".

**`<StackDiagram/>`** (`stack-diagram.tsx`, named export, no props). The Jewelry Merchant Platform
stack. `viewBox="0 0 820 430"`, `seed={71}`. Three stacked layers — **React + PrimeReact** (admin
panel · mobile storefront) / **Express · Node.js** (REST routes · OpenAPI contract) / **Knex.js →
MySQL** (query builder · explicit migrations) — in warm-accent (`--accent-warm`) hachure, staggered
at `i * 0.26`, joined by vertical arrows "HTTP · JSON" and "SQL via Knex", with a mono caption for
the relational core ("inventory · gold-scheme definitions · customer enrollments").

### Integration — `app/page.tsx`

- `DeepDive` was generalised from `{ project, sketches: string[] }` to
  `{ project, children: React.ReactNode }` — it is now a pure sticky-scroll layout (pinned
  narrative column beside a scrolling content column) and no longer knows about sketches
  specifically.
- Chapter **03** — the `file-upload-ai-analysis` deep dive renders `<ArchitectureDiagram />` as its
  only child (its three caption `<Sketch>`s removed). The `autonomous-cloud-security-agent` deep
  dive is unchanged: its three `<Sketch caption="…" />`s are now passed as explicit children.
- Chapter **04** — the organization block's scrolling column renders `<StackDiagram />` (its four
  caption `<Sketch>`s removed).
- `Sketch` and `.sketch-placeholder` stay in place for the cover and chapters **01, 05, 06, 07**
  and the security-agent deep dive.

### Dependencies

```bash
pnpm add roughjs framer-motion
```

`roughjs ^4.6.6` and `framer-motion ^13.2.0`, both runtime. No new dev dependencies; no
`next.config.ts` change (Turbopack consumes both without `transpilePackages`).

## Verification

Both checks pass on the Phase 1 tree:

```bash
pnpm exec tsc --noEmit   # types compile; every entry in data/projects.ts conforms to Project
pnpm lint                # clean
```

Runtime sanity check of the selector API:

```
total 10
organization ['Jewelry Merchant Platform']
personal 5
experiment 4
getProjectBySlug('authentication-system') -> 'Authentication System'
```

### Phase 2 checks

```bash
pnpm exec tsc --noEmit   # clean
pnpm lint                # clean
pnpm build               # succeeds — one route, prerendered static:
                         #   Route (app)
                         #   ┌ ○ /
                         #   └ ○ /_not-found
```

The Rough.js diagrams are Client Components but stay inside the statically prerendered `/` page as
hydration islands.

Manual walk-through — `pnpm dev`, open <http://localhost:3000>:

- scroll the full page; at `md` and wider, chapters **03** and **04** pin their narrative column
  while the diagram column scrolls past.
- the `<ArchitectureDiagram/>` and `<StackDiagram/>` strokes draw on as they enter the viewport.
- enable the OS "reduce motion" setting and reload — both diagrams render fully, without the
  draw-on animation.

### Phase 3 checks

```bash
pnpm exec tsc --noEmit   # clean
pnpm lint                # clean
pnpm build               # succeeds — / stays prerendered static; the Rough.js
                         # <path d="…"> markup is present in the server HTML
```

Manual walk-through — `pnpm dev`, open <http://localhost:3000>:

- chapters **03** and **04** each show one framed hand-drawn diagram; boxes → labels → arrows draw
  themselves in sequence as the chapter scrolls through the viewport, and reverse on scroll-up.
- hard reload with DevTools open — no hydration-mismatch warnings; the `<svg>` and its `<path>`s
  are present in view-source.
- responsive mode at 375px — both SVGs scale to full width, nothing cropped or stretched, no
  horizontal page scroll.
- OS "reduce motion" on, then reload — both diagrams render fully drawn immediately, with no stroke
  animation and no console warnings.

## Roadmap

Phase 2 shipped as a single scrolling page rather than the multi-route structure first sketched,
so the remaining work is content and polish inside that page:

- Replace the `.sketch-placeholder` slots in chapters **01, 02, 05, 06, 07** with real Rough.js
  diagrams (reusing `components/ui/animated-sketch.tsx`); give chapter **03**'s security-agent
  deep dive its own diagram.
- Fill in `NAME`, `CONTACT.github`, and `CONTACT.linkedin` in `app/page.tsx`, and reconcile the
  display name / email used across `app/layout.tsx` and `app/page.tsx`.
- Optional: extract a `components/layout` shell (header / footer / chapter rail) out of
  `page.tsx`; add `/projects/[slug]` detail routes only if the single page grows too long.
