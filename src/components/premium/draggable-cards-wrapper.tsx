'use client';

import React from 'react';
import {
  DraggableCardBody,
  DraggableCardContainer,
} from '@/components/ui/draggable-card';
import Link from 'next/link';

interface DraggableItem {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  link?: string;
}

interface DraggableCardsProps {
  items: DraggableItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function DraggableCardsWrapper({ items, title, subtitle, className = '' }: DraggableCardsProps) {
  const positions = [
    'absolute top-10 left-[20%] rotate-[-5deg]',
    'absolute top-40 left-[25%] rotate-[-7deg]',
    'absolute top-5 left-[40%] rotate-[8deg]',
    'absolute top-32 left-[55%] rotate-[10deg]',
    'absolute top-20 right-[35%] rotate-[2deg]',
    'absolute top-24 left-[45%] rotate-[-7deg]',
    'absolute top-8 left-[30%] rotate-[4deg]',
  ];

  return (
    <DraggableCardContainer className={`relative flex min-h-[600px] w-full items-center justify-center overflow-hidden ${className}`}>
      {title && (
        <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-bold text-gray-400 md:text-4xl dark:text-gray-600 z-0">
          {title}
        </p>
      )}
      {subtitle && (
        <p className="absolute top-1/2 mt-20 mx-auto max-w-sm text-center text-sm text-gray-400 dark:text-gray-600 z-0">
          {subtitle}
        </p>
      )}
      {items.map((item, index) => (
        <DraggableCardBody 
          key={item.id} 
          className={positions[index % positions.length]}
        >
          {item.link ? (
            <Link href={item.link}>
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none relative z-10 h-64 w-64 md:h-80 md:w-80 object-cover rounded-xl shadow-2xl"
              />
              <h3 className="mt-4 text-center text-xl font-bold text-gray-700 dark:text-gray-300">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.subtitle}
                </p>
              )}
            </Link>
          ) : (
            <>
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none relative z-10 h-64 w-64 md:h-80 md:w-80 object-cover rounded-xl shadow-2xl"
              />
              <h3 className="mt-4 text-center text-xl font-bold text-gray-700 dark:text-gray-300">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.subtitle}
                </p>
              )}
            </>
          )}
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}