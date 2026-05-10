import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeState = {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  followSystem: boolean;
};

type ThemeAction = {
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setFollowSystem: (follow: boolean) => void;
  initTheme: () => void;
};

const THEME_KEY = 'honga-page-theme-mode';

const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
};

const initStates: ThemeState = {
  mode: 'system',
  resolvedTheme: 'light',
  followSystem: true,
};

export const useThemeStore = create<ThemeState & ThemeAction>((set, get) => ({
  ...initStates,

  setMode: (mode) => {
    const followSystem = mode === 'system';
    const resolvedTheme = followSystem ? getSystemTheme() : mode;
    localStorage.setItem(THEME_KEY, mode);
    applyTheme(resolvedTheme);
    set({ mode, resolvedTheme, followSystem });
  },

  toggleTheme: () => {
    const { resolvedTheme } = get();
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    get().setMode(next);
  },

  setFollowSystem: (follow) => {
    if (follow) {
      get().setMode('system');
    } else {
      get().setMode(get().resolvedTheme);
    }
  },

  initTheme: () => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const mode: ThemeMode = saved ?? 'system';

    const followSystem = mode === 'system';
    const resolvedTheme = followSystem ? getSystemTheme() : mode;
    applyTheme(resolvedTheme);
    set({ mode, resolvedTheme, followSystem });

    // 監聽系統主題變化
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      const { followSystem } = get();
      if (followSystem) {
        const newTheme = getSystemTheme();
        applyTheme(newTheme);
        set({ resolvedTheme: newTheme });
      }
    };

    media.addEventListener('change', listener);
  },
}));
