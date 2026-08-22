'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Two-part custom cursor: a small dot that tracks exactly, and a ring that
 * lags behind and swells over interactive elements.
 *
 * Only mounts for fine pointers — on touch there is no cursor to replace, and
 * on reduced-motion the lag effect is the whole point, so it is skipped too.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let visible = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        visible = true;
        dot.current?.style.setProperty('opacity', '1');
        ring.current?.style.setProperty('opacity', '1');
      }

      // Anything clickable gets the expanded ring treatment.
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select')
      );

      if (interactive !== hovering) {
        hovering = interactive;
        ring.current?.classList.toggle('is-hover', interactive);
      }
    };

    const onLeave = () => {
      visible = false;
      dot.current?.style.setProperty('opacity', '0');
      ring.current?.style.setProperty('opacity', '0');
    };

    const tick = () => {
      // Ring eases toward the pointer; the dot is pinned to it.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      frame = requestAnimationFrame(tick);
    };

    // Suppress the native cursor only once ours is actually running, so a
    // failure to mount never leaves the page with no cursor at all.
    document.documentElement.classList.add('has-custom-cursor');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-cyan-glow opacity-0 transition-opacity duration-300"
        style={{ boxShadow: '0 0 12px 2px rgba(34,211,238,0.85)' }}
      />
      <div
        ref={ring}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 rounded-full border border-white/25 opacity-0 transition-[opacity,width,height,border-color,background-color] duration-300"
      />
      <style jsx global>{`
        @media (pointer: fine) {
          /* Hide the native cursor only where the custom one is drawn. */
          html.has-custom-cursor,
          html.has-custom-cursor * {
            cursor: none !important;
          }
        }
        .cursor-ring.is-hover {
          width: 3.25rem;
          height: 3.25rem;
          border-color: rgba(34, 211, 238, 0.75);
          background-color: rgba(34, 211, 238, 0.08);
        }
      `}</style>
    </>
  );
}
