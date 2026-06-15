'use client';

import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CoolModeProps {
  children: ReactNode;
  className?: string;
}

export function CoolMode({ children, className }: CoolModeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      const angle = (i / 8) * 360;
      particle.style.transform = 'rotate(' + angle + 'deg) translateY(-30px)';
      particle.style.opacity = '1';
      particle.style.transition = 'all 0.5s ease-out';
      ref.current.appendChild(particle);
      
      requestAnimationFrame(() => {
        particle.style.transform = 'rotate(' + angle + 'deg) translateY(-60px)';
        particle.style.opacity = '0';
      });
      
      setTimeout(() => particle.remove(), 500);
    }
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)} onClick={handleClick}>
      {children}
    </div>
  );
}