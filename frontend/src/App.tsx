// ============================================================
// App.tsx — Entry point del portafolio
// ============================================================
import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { DevOps } from './components/sections/DevOps';
import { Contact } from './components/sections/Contact';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, OG_IMAGE_URL } from './lib/constants';
import { useThemeStore } from './store/themeStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Daniel Eduardo Molina Carias" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}${OG_IMAGE_URL}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>

      <AnimatePresence mode="wait">
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="portfolio-root"
        >
          <Navbar />
          <main id="main-content">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <DevOps />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </HelmetProvider>
  );
}

export default App;
