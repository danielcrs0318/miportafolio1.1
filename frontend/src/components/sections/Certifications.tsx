// ============================================================
// Section — Certifications
// ============================================================
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';
import { certifications } from '../../lib/data';

export function Certifications() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="certifications" className="band band--soft">
      <div className="shell">
        <SectionHeader
          title={es ? 'certs' : 'certs'}
          note={es
            ? 'Formación en herramientas, seguridad e IA.'
            : 'Training in tools, security, and AI.'}
        />

        <div className="ix">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            const inProgress = cert.status === 'in-progress';

            return (
              <motion.article
                key={cert.id}
                className="ix-row ix-row--pair"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <div className="ix-head">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="ix-title">{cert.title}</h3>
                  </div>
                  <span className="ix-kicker">{cert.issuer}</span>
                </div>

                <div className="ix-meta">
                  {inProgress ? (
                    <span className="ix-status">
                      <LoaderCircle size={14} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
                      {es ? 'En curso' : 'In progress'}
                    </span>
                  ) : (
                    <span>{cert.year}</span>
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
