// ============================================================
// Section — DevOps
// ============================================================
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';
import { DeployPipeline } from './DeployPipeline';

export function DevOps() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="devops" className="band band--soft">
      <div className="shell">
        <SectionHeader
          title="devops"
          note={es
            ? 'La parte del trabajo que casi nunca se muestra en un portafolio.'
            : 'The part of the job portfolios almost never show.'}
        />

        <motion.div
          className="devops__intro"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="devops__statement">
            {es
              ? 'Un proyecto no está terminado cuando compila: está terminado cuando corre en un servidor.'
              : 'A project is not done when it compiles: it is done when it runs on a server.'}
          </p>
          <p>
            {es
              ? 'Empaqueto en Docker, orquesto con Compose y publico detrás de Nginx y Traefik con certificados automáticos. Abajo puedes recorrer el flujo completo.'
              : 'I package with Docker, orchestrate with Compose, and publish behind Nginx and Traefik with automatic certificates. Walk through the full flow below.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="block__label">
            <span>{es ? 'Flujo de despliegue' : 'Deployment flow'}</span>
            <span>{es ? '5 etapas' : '5 stages'}</span>
          </div>
          <DeployPipeline />
        </motion.div>
      </div>
    </section>
  );
}
