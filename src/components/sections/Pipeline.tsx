'use client';

import { motion } from 'framer-motion';
import {
  Braces,
  Database,
  Eye,
  GitBranch,
  Send,
  ShieldCheck,
} from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import AgentTerminal from '../ui/AgentTerminal';

const STAGES = [
  {
    id: 'perceive',
    label: 'Perceive',
    icon: Eye,
    detail: 'Parse intent, normalise inputs, load session memory',
    color: '#22d3ee',
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: GitBranch,
    detail: 'Decompose into a typed task graph with explicit dependencies',
    color: '#7c5cff',
  },
  {
    id: 'retrieve',
    label: 'Retrieve',
    icon: Database,
    detail: 'Hybrid search over pgvector, reranked and MMR-diversified',
    color: '#a78bfa',
  },
  {
    id: 'act',
    label: 'Act',
    icon: Braces,
    detail: 'Schema-validated tool calls with retries and budget caps',
    color: '#34d399',
  },
  {
    id: 'reflect',
    label: 'Reflect',
    icon: ShieldCheck,
    detail: 'Critic scores groundedness, replans on unsupported claims',
    color: '#fbbf24',
  },
  {
    id: 'respond',
    label: 'Respond',
    icon: Send,
    detail: 'Stream cited output, log traces and evals to LangSmith',
    color: '#22d3ee',
  },
];

const GUARANTEES = [
  { k: 'Determinism', v: 'Typed state machines over free-form prompt chains' },
  { k: 'Observability', v: 'Every hop traced, costed, and replayable' },
  { k: 'Groundedness', v: 'Citation-enforced answers with critic gating' },
  { k: 'Cost control', v: 'Token budgets, caching, and model routing per node' },
];

/**
 * How the agentic systems are actually built — the architectural spine of the
 * portfolio, and the section that separates "used an LLM API" from
 * "engineered an agent runtime".
 */
export default function Pipeline() {
  return (
    <Section id="pipeline" divider>
      <SectionHeader
        kicker="How it works"
        title={
          <>
            The <span className="text-gradient">agent loop</span> I build
            against
          </>
        }
        description="Not a prompt in a for-loop. A typed, observable graph where every node can retry, replan, and justify itself — with the receipts to prove it."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Stage flow                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative mt-20">
        {/* Connector rail — horizontal on desktop, vertical on mobile */}
        <div className="pointer-events-none absolute inset-x-0 top-7 hidden h-px lg:block">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          {/* Pulse travelling the rail, the way a request travels the graph */}
          <motion.div
            className="absolute top-1/2 h-[3px] w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-glow to-transparent"
            animate={{ left: ['-8%', '100%'] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 0.6,
            }}
            style={{ filter: 'blur(1px)' }}
          />
        </div>

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {STAGES.map((stage, i) => (
            <Reveal as="li" key={stage.id} delay={i * 0.08} className="group">
              <div className="flex flex-col items-start lg:items-center lg:text-center">
                {/* Node */}
                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border bg-void-950 transition-all duration-500 group-hover:scale-110"
                  style={{
                    borderColor: `${stage.color}44`,
                    boxShadow: `0 0 0 0 ${stage.color}00`,
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: `0 0 28px -4px ${stage.color}` }}
                  />
                  <stage.icon size={20} style={{ color: stage.color }} />
                </div>

                <span className="mt-4 font-mono text-[0.65rem] tracking-[0.2em] text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {stage.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                  {stage.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Trace + guarantees                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-24 grid gap-10 lg:grid-cols-12">
        <Reveal direction="right" className="lg:col-span-7">
          <AgentTerminal />
        </Reveal>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <h3 className="text-2xl font-semibold text-ink">
              What I hold the system to
            </h3>
            <p className="mt-3 text-ink-dim">
              Agents fail in ways ordinary services do not. These are the
              properties I engineer for before anything ships.
            </p>
          </Reveal>

          <dl className="mt-8 space-y-px overflow-hidden rounded-2xl border border-white/[0.07]">
            {GUARANTEES.map((item, i) => (
              <Reveal key={item.k} delay={0.16 + i * 0.07}>
                <div className="bg-white/[0.025] px-5 py-4 transition-colors duration-300 hover:bg-white/[0.06]">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cyan-glow">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 text-sm text-ink-dim">{item.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
