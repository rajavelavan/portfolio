"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import rough from "roughjs";

/* -------------------------------------------------------------------------
 * Types derived from Rough.js' public default export, so we never deep-import
 * a subpath the package doesn't expose under its "exports" map.
 * ---------------------------------------------------------------------- */
type RoughGenerator = ReturnType<typeof rough.generator>;
type Drawable = ReturnType<RoughGenerator["rectangle"]>;
type PathInfo = ReturnType<RoughGenerator["toPaths"]>[number];
type RoughOptions = NonNullable<Parameters<RoughGenerator["rectangle"]>[4]>;

/** The exact `offset` shape `useScroll` accepts, without importing an internal type. */
type ScrollOffset = NonNullable<
  NonNullable<Parameters<typeof useScroll>[0]>["offset"]
>;

/* -------------------------------------------------------------------------
 * Palette — the raw `:root` custom properties from app/globals.css.
 * globals.css uses `@theme inline`, so the Tailwind `--color-*` tokens are
 * not emitted at runtime, but `--ink` / `--accent` / … are.
 * ---------------------------------------------------------------------- */
export const SKETCH_PALETTE = {
  ink: "var(--ink)",
  inkDim: "var(--ink-dim)",
  accent: "var(--accent)",
  accentWarm: "var(--accent-warm)",
  edge: "var(--edge-strong)",
  raised: "var(--canvas-raised)",
} as const;

interface SketchContextValue {
  generator: RoughGenerator;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

const SketchContext = createContext<SketchContextValue | null>(null);

function useSketch(): SketchContextValue {
  const ctx = useContext(SketchContext);
  if (!ctx) {
    throw new Error(
      "<RoughShape>, <RoughArrow> and <SketchText> must be rendered inside <AnimatedSketch>.",
    );
  }
  return ctx;
}

/* =======================================================================
 * <AnimatedSketch>
 * ==================================================================== */

export interface AnimatedSketchProps {
  /** Responsive coordinate system, e.g. "0 0 820 340". */
  viewBox: string;
  /** Accessible name for the figure (the <svg> has role="img"). */
  label: string;
  /**
   * Fixed PRNG seed for Rough.js. A constant seed makes the generated path
   * data identical on server and client, so the SVG hydrates cleanly without
   * `next/dynamic` / `ssr: false`.
   */
  seed?: number;
  /**
   * Framer Motion `useScroll` offset — the window over which progress travels
   * 0 → 1. Default: starts when the figure's top edge is 85% down the
   * viewport, completes when its bottom edge reaches 30%.
   */
  offset?: ScrollOffset;
  className?: string;
  children: ReactNode;
}

const DEFAULT_OFFSET: ScrollOffset = ["start 0.85", "end 0.3"];

/** `false` on the server and on the first client render, `true` afterwards —
 *  without a setState-in-effect. Lets us defer to the client-only
 *  `prefers-reduced-motion` reading only once the SVG has hydrated. */
const subscribeNoop = () => () => {};
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function AnimatedSketch({
  viewBox,
  label,
  seed = 1,
  offset = DEFAULT_OFFSET,
  className,
  children,
}: AnimatedSketchProps) {
  const ref = useRef<HTMLDivElement>(null);

  // `useReducedMotion` reads matchMedia synchronously on the client, so gate it
  // behind hydration — otherwise a reduced-motion visitor's first client render
  // disagrees with the server's and the path dash attributes mismatch.
  const systemReduced = useReducedMotion() ?? false;
  const hydrated = useHydrated();
  const prefersReduced = systemReduced && hydrated;

  const { scrollYProgress } = useScroll({ target: ref, offset });

  const generator = useMemo(
    () =>
      rough.generator({
        options: { seed, roughness: 1.35, bowing: 1.1, strokeWidth: 1.6 },
      }),
    [seed],
  );

  const value = useMemo<SketchContextValue>(
    () => ({
      generator,
      progress: scrollYProgress,
      reducedMotion: prefersReduced,
    }),
    [generator, scrollYProgress, prefersReduced],
  );

  return (
    <div ref={ref} className={className}>
      <SketchContext.Provider value={value}>
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          role="img"
          aria-label={label}
          className="block h-auto w-full overflow-visible"
        >
          {children}
        </svg>
      </SketchContext.Provider>
    </div>
  );
}

/* =======================================================================
 * <RoughShape> — one hand-drawn primitive, drawn across `draw` progress
 * ==================================================================== */

export type RoughShapeSpec =
  | { kind: "rect"; x: number; y: number; w: number; h: number }
  | { kind: "ellipse"; cx: number; cy: number; w: number; h: number }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "polyline"; points: Array<[number, number]> }
  | { kind: "path"; d: string };

