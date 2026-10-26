/**
 * Strict discriminator that drives the site's core separation:
 * organization work vs. personal builds vs. throwaway experiments.
 */
export type ProjectType = 'personal' | 'organization' | 'experiment' | 'deep-dive';

/**
 * Closed set of category buckets. Keep this union exhaustive so that
 * filtering / grouping UI never has to handle an unknown value.
 */
export type ProjectCategory =
  | 'Full-Stack Platform'
  | 'AI / ML'
  | 'Security'
  | 'Infrastructure'
  | 'Geospatial & Real-Time'
  | 'AI Governance & Infrastructure'
  | 'Commerce & Supply Chain'
  | 'Cloud Storage & Document Intelligence'
  | 'Autonomous Agents & DevSecOps'
  | 'Identity & Access Management'
  | 'Frontend Architecture'
  | 'Containerization'
  | 'Cloud Services'
  | 'CI/CD Automation';

export interface Project {
  /** URL-safe unique id; also the `/projects/[slug]` route param. */
  slug: string;

  /** Display name. */
  title: string;

  /** One short paragraph per entry — rendered as stacked notebook lines. */
  description: string[];

  /** Fixed bucket used for grouping and filters. */
  category: ProjectCategory;

  /** Strict separation of work kinds. */
  type: ProjectType;

  /** Technologies, roughly frontend → backend → data → tooling. */
  techStack: string[];

  /** Notes on system shape, trade-offs, and key decisions. */
  architectureNotes: string[];

  /** Public repository URL, when one exists. */
  githubUrl?: string;

  /** Deployed instance URL, when one exists. */
  liveUrl?: string;

  /** Optional path to an image in `/public/projects/...` (e.g. '/projects/fleet-system.png') */
  image?: string;

  /** Optional path to a video in `/public/projects/...` (e.g. '/projects/fleet-system.mp4') */
  video?: string;
}
