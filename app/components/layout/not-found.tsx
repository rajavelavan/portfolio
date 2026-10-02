import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-hand text-5xl leading-tight text-ink md:text-7xl">
        Page torn out.
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim">
        The page you&apos;re looking for doesn&apos;t exist in this notebook —
        it may have been moved or was never written.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-lg border border-edge bg-canvas-raised/60 px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <span>←</span>
        <span>Back to the notebook</span>
      </Link>
    </main>
  );
}
