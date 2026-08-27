'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_THEME,
  THEMES,
  hexToRgbChannels,
  type ThemeDef,
  type ThemeId,
} from '@/lib/themes';

type ThemeContextValue = {
  theme: ThemeDef;
  themeId: ThemeId;
  /** Called by ThemeZone as zones enter and leave the viewport. */
  reportZone: (id: string, themeId: ThemeId, ratio: number) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useSiteTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useSiteTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);

  // Visibility ratio per registered zone. Kept in a ref because it updates far
  // more often than the winning theme actually changes.
  const zones = useRef(new Map<string, { themeId: ThemeId; ratio: number }>());
  const frame = useRef(0);

  const recompute = useCallback(() => {
    let bestId: ThemeId = DEFAULT_THEME;
    let bestRatio = 0;

    zones.current.forEach((zone) => {
      if (zone.ratio > bestRatio) {
        bestRatio = zone.ratio;
        bestId = zone.themeId;
      }
    });

    // Below this the zone is only clipping the viewport edge — not enough to
    // justify repainting the whole site.
    setThemeId(bestRatio < 0.14 ? DEFAULT_THEME : bestId);
  }, []);

  const reportZone = useCallback(
    (id: string, zoneTheme: ThemeId, ratio: number) => {
      if (ratio <= 0) {
        zones.current.delete(id);
      } else {
        zones.current.set(id, { themeId: zoneTheme, ratio });
      }

      // Coalesce the burst of observer callbacks into one recompute per frame.
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(recompute);
    },
    [recompute]
  );

  const theme = THEMES[themeId];

  // Publish the palette as CSS variables so plain CSS and Tailwind arbitrary
  // values can both react without prop-drilling colours through the tree.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--t-primary', theme.primary);
    root.setProperty('--t-secondary', theme.secondary);
    root.setProperty('--t-accent', theme.accent);
    root.setProperty('--t-primary-rgb', hexToRgbChannels(theme.primary));
    root.setProperty('--t-secondary-rgb', hexToRgbChannels(theme.secondary));
    root.setProperty('--t-accent-rgb', hexToRgbChannels(theme.accent));
    document.documentElement.dataset.theme = theme.id;
  }, [theme]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, themeId, reportZone }),
    [theme, themeId, reportZone]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
