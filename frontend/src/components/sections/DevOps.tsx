// ============================================================
// Section — DevOps Showcase
// Flujo de despliegue automatizado (pipeline animado)
// ============================================================
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';
import { DeployPipeline } from './DeployPipeline';

export function DevOps() {
  const { lang } = useLangStore();

  return (
    <section id="devops" className="section section--alt">
      <div className="container">
        <SectionTitle
          title="DevOps Showcase"
          subtitle={lang === 'es'
            ? 'Proyectos listos para producción desde el primer día'
            : 'Production-ready from day one'}
        />

        <motion.p
          className="devops-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {lang === 'es'
            ? 'A diferencia de muchos desarrolladores, no solo construyo funcionalidades — despliego con arquitecturas reales. Todos mis proyectos tienen una pipeline de producción configurada con Docker, Nginx y Traefik.'
            : "Unlike many developers, I don't just build features — I deploy with real architectures. All my projects have a production pipeline configured with Docker, Nginx, and Traefik."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="diagram-title" style={{ marginBottom: '1.25rem' }}>
            <GitBranch size={20} className="text-accent-cyan" aria-hidden="true" />
            {lang === 'es' ? 'Flujo de Despliegue Automatizado' : 'Automated Deployment Flow'}
          </h3>
          <DeployPipeline />
        </motion.div>
      </div>
    </section>
  );
}
