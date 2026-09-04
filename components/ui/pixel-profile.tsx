"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface PixelBoxProps {
  scrollYProgress: MotionValue<number>;
  row: number;
  col: number;
  rows: number;
  cols: number;
  delay: number;
  zoom?: number;
  offsetX?: number;
  offsetY?: number;
}

function PixelBox({ scrollYProgress, row, col, rows, cols, delay, zoom = 1, offsetX = 0, offsetY = 0 }: PixelBoxProps) {
  // Randomize the melt slightly so it looks like it's melting irregularly
  const meltStart = useMemo(() => Math.random() * 0.2, []);
  const meltEnd = useMemo(() => meltStart + 0.5, []);
  
  // When scrolling, opacity goes from 1 to 0 (melting away)
  const meltOpacity = useTransform(scrollYProgress, [meltStart, meltEnd], [1, 0]);

  const bgPosX = (((col + offsetX * zoom * cols) / (zoom * cols - 1)) * 100).toFixed(4);
  const bgPosY = (((row + offsetY * zoom * rows) / (zoom * rows - 1)) * 100).toFixed(4);

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="w-full h-full absolute inset-0"
        style={{ opacity: meltOpacity }}
      >
        <motion.div
          className="w-full h-full transition-colors duration-500"
          style={{
            backgroundImage: `url('/profile-pic.jpeg')`,
            backgroundSize: `${(zoom * cols * 100).toFixed(4)}% ${(zoom * rows * 100).toFixed(4)}%`,
            backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: delay, 
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}

export function PixelProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this component.
  // start center = top of container hits center of viewport.
  // end start = bottom of container hits top of viewport.
  // We'll use start 10% to start the melt after the user starts scrolling down past the image.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end start"]
  });

  const cols = 16;
  const rows = 16;
  const boxes = Array.from({ length: rows * cols });

  // Pre-calculate delays so they are stable across renders (0 to 2.2s delay + 0.8s duration = 3s total)
  const delays = useMemo(() => boxes.map(() => Math.random() * 2.2), [boxes.length]);

  // Set zoom factors to focus on face/shoulders
  const zoom = 1; 
  const offsetX = 0; // Center horizontally
  const offsetY = 0; // Slightly offset from top

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-sm aspect-square bg-canvas-raised shadow-sm mx-auto rounded-full overflow-hidden"
    >
      <div 
        className="absolute inset-0 grid" 
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`, 
          gridTemplateRows: `repeat(${rows}, 1fr)` 
        }}
      >
        {boxes.map((_, i) => (
          <PixelBox 
            key={i}
            scrollYProgress={scrollYProgress}
            row={Math.floor(i / cols)}
            col={i % cols}
            rows={rows}
            cols={cols}
            delay={delays[i]}
            zoom={zoom}
            offsetX={offsetX}
            offsetY={offsetY}
          />
        ))}
      </div>
    </div>
  );
}
