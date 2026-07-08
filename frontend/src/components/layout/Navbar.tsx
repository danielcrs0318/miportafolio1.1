// ============================================================
// Layout — Navbar
// Sticky con backdrop-blur, scroll spy, toggle ES/EN, mobile menu
// ============================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Code2 } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLangStore } from '../../store/langStore';
import { NAV_ITEMS } from '../../lib/constants';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang } = useLangStore();

  const sectionIds = NAV_ITEMS.map(item => item.href);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('navbar', scrolled && 'navbar--scrolled')}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <button onClick={() => scrollTo('#hero')} className="navbar-logo" aria-label="Ir al inicio">
          <Code2 size={22} className="text-accent-cyan" />
          <span>Daniel<span className="text-accent-cyan">.</span></span>
        </button>

        {/* Desktop links */}
        <ul className="navbar-links">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <button
                onClick={() => scrollTo(item.href)}
                className={cn('nav-link', activeId === item.href && 'nav-link--active')}
              >
                {lang === 'es' ? item.label : item.labelEn}
                {activeId === item.href && (
                  <motion.span layoutId="active-dot" className="nav-dot" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <button onClick={toggleLang} className="btn-icon" title="Toggle language" aria-label="Toggle language">
            <Globe size={18} />
            <span className="text-xs font-mono">{lang.toUpperCase()}</span>
          </button>
          <button
            className="btn-icon md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(item.href)}
                className={cn('mobile-link', activeId === item.href && 'mobile-link--active')}
              >
                {lang === 'es' ? item.label : item.labelEn}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
