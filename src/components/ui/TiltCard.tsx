'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMotionPrefs';

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's corners. */
  intensity?: number;
  /** Draws a cursor-following highlight across the surface. */
  spotlight?: boolean;
  glowColor?: string;
};

/**
 * A card that rotates in 3D toward the cursor and lights up where the pointer
 * sits. Rotation is spring-damped so it settles rather than snapping.
 */
export default function TiltCard({
  children,
  className = '',
  intensity = 8,
  spotlight = true,
  glowColor = 'rgba(34,211,238,0.14)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 190,
    damping: 22,
    mass: 0.5,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 190,
    damping: 22,
    mass: 0.5,
  });

  // Spotlight position in percentages, driven straight off the pointer.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useSpring(useMotionValue(0), {
    stiffness: 140,
    damping: 20,
  });

  const background = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 72%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Centre-relative, -0.5..0.5 → tilt away from the cursor on Y, toward it on X.
    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set(-(py - 0.5) * intensity * 2);

    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleEnter = () => {
    if (!reduced) glowOpacity.set(1);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {spotlight && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background, opacity: glowOpacity }}
        />
      )}
      {children}
    </motion.div>
  );
}
