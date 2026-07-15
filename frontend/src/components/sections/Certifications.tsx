// ============================================================
// Section — Certifications
// ============================================================
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
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
            ? 'Formación continua en herramientas y seguridad'
            : 'Continuous learning in tools and security'}
        />

        <div className="certifications-grid">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.id}
              className="cert-card"
              style={{ '--cert-color': cert.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="cert-card-icon" aria-hidden="true">
                <Award size={20} />
              </div>
              <div className="cert-card-body">
                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-issuer">{cert.issuer}</p>
              </div>
              {cert.year && (
                <span className="cert-card-year">{cert.year}</span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
