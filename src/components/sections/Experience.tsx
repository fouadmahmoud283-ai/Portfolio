'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  Users,
} from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const ROLES = [
  {
    id: 'obelion',
    title: 'AI & Agentic Systems Engineer',
    company: 'Obelion.AI',
    location: 'Remote',
    period: 'Present',
    type: 'Full-time',
    current: true,
    summary:
      'Lead engineer on the Syntera code generation and marketplace products, building the agent runtime behind both.',
    achievements: [
      'Architect multi-agent systems on LangGraph with typed state and explicit control flow',
      'Own the retrieval layer — hybrid search, reranking, and evaluation harnesses',
      'Ship autonomous workflows from prototype to production behind FastAPI services',
      'Instrument every graph with tracing, cost accounting, and regression evals',
      'Partner with product and design to turn model capability into usable surface',
    ],
    stack: ['LangGraph', 'LangChain', 'Vector DBs', 'FastAPI', 'MLOps', 'Python'],
    icon: Briefcase,
    accent: '#22d3ee',
  },
  {
    id: 'instructor',
    title: 'AI & Data Science Instructor',
    company: 'Educational Institution',
    location: 'Hybrid',
    period: '1.5 years',
    type: 'Full-time',
    current: false,
    summary:
      'Taught robotics, machine learning, and data science to students and working professionals.',
    achievements: [
      'Designed curriculum and hands-on project tracks for AI/ML courses',
      'Mentored 50+ students through real-world applied projects',
      'Ran workshops on Python, classical ML, and AI ethics',
      'Built lab exercises bridging software models and robotics hardware',
      'Produced course content for online delivery',
    ],
    stack: ['Python', 'Scikit-learn', 'TensorFlow', 'Jupyter', 'Robotics'],
    icon: Users,
    accent: '#34d399',
  },
];

const EDUCATION = {
  degree: 'Mechatronics & Robotics Engineering',
  institution: 'University',
  period: 'In progress',
  summary:
    'The intersection of mechanical engineering, electronics, and software — and where my instinct for feedback loops came from.',
  focus: [
    'Control systems and automation',
    'Sensor integration and signal processing',
    'Robotics programming and AI integration',
    'Embedded systems development',
    'Mechanical design and manufacturing',
  ],
};

const CERTIFICATIONS = [
  { name: 'LangChain & LangGraph Specialist', issuer: 'Self-directed', year: '2024' },
  { name: 'MLOps Engineering', issuer: 'Industry experience', year: '2024' },
  { name: 'Advanced Python for AI/ML', issuer: 'Professional development', year: '2023' },
  { name: 'AI Ethics & Responsible AI', issuer: 'Teaching certification', year: '2023' },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // The beam fills as the timeline scrolls through the viewport, so the rail
  // reads as progress rather than decoration.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 55%'],
  });
  const beamHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    { stiffness: 90, damping: 26 }
  );

  return (
    <Section id="experience" divider>
      <SectionHeader
        kicker="Trajectory"
        title={
          <>
            Experience &amp; <span className="text-gradient">education</span>
          </>
        }
        description="From teaching the fundamentals to shipping the systems — a path through AI engineering, robotics, and the classroom."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Timeline                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div ref={timelineRef} className="relative mt-16 pl-8 sm:pl-12">
        {/* Rail */}
        <div className="absolute left-[7px] top-2 h-full w-px bg-white/[0.08] sm:left-[15px]">
          <motion.div
            style={{ height: beamHeight }}
            className="w-px bg-gradient-to-b from-cyan-glow via-iris to-mint"
          />
        </div>

        <div className="space-y-12">
          {ROLES.map((role, i) => (
            <Reveal key={role.id} delay={i * 0.1}>
              <div className="relative">
                {/* Node */}
                <span
                  className="absolute -left-8 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 bg-void-950 sm:-left-12"
                  style={{ borderColor: role.accent }}
                >
                  {role.current && (
                    <span
                      className="absolute inset-0 rounded-full animate-pulse-ring"
                      style={{ background: role.accent }}
                    />
                  )}
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: role.accent }}
                  />
                </span>

                <article className="surface group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110"
                        style={{
                          borderColor: `${role.accent}33`,
                          background: `${role.accent}12`,
                        }}
                      >
                        <role.icon size={18} style={{ color: role.accent }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-ink">
                          {role.title}
                        </h3>
                        <p
                          className="text-sm font-medium"
                          style={{ color: role.accent }}
                        >
                          {role.company}
                        </p>
                      </div>
                    </div>

                    {role.current && (
                      <span className="rounded-full border border-mint/25 bg-mint/[0.08] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mint">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.72rem] text-ink-faint">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {role.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={12} />
                      {role.location}
                    </span>
                    <span>{role.type}</span>
                  </div>

                  <p className="mt-5 leading-relaxed text-ink-dim">
                    {role.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {role.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-sm leading-relaxed text-ink-dim"
                      >
                        <span
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full"
                          style={{ background: role.accent }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Education + certifications                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-20 grid gap-6 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="surface h-full rounded-2xl p-7">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink">
              <GraduationCap size={19} className="text-iris" />
              Education
            </h3>

            <div className="mt-6">
              <h4 className="text-base font-semibold text-ink">
                {EDUCATION.degree}
              </h4>
              <p className="mt-1 font-mono text-[0.72rem] text-ink-faint">
                {EDUCATION.institution} · {EDUCATION.period}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                {EDUCATION.summary}
              </p>

              <ul className="mt-5 grid gap-2">
                {EDUCATION.focus.map((area) => (
                  <li
                    key={area}
                    className="flex gap-3 text-sm leading-relaxed text-ink-dim"
                  >
                    <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-iris" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="surface h-full rounded-2xl p-7">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink">
              <Award size={19} className="text-mint" />
              Certifications &amp; continued learning
            </h3>

            <ul className="mt-6 space-y-px overflow-hidden rounded-xl border border-white/[0.07]">
              {CERTIFICATIONS.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-center justify-between gap-4 bg-white/[0.022] px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.06]"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{cert.name}</p>
                    <p className="text-xs text-ink-faint">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-mint">
                    {cert.year}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-ink-faint">
              The field moves faster than any curriculum. I read the papers,
              rebuild the interesting results, and keep a running list of what
              broke — that list has taught me more than any certificate.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
