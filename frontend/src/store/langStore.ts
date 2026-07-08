// ============================================================
// Zustand Store — Language (ES / EN)
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../types';

interface LangState {
  lang: Language;
  toggleLang: () => void;
  t: (es: string, en: string) => string;
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: 'es',
      toggleLang: () => set(s => ({ lang: s.lang === 'es' ? 'en' : 'es' })),
      t: (es, en) => (get().lang === 'es' ? es : en),
    }),
    { name: 'portfolio-lang' }
  )
);
