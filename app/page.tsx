import { getProjectBySlug, getProjectsByType } from "./lib/projects";
import { NAME, CONTACT } from "./data/constants";
import { learningNotes } from "./data/learning-notes";
import { Chapter } from "./components/layout/chapter";
import { ProjectCard } from "./components/projects/project-card";
import { DeepDive } from "./components/projects/deep-dive";
import { ArchitectureDiagram } from "./components/projects/architecture-diagram";
import { StackDiagram } from "./components/projects/stack-diagram";
import { RequestPathDiagram } from "./components/projects/request-path-diagram";
import { SecurityAgentDiagram } from "./components/projects/security-agent-diagram";
import { CicdPipelineDiagram } from "./components/projects/cicd-pipeline-diagram";
import { RagAgentDiagram } from "./components/projects/rag-agent-diagram";
import { NotebookDoodleClient } from "./components/projects/notebook-doodle-client";



import { TechRow } from "./components/ui/tech-row";
import { NoteList } from "./components/ui/note-list";
import { PixelProfile } from "./components/ui/pixel-profile";
import { 
  GmailIcon, 
  LinkedinIcon,
  DiscordIcon,
  GithubIcon,
  HackerRankIcon,
  LeetCodeIcon,
  MediumIcon,
  ResumeIcon
} from "./components/ui/icons";
/* ==================================================================
   The narrative — one page, eight chapters
   ================================================================== */

