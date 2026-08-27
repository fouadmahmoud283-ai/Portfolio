'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';
import { handleResumeAction } from '@/utils/resumeUtils';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
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

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy. The rootMargin band sits just under the nav bar, so a section
  // becomes "active" as its top passes behind the header.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    // Ratios are accumulated across callbacks rather than read from each batch
    // in isolation: a callback only carries the sections that just crossed a
    // threshold, so ranking within one batch can crown a section that is
    // actually leaving over the one now filling the band.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let bestId = '';
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) setActive(bestId);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.05, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(`#${id}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-void-950/70 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between gap-6">
          {/* Wordmark */}
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-glow/30 bg-cyan-glow/[0.08]">
              <span className="font-mono text-sm font-bold text-cyan-glow">
                F
              </span>
              <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 glow-cyan" />
            </span>
            <span className="font-mono text-sm tracking-tight text-ink-dim transition-colors group-hover:text-ink">
              fouad<span className="text-ink-faint">.mahmoud</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors duration-300 ${
                      isActive
                        ? 'text-ink'
                        : 'text-ink-dim hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg border border-white/[0.09] bg-white/[0.05]"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 34,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-faint transition-colors duration-300 hover:bg-white/[0.06] hover:text-cyan-glow"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            <button
              onClick={() => handleResumeAction('download')}
              className="hidden items-center gap-2 rounded-lg border border-white/[0.12] px-3.5 py-2 text-sm font-medium text-ink transition-all duration-300 hover:border-cyan-glow/50 hover:text-cyan-glow md:inline-flex"
            >
              <Download size={15} />
              CV
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-white/[0.06] lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ---------------------------------------------------------------- */}
      {/* Mobile sheet                                                      */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[75] bg-void-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <span className="font-mono text-sm text-ink-dim">menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-white/[0.06]"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="container-x mt-8">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  >
                    <button
                      onClick={() => go(item.id)}
                      className="flex w-full items-baseline gap-4 border-b border-white/[0.06] py-4 text-left"
                    >
                      <span className="font-mono text-xs text-ink-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-2xl font-semibold transition-colors ${
                          active === item.id ? 'text-gradient' : 'text-ink'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-10 flex items-center gap-3"
              >
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      social.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-ink-dim transition-colors hover:border-cyan-glow/50 hover:text-cyan-glow"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleResumeAction('download');
                  }}
                  className="btn btn-ghost ml-auto"
                >
                  <Download size={16} />
                  CV
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
