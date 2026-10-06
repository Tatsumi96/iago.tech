'use client';

import * as React from 'react';

export type Theme = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Exclude<Theme, 'system'> | undefined;
  systemTheme: Exclude<Theme, 'system'> | undefined;
  themes: string[];
};

type ThemeProviderProps = {
  children: React.ReactNode;
  /** Seul 'class' est pris en charge (cas d'usage du site). */
  attribute?: 'class';
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme(): Exclude<Theme, 'system'> {
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

function applyTheme(resolved: Exclude<Theme, 'system'>) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

/** Reproduit disableTransitionOnChange de next-themes. */
function withoutTransition(update: () => void) {
  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
    ),
  );
  document.head.appendChild(style);
  update();
  // Force un reflow pour appliquer sans transition, puis nettoie.
  window.getComputedStyle(document.body);
  setTimeout(() => {
    document.head.removeChild(style);
  }, 1);
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || (stored === 'system' && enableSystem)) {
        return stored;
      }
    } catch {
      // Stockage indisponible : repli sur le thème par défaut ci-dessous.
    }
    return defaultTheme;
  });
  const [systemTheme, setSystemTheme] = React.useState<Exclude<Theme, 'system'> | undefined>(() =>
    typeof window === 'undefined' ? undefined : getSystemTheme(),
  );

  const resolvedTheme: Exclude<Theme, 'system'> | undefined =
    theme === 'system' ? systemTheme : (theme as Exclude<Theme, 'system'> | undefined);

  const apply = React.useCallback(
    (next: Theme, system: Exclude<Theme, 'system'>) => {
      const resolved = next === 'system' ? system : next;
      if (disableTransitionOnChange) {
        withoutTransition(() => applyTheme(resolved));
      } else {
        applyTheme(resolved);
      }
    },
    [disableTransitionOnChange],
  );

  // Applique le thème + écoute le système et les autres onglets.
  // (Les setState ci-dessous sont dans des callbacks d'événements, pas dans le corps de l'effet.)
  React.useEffect(() => {
    if (theme && systemTheme) {
      apply(theme, systemTheme);
    }
    const media = window.matchMedia(MEDIA_QUERY);
    const onMediaChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      if (e.newValue === 'light' || e.newValue === 'dark' || e.newValue === 'system') {
        setThemeState(e.newValue);
      } else {
        setThemeState(defaultTheme);
      }
    };
    media.addEventListener('change', onMediaChange);
    window.addEventListener('storage', onStorage);
    return () => {
      media.removeEventListener('change', onMediaChange);
      window.removeEventListener('storage', onStorage);
    };
  }, [theme, systemTheme, apply, defaultTheme, storageKey]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Stockage indisponible (navigation privée…) : le thème reste en mémoire.
      }
      apply(next, getSystemTheme());
    },
    [apply, storageKey],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
      themes: enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
    }),
    [theme, setTheme, resolvedTheme, systemTheme, enableSystem],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé à l’intérieur d’un <ThemeProvider>.');
  }
  return context;
}
