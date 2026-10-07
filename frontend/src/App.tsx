import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { HomeCard } from './components/HomeCard';
import { AboutScreen, ServicesScreen, CertificationsScreen, ProjectsScreen, DevOpsScreen, ContactScreen } from './components/sections/CompactPages';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, OG_IMAGE_URL, FAVICON_URL } from './lib/constants';
import { useLangStore } from './store/langStore';
import { useThemeStore } from './store/themeStore';

const pages = [
  { path: '/sobre-mi', es: 'Sobre mi', en: 'About', component: AboutScreen },
  { path: '/servicios', es: 'Servicios', en: 'Services', component: ServicesScreen },
  { path: '/certificados', es: 'Certificados', en: 'Certificates', component: CertificationsScreen },
  { path: '/proyectos', es: 'Proyectos', en: 'Projects', component: ProjectsScreen },
  { path: '/devops', es: 'DevOps', en: 'DevOps', component: DevOpsScreen },
  { path: '/contacto', es: 'Contacto', en: 'Contact', component: ContactScreen },
];

function PortfolioRoutes() {
  const location = useLocation();
  const { lang, toggleLang } = useLangStore();
  const { theme, toggleTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const page = pages.find(item => item.path === location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = lang;
  }, [lang, theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOnDesktop = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [menuOpen]);

  const title = page ? (lang === 'es' ? page.es : page.en) + ' | Daniel Molina' : SITE_TITLE;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Daniel Eduardo Molina Carias" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + location.pathname} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={SITE_URL + OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content={theme === 'dark' ? '#080808' : '#F3F3F3'} />
        <link rel="canonical" href={SITE_URL + location.pathname} />
        <link rel="icon" type="image/png" href={FAVICON_URL} />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomeCard />} />
        {pages.map(item => (
          <Route key={item.path} path={item.path} element={
            <div className="detail-page">
              <header className="detail-nav">
                <Link to="/" className="detail-nav__brand">&lt; Daniel Molina</Link>
                <nav className="detail-nav__links" aria-label={lang === 'es' ? 'Paginas' : 'Pages'}>
                  {pages.map(link => (
                    <Link key={link.path} to={link.path} aria-current={link.path === item.path ? 'page' : undefined}>
                      {lang === 'es' ? link.es : link.en}
                    </Link>
                  ))}
                </nav>
                <div className="detail-nav__mobile" ref={mobileMenuRef}>
                  <button ref={menuButtonRef} type="button" className="detail-nav__mobile-trigger" aria-expanded={menuOpen} aria-controls="detail-mobile-menu"
                    aria-label={menuOpen ? (lang === 'es' ? 'Cerrar menu' : 'Close menu') : (lang === 'es' ? 'Abrir menu' : 'Open menu')}
                    onClick={() => setMenuOpen(value => !value)}>
                    {menuOpen ? <X size={17} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={17} strokeWidth={1.8} aria-hidden="true" />}
                    <span>{lang === 'es' ? 'Menu' : 'Menu'}</span>
                  </button>
                  {menuOpen && <nav id="detail-mobile-menu" className="detail-nav__mobile-panel" aria-label={lang === 'es' ? 'Paginas del portafolio' : 'Portfolio pages'}>
                    <div className="detail-nav__mobile-caption"><span>{lang === 'es' ? 'EXPLORAR' : 'EXPLORE'}</span><span>01 — 06</span></div>
                    <div className="detail-nav__mobile-grid">
                      {pages.map((link, index) => <Link key={link.path} to={link.path} aria-current={link.path === item.path ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                        <span className="detail-nav__mobile-index">0{index + 1}</span>
                        <span className="detail-nav__mobile-name">{lang === 'es' ? link.es : link.en}</span>
                        <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
                      </Link>)}
                    </div>
                  </nav>}
                </div>
                <button type="button" onClick={toggleLang} className="detail-nav__lang" aria-label={lang === 'es' ? 'Cambiar a ingles' : 'Switch to Spanish'}>
                  {lang.toUpperCase()}
                </button>
                <button type="button" onClick={toggleTheme} className="detail-nav__theme" aria-label={theme === 'dark' ? (lang === 'es' ? 'Cambiar a tema claro' : 'Switch to light theme') : (lang === 'es' ? 'Cambiar a tema oscuro' : 'Switch to dark theme')}>
                  {theme === 'dark' ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
                </button>
              </header>
              <main id="main-content" className="detail-panel">
                <item.component />
              </main>
            </div>
          } />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <HelmetProvider><MotionConfig reducedMotion="never"><BrowserRouter><PortfolioRoutes /></BrowserRouter></MotionConfig></HelmetProvider>;
}
