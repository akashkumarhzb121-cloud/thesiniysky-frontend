'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
}

export function TypingAnimation({ children, className, duration = 100 }: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(children.substring(0, i + 1));
      i++;
      if (i >= children.length) clearInterval(interval);
    }, duration);
    return () => clearInterval(interval);
  }, [children, duration, started]);

  return <span className={cn("inline-block", className)}>{displayed}</span>;
}
