// ============================================================
// Section — Hero
// Masthead editorial: declaración, retrato de archivo y ficha técnica
// ============================================================
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useLangStore } from '../../store/langStore';
import { CV_URL } from '../../lib/constants';
import avatarImg from '/assets/fotoperfilCV.jpeg';

const EASE = [0.16, 1, 0.3, 1] as const;

const line = (delay: number) => ({
  initial: { y: '110%' },
  animate: { y: '0%' },
  transition: { duration: 0.95, delay, ease: EASE },
});

/** Hora real en Honduras: un dato vivo, no un adorno. */
function LocalTime() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('es-HN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Tegucigalpa',
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return <span className="spec__v spec__v--time">{now} GMT-6</span>;
}

export function Hero() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <div className="hero__rule-grid" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => <i key={i} />)}
      </div>

      <div className="shell">
        <motion.div
          className="hero__top mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span>Daniel Eduardo Molina Carias</span>
          <span>{es ? 'Portafolio — Ed. 2026' : 'Portfolio — Ed. 2026'}</span>
        </motion.div>

        <div className="hero__main">
          <div>
            <h1 className="hero__title">
              <span className="hero__line">
                <motion.span {...line(0.1)}>{es ? 'Diseño, construyo' : 'I design, build'}</motion.span>
              </span>
              <span className="hero__line">
                <motion.span {...line(0.2)}>{es ? 'y despliego' : 'and ship'}</motion.span>
              </span>
              <span className="hero__line">
                <motion.span {...line(0.3)}>{es ? 'software.' : 'software.'}</motion.span>
              </span>
            </h1>

            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            >
              {es ? (
                <>
                  <strong>Ingeniero en Ciencias de la Computación</strong> (UNICAH). Sistemas
                  fullstack, integraciones con IA y despliegues reales en producción con Docker,
                  Nginx y Traefik.
                </>
              ) : (
                <>
                  <strong>Computer Science Engineer</strong> (UNICAH). Fullstack systems, AI
                  integrations, and real production deployments with Docker, Nginx, and Traefik.
                </>
              )}
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
            >
              <button onClick={() => scrollTo('projects')} className="btn btn--signal">
                <span>{es ? 'Ver proyectos' : 'View projects'}</span>
                <ArrowDownRight size={15} strokeWidth={1.5} />
              </button>
              <a href={CV_URL} download className="btn">
                <span>{es ? 'Descargar CV' : 'Download CV'}</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero__plate"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            <div className="hero__portrait">
              <img src={avatarImg} alt="Daniel Eduardo Molina Carias" />
            </div>
            <div className="hero__caption mono">
              <span>Fig. 01 — Siguatepeque, HN</span>
              <b>2026</b>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="spec"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          <div className="spec__cell">
            <span className="spec__k mono">{es ? 'Estado' : 'Status'}</span>
            <span className="spec__v">
              <i className="live-dot" aria-hidden="true" />
              {es ? 'Abierto a proyectos' : 'Open to projects'}
            </span>
          </div>
          <div className="spec__cell">
            <span className="spec__k mono">{es ? 'Enfoque' : 'Focus'}</span>
            <span className="spec__v">Fullstack · IA · DevOps</span>
          </div>
          <div className="spec__cell">
            <span className="spec__k mono">{es ? 'Base' : 'Based in'}</span>
            <span className="spec__v">Siguatepeque, Honduras</span>
          </div>
          <div className="spec__cell">
            <span className="spec__k mono">{es ? 'Hora local' : 'Local time'}</span>
            <LocalTime />
          </div>
        </motion.div>

        <button className="hero__scroll mono" onClick={() => scrollTo('about')}>
          <i aria-hidden="true" />
          {es ? 'Desplázate' : 'Scroll'}
        </button>
      </div>
    </section>
  );
}
