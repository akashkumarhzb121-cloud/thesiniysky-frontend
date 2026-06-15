'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Children, isValidElement, useEffect, useState } from 'react';

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedList({ children, className }: AnimatedListProps) {
  const childrenArray = Children.toArray(children);
  const [items, setItems] = useState(childrenArray);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence>
        {items.slice(0, 5).map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
