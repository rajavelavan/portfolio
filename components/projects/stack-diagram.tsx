"use client";

import {
  AnimatedSketch,
  RoughArrow,
  RoughShape,
  SketchText,
  SKETCH_PALETTE,
} from "@/components/ui/animated-sketch";

const LAYER = { x: 190, w: 440, h: 92 } as const;
const CENTER = LAYER.x + LAYER.w / 2;

const LAYERS = [
  { y: 24, label: "React + PrimeReact", sub: "admin panel · mobile storefront" },
  { y: 162, label: "Express · Node.js", sub: "REST routes · OpenAPI contract" },
  { y: 300, label: "Knex.js → MySQL", sub: "query builder · explicit migrations" },
] as const;

/** Section 04 — the Jewelry Merchant platform stack: React / PrimeReact UI →
 *  Express (Node.js) → Knex.js / MySQL. Warm accent to match the
 *  "organization project" styling of that chapter. */
export function StackDiagram() {
  return (
    <figure className="space-y-3">
      <AnimatedSketch
        viewBox="0 0 820 430"
        seed={71}
        className="rounded-[0.625rem] border border-dashed border-edge-strong/70 bg-canvas-raised/40 p-4 md:p-6"
        label="Jewelry merchant platform stack: a React and PrimeReact UI calls an Express (Node.js) API, which reaches MySQL through the Knex.js query builder and versioned migrations."
      >
        {LAYERS.map((l, i) => {
          const start = i * 0.26;
          return (
            <g key={l.label}>
              <RoughShape
                shape={{ kind: "rect", x: LAYER.x, y: l.y, w: LAYER.w, h: LAYER.h }}
                seed={80 + i}
                draw={[start, start + 0.14]}
                stroke={SKETCH_PALETTE.ink}
                fill={SKETCH_PALETTE.accentWarm}
                options={{ hachureGap: 20, fillWeight: 0.5 }}
              />
              <SketchText
                x={CENTER}
                y={l.y + 36}
                size={24}
                draw={[start + 0.06, start + 0.2]}
              >
                {l.label}
              </SketchText>
              <SketchText
                x={CENTER}
                y={l.y + 64}
                variant="mono"
                draw={[start + 0.1, start + 0.24]}
              >
                {l.sub}
              </SketchText>
            </g>
          );
        })}

        <RoughArrow
          from={[CENTER, LAYERS[0].y + LAYER.h]}
          to={[CENTER, LAYERS[1].y]}
          seed={90}
          color={SKETCH_PALETTE.accentWarm}
          draw={[0.24, 0.4]}
        />
        <SketchText
          x={CENTER + 74}
          y={(LAYERS[0].y + LAYER.h + LAYERS[1].y) / 2}
          variant="mono"
          size={11}
          draw={[0.3, 0.44]}
        >
          HTTP · JSON
        </SketchText>

        <RoughArrow
          from={[CENTER, LAYERS[1].y + LAYER.h]}
          to={[CENTER, LAYERS[2].y]}
          seed={92}
          color={SKETCH_PALETTE.accentWarm}
          draw={[0.5, 0.66]}
        />
        <SketchText
          x={CENTER + 88}
          y={(LAYERS[1].y + LAYER.h + LAYERS[2].y) / 2}
          variant="mono"
          size={11}
          draw={[0.56, 0.7]}
        >
          SQL via Knex
        </SketchText>

        <SketchText
          x={CENTER}
          y={LAYERS[2].y + LAYER.h + 24}
          variant="mono"
          size={11}
          color={SKETCH_PALETTE.inkDim}
          draw={[0.72, 0.9]}
        >
          inventory · gold-scheme definitions · customer enrollments
        </SketchText>
      </AnimatedSketch>

      <figcaption className="font-mono text-xs leading-relaxed text-ink-dim">
        <span className="text-accent-warm">▲</span> one feature, top to bottom —
        PrimeReact form → Express route → Knex query → MySQL row
      </figcaption>
    </figure>
  );
}
