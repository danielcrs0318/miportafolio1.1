// ============================================================
// Layout — Navbar
// ============================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, SunMedium, Moon } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLangStore } from '../../store/langStore';
import { useThemeStore } from '../../store/themeStore';
import { NAV_ITEMS } from '../../lib/constants';
import { cn } from '../../lib/utils';

const SECTION_IDS = NAV_ITEMS.map(item => item.href);

export function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, toggleLang } = useLangStore();
  const { theme, toggleTheme } = useThemeStore();
  const { scrollYProgress } = useScroll();
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const goTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('nav', stuck && 'nav--stuck')}
    >
      <div className="nav__inner">
        <button onClick={() => goTo('#hero')} className="nav__mark" aria-label="Ir al inicio">
          Daniel Molina <span>/ HN</span>
        </button>

        <ul className="nav__list">
          {NAV_ITEMS.map(item => {
            const on = activeId === item.href;
            return (
              <li key={item.href}>
                <button
                  onClick={() => goTo(item.href)}
                  className={cn('nav__link', on && 'nav__link--on')}
                >
                  {lang === 'es' ? item.label : item.labelEn}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="nav__tools">
          <button
            onClick={toggleLang}
            className="icon-btn icon-btn--text"
            aria-label={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
          >
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <SunMedium size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
          </button>
          <button
            className="icon-btn nav__burger"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <motion.div className="nav__progress" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nav__sheet-inner">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.href}
                  onClick={() => goTo(item.href)}
                  className={cn('nav__sheet-link', activeId === item.href && 'nav__sheet-link--on')}
                >
                  {lang === 'es' ? item.label : item.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
