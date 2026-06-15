'use client';

import { cn } from '@/lib/utils';

export function Globe({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-green-400 opacity-50 animate-pulse" />
      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue-300 to-green-300 opacity-30 animate-spin" style={{ animationDuration: '8s' }} />
      <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-green-200 opacity-20 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
    </div>
  );
}
