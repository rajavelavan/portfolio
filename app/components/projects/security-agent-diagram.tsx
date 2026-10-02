"use client";

import {
  AnimatedSketch,
  RoughArrow,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "../ui/animated-sketch";

const BOX = { w: 150, h: 80 } as const;

export function SecurityAgentDiagram() {
  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 420"
        seed={201}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="Security agent architecture: alerts flow into FastAPI, the LangChain agent loop reasons with Gemini, proposes remediations through a human approval gate, and executes."
      >
        {/* Row 1: Ingestion */}
        <RoughShape shape={{ kind: "rect", x: 30, y: 30, w: BOX.w, h: BOX.h }} seed={210} draw={[0, 0.1]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 20, fillWeight: 0.5 }} />
        <SketchText x={30 + BOX.w / 2} y={60} size={18} draw={[0.04, 0.12]}>Alert Source</SketchText>
        <SketchText x={30 + BOX.w / 2} y={82} variant="mono" size={10} draw={[0.06, 0.14]}>cloud findings</SketchText>

        <RoughArrow from={[30 + BOX.w, 70]} to={[280, 70]} seed={215} draw={[0.1, 0.2]} />
        <SketchText x={240} y={55} variant="mono" size={10} draw={[0.14, 0.22]}>ingest</SketchText>

        <RoughShape shape={{ kind: "rect", x: 280, y: 30, w: BOX.w, h: BOX.h }} seed={211} draw={[0.12, 0.22]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 20, fillWeight: 0.5 }} />
        <SketchText x={280 + BOX.w / 2} y={60} size={18} draw={[0.16, 0.24]}>FastAPI</SketchText>
        <SketchText x={280 + BOX.w / 2} y={82} variant="mono" size={10} draw={[0.18, 0.26]}>normalise · queue</SketchText>

        {/* Row 2: Agent Loop */}
        <RoughArrow from={[355, 110]} to={[355, 170]} seed={220} draw={[0.24, 0.34]} />

        <RoughShape shape={{ kind: "rect", x: 200, y: 170, w: 420, h: 100 }} seed={212} draw={[0.28, 0.42]} stroke={SKETCH_PALETTE.accentWarm} options={{ strokeWidth: 1.8 }} />
        <SketchText x={410} y={200} size={20} draw={[0.34, 0.44]}>LangChain Agent Loop</SketchText>
        <SketchText x={410} y={230} variant="mono" size={11} draw={[0.38, 0.48]}>reason → tool call → observe → repeat</SketchText>
        <SketchText x={410} y={252} variant="mono" size={10} color={SKETCH_PALETTE.inkDim} draw={[0.4, 0.5]}>Gemini model · enrichment tools · remediation tools</SketchText>

        {/* Circular arrow hint for loop */}
        <RoughShape
          shape={{ kind: "polyline", points: [[580, 185], [610, 195], [610, 245], [580, 255]] }}
          seed={225}
          draw={[0.42, 0.55]}
          stroke={SKETCH_PALETTE.accentWarm}
          options={{ strokeWidth: 1.4 }}
        />

        {/* Row 3: Approval */}
        <RoughArrow from={[410, 270]} to={[410, 320]} seed={230} draw={[0.52, 0.62]} color={SKETCH_PALETTE.accentWarm} />
        <SketchText x={460} y={300} variant="mono" size={10} draw={[0.56, 0.64]}>proposed fix</SketchText>

        <RoughShape shape={{ kind: "rect", x: 280, y: 320, w: 260, h: 80 }} seed={213} draw={[0.58, 0.72]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accent} options={{ hachureGap: 20, fillWeight: 0.5 }} />
        <SketchText x={410} y={350} size={18} draw={[0.64, 0.74]}>Human Approval Gate</SketchText>
        <SketchText x={410} y={375} variant="mono" size={10} draw={[0.68, 0.78]}>review reasoning trace → approve / reject</SketchText>

        {/* Execute */}
        <RoughArrow from={[540, 360]} to={[680, 360]} seed={235} draw={[0.76, 0.86]} />

        <RoughShape shape={{ kind: "rect", x: 680, y: 320, w: 120, h: 80 }} seed={214} draw={[0.8, 0.9]} stroke={SKETCH_PALETTE.ink} fill={SKETCH_PALETTE.accentWarm} options={{ hachureGap: 20, fillWeight: 0.5 }} />
        <SketchText x={740} y={355} size={16} draw={[0.84, 0.92]}>Execute</SketchText>
        <SketchText x={740} y={378} variant="mono" size={10} draw={[0.86, 0.94]}>remediate</SketchText>

        {/* Dashboard */}
        <RoughShape shape={{ kind: "rect", x: 680, y: 30, w: 120, h: 80 }} seed={216} draw={[0.5, 0.62]} stroke={SKETCH_PALETTE.ink} />
        <SketchText x={740} y={60} size={16} draw={[0.54, 0.64]}>Dashboard</SketchText>
        <SketchText x={740} y={82} variant="mono" size={10} draw={[0.56, 0.66]}>React UI</SketchText>
        <RoughShape
          shape={{ kind: "line", x1: 620, y1: 220, x2: 680, y2: 70 }}
          seed={240}
          draw={[0.6, 0.72]}
          stroke={SKETCH_PALETTE.inkDim}
          options={{ strokeWidth: 1.2 }}
        />
        <SketchText x={665} y={150} variant="mono" size={9} color={SKETCH_PALETTE.inkDim} draw={[0.64, 0.74]}>traces</SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent">▲</span> agent architecture — alert ingestion → LangChain agent loop → human approval gate → execute remediation
      </figcaption>
    </figure>
  );
}
