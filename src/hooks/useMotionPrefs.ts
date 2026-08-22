'use client';

import { useEffect, useState } from 'react';

export type MotionTier = 'full' | 'lite' | 'none';

/**
 * Decides how much motion this visitor should get.
 *
 * - `none`  — they asked for reduced motion. No canvas, no looping animation.
 * - `lite`  — small screen or a weak GPU/CPU. Canvas runs with fewer particles.
 * - `full`  — everything.
 *
 * Returns `null` until measured so the server and first client render agree
 * (both render the static fallback), avoiding a hydration mismatch.
 */
export function useMotionTier(): MotionTier | null {
  const [tier, setTier] = useState<MotionTier | null>(null);

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');

    const measure = () => {
      if (reduceQuery.matches) {
        setTier('none');
        return;
      }

      // A WebGL context is the hard requirement for the 3D scene.
      let webgl = false;
      try {
        const canvas = document.createElement('canvas');
        webgl = Boolean(
          canvas.getContext('webgl2') || canvas.getContext('webgl')
        );
      } catch {
        webgl = false;
      }

      if (!webgl) {
        setTier('none');
        return;
      }

      const cores = navigator.hardwareConcurrency ?? 4;
      const memory = (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory;
      const smallScreen = window.innerWidth < 768;

      const weak =
        cores <= 4 ||
        (typeof memory === 'number' && memory <= 4) ||
        (coarseQuery.matches && smallScreen);

      setTier(weak ? 'lite' : 'full');
    };

    measure();
    reduceQuery.addEventListener('change', measure);
    return () => reduceQuery.removeEventListener('change', measure);
  }, []);

  return tier;
}

/** Plain boolean for components that only care about the reduced-motion flag. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
