// ============================================================
// Zustand Store — Theme
// ============================================================
import { create } from 'zustand';
import type { Theme } from '../types';

interface ThemeState {
  theme: Theme;
}

export const useThemeStore = create<ThemeState>()(() => ({ theme: 'dark' }));
