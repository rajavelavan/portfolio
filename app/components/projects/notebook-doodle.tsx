"use client";

import {
  AnimatedSketch,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "../ui/animated-sketch";

export function NotebookDoodle() {
  const topics = [
    "eval harnesses",
    "retrieval tuning",
    "tracing infrastructure",
    "prompt engineering",
    "agent orchestration",
  ];

  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 220"
        seed={501}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="Margin doodle: a reading queue of current learning topics including eval harnesses, retrieval tuning, tracing infrastructure, prompt engineering, and agent orchestration."
      >
        {/* Title */}
        <SketchText x={410} y={30} size={22} draw={[0, 0.12]}>reading queue</SketchText>

        {/* Horizontal line under title */}
        <RoughShape shape={{ kind: "line", x1: 200, y1: 48, x2: 620, y2: 48 }} seed={510} draw={[0.08, 0.18]} stroke={SKETCH_PALETTE.edge} />

        {/* Topic bubbles */}
        {topics.map((topic, i) => {
          const x = 80 + i * 140;
          const y = 110;
          const s = 0.15 + i * 0.14;
          return (
            <g key={topic}>
              <RoughShape
                shape={{ kind: "ellipse", cx: x + 55, cy: y, w: 130, h: 55 }}
                seed={520 + i}
                draw={[s, s + 0.12]}
                stroke={i % 2 === 0 ? SKETCH_PALETTE.accent : SKETCH_PALETTE.accentWarm}
                options={{ strokeWidth: 1.4 }}
              />
              <SketchText
                x={x + 55}
                y={y + 2}
                variant="mono"
                size={11}
                color={i % 2 === 0 ? SKETCH_PALETTE.accent : SKETCH_PALETTE.accentWarm}
                draw={[s + 0.06, s + 0.16]}
              >
                {topic}
              </SketchText>
            </g>
          );
        })}

        {/* Connecting doodle lines between bubbles */}
        {topics.slice(0, -1).map((_, i) => {
          const x1 = 80 + i * 140 + 110;
          const x2 = 80 + (i + 1) * 140;
          const s = 0.25 + i * 0.14;
          return (
            <RoughShape
              key={i}
              shape={{ kind: "line", x1, y1: 110, x2, y2: 110 }}
              seed={540 + i}
              draw={[s, s + 0.1]}
              stroke={SKETCH_PALETTE.inkDim}
              options={{ strokeWidth: 0.8 }}
            />
          );
        })}

        {/* Small annotation */}
        <SketchText x={410} y={180} variant="mono" size={10} color={SKETCH_PALETTE.inkDim} draw={[0.85, 0.98]}>✎ what I&apos;m reading next</SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> margin doodle — the reading queue
      </figcaption>
    </figure>
  );
}
