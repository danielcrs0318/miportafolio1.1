// ============================================================
// Section — About (estilo Adham: part engineer / part builder)
// ============================================================
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useCountUp } from '../../hooks/useCountUp';
import { useLangStore } from '../../store/langStore';
import { stats, timeline } from '../../lib/data';
import type { Stat } from '../../types';

const EASE = [0.22, 1, 0.36, 1] as const;

function Figure({ value, suffix, label }: Stat) {
  const { count, ref } = useCountUp(value, 1600);
  return (
    <div ref={ref} className="figure">
      <span className="figure__n">
        {count}
        {suffix && <sup>{suffix}</sup>}
      </span>
      <span className="figure__l">{label}</span>
    </div>
  );
}

export function About() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="about" className="band band--soft">
      <div className="shell">
        <SectionHeader
          title={es ? 'about' : 'about'}
          note={es
            ? 'Un poco sobre quién soy y cómo trabajo.'
            : 'A little about who I am and how I work.'}
        />

        <motion.p
          className="about__lead"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {es
            ? 'Disfruto convertir problemas complejos en productos simples, útiles y listos para producción.'
            : 'I enjoy turning complex problems into simple, useful products that are ready for production.'}
        </motion.p>

        <div className="about__grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h3 className="about__col-title">{es ? 'Parte ingeniero' : 'Part engineer'}</h3>
            <ul className="about__list">
              <li>{es ? 'Sistemas fullstack' : 'Fullstack systems'}</li>
              <li>{es ? 'APIs y autenticación' : 'APIs & authentication'}</li>
              <li>{es ? 'Bases de datos relacionales' : 'Relational databases'}</li>
              <li>{es ? 'Integraciones con IA' : 'AI integrations'}</li>
              <li>{es ? 'Pensar en producción desde el día uno' : 'Production-minded from day one'}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <h3 className="about__col-title">{es ? 'Parte developer' : 'Part developer'}</h3>
            <ul className="about__list">
              <li>React · TypeScript · Node.js</li>
              <li>PostgreSQL · Prisma</li>
              <li>Docker · Nginx · Traefik</li>
              <li>GitHub Actions · Portainer</li>
              <li>{es ? 'Código limpio y mantenible' : 'Clean, maintainable code'}</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="about__body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p>
            {es
              ? 'Soy Ingeniero en Ciencias de la Computación egresado de UNICAH y trabajo desde Siguatepeque, Honduras. Me muevo cómodo en todo el ciclo: interfaz, API, datos y el servidor Linux donde todo termina corriendo.'
              : "I'm a Computer Science Engineer from UNICAH, working out of Siguatepeque, Honduras. I move across the whole cycle: interface, API, data, and the Linux server where everything ends up running."}
          </p>
          <p>
            {es
              ? 'He construido desde landing pages para PYMES hasta sistemas con autenticación, auditoría, búsqueda semántica con IA y despliegue contenerizado.'
              : 'I have built everything from landing pages for small businesses to systems with authentication, auditing, AI semantic search, and containerized deployment.'}
          </p>
          <div className="about__tags">
            <span className="tag"><MapPin size={13} strokeWidth={1.75} />Siguatepeque, HN</span>
            <span className="tag"><GraduationCap size={13} strokeWidth={1.75} />UNICAH</span>
            <span className="tag"><Briefcase size={13} strokeWidth={1.75} />Freelance</span>
          </div>
        </motion.div>

        <div className="figures">
          {stats.map(s => <Figure key={s.label} {...s} />)}
        </div>

        <div>
          <div className="block__label">
            <span>{es ? 'Trayectoria' : 'Journey'}</span>
            <span>2022 — 2026</span>
          </div>
          <div className="journey">
            {timeline.map((item, i) => (
              <motion.article
                key={i}
                className="jrow"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              >
                <span className="jrow__year">{item.year}</span>
                <div>
                  <h3 className="jrow__role">{item.title}</h3>
                  <span className="jrow__org">{item.institution}</span>
                </div>
                <p className="jrow__desc">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
