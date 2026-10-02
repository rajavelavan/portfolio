"use client";

import {
  AnimatedSketch,
  RoughArrow,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "../ui/animated-sketch";

const STEP = { w: 120, h: 70 } as const;
const Y1 = 60;
const Y2 = 200;
const MIDY1 = Y1 + STEP.h / 2;
const MIDY2 = Y2 + STEP.h / 2;

export function CicdPipelineDiagram() {
  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 330"
        seed={301}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="CI/CD pipeline: a git commit triggers Jenkins which builds a Docker image, runs tests, pushes to a registry, and deploys to AWS EC2."
      >
        {/* Row 1: Commit → Jenkins → Build → Test */}
        <RoughShape shape={{ kind: "rect", x: 20, y: Y1, w: STEP.w, h: STEP.h }} seed={310} draw={[0, 0.1]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={80} y={MIDY1 - 4} size={16} draw={[0.04, 0.12]}>git commit</SketchText>
        <SketchText x={80} y={MIDY1 + 16} variant="mono" size={10} draw={[0.06, 0.14]}>push</SketchText>

        <RoughArrow from={[140, MIDY1]} to={[180, MIDY1]} seed={315} draw={[0.1, 0.18]} />

        <RoughShape shape={{ kind: "rect", x: 180, y: Y1, w: STEP.w, h: STEP.h }} seed={311} draw={[0.12, 0.22]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={240} y={MIDY1 - 4} size={16} draw={[0.16, 0.24]}>Jenkins</SketchText>
        <SketchText x={240} y={MIDY1 + 16} variant="mono" size={10} draw={[0.18, 0.26]}>pipeline</SketchText>

        <RoughArrow from={[300, MIDY1]} to={[340, MIDY1]} seed={316} draw={[0.22, 0.3]} />

        <RoughShape shape={{ kind: "rect", x: 340, y: Y1, w: STEP.w + 20, h: STEP.h }} seed={312} draw={[0.24, 0.34]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={400} y={MIDY1 - 4} size={16} draw={[0.28, 0.36]}>Build Image</SketchText>
        <SketchText x={400} y={MIDY1 + 16} variant="mono" size={10} draw={[0.3, 0.38]}>Dockerfile</SketchText>

        <RoughArrow from={[480, MIDY1]} to={[520, MIDY1]} seed={317} draw={[0.34, 0.42]} />

        <RoughShape shape={{ kind: "rect", x: 520, y: Y1, w: STEP.w, h: STEP.h }} seed={313} draw={[0.36, 0.46]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={580} y={MIDY1 - 4} size={16} draw={[0.4, 0.48]}>Test</SketchText>
        <SketchText x={580} y={MIDY1 + 16} variant="mono" size={10} draw={[0.42, 0.5]}>lint · unit</SketchText>

        {/* Corner turn down */}
        <RoughArrow from={[640, MIDY1]} to={[700, MIDY1]} seed={318} draw={[0.46, 0.54]} />
        <RoughArrow from={[700, MIDY1 + 10]} to={[700, MIDY2 - 10]} seed={319} draw={[0.52, 0.6]} />

        {/* Row 2: Push → Deploy → EC2 */}
        <RoughShape shape={{ kind: "rect", x: 630, y: Y2, w: STEP.w + 20, h: STEP.h }} seed={314} draw={[0.56, 0.66]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accentWarm} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={700} y={MIDY2 - 4} size={16} draw={[0.6, 0.68]}>Push Registry</SketchText>
        <SketchText x={700} y={MIDY2 + 16} variant="mono" size={10} draw={[0.62, 0.7]}>Docker image</SketchText>

        <RoughArrow from={[630, MIDY2]} to={[530, MIDY2]} seed={320} draw={[0.66, 0.74]} color={SKETCH_PALETTE.accentWarm} />

        <RoughShape shape={{ kind: "rect", x: 390, y: Y2, w: STEP.w + 20, h: STEP.h }} seed={315} draw={[0.7, 0.8]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accentWarm} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={460} y={MIDY2 - 4} size={16} draw={[0.74, 0.82]}>Deploy</SketchText>
        <SketchText x={460} y={MIDY2 + 16} variant="mono" size={10} draw={[0.76, 0.84]}>pull · run</SketchText>

        <RoughArrow from={[390, MIDY2]} to={[290, MIDY2]} seed={321} draw={[0.8, 0.88]} color={SKETCH_PALETTE.accentWarm} />

        <RoughShape shape={{ kind: "rect", x: 140, y: Y2, w: STEP.w + 30, h: STEP.h }} seed={316} draw={[0.82, 0.92]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accentWarm} options={{ hachureGap: 18, fillWeight: 0.5 }} />
        <SketchText x={210} y={MIDY2 - 4} size={16} draw={[0.86, 0.94]}>AWS EC2</SketchText>
        <SketchText x={210} y={MIDY2 + 16} variant="mono" size={10} draw={[0.88, 0.96]}>container running</SketchText>

        {/* S3 box */}
        <RoughShape shape={{ kind: "rect", x: 20, y: Y2, w: 100, h: STEP.h }} seed={317} draw={[0.88, 0.96]} stroke={SKETCH_PALETTE.inkDim} />
        <SketchText x={70} y={MIDY2 - 4} size={14} color={SKETCH_PALETTE.inkDim} draw={[0.9, 0.98]}>AWS S3</SketchText>
        <SketchText x={70} y={MIDY2 + 16} variant="mono" size={9} color={SKETCH_PALETTE.inkDim} draw={[0.92, 1]}>objects</SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> pipeline — commit → Jenkins → build → test → push → deploy on EC2
      </figcaption>
    </figure>
  );
}
