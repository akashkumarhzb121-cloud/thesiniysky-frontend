'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[150vh] flex flex-col items-center justify-start py-20">
      {/* Title Section - Stays at top */}
      <div className="sticky top-20 z-20 text-center px-4 mb-10">
        <motion.div
          style={{ opacity, y: translateY }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {titleComponent}
        </motion.div>
      </div>

      {/* 3D Scrolling Card Section */}
      <div className="sticky top-40 w-full max-w-6xl mx-auto px-4 perspective-[1200px]">
        <motion.div
          style={{
            rotateX,
            scale,
            transformPerspective: 1200,
          }}
          className="w-full origin-top"
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}