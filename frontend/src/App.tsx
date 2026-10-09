import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { HomeCard } from './components/HomeCard';
import { MacDesktop } from './components/MacDesktop';
import { AboutScreen, ServicesScreen, CertificationsScreen, ProjectsScreen, DevOpsScreen, ContactScreen } from './components/sections/CompactPages';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, OG_IMAGE_URL, FAVICON_URL } from './lib/constants';
import { useLangStore } from './store/langStore';

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
  const page = pages.find(item => item.path === location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.lang = lang;
  }, [lang]);

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
        <meta name="theme-color" content="#11111d" />
        <link rel="canonical" href={SITE_URL + location.pathname} />
        <link rel="icon" type="image/png" href={FAVICON_URL} />
      </Helmet>
      <MacDesktop currentPath={location.pathname} lang={lang} onLang={toggleLang}>
        <Routes>
          <Route path="/" element={<HomeCard />} />
          {pages.map(item => (
            <Route key={item.path} path={item.path} element={
              <div className="detail-page">
              <main id="main-content" className="detail-panel">
                <item.component />
              </main>
              </div>
            } />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MacDesktop>
    </>
  );
}

export default function App() {
  return <HelmetProvider><BrowserRouter><PortfolioRoutes /></BrowserRouter></HelmetProvider>;
}
