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

**Phase 1 complete** — project scaffold + typed data architecture. The UI (routes and components) is
Phase 2 and not built yet.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.4 (App Router) |
| UI runtime | React 19.2 |
| Language | TypeScript 5.9 (strict mode) |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Linting | ESLint 9 (`eslint-config-next`) |
| Package manager | pnpm 10 (pinned via `packageManager`) |
| Dev bundler | Turbopack |

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
app/                              # App Router — routes & layouts (UI: Phase 2)
components/
  layout/                         # shell, header, footer          (Phase 2)
  projects/                       # project cards / diagrams        (Phase 2)
  ui/                             # shared primitives               (Phase 2)
data/
  projects.ts                     # single source of truth — the typed project array
lib/
  projects.ts                     # selector layer over data/ (UI imports from here, never data/)
types/
  project.ts                      # Project, ProjectType, ProjectCategory
public/
  sketches/                       # hand-drawn SVG / PNG assets
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

## Roadmap

**Phase 2** — the sketchbook UI: routes under `app/projects` (index + `[slug]` detail) and
`app/experiments`, backed by the components in `components/layout`, `components/projects`, and
`components/ui`.
