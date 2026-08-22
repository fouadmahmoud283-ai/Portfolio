import type Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

/**
 * Scrolls to a section by selector.
 *
 * Routes through Lenis when it is running so the easing matches the rest of
 * the page, and falls back to the native path when it is not (reduced motion,
 * or before hydration).
 */
export function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset: -80, duration: 1.25 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.4 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
