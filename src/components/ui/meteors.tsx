'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: Math.random() * 3 + 2 + 's',
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-blue-500 shadow-[0_0_0_1px_#ffffff10]"
          style={style}
        >
          <div className="absolute top-1/2 -translate-y-1/2 w-[50px] h-[1px] bg-gradient-to-r from-blue-500 to-transparent" />
        </span>
      ))}
    </div>
  );
}
