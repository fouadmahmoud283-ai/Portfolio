'use client';

import { Boxes, Cpu, Network, Server } from 'lucide-react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Counter from '../ui/Counter';
import Portrait from '../ui/Portrait';

const STATS = [
  { value: 5, suffix: '', label: 'Production platforms', icon: Boxes, color: '#22d3ee' },
  { value: 3, suffix: '', label: 'Concurrent engagements', icon: Network, color: '#7c5cff' },
  { value: 8, suffix: '', label: 'GPUs per served model', icon: Server, color: '#34d399' },
  { value: 50, suffix: '+', label: 'Engineers mentored', icon: Cpu, color: '#fbbf24' },
];

/** Rendered as a syntax-highlighted object — a profile, written as config. */
const PROFILE: [string, string, string][] = [
  ['role', '"AI Infrastructure & Agentic Systems"', 'string'],
  ['based', '"Tanta, Egypt"', 'string'],
  ['runs', '["GPU clusters", "agent runtimes"]', 'array'],
  ['stack', '["Kubernetes", "vLLM", "LangGraph"]', 'array'],
  ['background', '"Mechatronics & Robotics"', 'string'],
  ['shipping', 'true', 'boolean'],
];

const PRINCIPLES = [
  {
    title: 'The model is the easy part',
    body: 'Serving it to many tenants, on shared GPUs, without one workload starving another — that is the engineering. Most AI projects fail on infrastructure, not intelligence.',
  },
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
        {/* Portrait + profile                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-5">
          <Reveal direction="right">
            <Portrait />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="surface-solid mt-6 overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                <span className="font-mono text-[0.7rem] text-ink-faint">
                  profile.json
                </span>
                <span className="ml-auto font-mono text-[0.65rem] text-ink-faint">
                  read-only
                </span>
              </div>

              <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.76rem] leading-[1.9]">
                <span className="text-ink-faint">{'{'}</span>
                {PROFILE.map(([key, value, kind]) => (
                  <div key={key} className="whitespace-pre pl-4">
                    <span className="theme-text">&quot;{key}&quot;</span>
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
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Narrative                                                     */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-7">
          <Reveal>
            <span className="kicker kicker-theme">About</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display mt-5">
              I build the systems
              <br />
              <span className="theme-gradient">and the machines they run on</span>
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-ink-dim">
            <Reveal delay={0.14}>
              <p>
                I work at both ends of the AI stack. At{' '}
                <span className="text-ink">
                  Princess Nourah bint Abdulrahman University
                </span>{' '}
                I run GPU infrastructure — multi-tenant Kubernetes clusters,
                vLLM inference, and the telemetry that tells you which of your
                tenants is actually saturating the hardware.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                At <span className="text-ink">Obelion.AI</span> I build what
                runs on top: the{' '}
                <span className="text-ink">Syntera</span> suite — a GPU control
                plane, an AI marketplace, and a conversational software
                engineering studio whose LangGraph agents carry a project from
                requirements to pull request. Alongside that I consult for{' '}
                <span className="text-ink">Sphinx Solutions</span> in the UK on
                AI architecture and delivery.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p>
                I came to this from{' '}
                <span className="text-ink">Mechatronics &amp; Robotics</span>,
                which is less of a detour than it sounds. Closing a control loop
                around a noisy sensor and closing one around a stochastic model
                are the same problem wearing different clothes — and I spent a
                year and a half teaching both before building them full time.
              </p>
            </Reveal>
          </div>

          {/* Principles */}
          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-white/[0.07]">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={0.3 + i * 0.07}>
                <div className="group bg-white/[0.02] px-6 py-5 transition-colors duration-300 hover:bg-white/[0.055]">
                  <h3 className="flex items-center gap-2.5 font-semibold text-ink">
                    <span
                      className="h-1 w-1 rounded-full transition-all duration-300 group-hover:w-5"
                      style={{ background: 'var(--t-primary)' }}
                    />
                    {principle.title}
                  </h3>
                  <p className="mt-2 pl-[1.1rem] text-sm leading-relaxed text-ink-faint">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Philosophy */}
          <Reveal delay={0.5}>
            <blockquote
              className="surface mt-6 rounded-2xl border-l-2 px-6 py-5 transition-colors duration-1000"
              style={{ borderLeftColor: 'var(--t-primary)' }}
            >
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
