"use client";

import React from "react";

interface ProgressiveBlurProps {
  className?: string;
  direction?: "left" | "right";
  blurIntensity?: number;
}

export function ProgressiveBlur({ className, direction = "left", blurIntensity = 1 }: ProgressiveBlurProps) {
  const stops = Array.from({ length: 10 }, (_, i) => {
    const pos = (i / 9) * 100;
    const blur = (blurIntensity * (direction === "left" ? (1 - i / 9) : (i / 9))).toFixed(1);
    return `rgba(255,255,255,${blur}) ${pos}%`;
  });

  return (
    <div
      className={"pointer-events-none absolute " + (className || "")}
      style={{
        background: `linear-gradient(to ${direction === "left" ? "right" : "left"}, ${stops.join(", ")})`,
        backdropFilter: `blur(${blurIntensity * 8}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity * 8}px)`,
      }}
    />
  );
}