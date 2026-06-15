"use client";

import React, { useRef, useEffect, useState } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  className?: string;
}

export function InfiniteSlider({ children, speed = 40, speedOnHover = 20, gap = 112, className }: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const currentSpeed = isHovering ? speedOnHover : speed;
    scroller.style.animationDuration = currentSpeed + "s";
  }, [isHovering, speed, speedOnHover]);

  return (
    <div
      ref={containerRef}
      className={"relative overflow-hidden " + (className || "")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={scrollerRef}
        className="flex animate-infinite-scroll"
        style={{ gap: gap + "px" }}
      >
        <div className="flex shrink-0" style={{ gap: gap + "px" }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: gap + "px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}