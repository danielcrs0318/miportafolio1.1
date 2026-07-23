// ============================================================
// Section — Hero
// Typewriter + Partículas + Avatar + CTAs
// ============================================================
import { motion } from 'framer-motion';
import { ChevronDown, Download, FolderOpen } from 'lucide-react';
import Particles from '@tsparticles/react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useLangStore } from '../../store/langStore';
import { TYPEWRITER_PHRASES, CV_URL } from '../../lib/constants';
import avatarImg from '/assets/fotoperfilCV.jpeg';

export function Hero() {
  const { lang } = useLangStore();
  const typed = useTypewriter({ phrases: TYPEWRITER_PHRASES });

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Particles background */}
      <Particles
        id="hero-particles"
        className="particles-bg"
        options={{
          fullScreen: false,
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, width: 800 } },
            color: { value: ['#00D4FF', '#7B2FBE', '#E8EDF5'] },
            opacity: { value: { min: 0.05, max: 0.3 }, animation: { enable: true, speed: 0.5 } },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.4, direction: 'none', random: true, outModes: 'out' },
            links: {
              enable: true,
              color: '#00D4FF',
              opacity: 0.08,
              distance: 140,
            },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 80, duration: 0.4 } },
          },
          detectRetina: true,
        }}
      />

      {/* Gradient blobs */}
      <div className="hero-blob hero-blob--cyan" />
      <div className="hero-blob hero-blob--violet" />

      <div className="hero-content">
        {/* Text side */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {lang === 'es' ? 'Hola, soy' : "Hi, I'm"}
          </motion.span>

          <h1 className="hero-name">
            Daniel Eduardo<br />
            <span className="hero-name--accent">Molina Carias</span>
          </h1>

          {/* Typewriter */}
          <div className="typewriter-line" aria-live="polite">
            <span className="typewriter-text">{typed}</span>
            <span className="typewriter-cursor" aria-hidden="true">|</span>
          </div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {lang === 'es'
              ? 'Ingeniero en Computación especializado en sistemas fullstack, arquitecturas con IA y despliegue con Docker + Traefik. Construyo soluciones que escalan.'
              : 'CS Engineer specialized in fullstack systems, AI architectures, and Docker + Traefik deployments. I build solutions that scale.'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button onClick={scrollToProjects} className="btn-primary">
              <FolderOpen size={18} />
              {lang === 'es' ? 'Ver Proyectos' : 'View Projects'}
            </button>
            <a href={CV_URL} download className="btn-secondary">
              <Download size={18} />
              {lang === 'es' ? 'Descargar CV' : 'Download CV'}
            </a>
          </motion.div>

          {/* Location badge */}
          <motion.div
            className="hero-location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <span className="location-dot" />
            Siguatepeque, Honduras
          </motion.div>
        </motion.div>

        {/* Avatar side */}
        <motion.div
          className="hero-avatar-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="hero-avatar-frame">
            <div className="hero-avatar-glow" aria-hidden="true" />
            <div className="hero-avatar-ring">
              <div className="hero-avatar-inner">
                <img
                  src={avatarImg}
                  alt="Daniel Eduardo Molina Carias"
                  className="hero-avatar-img"
                />
              </div>
            </div>

            <div className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              <span className="hero-status-text">
                {lang === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProjects}
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
