'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
  gradientSize?: number;
}

export function MagicCard({ children, className, gradientColor, gradientSize }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const color = gradientColor || '#262626';
  const size = gradientSize || 200;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const bgStyle = 'radial-gradient(' + size + 'px circle at ' + position.x + 'px ' + position.y + 'px, ' + color + ', transparent 40%)';

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl border bg-white dark:bg-gray-900", className || '')}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity, background: bgStyle }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}