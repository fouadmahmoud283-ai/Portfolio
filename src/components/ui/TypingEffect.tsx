'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMotionPrefs';

type Props = {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDuration?: number;
  className?: string;
};

type Phase = 'typing' | 'holding' | 'deleting';

/**
 * Cycles through phrases with a terminal-style type/delete effect.
 *
 * Runs as a small state machine — each phase schedules exactly one timeout,
 * which keeps the cadence even and avoids overlapping timers.
 */
export default function TypingEffect({
  texts,
  typeSpeed = 62,
  deleteSpeed = 28,
  holdDuration = 2200,
  className = '',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    if (reduced) return;

    const full = texts[index % texts.length];

    const schedule = (fn: () => void, ms: number) => {
      const timer = setTimeout(fn, ms);
      return () => clearTimeout(timer);
    };

    if (phase === 'typing') {
      if (text.length < full.length) {
        return schedule(
          () => setText(full.slice(0, text.length + 1)),
          typeSpeed
        );
      }
      return schedule(() => setPhase('holding'), 0);
    }

    if (phase === 'holding') {
      return schedule(() => setPhase('deleting'), holdDuration);
    }

    if (text.length > 0) {
      return schedule(() => setText(full.slice(0, text.length - 1)), deleteSpeed);
    }

    return schedule(() => {
      setIndex((i) => (i + 1) % texts.length);
      setPhase('typing');
    }, 240);
  }, [text, phase, index, texts, typeSpeed, deleteSpeed, holdDuration, reduced]);

  // Reduced motion gets the first phrase, statically.
  const output = reduced ? texts[0] : text;

  return (
    <span className={className}>
      {output}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-cyan-glow align-middle animate-blink"
      />
    </span>
  );
}
