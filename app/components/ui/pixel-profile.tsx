"use client";

import { useRef, useMemo, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* Simple seeded PRNG (mulberry32) for deterministic randomness.
 * Using Math.random() in useMemo closures causes hydration mismatches
 * and unstable values across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 32;
const ROWS = 32;
const TOTAL = COLS * ROWS;
const SEED = 42;

interface PixelBoxProps {
  scrollYProgress: MotionValue<number>;
  style: CSSProperties;
  meltStart: number;
  meltEnd: number;
  enterDelay: number;
}

function PixelBox({ scrollYProgress, style, meltStart, meltEnd, enterDelay }: PixelBoxProps) {
  const meltOpacity = useTransform(scrollYProgress, [meltStart, meltEnd], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ ...style, opacity: meltOpacity, willChange: "opacity" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: enterDelay, ease: "easeInOut" }}
    />
  );
}

export function PixelProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end start"],
  });

  /* Pre-compute all tile data once. Deterministic across renders & SSR. */
  const tiles = useMemo(() => {
    const rng = mulberry32(SEED);
    return Array.from({ length: TOTAL }, (_, i) => {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const bgPosX = ((col / (COLS - 1)) * 100).toFixed(4);
      const bgPosY = ((row / (ROWS - 1)) * 100).toFixed(4);

      return {
        style: {
          backgroundImage: "url('/profile-pic.jpeg')",
          backgroundSize: `${(COLS * 100).toFixed(0)}% ${(ROWS * 100).toFixed(0)}%`,
          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          gridColumn: col + 1,
          gridRow: row + 1,
        } as CSSProperties,
        meltStart: rng() * 0.2,
        meltEnd: 0,
        enterDelay: rng() * 2.2,
      };
    }).map((t) => ({ ...t, meltEnd: t.meltStart + 0.5 }));
  }, []);

  /* Reduced-motion fallback: static circular photo */
  if (prefersReduced) {
    return (
      <div
        ref={containerRef}
        className="relative w-full max-w-sm aspect-square mx-auto rounded-full overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile-pic.jpeg"
          alt="Rajavelavan Appaiyachetty"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm aspect-square bg-canvas-raised shadow-sm mx-auto rounded-full overflow-hidden"
    >
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {tiles.map((tile, i) => (
          <PixelBox
            key={i}
            scrollYProgress={scrollYProgress}
            style={tile.style}
            meltStart={tile.meltStart}
            meltEnd={tile.meltEnd}
            enterDelay={tile.enterDelay}
          />
        ))}
      </div>
    </div>
  );
}
