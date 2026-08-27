'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  HeartHandshake,
  Lock,
  Server,
  Store,
  Terminal,
} from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Modal from '../ui/Modal';
import Motif, { type MotifVariant } from '../ui/Motif';
import ThemeZone from '../theme/ThemeZone';
import type { ThemeId } from '@/lib/themes';

type Project = {
  id: string;
  title: string;
  tagline: string;
  org: string;
  category: string;
  theme: ThemeId;
  motif: MotifVariant;
  accent: string;
  summary: string;
  detail: string;
  features: { title: string; body: string }[];
  metrics: { label: string; value: string }[];
  stack: string[];
  fullStack: { layer: string; tech: string }[];
  icon: typeof Server;
};

const PROJECTS: Project[] = [
  {
    id: 'engine',
    title: 'Syntera Engine',
    tagline: 'Multi-datacenter GPU management for enterprise AI',
    org: 'Obelion.AI',
    category: 'AI Infrastructure',
    theme: 'datacenter',
    motif: 'engine',
    accent: '#34d399',
    summary:
      'An end-to-end platform for managing GPU compute across multiple datacenter sites — multi-tenant isolation, LLM inference orchestration, and full cluster lifecycle, deployable to any site with NVIDIA GPUs.',
    detail:
      'Deployment to a new datacenter runs in three stages: Terraform provisions the infrastructure, Ansible configures the servers (RKE2, NVIDIA drivers, security hardening, monitoring), and Kubernetes overlays deploy the platform itself — Cilium networking, the GPU Operator, and the Engine services. The result is a production-grade RKE2 and Rancher stack that behaves the same way on every site it lands on.',
    features: [
      {
        title: 'Multi-tenant GPU isolation',
        body: 'Namespace-per-organisation with ResourceQuota, LimitRange, and RBAC; Cilium network policies block cross-tenant traffic; pre-flight quota enforcement and GPU pinning via node affinity.',
      },
      {
        title: 'GPU lifecycle management',
        body: 'Auto-discovery, real-time utilisation heatmaps, time-slicing, MIG partitioning, and NVLink bandwidth and error monitoring.',
      },
      {
        title: 'LLM inference',
        body: 'vLLM serving with tensor parallelism across up to 8 GPUs per model, an OpenAI-compatible API, autoscaling by request queue depth, and multi-model serving.',
      },
      {
        title: 'Security & compliance',
        body: 'CIS-hardened RKE2, eBPF network enforcement, Vault secrets, Harbor with image allow-listing, Kyverno admission policy, etcd encryption at rest, and in-country data residency.',
      },
    ],
    metrics: [
      { label: 'GPUs', value: 'H200/H100' },
      { label: 'Tensor parallel', value: 'Up to 8' },
      { label: 'Tenancy', value: 'Isolated' },
    ],
    stack: ['RKE2', 'Rancher', 'Cilium', 'GPU Operator', 'vLLM', 'Terraform', 'Ansible'],
    fullStack: [
      { layer: 'Orchestration', tech: 'RKE2 1.32 (CIS-1.8 hardened) + Rancher 2.10' },
      { layer: 'Networking', tech: 'Cilium 1.16 (eBPF, Hubble, WireGuard) + MetalLB + Nginx Ingress' },
      { layer: 'Storage', tech: 'Longhorn 1.8 (3x replicas) + NFS + local NVMe' },
      { layer: 'Registry & secrets', tech: 'Harbor 2.12, HashiCorp Vault 1.17' },
      { layer: 'Monitoring', tech: 'kube-prometheus-stack, DCGM exporter, Loki, Grafana' },
      { layer: 'Admission control', tech: 'Kyverno 1.13' },
      { layer: 'Inference', tech: 'vLLM with tensor parallelism' },
      { layer: 'Application', tech: 'Python / FastAPI 0.137, Next.js' },
      { layer: 'Multi-tenancy', tech: 'Rancher Projects + vCluster 0.21 + Cilium' },
    ],
    icon: Server,
  },
  {
    id: 'studio',
    title: 'Syntera Web · Studio',
    tagline: 'Conversational AI software engineering',
    org: 'Obelion.AI',
    category: 'Agentic Systems',
    theme: 'agentic',
    motif: 'studio',
    accent: '#a78bfa',
    summary:
      'A platform for creating, managing, and iterating on software projects through conversational AI agents — automating the SDLC from requirements gathering to pull request.',
    detail:
      'Syntera Web is the primary interface for a LangGraph-based agent system. It carries a project from requirements gathering and architecture planning through code generation, testing, and PR creation, with GitHub integration, real-time streaming of agent output, Kanban project management, sandboxed code preview, and document handling. Twenty functional modules span the full product surface.',
    features: [
      {
        title: 'LangGraph agent system',
        body: 'Multi-agent orchestration drives the full software lifecycle, with agent output streamed to the client in real time.',
      },
      {
        title: 'GitHub-native delivery',
        body: 'Work lands as branches and pull requests rather than pasted snippets, with Figma integration on the design side.',
      },
      {
        title: 'Sandboxed preview',
        body: 'Generated code runs in an isolated preview environment alongside database management tooling.',
      },
      {
        title: 'Requirements to spec',
        body: 'Document and file upload feeding BRD/SRS generation, Kanban boards, and a time-travel view over project state.',
      },
    ],
    metrics: [
      { label: 'Modules', value: '20' },
      { label: 'Orchestration', value: 'LangGraph' },
      { label: 'Output', value: 'Pull requests' },
    ],
    stack: ['LangGraph', 'Next.js 15', 'React 19', 'Tailwind', 'GitHub', 'Stripe'],
    fullStack: [
      { layer: 'Frontend', tech: 'Next.js 15 with React 19' },
      { layer: 'Styling', tech: 'Tailwind CSS' },
      { layer: 'AI orchestration', tech: 'LangGraph-based multi-agent system' },
      { layer: 'Integrations', tech: 'GitHub, Stripe, Google Drive, Figma' },
      { layer: 'Core', tech: 'Kanban boards, sandboxed preview, streaming, file handling' },
    ],
    icon: Terminal,
  },
  {
    id: 'marketplace',
    title: 'Syntera Marketplace',
    tagline: 'Control plane for LLMs, vectors, and workflows',
    org: 'Obelion.AI',
    category: 'AI Platform',
    theme: 'core',
    motif: 'marketplace',
    accent: '#22d3ee',
    summary:
      'A business-facing marketplace and control plane that turns three AI pillars — language models, vector databases, and agentic workflows — into deployable, testable services.',
    detail:
      'The platform lets customers discover, configure, deploy, test, and operate AI capabilities without building every integration layer themselves. It is a single marketplace experience for AI building blocks and a deployment layer for production-facing services — a faster path to usable endpoints for teams that do not want to build the control plane.',
    features: [
      {
        title: 'LLM endpoints',
        body: 'Browse a model catalog, tune generation parameters (max tokens, temperature, top-P, top-K), generate a ready-to-use chat endpoint, and test it in-platform.',
      },
      {
        title: 'Vector databases',
        body: 'Configure embedding, indexing (HNSW, vector space), collections, and infrastructure; deploy through a guided flow with real-time logs and retrievable credentials.',
      },
      {
        title: 'Agentic workflows',
        body: 'Build multi-step workflows visually, deploy the graph, retrieve its execution schema, and run it directly from the platform.',
      },
      {
        title: 'Usage & billing visibility',
        body: 'Dashboards for tokens used, vector queries, workflow runs, estimated cost, and balance, with activity distribution and daily trends.',
      },
    ],
    metrics: [
      { label: 'Pillars', value: '3' },
      { label: 'Deploy', value: 'Guided' },
      { label: 'Billing', value: 'Metered' },
    ],
    stack: ['React', 'FastAPI', 'Vector DBs', 'Python'],
    fullStack: [
      { layer: 'Frontend', tech: 'React application' },
      { layer: 'Backend', tech: 'FastAPI (Python) — data processing, LLM integration' },
      { layer: 'Core', tech: 'LLM catalog, vector DB deployment, workflow builder' },
      { layer: 'Data', tech: 'Vector database management, synthetic data generation' },
    ],
    icon: Store,
  },
  {
    id: 'bayan',
    title: 'Bayan',
    tagline: 'Bilingual AI librarian',
    org: 'Obelion.AI',
    category: 'Conversational AI',
    theme: 'agentic',
    motif: 'library',
    accent: '#7c5cff',
    summary:
      'An Arabic/English librarian chatbot offering book discovery, personalised recommendations, interactive character chats through StoryAI, and AI-synthesised audio summaries.',
    detail:
      'Bayan runs an intelligent multi-step retrieval pipeline built on LangGraph, combining the Google Books API with hybrid vector search over Qdrant using both dense and sparse embeddings. StoryAI lets users upload their own books, extracts entities with GLiNER, and generates character personas you can hold a conversation with. Conversation threads persist through Aegra and Redis, and every LLM call is traced in Langfuse.',
    features: [
      {
        title: 'Hybrid retrieval',
        body: 'LangGraph state machines over Google Books plus Qdrant with dense (fastembed) and sparse (BM25) vectors.',
      },
      {
        title: 'StoryAI character chat',
        body: 'TXT/PDF uploads, GLiNER entity recognition, and AI-generated character personas for interactive conversation.',
      },
      {
        title: 'Audio summaries',
        body: 'Synthesised spoken summaries of books, generated through the TTS layer.',
      },
      {
        title: 'Observable by default',
        body: 'Langfuse tracing across the pipeline with thread persistence via Aegra and Redis.',
      },
    ],
    metrics: [
      { label: 'Languages', value: 'AR / EN' },
      { label: 'Retrieval', value: 'Hybrid' },
      { label: 'Tracing', value: 'Langfuse' },
    ],
    stack: ['LangGraph', 'Qdrant', 'FastAPI', 'GLiNER', 'Langfuse', 'Redis'],
    fullStack: [
      { layer: 'Backend', tech: 'FastAPI + LangGraph state graphs + Aegra' },
      { layer: 'Embeddings', tech: 'fastembed (dense) + BM25 (sparse)' },
      { layer: 'Vector database', tech: 'Qdrant' },
      { layer: 'Databases', tech: 'PostgreSQL (SQLAlchemy), Redis cache' },
      { layer: 'Storage', tech: 'MinIO (S3-compatible)' },
      { layer: 'Documents', tech: 'PyMuPDF, EasyOCR, Docling' },
      { layer: 'Speech', tech: 'OpenAI TTS API' },
      { layer: 'Frontend', tech: 'React 18 + Vite, shadcn/ui, Framer Motion' },
      { layer: 'Delivery', tech: 'Docker Compose, AWS ECR, GitHub Actions' },
    ],
    icon: BookOpen,
  },
  {
    id: 'inpakt',
    title: 'Inpakt',
    tagline: 'Bilingual social impact tracking',
    org: 'Obelion.AI',
    category: 'Applied AI',
    theme: 'advisory',
    motif: 'impact',
    accent: '#fbbf24',
    summary:
      'A platform for managing projects, beneficiaries, indicators, surveys, reports, and team roles in one place — fully bilingual, and AI-assisted at every step.',
    detail:
      'Inpakt covers the full impact-measurement workflow: logframes, financials, cost-effectiveness analysis, survey design and thematic analysis, and narrative reporting. An agentic layer assists with project setup, LLM features run through day-to-day operation, and OCR handles document analysis — with agentic tool calling stitching the pieces together.',
    features: [
      {
        title: 'Agentic project setup',
        body: 'An agent assists with standing a project up, then continues to support operation through LLM-powered features.',
      },
      {
        title: 'Impact measurement',
        body: 'Beneficiaries, indicators, logframe, financials, and cost-effectiveness analysis in a single project model.',
      },
      {
        title: 'Surveys & analysis',
        body: 'Templates, questions, responses, and thematic analysis, feeding AI-generated narrative report summaries.',
      },
      {
        title: 'Bilingual throughout',
        body: 'Full English/Arabic support across the interface, with OCR for document analysis in both.',
      },
    ],
    metrics: [
      { label: 'Languages', value: 'AR / EN' },
      { label: 'Analysis', value: 'CEA' },
      { label: 'Docs', value: 'OCR' },
    ],
    stack: ['React 18', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'OCR'],
    fullStack: [
      { layer: 'Frontend', tech: 'Vite, React 18, TypeScript, TanStack Query, shadcn/ui' },
      { layer: 'Charts', tech: 'Recharts' },
      { layer: 'Backend', tech: 'Express, Prisma ORM, PostgreSQL' },
      { layer: 'Auth', tech: 'JWT (access + refresh tokens)' },
      { layer: 'Uploads', tech: 'Multer with MinIO or local storage' },
      { layer: 'AI', tech: 'LLM integration, OCR, agentic tool calling' },
    ],
    icon: HeartHandshake,
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
            Platforms in <span className="theme-gradient">production</span>
          </>
        }
        description="Five systems across the Syntera suite and beyond — GPU infrastructure, agentic software engineering, an AI control plane, a bilingual librarian, and impact measurement."
      />

      <div className="mt-20 space-y-8">
        {PROJECTS.map((project, i) => {
          const flip = i % 2 === 1;

          return (
            <ThemeZone key={project.id} theme={project.theme}>
              <Reveal delay={0.04}>
                <article
                  className="surface group overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-1"
                  style={{ borderColor: `${project.accent}22` }}
                >
                  <div className="grid lg:grid-cols-12">
                    {/* Art panel */}
                    <div
                      className={`relative flex min-h-[15rem] items-center justify-center border-white/[0.06] lg:col-span-5 ${
                        flip
                          ? 'lg:order-2 lg:border-l'
                          : 'lg:order-1 lg:border-r'
                      }`}
                      style={{
                        background: `linear-gradient(150deg, ${project.accent}14, transparent 72%)`,
                      }}
                    >
                      <div className="absolute inset-0 dot-grid opacity-25" />

                      {/* Corner brackets */}
                      {[
                        'left-4 top-4 border-l border-t',
                        'right-4 top-4 border-r border-t',
                        'left-4 bottom-4 border-b border-l',
                        'right-4 bottom-4 border-b border-r',
                      ].map((pos) => (
                        <span
                          key={pos}
                          className={`absolute h-4 w-4 ${pos}`}
                          style={{ borderColor: `${project.accent}55` }}
                        />
                      ))}

                      <div className="relative h-44 w-full px-10 py-6">
                        <Motif
                          variant={project.motif}
                          accent={project.accent}
                        />
                      </div>

                      <span
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.22em]"
                        style={{ color: `${project.accent}aa` }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className={`p-7 sm:p-10 lg:col-span-7 ${
                        flip ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110"
                          style={{
                            borderColor: `${project.accent}33`,
                            background: `${project.accent}12`,
                          }}
                        >
                          <project.icon
                            size={19}
                            style={{ color: project.accent }}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold leading-tight text-ink">
                            {project.title}
                          </h3>
                          <p
                            className="mt-0.5 font-mono text-[0.7rem]"
                            style={{ color: project.accent }}
                          >
                            {project.tagline}
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 leading-relaxed text-ink-dim">
                        {project.summary}
                      </p>

                      {/* Metrics */}
                      <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07]">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="bg-white/[0.025] px-3 py-3.5 text-center"
                          >
                            <div className="font-mono text-sm font-semibold text-ink">
                              {metric.value}
                            </div>
                            <div className="mt-0.5 text-[0.6rem] uppercase tracking-wide text-ink-faint">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                        <button
                          onClick={() => setOpenId(project.id)}
                          className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors"
                          style={{ color: undefined }}
                        >
                          <span className="transition-colors group-hover/btn:text-[var(--t-primary)]">
                            Read the case study
                          </span>
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          />
                        </button>

                        {/* Honest about why there is no repo link */}
                        <span
                          className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-ink-faint"
                          title="Employer and client work — source is not public"
                        >
                          <Lock size={11} />
                          {project.org}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </ThemeZone>
          );
        })}
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
          <div>
            {/* Header band */}
            <div
              className="relative flex items-center gap-4 border-b border-white/[0.07] p-7 sm:p-9"
              style={{
                background: `linear-gradient(140deg, ${active.accent}16, transparent 70%)`,
              }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                style={{
                  borderColor: `${active.accent}33`,
                  background: `${active.accent}12`,
                }}
              >
                <active.icon size={21} style={{ color: active.accent }} />
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint">
                  {active.category} · {active.org}
                </p>
                <h3 className="mt-0.5 text-xl font-semibold text-ink">
                  {active.title}
                </h3>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              <p className="leading-relaxed text-ink-dim">{active.detail}</p>

              <h4
                className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                style={{ color: active.accent }}
              >
                Capabilities
              </h4>
              <ul className="mt-4 space-y-4">
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

              <h4
                className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                style={{ color: active.accent }}
              >
                Technology
              </h4>
              <dl className="mt-4 space-y-px overflow-hidden rounded-xl border border-white/[0.07]">
                {active.fullStack.map((row) => (
                  <div
                    key={row.layer}
                    className="grid gap-1 bg-white/[0.022] px-4 py-3 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
                      {row.layer}
                    </dt>
                    <dd className="text-sm text-ink-dim sm:col-span-2">
                      {row.tech}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
