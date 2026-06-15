'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  className?: string;
}

export function Lens({ children, zoomFactor, lensSize, isStatic, className }: LensProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoom = zoomFactor || 2;
  const size = lensSize || 120;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const transformStyle = isHovering 
    ? 'scale(' + zoom + ')' 
    : 'scale(1)';
  
  const originStyle = position.x + 'px ' + position.y + 'px';

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-crosshair", className || '')}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className="transition-transform duration-200" 
        style={{ 
          transform: transformStyle, 
          transformOrigin: originStyle 
        }}
      >
        {children}
      </div>
    </div>
  );
}