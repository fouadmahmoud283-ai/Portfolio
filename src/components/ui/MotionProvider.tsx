'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Applies the site-wide motion policy in one place.
 *
 * `reducedMotion="user"` makes Framer drop transform and layout animations for
 * anyone with the OS setting on, while still allowing opacity — so content
 * appears rather than never showing up.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
