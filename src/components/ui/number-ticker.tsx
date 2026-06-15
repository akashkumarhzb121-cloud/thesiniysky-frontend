'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberTickerProps {
  value: number;
  className?: string;
  decimalPlaces?: number;
  prefix?: string;
}

export function NumberTicker({ value, className, decimalPlaces = 0, prefix = '' }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + latest.toFixed(decimalPlaces);
      }
    });
  }, [springValue, decimalPlaces, prefix]);

  return <span ref={ref} className={cn("tabular-nums", className)}>{prefix}0</span>;
}
