'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

type Props = {
  className?: string;
  priority?: boolean;
};

/**
 * The portrait, graded to sit inside a dark interface.
 *
 * The source photo is a bright office shot, so it is desaturated and pushed
 * toward the active theme colour through a blended overlay — otherwise it
 * reads as a pasted-in rectangle rather than part of the page.
 */
export default function Portrait({ className = '', priority = false }: Props) {
  return (
    <TiltCard
      intensity={7}
      spotlight={false}
      className={`rounded-3xl ${className}`}
    >
      <div className="relative">
        {/* Glow bloom behind the frame, following the theme */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[2.5rem] opacity-60 blur-2xl transition-colors duration-1000"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(var(--t-primary-rgb), 0.28), transparent 68%)',
          }}
        />

        <div className="surface relative overflow-hidden rounded-3xl">
          {/* Photo */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/myphoto.jpg"
              alt="Fouad Mahmoud"
              fill
              priority={priority}
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
              style={{
                filter: 'saturate(0.72) contrast(1.06) brightness(0.86)',
              }}
            />

            {/* Theme wash — ties the photo to the active palette */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-color transition-colors duration-1000"
              style={{
                background:
                  'linear-gradient(160deg, rgba(var(--t-primary-rgb), 0.55), rgba(var(--t-secondary-rgb), 0.35))',
              }}
            />

            {/* Deepen the corners so the subject holds attention */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, transparent 42%, rgba(4,5,10,0.72) 100%)',
              }}
            />

            {/* Scan sweep */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 h-24"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(var(--t-primary-rgb), 0.13), transparent)',
              }}
              animate={{ top: ['-15%', '110%'] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 2.5,
              }}
            />

            {/* Fine scanlines */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 4px)',
              }}
            />

            {/* Corner brackets */}
            {[
              'left-4 top-4 border-l-2 border-t-2',
              'right-4 top-4 border-r-2 border-t-2',
              'left-4 bottom-4 border-b-2 border-l-2',
              'right-4 bottom-4 border-b-2 border-r-2',
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={`absolute h-6 w-6 transition-colors duration-1000 ${pos}`}
                style={{ borderColor: 'rgba(var(--t-primary-rgb), 0.55)' }}
              />
            ))}
          </div>

          {/* Caption strip */}
          <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] bg-void-950/60 px-5 py-3.5">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink">
                Fouad Mahmoud
              </p>
              <p className="mt-0.5 font-mono text-[0.62rem] text-ink-faint">
                Tanta, Egypt · Remote
              </p>
            </div>
            <span className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full transition-colors duration-1000"
                style={{ background: 'var(--t-primary)' }}
              />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">
                Available
              </span>
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
