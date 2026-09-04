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

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.4 (App Router) |
| UI runtime | React 19.2 |
| Language | TypeScript 5.9 (strict mode) |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Fonts | `next/font/google` — Caveat (handwriting) + JetBrains Mono (technical), both variable |
| Animation | `framer-motion` ^13.2.0 — scroll-linked draw-on, reduced-motion aware _(Phase 2)_ |
| Sketch rendering | `roughjs` ^4.6.6 — hand-drawn SVG for the architecture & stack diagrams _(Phase 2)_ |
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
    architecture-diagram.tsx      # <ArchitectureDiagram/> — file-upload system, Rough.js  (Phase 2)
    stack-diagram.tsx             # <StackDiagram/> — Jewelry Merchant Platform stack       (Phase 2)
  ui/
    animated-sketch.tsx           # the scroll-driven Rough.js + framer-motion engine       (Phase 2)
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

### Animated diagrams — `components/`

The two real diagrams are drawn on the fly with **Rough.js** and animated with **framer-motion**;
`components/ui/animated-sketch.tsx` is the shared engine, `components/projects/*` are the concrete
diagrams. All three are Client Components (`"use client"`).

**`components/ui/animated-sketch.tsx`** exports:

| Export | Purpose |
| --- | --- |
| `AnimatedSketch` | wrapper that renders one `<svg role="img" aria-label={label}>` and provides scroll progress to its children. Creates a `rough.generator` with a **fixed `seed`** so the generated path data is identical on server and client and hydrates without `next/dynamic` / `ssr:false`. Scroll position comes from `useScroll` + `useTransform`; `prefers-reduced-motion` is read via `useReducedMotion` behind a `useSyncExternalStore` hydration guard. |
| `RoughShape` | a `rect` / `ellipse` / `line` / `polyline` / `path` spec → Rough drawable → one `motion.path` per stroke. Outlines animate `pathLength`, hachure-fill regions animate `opacity`, both keyed to a `draw={[start, end]}` slice of scroll progress. |
| `RoughArrow` | a shaft (first 60% of its `draw` range) plus a hand-drawn arrowhead polyline (last 40%). |
| `SketchText` | a `motion.text` label in the `hand` or `mono` variant that fades in over its `draw` range. |
| `SKETCH_PALETTE` | maps `ink` / `inkDim` / `accent` / `accentWarm` / `edge` / `raised` to the raw `:root` CSS vars (the `@theme` `--color-*` vars are not emitted at runtime). |

Under `prefers-reduced-motion` every animated value snaps straight to its finished state — the
diagrams render fully, just without the draw-on.

**`components/projects/architecture-diagram.tsx`** — `<ArchitectureDiagram/>` (named export, no
props). The File Upload System: three node boxes — Next.js route handler → AWS S3 → OpenAI — in
ballpoint-blue hachure, forward arrows labelled "pre-signed PUT" and "object → prompt", and a
warm-accent response path looping back to the Next.js box ("summary · grounded answers").
`viewBox="0 0 820 340"`, `seed={13}`.

**`components/projects/stack-diagram.tsx`** — `<StackDiagram/>` (named export, no props). The
Jewelry Merchant Platform stack: three stacked layers — React + PrimeReact / Express · Node.js /
Knex.js → MySQL — in warm-accent hachure, joined by vertical arrows ("HTTP · JSON", "SQL via
Knex"), with a mono caption for the relational core. `viewBox="0 0 820 430"`, `seed={71}`.

### Still placeholder

Honest list of what Phase 2 leaves for later:

- 6 of the 8 chapters still use `.sketch-placeholder` slots — only **03** (partly) and **04** have
  real diagrams.
- `NAME`, `CONTACT.github`, and `CONTACT.linkedin` in `app/page.tsx` are `TODO` placeholders.
- No `components/layout` shell, no per-project routes, no assets in `public/sketches/`.

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
