'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Brain, Code, Cpu, Server, Settings } from 'lucide-react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

type Skill = { name: string; level: number; note: string };

type Category = {
  id: string;
  title: string;
  short: string;
  icon: typeof Bot;
  color: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    id: 'infra',
    title: 'Infrastructure & GPU',
    short: 'Infra',
    icon: Server,
    color: '#34d399',
    skills: [
      { name: 'Kubernetes', level: 90, note: 'RKE2, CIS-hardened, multi-tenant' },
      { name: 'NVIDIA GPU Stack', level: 88, note: 'GPU Operator, DCGM, MIG, NVLink' },
      { name: 'vLLM', level: 88, note: 'Tensor-parallel LLM serving at scale' },
      { name: 'Terraform', level: 85, note: 'Datacenter provisioning as code' },
      { name: 'Ansible', level: 85, note: 'Bare-metal configuration and hardening' },
      { name: 'Cilium / eBPF', level: 80, note: 'Network policy and tenant isolation' },
      { name: 'Prometheus & Grafana', level: 88, note: 'Telemetry, heatmaps, alerting' },
      { name: 'Vault & Harbor', level: 80, note: 'Secrets and private registry control' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agentic Systems',
    short: 'Agents',
    icon: Bot,
    color: '#22d3ee',
    skills: [
      { name: 'LangChain', level: 95, note: 'Composable LLM application framework' },
      { name: 'LangGraph', level: 90, note: 'Stateful multi-agent orchestration' },
      { name: 'LangSmith', level: 85, note: 'Tracing, evals, and regression suites' },
      { name: 'OpenAI API', level: 95, note: 'Chat, embeddings, structured outputs' },
      { name: 'Hugging Face', level: 88, note: 'Model hosting and fine-tuning' },
      { name: 'Vector Databases', level: 92, note: 'Hybrid retrieval and reranking' },
      { name: 'Fine-tuning', level: 82, note: 'LoRA and domain adaptation' },
      { name: 'Multi-Agent Design', level: 90, note: 'Supervisor and critic topologies' },
    ],
  },
  {
    id: 'engineering',
    title: 'Programming & Backend',
    short: 'Engineering',
    icon: Code,
    color: '#34d399',
    skills: [
      { name: 'Python', level: 95, note: 'Primary language across every system' },
      { name: 'TypeScript', level: 85, note: 'Full-stack product surfaces' },
      { name: 'FastAPI', level: 90, note: 'Async, typed, production APIs' },
      { name: 'React / Next.js', level: 82, note: 'App Router, RSC, streaming UI' },
      { name: 'Flask', level: 88, note: 'Lightweight service endpoints' },
      { name: 'Docker', level: 85, note: 'Reproducible builds and deploys' },
      { name: 'Git / GitHub', level: 92, note: 'Trunk-based workflows and review' },
      { name: 'REST APIs', level: 90, note: 'Contract design and versioning' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning & Data',
    short: 'ML / Data',
    icon: Brain,
    color: '#7c5cff',
    skills: [
      { name: 'PyTorch', level: 82, note: 'Research and custom training loops' },
      { name: 'TensorFlow', level: 85, note: 'Production model graphs' },
      { name: 'Scikit-learn', level: 90, note: 'Classical baselines that hold up' },
      { name: 'Pandas / NumPy', level: 92, note: 'Feature and analysis pipelines' },
      { name: 'MLOps', level: 88, note: 'Deployment, drift, and monitoring' },
      { name: 'Streamlit', level: 90, note: 'Fast internal tooling' },
      { name: 'Jupyter', level: 95, note: 'Exploration and reporting' },
      { name: 'Data Pipelines', level: 85, note: 'ETL and ingestion at scale' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & Mechatronics',
    short: 'Robotics',
    icon: Cpu,
    color: '#fbbf24',
    skills: [
      { name: 'Control Systems', level: 80, note: 'Dynamics, feedback, stability' },
      { name: 'Sensor Integration', level: 85, note: 'Hardware-software interfaces' },
      { name: 'Linux', level: 88, note: 'Real-time and embedded targets' },
      { name: 'Actuators', level: 78, note: 'Motion control and automation' },
      { name: 'Mechatronic Design', level: 82, note: 'Interdisciplinary systems' },
      { name: 'ROS', level: 75, note: 'Robotics middleware and nodes' },
      { name: 'Embedded Systems', level: 80, note: 'Microcontroller firmware' },
      { name: 'CAD / CAM', level: 70, note: 'Mechanical design for manufacture' },
    ],
  },
  {
    id: 'platform',
    title: 'Tools & Platforms',
    short: 'Platform',
    icon: Settings,
    color: '#fb7185',
    skills: [
      { name: 'AWS', level: 82, note: 'Compute, storage, and networking' },
      { name: 'MongoDB', level: 88, note: 'Document modelling and indexing' },
      { name: 'Redis', level: 85, note: 'Caching and rate limiting' },
      { name: 'Vercel', level: 90, note: 'Edge deploys and previews' },
      { name: 'CI/CD', level: 80, note: 'Automated test and release gates' },
      { name: 'Postman', level: 88, note: 'API contracts and collections' },
      { name: 'VS Code', level: 95, note: 'Daily driver, heavily customised' },
      { name: 'Figma', level: 75, note: 'Interface design and handoff' },
    ],
  },
];

/** Level → filled segments, so proficiency reads at a glance instead of as a number. */
const segmentsFor = (level: number) => Math.max(1, Math.round(level / 20));

const TIER_LABEL = (level: number) =>
  level >= 90 ? 'Expert' : level >= 80 ? 'Advanced' : 'Proficient';

export default function Skills() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const category = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  return (
    <Section id="skills" divider>
      <SectionHeader
        kicker="Capabilities"
        title={
          <>
            The <span className="theme-gradient">toolkit</span>
          </>
        }
        description="From bare metal and GPU scheduling up through agent orchestration — depth where it counts, breadth enough to own a system end to end."
      />

      {/* Category selector */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Skill categories"
          className="mx-auto mt-14 flex max-w-fit flex-wrap justify-center gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1.5 backdrop-blur-md"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat.id)}
                className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300"
                style={{ color: isActive ? '#05060d' : undefined }}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(120deg, ${cat.color}, ${cat.color}bb)`,
                    }}
                    transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 ${
                    isActive ? '' : 'text-ink-dim hover:text-ink'
                  }`}
                >
                  <cat.icon size={16} />
                  <span className="hidden sm:inline">{cat.title}</span>
                  <span className="sm:hidden">{cat.short}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Skill grid */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={category.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {category.skills.map((skill, i) => {
            const filled = segmentsFor(skill.level);
            return (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.045 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.022] p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.055]"
              >
                {/* Hover wash in the category colour */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(220px circle at 50% 0%, ${category.color}1f, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-ink">{skill.name}</h3>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                      {TIER_LABEL(skill.level)}
                    </span>
                  </div>

                  {/* Segmented proficiency meter */}
                  <div className="mt-4 flex gap-1" aria-hidden>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <motion.span
                        key={s}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.045 + s * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-1 flex-1 origin-left rounded-full"
                        style={{
                          background:
                            s < filled ? category.color : 'rgba(255,255,255,0.08)',
                          boxShadow:
                            s < filled ? `0 0 10px -2px ${category.color}` : 'none',
                        }}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-ink-faint transition-colors duration-300 group-hover:text-ink-dim">
                    {skill.note}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </Section>
  );
}
