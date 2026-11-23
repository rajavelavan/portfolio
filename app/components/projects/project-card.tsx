"use client";

import type { Project } from "../../types/project";
import { TechRow } from "../ui/tech-row";
import { GithubIcon } from "../ui/icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border border-edge bg-canvas-raised/60 p-6 md:p-8 transition-all hover:border-accent/40">
      <div className="flex flex-col justify-between gap-6">
        {/* Header: Category, Title & Quick Links */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">
              {project.category}
            </p>
            <h3 className="mt-1 font-hand text-3xl md:text-4xl leading-tight text-ink group-hover:text-accent transition-colors">
              {project.title}
            </h3>
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex shrink-0 items-center gap-5 pt-1 font-mono text-xs">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-dim transition-colors hover:text-accent"
                  aria-label={`Explore ${project.title}`}
                >
                  <span>Explore</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-dim transition-colors hover:text-accent"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>View Repository</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Minimalist Structured Points */}
        <ul className="space-y-2.5 font-mono text-xs md:text-sm text-ink-dim leading-relaxed">
          {project.description.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-accent shrink-0 select-none">›</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="border-t border-edge/60 pt-4">
          <TechRow items={project.techStack} />
        </div>
      </div>
    </article>
  );
}