export default function Home() {
  const personal = getProjectsByType("personal");
  const experiments = getProjectsByType("experiment");
  const [org] = getProjectsByType("organization");

  const fileUpload = getProjectBySlug("file-upload-ai-analysis");
  const secAgent = getProjectBySlug("autonomous-cloud-security-agent");
  const gateway = getProjectBySlug("cryptographic-ai-governance-gateway");
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* ===== COVER ============================================= */}
        <section
          id="cover"
          className="flex min-h-[92vh] flex-col justify-center py-24"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
                Field notebook · 2026
              </p>
              <h1 className="mt-6 font-hand text-6xl leading-[0.95] text-ink md:text-8xl">
                Building systems,
                <br />
                end to end.
              </h1>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
                I&apos;m {NAME}, Software Engineer. This is a working notebook —
                how I think about the whole path a request takes, from the pixel a
                user clicks down through the API, the database, and the infrastructure
                it all runs on. Lately the last chapter has been AI engineering.
              </p>
            </div>
            <div className="w-full max-w-sm shrink-0">
              <PixelProfile />
            </div>
          </div>
          <p className="mt-12 font-mono text-xs text-ink-dim">scroll ↓</p>
        </section>

        {/* ===== 01 · THE FOUNDATION ============================== */}
        <Chapter
          id="foundation"
          no="01"
          kicker="The Foundation"
          title="Understand the whole system first."
          lead="Before I write a line, I map the full path: browser UI → API → database → infrastructure. Every feature is a slice through all four layers, and the bugs that matter live at the seams between them."
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-4 text-sm leading-relaxed text-ink-dim">
              <p>
                My first real systems were <strong>Angular</strong> and{" "}
                <strong>React</strong> front-ends talking to{" "}
                <strong>Express</strong> services over REST, with{" "}
                <strong>MySQL</strong> holding the relational core. Different
                framework, same shape: a component fires a request, a route
                validates and orchestrates it, a query reads or writes rows, a
                response travels back.
              </p>
              <p>
                Learning to hold that entire path in my head at once — not just
                the layer I happened to be editing — is the single thing that
                made me faster. You debug a slow page by knowing which layer
                owns the latency.
              </p>
              <TechRow items={["Angular", "React", "Express", "MySQL", "REST"]} />
            </div>
            <div className="space-y-14">
              <RequestPathDiagram />
            </div>
          </div>
        </Chapter>

        {/* ===== 02 · THE WORKBENCH ============================== */}
        <Chapter
          id="workbench"
          no="02"
          kicker="The Workbench"
          title="Personal builds — each one a full slice."
          lead="These are the projects I build to learn a layer properly. Every one of them is wired front to back; none of them stops at the UI."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {personal.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Chapter>

        {/* ===== 03 · THE SYSTEMS (DEEP DIVES) =================== */}
        <Chapter
          id="systems"
          no="03"
          kicker="The Systems"
          title="Two deep dives."
          lead="Zooming in on two builds where the architecture is the interesting part. The notes pin to the left; the diagrams scroll past them."
        >
          <div className="space-y-28 md:space-y-40">
            {fileUpload ? (
              <DeepDive project={fileUpload}>
                <ArchitectureDiagram />
              </DeepDive>
            ) : null}
            {secAgent ? (
              <DeepDive project={secAgent}>
                <SecurityAgentDiagram />
              </DeepDive>
            ) : null}
          </div>
        </Chapter>

        {/* ===== 04 · PROFESSIONAL EXPERIENCE ==================== */}
        <Chapter
          id="experience"
          no="04"
          kicker="Professional Experience"
          title="Architecture, translated into code."
          lead="The platform I shipped in a professional setting. The point of this chapter is the translation step: a diagram is only worth drawing if the code ends up matching it one-to-one."
        >
          {org ? (
            <div className="grid gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:items-start md:gap-16">
              {/* pinned narrative */}
              <div className="md:sticky md:top-24 md:self-start rounded-lg border border-accent/30 bg-canvas-raised/70 p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-accent-warm">
                  Organization project
                </p>
                <h3 className="mt-2 font-hand text-3xl leading-none text-ink">
                  {org.title}
                </h3>

                <div className="mt-5 space-y-2 text-sm leading-relaxed text-ink-dim">
                  {org.description.map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                <div className="mt-5">
                  <NoteList items={org.architectureNotes} />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink-dim">
                  In practice that meant a strict chain per feature: a{" "}
                  <strong>PrimeReact</strong> screen in the admin panel maps to
                  an <strong>Express</strong> route, which maps to a{" "}
                  <strong>Knex.js</strong> query-builder call, which maps to a{" "}
                  <strong>MySQL</strong> table. When the diagram and the code
                  stay in lockstep, onboarding and debugging both get cheap.
                </p>

                <div className="mt-6">
                  <TechRow items={org.techStack} />
                </div>
              </div>

              {/* scrolling diagrams */}
              <div className="space-y-14 md:space-y-28">
                <StackDiagram />
              </div>
            </div>
          ) : null}
        </Chapter>

        {/* ===== 05 · THE CLOUD ================================= */}
        <Chapter
          id="cloud"
          no="05"
          kicker="The Cloud"
          title="Where it actually runs."
          lead="Deployment mechanics, not slogans. How a commit becomes a running process on a machine I don't own."
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-4 text-sm leading-relaxed text-ink-dim">
              <p>
                <strong>Docker</strong> packages the app and its dependencies
                into one image, so &ldquo;works on my machine&rdquo; stops being
                a risk. <strong>Jenkins</strong> runs the pipeline on every push:
                build the image, run tests, push the artifact, deploy.
              </p>
              <p>
                <strong>AWS EC2</strong> is the host the containers land on.{" "}
                <strong>AWS S3</strong> holds what doesn&apos;t belong on the
                box — build artifacts, user uploads, static assets — addressed by
                key and served directly.
              </p>
              <p>
                The mental model I keep: <em>stateless compute you can throw
                away</em>, <em>state pushed to managed services</em>, and a{" "}
                <em>pipeline that&apos;s the only way to production</em>.
              </p>
              <TechRow
                items={["AWS EC2", "AWS S3", "Docker", "Jenkins", "CI/CD"]}
              />
            </div>
            <div className="space-y-14">
              <CicdPipelineDiagram />
            </div>
          </div>

          <div className="mt-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-dim">
              Lab tickets — infra experiments
            </p>
            <ul className="mt-5 divide-y divide-edge/60 border-y border-edge/60">
              {experiments.map((exp) => (
                <li
                  key={exp.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
                >
                  <span className="font-hand text-xl text-ink">{exp.title}</span>
                  <span className="text-sm text-ink-dim">
                    {exp.description[0]}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                    {exp.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ===== 06 · THE NEXT LAYER =========================== */}
        <Chapter
          id="next-layer"
          no="06"
          kicker="The Next Layer"
          title="The pivot to AI engineering."
          lead="Same instinct — understand the whole system — pointed at a new stack: retrieval, agents, and evaluation on top of the full-stack foundation."
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-4 text-sm leading-relaxed text-ink-dim">
              <p>
                <strong>RAG</strong> is a retrieval problem wearing a generation
                costume: chunk the corpus, embed it, put it in a vector store,
                pull the right context at query time, then let the model write.
                The failure modes are almost always in retrieval.
              </p>
              <p>
                <strong>Agents</strong> are a model, a set of tools, and a loop —
                reason, act, observe, repeat — wrapped in guardrails and a
                human-approval gate for anything irreversible.
              </p>
              <p>
                This already shows up in the workbench: the{" "}
                <strong>{secAgent?.title ?? "cloud security agent"}</strong> is an
                agent loop end to end, and the{" "}
                <strong>{gateway?.title ?? "governance gateway"}</strong> is the
                policy-and-attestation layer that sits between an app and the
                model provider.
              </p>
              <TechRow
                items={[
                  "RAG",
                  "Vector stores",
                  "Embeddings",
                  "Agents / tool use",
                  "LangChain",
                  "Evals",
                ]}
              />
            </div>
            <div className="space-y-14">
              <RagAgentDiagram />
            </div>
          </div>
        </Chapter>

        {/* ===== 07 · ENGINEERING NOTEBOOK ==================== */}
        <Chapter
          id="notebook"
          no="07"
          kicker="Engineering Notebook"
          title="Notes on what I'm learning now."
          lead="Dated entries, straight from the margin. These are working conclusions, not finished essays."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {learningNotes.map((note) => (
              <article
                key={note.date}
                className="rounded-lg border border-edge bg-canvas-raised/60 p-6"
              >
                <p className="font-mono text-xs text-accent">{note.date}</p>
                <p className="mt-3 font-hand text-2xl leading-snug text-ink">
                  {note.body}
                </p>
              </article>
            ))}
            <div className="md:col-span-2">
              <NotebookDoodleClient/>
            </div>
          </div>
        </Chapter>

        {/* ===== 08 · CONTACT ================================= */}
        <Chapter
          id="contact"
          no="08"
          kicker="Contact"
          title="Close the notebook — let's talk."
          lead="If any chapter here matches something you're building, I'd like to hear about it."
        >
          <div className="space-y-10">
            <p className="text-sm leading-relaxed text-ink-dim md:text-base max-w-xl">
              I&apos;m looking for work where the whole path matters &mdash; where
              someone still has to hold the UI, the API, the data, and the
              infrastructure in one head &mdash; and increasingly where that head also
              has to reason about a model in the loop.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { href: `mailto:${CONTACT.email}`, label: "appaiya.raja@gmail.com", icon: GmailIcon },
                { href: CONTACT.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
                { href: CONTACT.github, label: "GitHub", icon: GithubIcon, external: true },
                { href: CONTACT.discord, label: "Discord", icon: DiscordIcon, external: true },
                { href: CONTACT.hackerrank, label: "HackerRank", icon: HackerRankIcon, external: true },
                { href: CONTACT.leetcode, label: "LeetCode", icon: LeetCodeIcon, external: true },
                { href: CONTACT.medium, label: "Medium", icon: MediumIcon, external: true },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-3 text-ink-dim hover:text-accent transition-colors w-fit"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-sm">{link.label}</span>
                </a>
              ))}
            </div>

            <a
              href={CONTACT.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-edge bg-canvas-raised/60 px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent w-fit"
              aria-label="View Resume"
            >
              <ResumeIcon className="w-4 h-4" />
              <span>View Resume</span>
            </a>
          </div>
        </Chapter>

        <footer className="border-t border-edge/50 py-12 font-mono text-xs text-ink-dim">
          <p>
            {NAME} · {CONTACT.email}
          </p>
        </footer>
      </div>
    </main>
  );
}
