// ============================================================
// Section — Certifications
// ============================================================
import { motion } from 'framer-motion';
import { BadgeCheck, LoaderCircle } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';
import { certifications } from '../../lib/data';

export function Certifications() {
  const { lang } = useLangStore();

  return (
    <section id="certifications" className="section">
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Certificaciones' : 'Certifications'}
          subtitle={lang === 'es'
            ? 'Formación continua en herramientas, seguridad e IA'
            : 'Continuous learning in tools, security, and AI'}
        />

        <div className="certifications-grid">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            const inProgress = cert.status === 'in-progress';

            return (
              <motion.article
                key={cert.id}
                className={`cert-card${inProgress ? ' cert-card--progress' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="cert-card-glow" aria-hidden="true" />

                <div className="cert-card-icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.75} />
                </div>

                <div className="cert-card-body">
                  <h3 className="cert-card-title">{cert.title}</h3>
                  <p className="cert-card-issuer">
                    {inProgress ? (
                      <LoaderCircle size={14} className="cert-card-check cert-card-check--spin" aria-hidden="true" />
                    ) : (
                      <BadgeCheck size={14} className="cert-card-check" aria-hidden="true" />
                    )}
                    {cert.issuer}
                  </p>
                  {cert.description && (
                    <p className="cert-card-desc">{cert.description}</p>
                  )}
                </div>

                <div className="cert-card-meta">
                  {inProgress ? (
                    <span className="cert-card-badge cert-card-badge--progress">
                      {lang === 'es' ? 'En curso' : 'In progress'}
                    </span>
                  ) : (
                    cert.year && <span className="cert-card-year">{cert.year}</span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
