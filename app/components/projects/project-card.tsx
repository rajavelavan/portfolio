"use client";

import { useState } from "react";
import type { Project } from "../../types/project";
import { TechRow } from "../ui/tech-row";
import { GithubIcon } from "../ui/icons";

export function ProjectCard({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group rounded-xl border border-edge bg-canvas-raised/60 p-6 md:p-8 transition-all hover:border-accent/40">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1.3fr] md:gap-10 items-center">
        {/* Left Column: Visual Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-edge-strong bg-canvas/90">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          ) : project.image && !imageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
              {/* Engineer's corner crop marks */}
              <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-accent/50" />
              <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-accent/50" />
              <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-accent/50" />
              <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-accent/50" />

              <span className="font-hand text-xl text-ink">
                Visual slot · {project.title}
              </span>
              <p className="mt-2 font-mono text-[0.7rem] text-ink-dim">
                Place visual file at:
              </p>
              <code className="mt-1 rounded border border-edge bg-canvas px-2.5 py-1 font-mono text-[0.72rem] text-accent">
                public{project.image || `/projects/${project.slug}.png`}
              </code>
            </div>
          )}
        </div>

        {/* Right Column: Project Details */}
        <div className="flex flex-col justify-between gap-5">
          <div className="space-y-3">
            {/* Category kicker */}
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">
              {project.category}
            </p>

            {/* Title */}
            <h3 className="font-hand text-3xl md:text-4xl leading-tight text-ink group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            {/* Structured minimalist bullet points */}
            <ul className="mt-4 space-y-2.5 font-mono text-xs md:text-sm text-ink-dim leading-relaxed">
              {project.description.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-accent shrink-0 select-none">›</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 pt-2">
            {/* Tech Stack */}
            <TechRow items={project.techStack} />

            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap items-center gap-6 border-t border-edge/60 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-dim transition-colors hover:text-accent"
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
                    className="inline-flex items-center gap-2 font-mono text-xs text-ink-dim transition-colors hover:text-accent"
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
        </div>
      </div>
    </article>
  );
}
