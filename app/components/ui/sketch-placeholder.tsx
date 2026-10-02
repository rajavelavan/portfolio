/** An unfilled diagram slot. Renders the bare `.sketch-placeholder`
 *  div our custom diagrams will replace, plus a caption describing it. */
export function SketchPlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="space-y-3">
      <div className="sketch-placeholder" />
      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> {caption}
      </figcaption>
    </figure>
  );
}
