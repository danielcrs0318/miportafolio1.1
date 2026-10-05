import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
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
  const navigate = useNavigate();
  const { lang, toggleLang } = useLangStore();
  const { theme, toggleTheme } = useThemeStore();
  const page = pages.find(item => item.path === location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = lang;
  }, [lang, theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

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
        <meta name="theme-color" content={theme === 'dark' ? '#080b12' : '#eaf1ff'} />
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
                <nav aria-label={lang === 'es' ? 'Paginas' : 'Pages'}>
                  {pages.map(link => (
                    <Link key={link.path} to={link.path} aria-current={link.path === item.path ? 'page' : undefined}>
                      {lang === 'es' ? link.es : link.en}
                    </Link>
                  ))}
                </nav>
                <select className="detail-nav__select" aria-label={lang === 'es' ? 'Seleccionar pagina' : 'Select page'} value={item.path} onChange={event => navigate(event.target.value)}>
                  {pages.map(link => <option key={link.path} value={link.path}>{lang === 'es' ? link.es : link.en}</option>)}
                </select>
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
  return <HelmetProvider><BrowserRouter><PortfolioRoutes /></BrowserRouter></HelmetProvider>;
}
