'use client';

import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import TypingEffect from '../ui/TypingEffect';
import SplitReveal from '../ui/SplitReveal';
import Magnetic from '../ui/Magnetic';
import { scrollToSection } from '@/lib/scroll';
import { handleResumeAction } from '@/utils/resumeUtils';

const ROLES = [
  'AI & Agentic Systems Engineer',
  'Multi-Agent Architectures',
  'LangGraph · LangChain · RAG',
  'Mechatronics & Robotics Engineer',
];

type OrbitTag = {
  label: string;
  delay: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

/** Labels that float over the WebGL graph, tying the visual to the work. */
const ORBIT_TAGS: OrbitTag[] = [
  { label: 'planner', top: '8%', left: '4%', delay: 0 },
  { label: 'retriever', top: '30%', right: '-2%', delay: 0.6 },
  { label: 'tool-use', bottom: '24%', left: '-4%', delay: 1.2 },
  { label: 'critic', bottom: '6%', right: '8%', delay: 1.8 },
];

const SOCIALS = [
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/fouadmahmoud281',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/fouad-mahmoud-2832003/',
  },
  {
    label: 'Email',
    icon: Mail,
    href: 'mailto:fouadmahmoud281@gmail.com',
  },
];

const STATS = [
  { value: '4+', label: 'Production agentic systems' },
  { value: '6+', label: 'RAG pipelines shipped' },
  { value: '15+', label: 'Multi-agent workflows' },
  { value: '50+', label: 'Engineers mentored' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* ---------------------------------------------------------- */}
          {/* Copy                                                        */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-7">
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.07] px-3.5 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mint animate-pulse-ring" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mint">
                Open to AI engineering work
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="display-xl">
              <span className="block text-ink">
                <SplitReveal text="FOUAD" immediate delay={0.15} />
              </span>
              <span className="block text-gradient">
                <SplitReveal text="MAHMOUD" immediate delay={0.32} />
              </span>
            </h1>

            {/* Rotating role */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-7 flex min-h-[2.5rem] items-center gap-3"
            >
              <span className="font-mono text-sm text-ink-faint">&gt;</span>
              <TypingEffect
                texts={ROLES}
                className="font-mono text-base text-ink-dim sm:text-lg"
              />
            </motion.div>

            {/* Lede */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink-dim"
            >
              I build autonomous systems that{' '}
              <span className="text-ink">plan, retrieve, call tools, and
              self-correct</span> — orchestrated with LangGraph, grounded in
              vector search, and shipped behind production APIs at{' '}
              <span className="text-mint">Obelion.AI</span>.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="btn btn-primary"
                >
                  Explore the work
                  <ArrowUpRight size={17} />
                </button>
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

              <div className="ml-1 flex items-center gap-1">
                {SOCIALS.map((social) => (
                  <Magnetic key={social.label} strength={10}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        social.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-dim transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-glow"
                    >
                      <social.icon size={18} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Space reserved for the WebGL graph, with floating labels    */}
          {/* ---------------------------------------------------------- */}
          <div className="relative hidden min-h-[26rem] lg:col-span-5 lg:block">
            <div className="relative h-full w-full">
              {ORBIT_TAGS.map((tag) => (
                <motion.span
                  key={tag.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + tag.delay * 0.16 }}
                  style={{
                    top: tag.top,
                    left: tag.left,
                    right: tag.right,
                    bottom: tag.bottom,
                    animationDelay: `${tag.delay}s`,
                  }}
                  className="absolute animate-float rounded-lg border border-white/10 bg-void-900/70 px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-ink-dim backdrop-blur-md"
                >
                  <span className="mr-1.5 text-cyan-glow">◆</span>
                  {tag.label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Stat strip                                                    */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-md sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-void-950/60 px-5 py-6 transition-colors duration-300 hover:bg-void-800/60"
            >
              <div className="font-display text-3xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs leading-snug text-ink-faint">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        onClick={() => scrollToSection('#about')}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-cyan-glow sm:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.button>
    </section>
  );
}
