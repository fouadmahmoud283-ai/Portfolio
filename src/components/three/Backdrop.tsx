'use client';

import dynamic from 'next/dynamic';
import { useMotionTier } from '@/hooks/useMotionPrefs';

// The 3D bundle is large and strictly client-side — keep it out of the
// server render and off the critical path.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

/**
 * Everything that sits behind the page content: CSS ambient light, a faint
 * grid, and (when the device can take it) the WebGL scene.
 *
 * The CSS layers always render, so a visitor with reduced-motion enabled or no
 * WebGL still gets a designed background rather than flat black.
 */
export default function Backdrop() {
  const tier = useMotionTier();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void-950"
    >
      {/* Ambient light pools */}
      <div className="absolute -top-[18%] left-[8%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_65%)] blur-2xl animate-breathe" />
      <div className="absolute -right-[10%] top-[22%] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_65%)] blur-2xl animate-float-slow" />
      <div className="absolute bottom-[-14%] left-[26%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.10),transparent_65%)] blur-2xl animate-breathe" />

      {/* Structural grid, faded toward the edges */}
      <div className="absolute inset-0 grid-lines mask-fade-y opacity-60" />

      {/* WebGL layer */}
      {tier && tier !== 'none' && (
        <div className="absolute inset-0">
          <Scene tier={tier} />
        </div>
      )}

      {/* Keeps text legible over bright particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,5,10,0.55)_100%)]" />
    </div>
  );
}
