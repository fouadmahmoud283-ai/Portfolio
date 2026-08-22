'use client';

import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Play on mount (hero) rather than waiting for the scroll viewport. */
  immediate?: boolean;
};

/**
 * Reveals text character by character, each sliding up from behind a clipping
 * mask. The whole string is exposed to assistive tech as one label; the
 * individual character spans are hidden from it.
 */
export default function SplitReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.028,
  immediate = false,
}: Props) {
  const characters = Array.from(text);

  const animationProps = immediate
    ? { animate: 'visible' as const }
    : {
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-60px' },
      };

  return (
    <motion.span
      aria-label={text}
      className={`inline-block ${className}`}
      initial="hidden"
      {...animationProps}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {characters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden
          // Overflow clip is what turns the slide into a "rising from below" reveal.
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
