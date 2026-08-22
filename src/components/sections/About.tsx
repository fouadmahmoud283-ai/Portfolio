'use client';

import { Bot, Cpu, Network, Sparkles } from 'lucide-react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Counter from '../ui/Counter';
import TiltCard from '../ui/TiltCard';

const STATS = [
  { value: 4, suffix: '+', label: 'Production agentic systems', icon: Bot, color: '#22d3ee' },
  { value: 6, suffix: '+', label: 'RAG systems shipped', icon: Sparkles, color: '#34d399' },
  { value: 15, suffix: '+', label: 'Multi-agent workflows', icon: Network, color: '#7c5cff' },
  { value: 50, suffix: '+', label: 'Engineers mentored', icon: Cpu, color: '#fbbf24' },
];

/** Rendered as a syntax-highlighted object — a profile, written as config. */
const PROFILE: [string, string, string][] = [
  ['role', '"AI & Agentic Systems Engineer"', 'string'],
  ['company', '"Obelion.AI"', 'string'],
  ['focus', '["agents", "RAG", "MLOps"]', 'array'],
  ['stack', '["LangGraph", "LangChain", "FastAPI"]', 'array'],
  ['background', '"Mechatronics & Robotics"', 'string'],
  ['shipping', 'true', 'boolean'],
];

const PRINCIPLES = [
  {
    title: 'Architecture over prompting',
    body: 'Reliability comes from typed state, explicit control flow, and hard failure boundaries — not from a longer system prompt.',
  },
  {
    title: 'Measure what the model claims',
    body: 'Every agent I ship carries evals, groundedness scoring, and trace-level cost accounting from day one.',
  },
  {
    title: 'Robotics discipline, software agents',
    body: 'Control theory taught me to design for feedback, saturation, and drift. Agents need all three.',
  },
];

export default function About() {
  return (
    <Section id="about" divider>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ------------------------------------------------------------ */}
        {/* Narrative                                                     */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="kicker">About</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display mt-5">
              I engineer systems that
              <br />
              <span className="text-gradient">act, not just answer</span>
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ink-dim">
            <Reveal delay={0.14}>
              <p>
                I&apos;m an{' '}
                <span className="text-ink">AI &amp; Agentic Systems Engineer</span>{' '}
                at <span className="text-mint">Obelion.AI</span>, where I design
                autonomous agents that perceive, reason, plan and act on
                real business problems — and lead the engineering on our code
                generation and marketplace products.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                My work centres on{' '}
                <span className="text-ink">multi-agent orchestration</span> with
                LangChain and LangGraph: coordinated systems that delegate,
                retrieve, call tools, and critique their own output before a
                human ever sees it. I&apos;ve taken four of these from prototype
                to production, spanning automated code generation, educational
                assessment, and financial forecasting.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p>
                I came to this from{' '}
                <span className="text-ink">Mechatronics &amp; Robotics</span>,
                which is less of a detour than it sounds. Closing a control loop
                around a noisy sensor and closing one around a stochastic model
                are the same problem wearing different clothes — and I spent a
                year and a half teaching both to students before building them
                full time.
              </p>
            </Reveal>
          </div>

          {/* Principles */}
          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-white/[0.07]">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={0.3 + i * 0.08}>
                <div className="group bg-white/[0.02] px-6 py-5 transition-colors duration-300 hover:bg-white/[0.055]">
                  <h3 className="flex items-center gap-2.5 font-semibold text-ink">
                    <span className="h-1 w-1 rounded-full bg-cyan-glow transition-all duration-300 group-hover:w-5" />
                    {principle.title}
                  </h3>
                  <p className="mt-2 pl-[1.1rem] text-sm leading-relaxed text-ink-faint">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Profile card + stats                                          */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-5">
          <Reveal direction="left" delay={0.12}>
            <TiltCard
              intensity={6}
              glowColor="rgba(124,92,255,0.16)"
              className="rounded-2xl"
            >
              <div className="surface-solid overflow-hidden rounded-2xl">
                <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                  <span className="font-mono text-[0.7rem] text-ink-faint">
                    profile.json
                  </span>
                  <span className="ml-auto font-mono text-[0.65rem] text-ink-faint">
                    read-only
                  </span>
                </div>

                <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.78rem] leading-[1.9]">
                  <span className="text-ink-faint">{'{'}</span>
                  {PROFILE.map(([key, value, kind]) => (
                    <div key={key} className="pl-4 whitespace-pre">
                      <span className="text-cyan-glow">&quot;{key}&quot;</span>
                      <span className="text-ink-faint">: </span>
                      <span
                        className={
                          kind === 'boolean'
                            ? 'text-amber-glow'
                            : kind === 'array'
                              ? 'text-iris'
                              : 'text-mint'
                        }
                      >
                        {value}
                      </span>
                      <span className="text-ink-faint">,</span>
                    </div>
                  ))}
                  <span className="text-ink-faint">{'}'}</span>
                </pre>
              </div>
            </TiltCard>
          </Reveal>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.2 + i * 0.07}>
                <div className="surface group h-full rounded-2xl px-5 py-6 transition-transform duration-500 hover:-translate-y-1">
                  <stat.icon
                    size={20}
                    style={{ color: stat.color }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="mt-4 font-display text-3xl font-bold"
                    style={{ color: stat.color }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-ink-faint">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Philosophy */}
          <Reveal delay={0.4}>
            <blockquote className="surface mt-6 rounded-2xl border-l-2 border-l-cyan-glow px-6 py-5">
              <p className="text-sm italic leading-relaxed text-ink-dim">
                &ldquo;True agentic intelligence shows up when a system stops
                waiting to be prompted — when it pursues a goal, notices it was
                wrong, and corrects course on its own.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-faint">
                — Working philosophy
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
