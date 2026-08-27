'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useSiteTheme } from './ThemeProvider';
import type { ThemeId } from '@/lib/themes';

type Props = {
  theme: ThemeId;
  children: ReactNode;
  className?: string;
};

/**
 * Marks a region of the page as belonging to a theme.
 *
 * While this element is the most visible zone on screen, the whole site adopts
 * its palette and 3D scene — so scrolling from the PNU datacenter role into the
 * Obelion agentic role visibly changes the environment around the content.
 */
export default function ThemeZone({ theme, children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reportZone } = useSiteTheme();
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Score by how much of the VIEWPORT this zone covers, not by
        // intersectionRatio. Ratio is relative to the target's own height, so
        // a short card scores 1.0 while a tall section tops out near 0.4 —
        // which would let small cards permanently outrank whole sections.
        const root = entry.rootBounds;
        const coverage =
          root && root.height > 0
            ? Math.min(1, entry.intersectionRect.height / root.height)
            : 0;

        reportZone(id, theme, entry.isIntersecting ? coverage : 0);
      },
      {
        // A ladder of thresholds keeps the coverage figure updating as the
        // zone moves, rather than only on enter/exit.
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        // Ignore the strip behind the fixed header.
        rootMargin: '-72px 0px 0px 0px',
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      reportZone(id, theme, 0);
    };
  }, [id, theme, reportZone]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
