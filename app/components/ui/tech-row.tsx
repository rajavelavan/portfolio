export function TechRow({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded border border-edge px-2 py-0.5 font-mono text-xs text-ink-dim"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
