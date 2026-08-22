'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMotionPrefs';

type Props = {
  children: ReactNode;
  className?: string;
  /** How far the element may be pulled from rest, in pixels. */
  strength?: number;
};

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 * Used on the primary calls to action and the social icons.
 */
export default function Magnetic({
  children,
  className = '',
  strength = 18,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const config = { stiffness: 260, damping: 18, mass: 0.4 };
  const x = useSpring(useMotionValue(0), config);
  const y = useSpring(useMotionValue(0), config);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    // Normalise by half-size so the pull is consistent regardless of element size.
    x.set((dx / (rect.width / 2)) * strength);
    y.set((dy / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
