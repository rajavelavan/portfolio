import type { Project } from "../../types/project";
import { TechRow } from "../ui/tech-row";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-edge bg-canvas-raised/60 p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-hand text-2xl leading-none text-ink">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
          {project.category}
        </span>
      </div>

      <div className="sketch-placeholder" />

      <div className="space-y-2 text-sm leading-relaxed text-ink-dim">
        {project.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <TechRow items={project.techStack} />
    </article>
  );
}
