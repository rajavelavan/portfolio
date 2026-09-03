"use client";

import {
  AnimatedSketch,
  RoughArrow,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "@/components/ui/animated-sketch";

const BOX = { w: 190, h: 118 } as const;
const Y = 118;
const MIDY = Y + BOX.h / 2;

const NODES = [
  { x: 30, label: "Next.js", sub: "route handler" },
  { x: 315, label: "AWS S3", sub: "object store" },
  { x: 600, label: "OpenAI", sub: "analysis · Q&A" },
] as const;

/** Section 03 — the file-upload system: Next.js → AWS S3 → OpenAI, with a
 *  warm-accent response path looping back into the app. */
export function ArchitectureDiagram() {
  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 340"
        seed={13}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="File-upload architecture: the Next.js route issues a pre-signed URL, the browser streams the file straight to AWS S3, and the stored object is sent to OpenAI for summarisation and grounded question answering."
      >
        {NODES.map((n, i) => {
          const start = i * 0.22;
          return (
            <g key={n.label}>
              <RoughShape
                shape={{ kind: "rect", x: n.x, y: Y, w: BOX.w, h: BOX.h }}
                seed={20 + i}
                draw={[start, start + 0.12]}
                stroke={SKETCH_PALETTE.ink}
                fill={SKETCH_PALETTE.accent}
                options={{ hachureGap: 20, fillWeight: 0.5 }}
              />
              <SketchText
                x={n.x + BOX.w / 2}
                y={Y + 46}
                size={24}
                draw={[start + 0.06, start + 0.18]}
              >
                {n.label}
              </SketchText>
              <SketchText
                x={n.x + BOX.w / 2}
                y={Y + 76}
                variant="mono"
                draw={[start + 0.1, start + 0.22]}
              >
                {n.sub}
              </SketchText>
            </g>
          );
        })}

        {/* forward flow */}
        <RoughArrow
          from={[NODES[0].x + BOX.w, MIDY]}
          to={[NODES[1].x, MIDY]}
          seed={40}
          draw={[0.2, 0.36]}
        />
        <SketchText x={272} y={MIDY - 20} variant="mono" size={11} draw={[0.26, 0.4]}>
          pre-signed PUT
        </SketchText>

        <RoughArrow
          from={[NODES[1].x + BOX.w, MIDY]}
          to={[NODES[2].x, MIDY]}
          seed={42}
          draw={[0.44, 0.6]}
        />
        <SketchText x={557} y={MIDY - 20} variant="mono" size={11} draw={[0.5, 0.64]}>
          object → prompt
        </SketchText>

        {/* response path back to the app */}
        <RoughShape
          shape={{
            kind: "polyline",
            points: [
              [NODES[2].x + BOX.w / 2, Y + BOX.h],
              [NODES[2].x + BOX.w / 2, 300],
              [NODES[0].x + BOX.w / 2, 300],
              [NODES[0].x + BOX.w / 2, Y + BOX.h],
            ],
          }}
          seed={44}
          draw={[0.62, 0.82]}
          stroke={SKETCH_PALETTE.accentWarm}
          options={{ strokeWidth: 1.7 }}
        />
        <RoughShape
          shape={{
            kind: "polyline",
            points: [
              [NODES[0].x + BOX.w / 2 - 7, Y + BOX.h + 12],
              [NODES[0].x + BOX.w / 2, Y + BOX.h],
              [NODES[0].x + BOX.w / 2 + 7, Y + BOX.h + 12],
            ],
          }}
          seed={45}
          draw={[0.8, 0.9]}
          stroke={SKETCH_PALETTE.accentWarm}
          options={{ strokeWidth: 1.7 }}
        />
        <SketchText
          x={410}
          y={316}
          variant="mono"
          size={11}
          color={SKETCH_PALETTE.accentWarm}
          draw={[0.72, 0.9]}
        >
          summary · grounded answers
        </SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> pre-signed upload path — the browser
        streams straight to S3; the stored object drives OpenAI analysis and Q&amp;A
      </figcaption>
    </figure>
  );
}
