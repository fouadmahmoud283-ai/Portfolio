'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  as?: 'div' | 'li' | 'section' | 'span';
};

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * The single scroll-reveal used site-wide.
 *
 * Framer already no-ops transforms under `prefers-reduced-motion` when the
 * reducedMotion config is set on MotionConfig, so there is no branch here.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 28,
  once = true,
  as = 'div',
}: Props) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
