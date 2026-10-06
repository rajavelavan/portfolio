"use client";

import { useEffect, useState, useRef } from "react";

const GIF_PLAY_DURATION = 2000; // GIF takes ~2s to complete the sketch
const PAUSE_DURATION = 4000;    // Show completed portrait for 4s before replaying

export function PixelProfile() {
  const [src, setSrc] = useState("/profile_sketch_reveal.gif");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;

    const scheduleRestart = () => {
      // Wait for GIF to finish playing (~2s) + pause duration (4s)
      timerRef.current = setTimeout(() => {
        if (!mounted) return;
        // Restart GIF from frame 1 by cache-busting the src
        setSrc(`/profile_sketch_reveal.gif?t=${Date.now()}`);
        // Schedule the next restart
        scheduleRestart();
      }, GIF_PLAY_DURATION + PAUSE_DURATION);
    };

    scheduleRestart();

    return () => {
      mounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm aspect-square mx-auto bg-transparent overflow-hidden bg-canvas-raised">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        src={src}
        alt="icon.jpeg"
        className="h-full w-full object-scale-down"
        style={{ mixBlendMode: "luminosity" }}
        loading="eager"
      />
    </div>
  );
}