export interface RoughShapeProps {
  shape: RoughShapeSpec;
  /** Sub-range of the parent scroll progress over which this shape is drawn. */
  draw?: [number, number];
  /** Per-shape seed so identical geometry still varies by hand. */
  seed?: number;
  stroke?: string;
  /** When set, adds a Rough.js hachure fill in this colour (drawn, not filled). */
  fill?: string;
  options?: RoughOptions;
}

function toDrawable(
  g: RoughGenerator,
  s: RoughShapeSpec,
  o: RoughOptions,
): Drawable {
  switch (s.kind) {
    case "rect":
      return g.rectangle(s.x, s.y, s.w, s.h, o);
    case "ellipse":
      return g.ellipse(s.cx, s.cy, s.w, s.h, o);
    case "line":
      return g.line(s.x1, s.y1, s.x2, s.y2, o);
    case "polyline":
      return g.linearPath(s.points, o);
    case "path":
      return g.path(s.d, o);
  }
}

export function RoughShape({
  shape,
  draw = [0, 1],
  seed = 1,
  stroke = SKETCH_PALETTE.ink,
  fill,
  options,
}: RoughShapeProps) {
  const { generator, progress, reducedMotion } = useSketch();

  const paths = useMemo<PathInfo[]>(() => {
    const opts: RoughOptions = {
      seed,
      stroke,
      strokeWidth: 1.6,
      ...(fill
        ? { fill, fillStyle: "hachure", fillWeight: 1, hachureGap: 9 }
        : null),
      ...options,
    };
    return generator.toPaths(toDrawable(generator, shape, opts));
  }, [generator, shape, seed, stroke, fill, options]);

  const drawn = useTransform(progress, draw, [0, 1], { clamp: true });
  const pathLength = reducedMotion ? 1 : drawn;
  const opacity = reducedMotion ? 1 : drawn;

  return (
    <g>
      {paths.map((p, i) => {
        // Rough.js toPaths(): solid fill regions carry `fill`; outlines and
        // hachure strokes carry `stroke` with fill "none".
        const solid = !!p.fill && p.fill !== "none";
        return (
          <motion.path
            key={i}
            d={p.d}
            fill={solid ? p.fill : "none"}
            stroke={solid ? "none" : p.stroke}
            strokeWidth={p.strokeWidth || 1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={solid ? { opacity } : { pathLength }}
          />
        );
      })}
    </g>
  );
}

/* =======================================================================
 * <RoughArrow> — line + hand-drawn arrowhead; the head draws after the shaft
 * ==================================================================== */

export interface RoughArrowProps {
  from: [number, number];
  to: [number, number];
  draw?: [number, number];
  seed?: number;
  color?: string;
  /** Arrowhead leg length in user units. */
  head?: number;
}

export function RoughArrow({
  from,
  to,
  draw = [0, 1],
  seed = 1,
  color = SKETCH_PALETTE.accent,
  head = 11,
}: RoughArrowProps) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const a = Math.atan2(y2 - y1, x2 - x1);
  const spread = Math.PI / 7;
  const [s0, s1] = draw;
  const headStart = s0 + (s1 - s0) * 0.6;

  return (
    <>
      <RoughShape
        shape={{ kind: "line", x1, y1, x2, y2 }}
        draw={[s0, headStart]}
        seed={seed}
        stroke={color}
        options={{ strokeWidth: 1.8 }}
      />
      <RoughShape
        shape={{
          kind: "polyline",
          points: [
            [x2 - head * Math.cos(a - spread), y2 - head * Math.sin(a - spread)],
            [x2, y2],
            [x2 - head * Math.cos(a + spread), y2 - head * Math.sin(a + spread)],
          ],
        }}
        draw={[headStart, s1]}
        seed={seed + 7}
        stroke={color}
        options={{ strokeWidth: 1.8 }}
      />
    </>
  );
}

/* =======================================================================
 * <SketchText> — Caveat / JetBrains Mono label that fades in on `draw`
 * ==================================================================== */

export interface SketchTextProps {
  x: number;
  y: number;
  children: ReactNode;
  variant?: "hand" | "mono";
  size?: number;
  color?: string;
  draw?: [number, number];
  anchor?: "start" | "middle" | "end";
}

export function SketchText({
  x,
  y,
  children,
  variant = "hand",
  size,
  color,
  draw = [0, 1],
  anchor = "middle",
}: SketchTextProps) {
  const { progress, reducedMotion } = useSketch();
  const revealed = useTransform(progress, draw, [0, 1], { clamp: true });

  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="middle"
      className={variant === "hand" ? "font-hand" : "font-mono"}
      fill={
        color ??
        (variant === "hand" ? SKETCH_PALETTE.ink : SKETCH_PALETTE.inkDim)
      }
      fontSize={size ?? (variant === "hand" ? 21 : 12)}
      style={{ opacity: reducedMotion ? 1 : revealed }}
    >
      {children}
    </motion.text>
  );
}
