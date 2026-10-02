"use client";

import {
  AnimatedSketch,
  RoughArrow,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "../ui/animated-sketch";

const BOX = { w: 130, h: 65 } as const;

export function RagAgentDiagram() {
  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 380"
        seed={401}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="RAG pipeline: documents are chunked, embedded, stored in a vector database, and retrieved at query time to ground LLM generation. Agent loop: a model reasons, calls tools, observes results, and repeats with guardrails."
      >
        {/* Section label: RAG */}
        <SketchText x={410} y={24} size={20} draw={[0, 0.08]}>RAG Pipeline</SketchText>

        {/* RAG flow: Documents → Chunk → Embed → Vector Store → Retrieve → Generate */}
        {[
          { x: 20, label: "Documents", sub: "corpus" },
          { x: 160, label: "Chunk", sub: "split text" },
          { x: 300, label: "Embed", sub: "vectors" },
          { x: 440, label: "Vector DB", sub: "store" },
          { x: 580, label: "Retrieve", sub: "top-k" },
          { x: 700, label: "Generate", sub: "grounded" },
        ].map((n, i) => {
          const s = i * 0.08;
          return (
            <g key={n.label}>
              <RoughShape shape={{ kind: "rect", x: n.x, y: 50, w: BOX.w - 10, h: BOX.h - 5 }} seed={410 + i} draw={[s, s + 0.08]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 18, fillWeight: 0.4 }} />
              <SketchText x={n.x + (BOX.w - 10) / 2} y={74} size={14} draw={[s + 0.03, s + 0.1]}>{n.label}</SketchText>
              <SketchText x={n.x + (BOX.w - 10) / 2} y={94} variant="mono" size={9} draw={[s + 0.05, s + 0.12]}>{n.sub}</SketchText>
              {i < 5 ? <RoughArrow from={[n.x + BOX.w - 10, 80]} to={[n.x + BOX.w + 10, 80]} seed={420 + i} draw={[s + 0.06, s + 0.14]} head={8} /> : null}
            </g>
          );
        })}

        {/* Divider line */}
        <RoughShape shape={{ kind: "line", x1: 30, y1: 170, x2: 790, y2: 170 }} seed={430} draw={[0.48, 0.56]} stroke={SKETCH_PALETTE.edge} options={{ strokeWidth: 1 }} />

        {/* Section label: Agent */}
        <SketchText x={410} y={200} size={20} draw={[0.5, 0.58]}>Agent Loop</SketchText>

        {/* Agent: Model → Reason → Tool Call → Observe → loop */}
        {[
          { x: 80, label: "Model", sub: "LLM" },
          { x: 240, label: "Reason", sub: "plan next" },
          { x: 400, label: "Tool Call", sub: "execute" },
          { x: 560, label: "Observe", sub: "parse result" },
        ].map((n, i) => {
          const s = 0.54 + i * 0.08;
          return (
            <g key={n.label}>
              <RoughShape shape={{ kind: "rect", x: n.x, y: 220, w: BOX.w, h: BOX.h }} seed={440 + i} draw={[s, s + 0.08]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accentWarm} options={{ hachureGap: 18, fillWeight: 0.4 }} />
              <SketchText x={n.x + BOX.w / 2} y={246} size={14} draw={[s + 0.03, s + 0.1]}>{n.label}</SketchText>
              <SketchText x={n.x + BOX.w / 2} y={266} variant="mono" size={9} draw={[s + 0.05, s + 0.12]}>{n.sub}</SketchText>
              {i < 3 ? <RoughArrow from={[n.x + BOX.w, 252]} to={[n.x + BOX.w + 30, 252]} seed={450 + i} draw={[s + 0.06, s + 0.14]} color={SKETCH_PALETTE.accentWarm} head={8} /> : null}
            </g>
          );
        })}

        {/* Loop back arrow from Observe to Model */}
        <RoughShape
          shape={{ kind: "polyline", points: [[690, 252], [730, 252], [730, 330], [80 + BOX.w / 2, 330], [80 + BOX.w / 2, 285]] }}
          seed={460}
          draw={[0.86, 0.96]}
          stroke={SKETCH_PALETTE.accentWarm}
          options={{ strokeWidth: 1.5 }}
        />
        <SketchText x={410} y={348} variant="mono" size={10} color={SKETCH_PALETTE.accentWarm} draw={[0.9, 0.98]}>loop until done · guardrails · approval gate</SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> RAG pipeline + agent loop — retrieval grounds generation, the agent reasons in a tool-calling loop
      </figcaption>
    </figure>
  );
}
