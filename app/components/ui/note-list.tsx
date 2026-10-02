/** Numbered architecture note, as it'd sit in a margin. */
export function NoteList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3 text-sm leading-relaxed text-ink-dim">
      {items.map((note, i) => (
        <li key={i} className="flex gap-3">
          <span className="font-mono text-xs text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{note}</span>
        </li>
      ))}
    </ol>
  );
}
