'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  Boxes,
  Building2,
  Calendar,
  Cpu,
  GraduationCap,
  Lightbulb,
  MapPin,
  Server,
  Users,
} from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Motif, { type MotifVariant } from '../ui/Motif';
import ThemeZone from '../theme/ThemeZone';
import type { ThemeId } from '@/lib/themes';

type Role = {
  id: string;
  title: string;
  company: string;
  context: string;
  location: string;
  period: string;
  type: string;
  current: boolean;
  theme: ThemeId;
  motif: MotifVariant;
  accent: string;
  summary: string;
  achievements: string[];
  stack: string[];
  icon: typeof Server;
};

const ROLES: Role[] = [
  {
    id: 'pnu',
    title: 'AI Infrastructure Engineer',
    company: 'Princess Nourah bint Abdulrahman University',
    context: 'University Datacenter',
    location: 'Riyadh, Saudi Arabia',
    period: 'Jan 2026 — Present',
    type: 'Full-time',
    current: true,
    theme: 'datacenter',
    motif: 'rack',
    accent: '#34d399',
    summary:
      'Running the GPU compute estate behind the university’s AI programmes — multi-tenant clusters, inference serving, and the observability that keeps both honest.',
    achievements: [
      'Operate multi-tenant GPU clusters with namespace-per-tenant isolation, resource quotas, and RBAC',
      'Provision datacenter infrastructure as code with Terraform and Ansible, from bare metal to hardened Kubernetes',
      'Serve LLM inference on vLLM with tensor parallelism behind an OpenAI-compatible API',
      'Instrument the estate with Prometheus, DCGM, and Grafana — utilisation heatmaps, NVLink health, and thermal alerting',
      'Enforce in-country data residency, secrets management, and admission policy across every workload',
    ],
    stack: [
      'Kubernetes',
      'RKE2',
      'Rancher',
      'Cilium',
      'NVIDIA GPU Operator',
      'vLLM',
      'Terraform',
      'Ansible',
      'Prometheus',
    ],
    icon: Server,
  },
  {
    id: 'sphinx',
    title: 'AI Consultant',
    company: 'Sphinx Solutions',
    context: 'United Kingdom',
    location: 'Remote',
    period: 'Aug 2025 — Present',
    type: 'Consulting',
    current: true,
    theme: 'advisory',
    motif: 'advisory',
    accent: '#fbbf24',
    summary:
      'Advisory work on AI architecture and delivery — helping teams decide what is worth building, and how to build it so it survives production.',
    achievements: [
      'Architecture review and feasibility assessment for LLM and agentic initiatives',
      'Retrieval strategy and evaluation design — what to measure before committing to a model',
      'Cost and model-routing guidance to keep inference spend proportional to value delivered',
      'Technical mentoring for engineering teams adopting agentic patterns',
    ],
    stack: ['AI Strategy', 'System Design', 'RAG', 'Evaluation', 'Mentoring'],
    icon: Lightbulb,
  },
  {
    id: 'obelion',
    title: 'AI & Agentic Systems Engineer',
    company: 'Obelion.AI',
    context: 'Syntera product suite',
    location: 'Remote',
    period: 'May 2024 — Present',
    type: 'Full-time',
    current: true,
    theme: 'agentic',
    motif: 'graph',
    accent: '#a78bfa',
    summary:
      'Lead engineer across the Syntera platform — the marketplace, the GPU control plane, and the conversational software-engineering studio.',
    achievements: [
      'Architect LangGraph multi-agent systems with typed state and explicit control flow',
      'Build the agent runtime behind Syntera Web — requirements through code generation, testing, and pull requests',
      'Own retrieval end to end: hybrid dense/sparse search, reranking, and groundedness evaluation',
      'Ship FastAPI services and Next.js surfaces for the marketplace and control plane',
      'Instrument every graph with tracing, cost accounting, and regression evals',
    ],
    stack: [
      'LangGraph',
      'LangChain',
      'FastAPI',
      'Qdrant',
      'Next.js',
      'Langfuse',
      'Python',
    ],
    icon: Cpu,
  },
  {
    id: 'opex',
    title: 'Scrum Master',
    company: 'OPEX — Cloud Gate',
    context: 'Multi-cloud automation platform',
    location: 'Hybrid',
    period: 'Jan 2024 — May 2024',
    type: 'Contract',
    current: false,
    theme: 'core',
    motif: 'marketplace',
    accent: '#22d3ee',
    summary:
      'Facilitated agile delivery of Cloud Gate Marketplace, a multi-cloud automation platform.',
    achievements: [
      'Coordinated cross-functional teams to ship automated multi-cloud deployment features',
      'Streamlined sprint planning, backlog management, and team communication',
      'Kept business requirements and technical execution aligned across the cloud automation work',
    ],
    stack: ['Agile', 'Scrum', 'Multi-cloud', 'Delivery'],
    icon: Boxes,
  },
  {
    id: 'instructor',
    title: 'AI & Data Science Instructor',
    company: 'Techy School',
    context: 'Robotics, ML, and data science',
    location: 'Hybrid',
    period: 'Feb 2022 — Dec 2023',
    type: 'Full-time',
    current: false,
    theme: 'academy',
    motif: 'academy',
    accent: '#fb7185',
    summary:
      'Taught the fundamentals — robotics, machine learning, and data science — to students and working professionals.',
    achievements: [
      'Designed curriculum and hands-on project tracks for AI/ML courses',
      'Mentored 50+ students through applied, real-world projects',
      'Ran workshops on Python, classical ML, and AI ethics',
      'Built lab exercises bridging software models and robotics hardware',
    ],
    stack: ['Python', 'Scikit-learn', 'TensorFlow', 'Jupyter', 'Robotics'],
    icon: Users,
  },
];

