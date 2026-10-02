"use client";

import { motion } from "framer-motion";

/* SVG path data for the name "rajavelavan" written in a flowing cursive style.
 * This is a simplified continuous path that mimics handwriting. */
const NAME_PATH =
  "M 40 60 C 40 40, 55 35, 55 50 C 55 60, 45 65, 45 55 C 45 45, 60 40, 60 60 L 60 35" + // r
  " M 68 45 C 65 45, 62 50, 65 55 C 68 60, 75 58, 72 50 C 70 45, 65 48, 68 55" + // a
  " M 78 35 L 78 60 M 78 45 C 82 42, 88 44, 85 50" + // j (simplified)
  " M 95 45 C 92 45, 89 50, 92 55 C 95 60, 102 58, 99 50 C 97 45, 92 48, 95 55" + // a
  " M 108 35 L 115 60 L 122 35" + // v
  " M 130 55 C 127 48, 130 42, 135 45 C 138 47, 135 55, 130 55 L 140 55" + // e
  " M 145 35 L 145 60" + // l
  " M 153 45 C 150 45, 147 50, 150 55 C 153 60, 160 58, 157 50 C 155 45, 150 48, 153 55" + // a
  " M 165 35 L 172 60 L 179 35" + // v
  " M 187 45 C 184 45, 181 50, 184 55 C 187 60, 194 58, 191 50 C 189 45, 184 48, 187 55" + // a
  " M 200 35 L 200 60 C 200 55, 205 50, 210 55"; // n

/* Pen SVG path */
const PEN_ICON = "M 0 0 L 3 -20 L 6 0 L 3 4 Z";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas">
      <div className="relative w-[340px] h-[160px]">
        {/* Writing pad background */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-dashed border-edge-strong/50 bg-canvas-raised/60"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "left center" }}
        >
          {/* Ruled lines */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute left-4 right-4 h-px bg-edge/30"
              style={{ top: `${30 + i * 30}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            />
          ))}
        </motion.div>

        {/* Pen */}
        <motion.div
          className="absolute z-10"
          initial={{ x: 170, y: -40, opacity: 0, rotate: -30 }}
          animate={{ x: 30, y: 75, opacity: 1, rotate: -15 }}
          transition={{
            duration: 1.0,
            delay: 0.3,
            ease: "easeInOut",
          }}
        >
          <svg width="14" height="30" viewBox="-1 -22 8 28" className="text-accent">
            <path d={PEN_ICON} fill="currentColor" stroke="var(--ink)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Handwritten name */}
        <svg
          viewBox="30 25 195 50"
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ padding: "30px 40px" }}
        >
          <motion.path
            d={NAME_PATH}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.2,
              delay: 1.2,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Subtitle that appears after name */}
        <motion.p
          className="absolute bottom-4 left-0 right-0 text-center font-mono text-[0.6rem] tracking-[0.3em] text-ink-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.2 }}
        >
          loading notebook...
        </motion.p>
      </div>
    </div>
  );
}
