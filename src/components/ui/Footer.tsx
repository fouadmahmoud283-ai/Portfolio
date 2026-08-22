'use client';

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { scrollToSection, scrollToTop } from '@/lib/scroll';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'pipeline', label: 'Approach' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Path' },
  { id: 'contact', label: 'Contact' },
];

const SOCIALS = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/fouadmahmoud281' },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/fouad-mahmoud-2832003/',
  },
  { label: 'Email', icon: Mail, href: 'mailto:fouadmahmoud281@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <p className="font-display text-xl font-semibold text-ink">
              Fouad Mahmoud
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-faint">
              AI &amp; Agentic Systems Engineer building autonomous systems that
              plan, retrieve, act, and correct themselves — currently at
              Obelion.AI.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    social.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] text-ink-faint transition-colors duration-300 hover:border-cyan-glow/50 hover:text-cyan-glow"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint">
              Sections
            </p>
            <ul className="mt-5 space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(`#${link.id}`)}
                    className="text-sm text-ink-dim transition-colors duration-300 hover:text-cyan-glow"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct */}
          <div className="md:col-span-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint">
              Direct
            </p>
            <a
              href="mailto:fouadmahmoud281@gmail.com"
              className="mt-5 block break-all text-sm text-ink transition-colors duration-300 hover:text-cyan-glow"
            >
              fouadmahmoud281@gmail.com
            </a>
            <p className="mt-6 border-l border-white/[0.09] pl-4 text-sm italic leading-relaxed text-ink-faint">
              &ldquo;Innovative solutions require dumb mistakes.&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="font-mono text-xs text-ink-faint">
            © {new Date().getFullYear()} Fouad Mahmoud
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 font-mono text-xs text-ink-faint transition-colors duration-300 hover:text-cyan-glow"
          >
            Back to top
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
