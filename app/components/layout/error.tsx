"use client";

import { useEffect } from "react";
import Link from "next/link"

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent-warm">
        Error
      </p>
      <h1 className="mt-4 font-hand text-5xl leading-tight text-ink md:text-7xl">
        Something smudged.
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim">
        An unexpected error occurred while rendering this page.
      </p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 rounded-lg border border-edge bg-canvas-raised/60 px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <span>↻</span>
          <span>Try again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-edge bg-canvas-raised/60 px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <span>←</span>
          <span>Back to the notebook</span>
        </Link>
      </div>
    </main>
  );
}
