/**
 * Module-level viewport state.
 *
 * The 3D scene needs pointer position and scroll progress every frame. Putting
 * those in React state would re-render the whole tree 60x/second, so they live
 * here as plain mutable values: DOM listeners write, `useFrame` reads.
 */

export const viewport = {
  /** Pointer in normalised device coords, -1..1. */
  pointerX: 0,
  pointerY: 0,
  /** Smoothed pointer — the scene follows this so motion feels weighted. */
  smoothX: 0,
  smoothY: 0,
  /** 0 at the very top of the page, 1 once the hero has fully scrolled away. */
  heroProgress: 0,
  /** Whole-document scroll progress, 0..1. */
  scrollProgress: 0,
};

let listening = false;

/** Attaches the global listeners once, no matter how many components ask. */
export function startViewportTracking(): () => void {
  if (typeof window === 'undefined' || listening) return () => {};
  listening = true;

  const onPointerMove = (e: PointerEvent) => {
    viewport.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    viewport.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  const onScroll = () => {
    const y = window.scrollY;
    const vh = window.innerHeight || 1;
    viewport.heroProgress = Math.min(1, y / vh);

    const scrollable = document.documentElement.scrollHeight - vh;
    viewport.scrollProgress = scrollable > 0 ? Math.min(1, y / scrollable) : 0;
  };

  // Reset the parallax target when the pointer leaves, so the scene recentres
  // instead of freezing at whatever edge the cursor exited through.
  const onPointerLeave = () => {
    viewport.pointerX = 0;
    viewport.pointerY = 0;
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  onScroll();

  return () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('pointerleave', onPointerLeave);
    listening = false;
  };
}

/** Frame-rate independent exponential smoothing. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
