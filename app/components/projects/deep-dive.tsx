import type { Project } from "../../types/project";
import { NoteList } from "../ui/note-list";
import { TechRow } from "../ui/tech-row";

/** Sticky-scroll deep dive: the narrative pins to the side while the
 *  stacked diagrams scroll past it. */
export function DeepDive({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:items-start md:gap-16">
      {/* pinned narrative */}
      <div className="md:sticky md:top-24 md:self-start rounded-lg border border-edge bg-canvas-raised/60 p-6">
        <h3 className="font-hand text-3xl leading-none text-ink">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
          {project.category}
        </p>

        <div className="mt-5 space-y-2 text-sm leading-relaxed text-ink-dim">
          {project.description.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="mt-5">
          <NoteList items={project.architectureNotes} />
        </div>

        <div className="mt-6">
          <TechRow items={project.techStack} />
        </div>
      </div>

      {/* scrolling diagrams */}
      <div className="space-y-14 md:space-y-28">{children}</div>
    </div>
  );
}
