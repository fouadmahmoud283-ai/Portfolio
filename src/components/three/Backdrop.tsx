'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionTier } from '@/hooks/useMotionPrefs';
import { useSiteTheme } from '@/components/theme/ThemeProvider';
import { THEMES, type ThemeId } from '@/lib/themes';

// The 3D bundle is large and strictly client-side — keep it out of the
// server render and off the critical path.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

const THEME_IDS = Object.keys(THEMES) as ThemeId[];

/**
 * Everything that sits behind the page content: themed ambient light, a faint
 * grid, and (when the device can take it) the WebGL scene.
 *
 * Each theme's light pools are pre-rendered as their own layer and crossfaded
 * on opacity — gradients don't interpolate, but opacity does, so this is what
 * makes the palette shift look like a dissolve rather than a cut.
 */
export default function Backdrop() {
  const tier = useMotionTier();
  const { theme, themeId } = useSiteTheme();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void-950"
    >
      {THEME_IDS.map((id) => {
        const t = THEMES[id];
        return (
          <motion.div
            key={id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: id === themeId ? 1 : 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          >
            <div
              className="absolute -top-[18%] left-[8%] h-[46rem] w-[46rem] rounded-full blur-2xl animate-breathe"
              style={{
                background: `radial-gradient(circle, ${t.glow[0]}, transparent 65%)`,
              }}
            />
            <div
              className="absolute -right-[10%] top-[22%] h-[52rem] w-[52rem] rounded-full blur-2xl animate-float-slow"
              style={{
                background: `radial-gradient(circle, ${t.glow[1]}, transparent 65%)`,
              }}
            />
            <div
              className="absolute bottom-[-14%] left-[26%] h-[38rem] w-[38rem] rounded-full blur-2xl animate-breathe"
              style={{
                background: `radial-gradient(circle, ${t.glow[2]}, transparent 65%)`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Structural grid, faded toward the edges */}
      <div className="absolute inset-0 grid-lines mask-fade-y opacity-60" />

      {/* WebGL layer */}
      {tier && tier !== 'none' && (
        <div className="absolute inset-0">
          <Scene tier={tier} theme={theme} />
        </div>
      )}

      {/* Keeps text legible over bright particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,5,10,0.55)_100%)]" />

      {/* Ambient status readout, so the theme shift reads as deliberate */}
      <div className="absolute bottom-5 right-5 hidden items-center gap-2 lg:flex">
        <span
          className="h-1.5 w-1.5 rounded-full transition-colors duration-700"
          style={{ background: theme.primary }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={themeId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32 }}
            className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-faint"
          >
            {theme.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
