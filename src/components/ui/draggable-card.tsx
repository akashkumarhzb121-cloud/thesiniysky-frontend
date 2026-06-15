'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface DraggableCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCardContainer({ children, className = '' }: DraggableCardContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface DraggableCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCardBody({ children, className = '' }: DraggableCardBodyProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ touchAction: 'none' }}
    >
      {children}
    </motion.div>
  );
}