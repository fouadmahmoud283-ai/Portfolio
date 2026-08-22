'use client';

import {
  ArrowUpRight,
  Bot,
  Cpu,
  Download,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  Settings,
} from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';
import { handleResumeAction } from '@/utils/resumeUtils';

const EMAIL = 'fouadmahmoud281@gmail.com';

const CHANNELS = [
  {
    label: 'Email',
    value: EMAIL,
    note: 'Fastest route — I read everything',
    href: `mailto:${EMAIL}`,
    icon: Mail,
    accent: '#22d3ee',
  },
  {
    label: 'LinkedIn',
    value: 'fouad-mahmoud',
    note: 'Professional background and updates',
    href: 'https://www.linkedin.com/in/fouad-mahmoud-2832003/',
    icon: Linkedin,
    accent: '#7c5cff',
  },
  {
    label: 'GitHub',
    value: '@fouadmahmoud281',
    note: 'Open work and experiments',
    href: 'https://github.com/fouadmahmoud281',
    icon: Github,
    accent: '#34d399',
  },
];

const AREAS = [
  {
    title: 'AI & agentic systems',
    body: 'Multi-agent architectures, orchestration, and the runtime around them.',
    tags: ['LangGraph', 'LangChain', 'Tool-use'],
    icon: Bot,
    accent: '#22d3ee',
  },
  {
    title: 'MLOps & production AI',
    body: 'Getting models off the notebook and onto a reliable serving path.',
    tags: ['Deployment', 'Evals', 'Monitoring'],
    icon: Settings,
    accent: '#34d399',
  },
  {
    title: 'Robotics integration',
    body: 'Where the model meets hardware, sensors, and a real control loop.',
    tags: ['Mechatronics', 'Control', 'Embedded'],
    icon: Cpu,
    accent: '#fbbf24',
  },
  {
    title: 'Technical consulting',
    body: 'Architecture review, feasibility, and team mentoring on AI systems.',
    tags: ['Strategy', 'Design', 'Mentoring'],
    icon: Lightbulb,
    accent: '#7c5cff',
  },
];

export default function Contact() {
  return (
    <Section id="contact" divider>
      <SectionHeader
        kicker="Get in touch"
        title={
          <>
            Let&apos;s build something that{' '}
            <span className="text-gradient">thinks for itself</span>
          </>
        }
        description="Agentic systems, retrieval pipelines, or an AI feature that needs to survive contact with real users — if it is interesting, I want to hear about it."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Primary CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Reveal delay={0.1}>
        <a
          href={`mailto:${EMAIL}?subject=Project%20enquiry`}
          className="group surface relative mt-16 flex flex-col items-start gap-6 overflow-hidden rounded-3xl px-8 py-10 transition-colors duration-500 hover:border-white/[0.16] sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-14"
        >
          {/* Light that sweeps in from the left on hover */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(34,211,238,0.09),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />

          <div className="relative">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cyan-glow">
              Start a conversation
            </p>
            <p className="mt-3 break-all font-display text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-gradient sm:text-4xl">
              {EMAIL}
            </p>
          </div>

          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink transition-all duration-500 group-hover:border-cyan-glow group-hover:bg-cyan-glow/10">
            <ArrowUpRight
              size={22}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </a>
      </Reveal>

      {/* ---------------------------------------------------------------- */}
      {/* Channels                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {CHANNELS.map((channel, i) => (
          <Reveal key={channel.label} delay={0.16 + i * 0.07}>
            <a
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={
                channel.href.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              className="surface group flex h-full flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110"
                  style={{
                    borderColor: `${channel.accent}33`,
                    background: `${channel.accent}12`,
                  }}
                >
                  <channel.icon size={17} style={{ color: channel.accent }} />
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                />
              </div>

              <p className="mt-5 text-sm font-semibold text-ink">
                {channel.label}
              </p>
              <p
                className="mt-1 break-all font-mono text-xs"
                style={{ color: channel.accent }}
              >
                {channel.value}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-ink-faint">
                {channel.note}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Where I add value                                                 */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-20">
        <Reveal>
          <h3 className="text-center text-2xl font-semibold text-ink">
            Where I add the most value
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.08}>
              <div className="surface group h-full rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1">
                <area.icon
                  size={20}
                  style={{ color: area.accent }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <h4 className="mt-5 font-semibold text-ink">{area.title}</h4>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-faint">
                  {area.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Closing actions                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Reveal delay={0.2}>
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                <Mail size={17} />
                Send an email
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => handleResumeAction('download')}
                className="btn btn-ghost"
              >
                <Download size={17} />
                Download CV
              </button>
            </Magnetic>
          </div>

          <p className="font-mono text-sm text-ink-faint">
            &ldquo;Innovative solutions require dumb mistakes.&rdquo;
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
