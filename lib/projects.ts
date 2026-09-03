import type { Project, ProjectType } from '@/types/project';
import { projects } from '@/data/projects';

/** Every project, unfiltered. */
export const getAllProjects = (): Project[] => projects;

/** Projects of a single kind — 'organization' | 'personal' | 'experiment'. */
export const getProjectsByType = (type: ProjectType): Project[] =>
  projects.filter((p) => p.type === type);

/** A single project by its slug, or `undefined` if none matches. */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
