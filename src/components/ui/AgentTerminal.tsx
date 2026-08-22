'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Tone = 'muted' | 'info' | 'ok' | 'warn';

type TraceLine = {
  time?: string;
  actor?: string;
  text: string;
  tone?: Tone;
};

const TRACE: TraceLine[] = [
  { text: '$ langgraph run supervisor --task "quarterly-risk-report"', tone: 'muted' },
  { text: '' },
  { time: '00.00', actor: 'supervisor', text: 'decomposed task into 4 subgoals' },
  { time: '00.42', actor: 'retriever', text: 'pgvector · 128 candidates → 12 chunks (mmr, k=12)' },
  { time: '01.07', actor: 'analyst', text: 'tool_call python_repl → 3 tables parsed', tone: 'ok' },
  { time: '01.88', actor: 'analyst', text: 'tool_call web_search → 6 sources cited', tone: 'ok' },
  { time: '02.41', actor: 'critic', text: 'groundedness 0.94 · hallucination 0.02' },
  { time: '02.63', actor: 'critic', text: '1 unsupported claim → replanning', tone: 'warn' },
  { time: '03.10', actor: 'analyst', text: 'revision applied, citations attached' },
  { time: '03.55', actor: 'supervisor', text: 'done · 5 steps · 18.4k tokens · $0.11', tone: 'ok' },
  { text: '' },
  { text: '▸ report.md written · evals passed 18/18', tone: 'ok' },
];

const TONE_CLASS: Record<Tone, string> = {
  muted: 'text-ink-faint',
  info: 'text-ink-dim',
  ok: 'text-mint',
  warn: 'text-amber-glow',
};

/**
 * A stylised trace from a multi-agent run, revealed line by line on scroll.
 *
 * It reads as the thing this portfolio is about: a supervisor decomposing
 * work, retrieval, tool calls, and a critic loop that catches its own errors.
 */
export default function AgentTerminal({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className={`surface-solid overflow-hidden rounded-2xl ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[0.7rem] tracking-wide text-ink-faint">
          agent-trace — supervisor.graph
        </span>
        <span className="ml-auto hidden items-center gap-1.5 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          <span className="font-mono text-[0.65rem] text-mint">live</span>
        </span>
      </div>

      {/* Trace body */}
      <div className="overflow-x-auto px-4 py-4 sm:px-5">
        <pre className="min-w-[34rem] font-mono text-[0.74rem] leading-[1.85] sm:text-[0.8rem]">
          {TRACE.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.13, ease: 'easeOut' }}
              className="whitespace-pre"
            >
              {line.time && (
                <span className="text-ink-faint">[{line.time}] </span>
              )}
              {line.actor && (
                <span className="text-cyan-glow">
                  {line.actor.padEnd(11, ' ')}
                </span>
              )}
              {line.actor && <span className="text-ink-faint">→ </span>}
              <span className={TONE_CLASS[line.tone ?? 'info']}>
                {line.text || ' '}
              </span>
            </motion.div>
          ))}

          {/* Prompt cursor, only after the trace finishes printing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: TRACE.length * 0.13 + 0.2 }}
            className="flex items-center gap-1 pt-1"
          >
            <span className="text-ink-faint">$</span>
            <span className="inline-block h-[0.95em] w-[7px] bg-cyan-glow animate-blink" />
          </motion.div>
        </pre>
      </div>
    </div>
  );
}
