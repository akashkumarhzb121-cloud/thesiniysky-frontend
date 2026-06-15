'use client';

import { cn } from '@/lib/utils';

interface AnimatedCircularProgressBarProps {
  value: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
  size?: number;
}

export function AnimatedCircularProgressBar({ value, gaugePrimaryColor = "#8B5CF6", gaugeSecondaryColor = "rgba(0,0,0,0.1)", className, size = 100 }: AnimatedCircularProgressBarProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={gaugeSecondaryColor} strokeWidth="8" />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none" stroke={gaugePrimaryColor} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-bold">{value}%</span>
    </div>
  );
}