const EDUCATION = {
  degree: 'Mechatronics & Robotics Engineering',
  institution: 'Tanta University',
  period: 'Sep 2020 — May 2026',
  summary:
    'The intersection of mechanical engineering, electronics, and software — and where my instinct for feedback loops came from.',
  focus: [
    'Control systems and automation',
    'Sensor integration and signal processing',
    'Robotics programming and AI integration',
    'Embedded systems development',
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
    offset: ['start 70%', 'end 60%'],
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
            Where the work <span className="theme-gradient">happens</span>
          </>
        }
        description="Three concurrent tracks — university GPU infrastructure, agentic product engineering, and advisory. Scroll through: the environment changes with the work."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Themed timeline                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div ref={timelineRef} className="relative mt-20 pl-8 sm:pl-14">
        {/* Rail */}
        <div className="absolute left-[7px] top-3 h-full w-px bg-white/[0.08] sm:left-[19px]">
          <motion.div
            style={{
              height: beamHeight,
              background:
                'linear-gradient(to bottom, var(--t-primary), var(--t-secondary))',
            }}
            className="w-px"
          />
        </div>

        <div className="space-y-10">
          {ROLES.map((role, i) => (
            <ThemeZone key={role.id} theme={role.theme}>
              <Reveal delay={i * 0.05}>
                <div className="relative">
                  {/* Node */}
                  <span
                    className="absolute -left-8 top-8 flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 bg-void-950 sm:-left-14"
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

                  <article
                    className="surface group overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-1"
                    style={{ borderColor: `${role.accent}22` }}
                  >
                    <div className="grid lg:grid-cols-12">
                      {/* Content */}
                      <div className="p-7 sm:p-9 lg:col-span-8">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-4">
                            <div
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110"
                              style={{
                                borderColor: `${role.accent}33`,
                                background: `${role.accent}12`,
                              }}
                            >
                              <role.icon
                                size={20}
                                style={{ color: role.accent }}
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold leading-tight text-ink">
                                {role.title}
                              </h3>
                              <p
                                className="mt-1 text-sm font-medium"
                                style={{ color: role.accent }}
                              >
                                {role.company}
                              </p>
                            </div>
                          </div>

                          {role.current && (
                            <span
                              className="rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em]"
                              style={{
                                borderColor: `${role.accent}40`,
                                background: `${role.accent}14`,
                                color: role.accent,
                              }}
                            >
                              Current
                            </span>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.72rem] text-ink-faint">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={12} />
                            {role.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={12} />
                            {role.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 size={12} />
                            {role.context}
                          </span>
                          <span>{role.type}</span>
                        </div>

                        <p className="mt-5 leading-relaxed text-ink-dim">
                          {role.summary}
                        </p>

                        <ul className="mt-6 space-y-2.5">
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

                        <div className="mt-7 flex flex-wrap gap-1.5">
                          {role.stack.map((tech) => (
                            <span key={tech} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Motif panel */}
                      <div
                        className="relative hidden items-center justify-center border-l lg:col-span-4 lg:flex"
                        style={{
                          borderColor: `${role.accent}1f`,
                          background: `linear-gradient(160deg, ${role.accent}0e, transparent 70%)`,
                        }}
                      >
                        <div className="absolute inset-0 dot-grid opacity-30" />
                        <div className="relative h-40 w-full px-8">
                          <Motif variant={role.motif} accent={role.accent} />
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </Reveal>
            </ThemeZone>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Education + certifications                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="surface h-full rounded-2xl p-7">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink">
              <GraduationCap size={19} className="theme-text" />
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
                    <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full theme-soft ring-1 ring-current theme-text" />
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
              <Award size={19} className="theme-text" />
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
                  <span className="font-mono text-xs theme-text">
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
