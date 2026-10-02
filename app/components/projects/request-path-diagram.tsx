"use client";

import {
  AnimatedSketch,
  RoughArrow,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "../ui/animated-sketch";

const BOX = { w: 160, h: 90 } as const;
const Y = 100;
const MIDY = Y + BOX.h / 2;

const NODES = [
  { x: 20, label: "Browser", sub: "component" },
  { x: 220, label: "Express", sub: "route handler" },
  { x: 420, label: "MySQL", sub: "query · rows" },
  { x: 620, label: "Response", sub: "JSON payload" },
] as const;

export function RequestPathDiagram() {
  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 300"
        seed={101}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="Full-stack request path: a browser component fires a request to an Express route, which queries MySQL, and the response travels back."
      >
        {NODES.map((n, i) => {
          const start = i * 0.18;
          return (
            <g key={n.label}>
              <RoughShape
                shape={{ kind: "rect", x: n.x, y: Y, w: BOX.w, h: BOX.h }}
                seed={110 + i}
                draw={[start, start + 0.12]}
                stroke={SKETCH_PALETTE.ink}
                fill={SKETCH_PALETTE.accent}
                options={{ hachureGap: 20, fillWeight: 0.5 }}
              />
              <SketchText
                x={n.x + BOX.w / 2}
                y={Y + 36}
                size={20}
                draw={[start + 0.06, start + 0.16]}
              >
                {n.label}
              </SketchText>
              <SketchText
                x={n.x + BOX.w / 2}
                y={Y + 62}
                variant="mono"
                size={11}
                draw={[start + 0.08, start + 0.18]}
              >
                {n.sub}
              </SketchText>
            </g>
          );
        })}

        {/* Forward arrows */}
        <RoughArrow from={[NODES[0].x + BOX.w, MIDY]} to={[NODES[1].x, MIDY]} seed={120} draw={[0.2, 0.35]} />
        <SketchText x={200} y={MIDY - 18} variant="mono" size={10} draw={[0.25, 0.38]}>HTTP request</SketchText>

        <RoughArrow from={[NODES[1].x + BOX.w, MIDY]} to={[NODES[2].x, MIDY]} seed={122} draw={[0.38, 0.53]} />
        <SketchText x={400} y={MIDY - 18} variant="mono" size={10} draw={[0.42, 0.55]}>SQL query</SketchText>

        <RoughArrow from={[NODES[2].x + BOX.w, MIDY]} to={[NODES[3].x, MIDY]} seed={124} draw={[0.55, 0.7]} />
        <SketchText x={600} y={MIDY - 18} variant="mono" size={10} draw={[0.6, 0.72]}>result set</SketchText>

        {/* Return path */}
        <RoughShape
          shape={{
            kind: "polyline",
            points: [
              [NODES[3].x + BOX.w / 2, Y + BOX.h],
              [NODES[3].x + BOX.w / 2, 260],
              [NODES[0].x + BOX.w / 2, 260],
              [NODES[0].x + BOX.w / 2, Y + BOX.h],
            ],
          }}
          seed={130}
          draw={[0.72, 0.88]}
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
          seed={131}
          draw={[0.86, 0.94]}
          stroke={SKETCH_PALETTE.accentWarm}
          options={{ strokeWidth: 1.7 }}
        />
        <SketchText x={410} y={276} variant="mono" size={10} color={SKETCH_PALETTE.accentWarm} draw={[0.78, 0.92]}>
          rendered response → browser
        </SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> the request path — browser → Express route → MySQL → response
      </figcaption>
    </figure>
  );
}
