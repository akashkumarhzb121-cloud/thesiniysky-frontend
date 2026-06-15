'use client';

import { Waves } from '@/components/ui/wave-background';

interface WaveSectionProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
  density?: number;
}

export function WaveSection({ children, className = '', strokeColor = 'rgba(59, 130, 246, 0.12)', density = 16 }: WaveSectionProps) {
  return (
    <section className={'relative overflow-hidden ' + className}>
      <Waves strokeColor={strokeColor} backgroundColor="transparent" density={density} waveAmplitude={3} waveSpeed={0.005} />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}