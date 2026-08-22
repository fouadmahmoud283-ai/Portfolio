'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Check,
  GraduationCap,
  Lock,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import TiltCard from '../ui/TiltCard';
import Modal from '../ui/Modal';

type Project = {
  id: string;
  title: string;
  org: string;
  category: string;
  status: 'Production' | 'Deployed';
  summary: string;
  detail: string;
  technologies: string[];
  features: { title: string; body: string }[];
  metrics: { label: string; value: string }[];
  icon: typeof Bot;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    id: 'codegen',
    title: 'Syntera Code Generation',
    org: 'Obelion.AI',
    category: 'Agentic Systems',
    status: 'Production',
    summary:
      'An autonomous pipeline that takes a business requirement and returns a tested, deployable application — requirements analysis through to CI.',
    detail:
      'A supervisor agent decomposes an incoming spec into a task graph, then delegates to specialist agents for architecture, implementation, and test authoring. Generated code is executed in a sandbox, tested, and fed back through a critic loop until the suite passes. Retrieval over an internal pattern library keeps output consistent with house conventions rather than generic boilerplate.',
    technologies: ['LangGraph', 'LangChain', 'Vector DBs', 'FastAPI', 'Docker', 'CI/CD', 'Python'],
    features: [
      { title: 'Multi-agent reasoning', body: 'Supervisor delegates to architect, implementer, and test agents over a shared typed state.' },
      { title: 'Spec to code', body: 'Business requirements are compiled into a dependency-ordered task graph before a line is written.' },
      { title: 'Automated validation', body: 'Every artifact runs in a sandbox with generated tests gating the merge.' },
      { title: 'Feedback loops', body: 'Failed runs re-enter planning with the failure trace as context, not as a retry.' },
    ],
    metrics: [
      { label: 'Environment', value: 'Prod' },
      { label: 'Agents in graph', value: '6' },
      { label: 'Test gate', value: 'Enforced' },
    ],
    icon: Bot,
    accent: '#22d3ee',
  },
  {
    id: 'marketplace',
    title: 'Syntera Marketplace',
    org: 'Obelion.AI',
    category: 'MLOps Platform',
    status: 'Production',
    summary:
      'A central hub for AI/ML tooling — discovery, resource management, and deployment pipelines for teams building and serving models.',
    detail:
      'A platform that consolidates model and tool discovery behind semantic search, then carries an asset all the way to a served endpoint. Ingestion runs on scheduled scraping and normalisation jobs; the serving layer standardises deployment so teams stop hand-rolling one-off inference services.',
    technologies: ['MLOps', 'Vector Search', 'Streamlit', 'MongoDB', 'React', 'Python'],
    features: [
      { title: 'Semantic discovery', body: 'Embedding-backed search and recommendation across the tool catalogue.' },
      { title: 'Resource management', body: 'One registry for models, datasets, and the pipelines that connect them.' },
      { title: 'Deployment pipelines', body: 'A standard path from registered model to served endpoint.' },
      { title: 'Usage analytics', body: 'Adoption and performance metrics per tool and per team.' },
    ],
    metrics: [
      { label: 'Environment', value: 'Prod' },
      { label: 'Surface', value: 'Full-stack' },
      { label: 'Retrieval', value: 'Hybrid' },
    ],
    icon: ShoppingCart,
    accent: '#34d399',
  },
  {
    id: 'pnu',
    title: 'Princess Nourah University Platform',
    org: 'Client engagement',
    category: 'Educational AI',
    status: 'Deployed',
    summary:
      'Agentic coursework infrastructure: automated assessment generation, a contextual assistant for staff and students, and automated grading.',
    detail:
      'Course material is indexed per module, so generated assessments and assistant answers stay scoped to what a given cohort has actually been taught. Grading runs through a rubric-constrained chain with human review on low-confidence outputs, and per-student progress feeds back into how content is sequenced.',
    technologies: ['LangChain', 'NLP', 'Assessment Systems', 'Python', 'Machine Learning'],
    features: [
      { title: 'Assessment generation', body: 'Quizzes derived from indexed course content, difficulty-tagged per module.' },
      { title: 'Contextual assistant', body: 'Round-the-clock support for lecturers and students, grounded in the syllabus.' },
      { title: 'Automated grading', body: 'Rubric-constrained scoring with human review on low-confidence results.' },
      { title: 'Adaptive sequencing', body: 'Delivery adjusts to measured student progress rather than a fixed track.' },
    ],
    metrics: [
      { label: 'Status', value: 'Deployed' },
      { label: 'Users', value: 'Staff + students' },
      { label: 'Grading', value: 'Rubric-gated' },
    ],
    icon: GraduationCap,
    accent: '#7c5cff',
  },
  {
    id: 'optionstrikes',
    title: 'OptionStrikes Financial AI',
    org: 'Saudi Financial Group',
    category: 'Financial Technology',
    status: 'Production',
    summary:
      'Forecasting agents for equities and options, wired to subscription billing and a Telegram bot for real-time delivery.',
    detail:
      'Time-series models and an LLM analysis layer produce forecasts for Saudi market instruments, with the reasoning surfaced alongside the number rather than hidden behind it. Gumroad handles entitlement, and a Telegram bot delivers signals and answers follow-up questions against the same context the forecast was generated from.',
    technologies: ['Forecasting', 'Time Series', 'Gumroad API', 'Telegram Bot', 'Python'],
    features: [
      { title: 'Forecasting models', body: 'Equity and options prediction over Saudi market instruments.' },
      { title: 'Subscription entitlement', body: 'Gumroad integration gates access and handles billing lifecycle.' },
      { title: 'Real-time delivery', body: 'Telegram bot pushes signals and fields follow-up questions in context.' },
      { title: 'Market analytics', body: 'Aggregate analysis layered on top of the per-instrument forecasts.' },
    ],
    metrics: [
      { label: 'Environment', value: 'Prod' },
      { label: 'Delivery', value: 'Realtime' },
      { label: 'Billing', value: 'Integrated' },
    ],
    icon: TrendingUp,
    accent: '#fbbf24',
  },
];

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = PROJECTS.find((p) => p.id === openId) ?? null;

  return (
    <Section id="projects" divider>
      <SectionHeader
        kicker="Selected work"
        title={
          <>
            Systems running in{' '}
            <span className="text-gradient">production</span>
          </>
        }
        description="Four agentic platforms serving real users — code generation, MLOps, education, and financial forecasting. Built end to end, not prototyped and abandoned."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.09}>
            <TiltCard
              intensity={5}
              glowColor={`${project.accent}22`}
              className="h-full rounded-3xl"
            >
              <article className="surface group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-white/[0.14]">
                {/* Accent bar that grows on hover */}
                <span
                  className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-700 group-hover:scale-y-100"
                  style={{ background: project.accent }}
                />

                {/* Head */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border p-3.5 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${project.accent}33`,
                      background: `${project.accent}12`,
                    }}
                  >
                    <project.icon size={22} style={{ color: project.accent }} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint/[0.08] px-2.5 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-mint">
                        {project.status}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-6 flex-1">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint">
                    {project.category} · {project.org}
                  </p>
                  <h3 className="mt-2.5 text-2xl font-semibold leading-tight text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3.5 text-[0.94rem] leading-relaxed text-ink-dim">
                    {project.summary}
                  </p>

                  {/* Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07]">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-white/[0.025] px-3 py-3 text-center"
                      >
                        <div className="font-mono text-sm font-semibold text-ink">
                          {metric.value}
                        </div>
                        <div className="mt-0.5 text-[0.62rem] uppercase tracking-wide text-ink-faint">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Foot */}
                <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                  <button
                    onClick={() => setOpenId(project.id)}
                    className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-cyan-glow"
                  >
                    Read the case study
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </button>

                  {/* Honest about why there is no repo link */}
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-ink-faint"
                    title="Client and employer work — source is not public"
                  >
                    <Lock size={11} />
                    Private source
                  </span>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Case study modal                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Modal
        open={Boolean(active)}
        onClose={() => setOpenId(null)}
        title={active?.title ?? ''}
      >
        {active && (
          <div className="p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl border"
                style={{
                  borderColor: `${active.accent}33`,
                  background: `${active.accent}12`,
                }}
              >
                <active.icon size={19} style={{ color: active.accent }} />
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint">
                  {active.category} · {active.org}
                </p>
                <h3 className="text-xl font-semibold text-ink">
                  {active.title}
                </h3>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-ink-dim">{active.detail}</p>

            <h4 className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cyan-glow">
              What it does
            </h4>
            <ul className="mt-4 space-y-3.5">
              {active.features.map((feature, i) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                  className="flex gap-3"
                >
                  <Check
                    size={15}
                    className="mt-1 shrink-0"
                    style={{ color: active.accent }}
                  />
                  <span className="text-sm leading-relaxed text-ink-dim">
                    <strong className="font-semibold text-ink">
                      {feature.title}
                    </strong>{' '}
                    — {feature.body}
                  </span>
                </motion.li>
              ))}
            </ul>

            <h4 className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cyan-glow">
              Stack
            </h4>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.technologies.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
