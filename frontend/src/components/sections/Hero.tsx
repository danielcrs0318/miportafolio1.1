// ============================================================
// Section — Hero (dual identity: engineer / developer)
// ============================================================
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useLangStore } from '../../store/langStore';
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';
import avatarImg from '/assets/fotoperfilCV.jpeg';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <div className="shell">
        <div className="hero__window" aria-hidden="true">
          <span className="hero__dots"><i /><i /><i /></span>
          <span>daniel@portfolio:~</span>
          <span>~/inicio</span>
        </div>
        <div className="hero__intro">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="hero__hello mono">&gt; {es ? 'Hola, soy' : "Hi, I'm"}</span>
            <h1 className="hero__name">
              Daniel<span> Molina</span><b className="hero__cursor" aria-hidden="true">_</b>
            </h1>
            <p className="hero__position">Fullstack Developer <span>/</span> Software Engineer</p>
            <p className="hero__bio">
              {es
                ? 'Diseno y construyo software que llega a produccion. Fullstack, IA y despliegues reales desde Siguatepeque, Honduras.'
                : 'I design and build software that ships. Fullstack, AI, and real deployments from Siguatepeque, Honduras.'}
            </p>
            <div className="hero__actions">
              <button onClick={() => scrollTo('projects')} className="btn btn--fill">
                {es ? 'Ver proyectos' : 'View work'}
                <ArrowDownRight size={16} strokeWidth={1.75} />
              </button>
              <a href={CV_URL} download className="btn btn--ghost">
                {es ? 'Descargar CV' : 'Download CV'}
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
            </div>
            <div className="hero__socials" aria-label={es ? 'Enlaces profesionales' : 'Professional links'}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </motion.div>

          <motion.div
            className="hero__portrait"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <img src={avatarImg} alt="Daniel Eduardo Molina Carias" />
            <span className="hero__portrait-tag">DANIEL_MOLINA.JPG</span>
          </motion.div>
        </div>

        <motion.div
          className="hero__roles"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <div className="hero__role">
            <h2 className="hero__role-title">{es ? 'ingeniero' : 'engineer'}</h2>
            <p className="hero__role-text">
              {es
                ? 'Ingeniero en Computacion especializado en sistemas fullstack, arquitecturas con IA y productos listos para usuarios reales.'
                : 'CS engineer focused on fullstack systems, AI architectures, and products ready for real users.'}
            </p>
          </div>
          <div className="hero__role">
            <h2 className="hero__role-title">{es ? 'developer' : 'developer'}</h2>
            <p className="hero__role-text">
              {es
                ? 'Escribo codigo limpio y eficiente, y lo despliego con Docker, Nginx, Traefik y Portainer en servidores Linux.'
                : 'I write clean, efficient code and ship it with Docker, Nginx, Traefik, and Portainer on Linux servers.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
