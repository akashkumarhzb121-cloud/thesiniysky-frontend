'use client';

import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveHoverButton({ children, className }: InteractiveHoverButtonProps) {
  return (
    <button className={cn(
      "group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm px-6 py-3 text-white border border-white/20 transition-all hover:bg-white/20",
      className
    )}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
    </button>
  );
}
