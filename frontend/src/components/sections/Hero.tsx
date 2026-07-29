// ============================================================
// Section — Hero (dual identity: engineer / developer)
// ============================================================
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useLangStore } from '../../store/langStore';
import { CV_URL } from '../../lib/constants';
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
        <div className="hero__intro">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="hero__hello mono">
              {es ? 'Hola, soy Daniel' : "Hi, I'm Daniel"}
            </span>
            <h1 className="hero__name">
              {es ? 'Diseño y construyo software que llega a producción.' : 'I design and build software that ships to production.'}
            </h1>
            <p className="hero__bio">
              {es
                ? 'Ingeniero en Ciencias de la Computación en Siguatepeque, Honduras. Fullstack, IA y despliegues reales con Docker.'
                : 'Computer Science Engineer in Siguatepeque, Honduras. Fullstack, AI, and real Docker deployments.'}
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
          </motion.div>

          <motion.div
            className="hero__portrait"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <img src={avatarImg} alt="Daniel Eduardo Molina Carias" />
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
                ? 'Ingeniero en Computación especializado en sistemas fullstack, arquitecturas con IA y productos listos para usuarios reales.'
                : 'CS engineer focused on fullstack systems, AI architectures, and products ready for real users.'}
            </p>
          </div>
          <div className="hero__role">
            <h2 className="hero__role-title">{es ? 'developer' : 'developer'}</h2>
            <p className="hero__role-text">
              {es
                ? 'Escribo código limpio y eficiente, y lo despliego con Docker, Nginx, Traefik y Portainer en servidores Linux.'
                : 'I write clean, efficient code and ship it with Docker, Nginx, Traefik, and Portainer on Linux servers.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
