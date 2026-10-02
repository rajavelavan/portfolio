/** Wraps every numbered chapter with its rule + kicker + heading. */
export function Chapter({
  id,
  no,
  kicker,
  title,
  lead,
  children,
}: {
  id: string;
  no: string;
  kicker: string;
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-edge/50 py-24 md:py-4"
    >
      <header className="mb-12 md:mb-16">
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <span>{no}</span>
          <span className="h-px flex-1 bg-edge" />
          <span>{kicker}</span>
        </div>
        <h2 className="mt-6 font-hand text-4xl leading-tight text-ink md:text-6xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
            {lead}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
