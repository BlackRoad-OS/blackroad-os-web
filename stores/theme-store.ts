'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',

      setTheme: (theme: Theme) => {
        let resolved: 'light' | 'dark' = 'light';

        if (theme === 'system') {
          resolved = typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        } else {
          resolved = theme;
        }

        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(resolved);
        }

        set({ theme, resolvedTheme: resolved });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Re-apply theme after hydration
        if (state) {
          state.setTheme(state.theme);
        }
      },
    }
  )
);
