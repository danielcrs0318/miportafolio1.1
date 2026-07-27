// ============================================================
// Section — DevOps
// Del commit al contenedor: pipeline reproducible
// ============================================================
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';
import { DeployPipeline } from './DeployPipeline';

export function DevOps() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="devops" className="band band--tint">
      <div className="shell">
        <SectionHeader
          title={es ? 'Del commit al contenedor' : 'From commit to container'}
          note={es
            ? 'La parte del trabajo que casi nunca se muestra en un portafolio.'
            : 'The part of the job that portfolios almost never show.'}
        />

        <motion.div
          className="devops__intro"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="devops__statement">
            {es
              ? 'Un proyecto no está terminado cuando compila: está terminado cuando corre en un servidor, con HTTPS, reinicios automáticos y monitoreo.'
              : 'A project is not done when it compiles: it is done when it runs on a server, with HTTPS, automatic restarts, and monitoring.'}
          </p>
          <p>
            {es
              ? 'Cada uno de mis proyectos se empaqueta en imágenes Docker, se orquesta con Docker Compose y se publica detrás de Nginx y Traefik con certificados automáticos. Abajo puedes recorrer el flujo completo, etapa por etapa.'
              : 'Every project I build is packaged into Docker images, orchestrated with Docker Compose, and published behind Nginx and Traefik with automatic certificates. Below you can walk through the full flow, stage by stage.'}
          </p>
        </motion.div>

        <motion.div
          className="block"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="block__label mono">
            <span>{es ? 'Flujo de despliegue' : 'Deployment flow'}</span>
            <span>{es ? '5 etapas' : '5 stages'}</span>
          </div>
          <DeployPipeline />
        </motion.div>
      </div>
    </section>
  );
}
