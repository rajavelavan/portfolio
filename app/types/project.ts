/**
 * Strict discriminator that drives the site's core separation:
 * organization work vs. personal builds vs. throwaway experiments.
 */
export type ProjectType = 'personal' | 'organization' | 'experiment';

/**
 * Closed set of category buckets. Keep this union exhaustive so that
 * filtering / grouping UI never has to handle an unknown value.
 */
export type ProjectCategory =
  | 'Full-Stack Platform'
  | 'AI / ML'
  | 'Security'
  | 'Infrastructure';

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
}
