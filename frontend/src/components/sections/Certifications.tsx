// ============================================================
// Section — Certificaciones
// Registro de formación: emisor, año y estado
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
    <section id="certifications" className="band">
      <div className="shell">
        <SectionHeader
          index="03"
          title={es ? 'Certificaciones' : 'Certifications'}
          note={es
            ? 'Formación verificable en control de versiones, seguridad e inteligencia artificial.'
            : 'Verifiable training in version control, security, and artificial intelligence.'}
        />

        <div className="ix">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            const inProgress = cert.status === 'in-progress';

            return (
              <motion.article
                key={cert.id}
                className="ix-row ix-row--pair"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="ix-num">{String(i + 1).padStart(2, '0')}</span>

                <div>
                  <div className="ix-head">
                    <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="ix-title">{cert.title}</h3>
                  </div>
                  <span className="ix-kicker">{cert.issuer}</span>
                </div>

                <div className="ix-meta">
                  {inProgress ? (
                    <span className="ix-status">
                      <LoaderCircle size={13} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
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
