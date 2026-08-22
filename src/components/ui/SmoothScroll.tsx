'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/scroll';
import { usePrefersReducedMotion } from '@/hooks/useMotionPrefs';

/**
 * Inertial scrolling for the whole document.
 *
 * Skipped entirely when the visitor prefers reduced motion — smoothed scroll
 * is exactly the kind of vestibular effect that setting exists to disable.
 */
export default function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch devices already feels right; overriding it
      // fights the platform.
      syncTouch: false,
    });

    setLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return null;
}
