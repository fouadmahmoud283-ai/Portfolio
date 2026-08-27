/**
 * Scroll-driven theming.
 *
 * Different parts of the site represent genuinely different kinds of work —
 * GPU infrastructure, agentic software engineering, advisory. Rather than
 * describing that difference only in prose, each zone carries its own palette
 * and 3D scene, and the whole page morphs as you scroll into it.
 */

export type ThemeId = 'core' | 'datacenter' | 'agentic' | 'advisory' | 'academy';

export type SceneId = 'neural' | 'datacenter';

export type ThemeDef = {
  id: ThemeId;
  /** Shown in the ambient HUD so the shift reads as intentional. */
  label: string;
  /** Primary / secondary drive gradients; accent is used sparingly. */
  primary: string;
  secondary: string;
  accent: string;
  /** Which WebGL scene takes the stage. */
  scene: SceneId;
  /** Ambient light-pool colours, as rgba triples for radial gradients. */
  glow: [string, string, string];
};

export const THEMES: Record<ThemeId, ThemeDef> = {
  // Default identity: the agentic-systems blue/violet the site opens on.
  core: {
    id: 'core',
    label: 'Systems',
    primary: '#22d3ee',
    secondary: '#7c5cff',
    accent: '#34d399',
    scene: 'neural',
    glow: [
      'rgba(34,211,238,0.16)',
      'rgba(124,92,255,0.18)',
      'rgba(52,211,153,0.10)',
    ],
  },

  // GPU / datacenter infrastructure — cool green racks, amber thermal warmth.
  datacenter: {
    id: 'datacenter',
    label: 'Datacenter',
    primary: '#34d399',
    secondary: '#22d3ee',
    accent: '#fbbf24',
    scene: 'datacenter',
    glow: [
      'rgba(52,211,153,0.15)',
      'rgba(251,191,36,0.12)',
      'rgba(34,211,238,0.12)',
    ],
  },

  // Agentic software engineering — electric violet, terminal green edge.
  agentic: {
    id: 'agentic',
    label: 'Agentic',
    primary: '#a78bfa',
    secondary: '#22d3ee',
    accent: '#f472b6',
    scene: 'neural',
    glow: [
      'rgba(167,139,250,0.20)',
      'rgba(34,211,238,0.14)',
      'rgba(244,114,182,0.10)',
    ],
  },

  // Advisory / consulting — warm sand and gold.
  advisory: {
    id: 'advisory',
    label: 'Advisory',
    primary: '#fbbf24',
    secondary: '#fb923c',
    accent: '#22d3ee',
    scene: 'neural',
    glow: [
      'rgba(251,191,36,0.16)',
      'rgba(251,146,60,0.13)',
      'rgba(34,211,238,0.09)',
    ],
  },

  // Teaching — calmer rose/indigo.
  academy: {
    id: 'academy',
    label: 'Teaching',
    primary: '#fb7185',
    secondary: '#818cf8',
    accent: '#34d399',
    scene: 'neural',
    glow: [
      'rgba(251,113,133,0.15)',
      'rgba(129,140,248,0.16)',
      'rgba(52,211,153,0.09)',
    ],
  },
};

export const DEFAULT_THEME: ThemeId = 'core';

/** Hex -> "r, g, b" so colours can be composed into rgba() in CSS vars. */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;

  const int = parseInt(full, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}
