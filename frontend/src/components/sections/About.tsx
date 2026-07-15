// ============================================================
// Section — About Me
// Descripción + Stats animados + Timeline
// ============================================================
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin, ChevronRight, type LucideIcon } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useCountUp } from '../../hooks/useCountUp';
import { useLangStore } from '../../store/langStore';
import { stats, timeline } from '../../lib/data';
import avatarImg from '/assets/fotoperfilCV.jpeg';

function StatCard({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: LucideIcon }) {
  const { count, ref } = useCountUp(value);
  const Icon = icon;
  return (
    <div ref={ref} className="stat-card">
      <span className="stat-icon"><Icon size={22} aria-hidden="true" /></span>
      <span className="stat-value">
        {count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function About() {
  const { lang } = useLangStore();

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Sobre Mí' : 'About Me'}
          subtitle={lang === 'es'
            ? 'Conoce mi historia y trayectoria profesional'
            : 'Get to know my story and professional journey'}
        />

        {/* Main content */}
        <div className="about-grid">
          {/* Avatar */}
          <motion.div
            className="about-avatar-col"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-avatar-frame">
              <img
                src={avatarImg}
                alt="Daniel Eduardo Molina Carias"
                className="about-avatar-img"
              />
              <div className="about-avatar-badge">
                <GraduationCap size={16} />
                UNICAH — Ing. Computación
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="about-text-col"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="about-name">Daniel Eduardo Molina Carias</h3>
            <p className="about-role text-accent-cyan mb-4">Ingeniero en Ciencias de la Computación</p>

            <div className="about-bio">
              <p>
                {lang === 'es'
                  ? 'Soy un Ingeniero en Ciencias de la Computación egresado de UNICAH, con base en Siguatepeque, Honduras. Me especializo en desarrollo fullstack con React y Node.js, sistemas inteligentes con IA (OpenAI + Pinecone) y despliegue productivo con Docker, Nginx y Traefik.'
                  : "I'm a Computer Science Engineer from UNICAH, based in Siguatepeque, Honduras. I specialize in fullstack development with React and Node.js, AI-powered systems (OpenAI + Pinecone), and production deployments with Docker, Nginx, and Traefik."}
              </p>
              <p className="mt-3">
                {lang === 'es'
                  ? 'Construyo soluciones que van desde landing pages para PYMES hasta sistemas empresariales con autenticación, auditoría y gestión de sesiones. Cada proyecto está pensado para producción desde el primer día.'
                  : 'I build everything from PYME landing pages to enterprise systems with authentication, auditing, and session management. Every project is production-ready from day one.'}
              </p>
            </div>

            {/* Location + University */}
            <div className="about-tags">
              <span className="info-tag"><MapPin size={14} aria-hidden="true" /> Siguatepeque, Honduras</span>
              <span className="info-tag"><GraduationCap size={14} aria-hidden="true" /> UNICAH</span>
              <span className="info-tag"><Briefcase size={14} aria-hidden="true" /> {lang === 'es' ? 'Abierto a oportunidades' : 'Open to opportunities'}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map(s => (
            <StatCard key={s.label} {...s} />
          ))}
        </motion.div>

        {/* Timeline — horizontal */}
        <div className="timeline">
          <h3 className="timeline-title">
            <Briefcase size={20} className="text-accent-cyan" />
            {lang === 'es' ? 'Trayectoria' : 'Journey'}
          </h3>
          <div className="timeline-track">
            {timeline.map((item, i) => (
              <Fragment key={i}>
                <motion.div
                  className="timeline-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="timeline-content">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-role">{item.title}</h4>
                    <span className="timeline-institution">{item.institution}</span>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </motion.div>
                {i < timeline.length - 1 && (
                  <div className="timeline-connector" aria-hidden="true">
                    <ChevronRight size={22} strokeWidth={2} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
