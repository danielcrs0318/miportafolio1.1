// ============================================================
// Section — DevOps Showcase
// Diagrama de deploy + snippet docker-compose con syntax highlight
// ============================================================
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Shield, Box, Package, Server, Shuffle, GitBranch, Globe, Cpu, MapPin } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';
import { dockerComposeSnippet } from '../../lib/data';
import { DeployPipeline } from './DeployPipeline';

const devopsTools = [
  { name: 'Docker',          icon: Box,      desc: 'Contenedorización completa' },
  { name: 'Docker Compose',  icon: Package,  desc: 'Orquestación multi-servicio' },
  { name: 'Nginx',           icon: Server,   desc: 'Reverse proxy & servir build' },
  { name: 'Traefik',         icon: Shuffle,  desc: 'Routing + SSL automático' },
  { name: "Let's Encrypt", icon: Shield,   desc: 'HTTPS gratuito y automático' },
  { name: 'GitHub Actions',  icon: GitBranch, desc: 'CI/CD pipeline automatizado' },
];

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

        {/* Intro */}
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

        {/* Deploy Pipeline "video" */}
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

        {/* Deploy Diagram */}
        <motion.div
          className="deploy-diagram"
          style={{ marginTop: '2.5rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="diagram-title">
            <MapPin size={20} className="text-accent-cyan" aria-hidden="true" />
            {lang === 'es' ? 'Arquitectura de Despliegue' : 'Deploy Architecture'}
          </h3>
          <div className="diagram-flow">
            {[
              { label: 'Internet', icon: Globe },
              { label: 'Traefik\n(SSL/HTTPS)', icon: Shuffle },
              { label: 'Nginx', icon: Server },
              { label: 'React App\n+ Node.js API', icon: Cpu },
            ].map((step, i, arr) => {
              const Icon = step.icon;
              return (
                <div key={i} className="diagram-step-group">
                  <div className="diagram-step">
                    <span className="diagram-step-icon"><Icon size={18} aria-hidden="true" /></span>
                    <span className="diagram-step-label">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="diagram-arrow">→</div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Tools grid */}
        <div className="devops-tools-grid">
          {devopsTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                className="devops-tool-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              >
                <span className="devops-tool-icon"><Icon size={20} aria-hidden="true" /></span>
                <span className="devops-tool-name">{tool.name}</span>
                <span className="devops-tool-desc">{tool.desc}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Code snippet */}
        <motion.div
          className="code-snippet-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="code-snippet-header">
            <div className="code-snippet-dots">
              <span style={{ background: '#FF5F57' }} />
              <span style={{ background: '#FFBD2E' }} />
              <span style={{ background: '#28CA41' }} />
            </div>
            <span className="code-snippet-filename">docker-compose.yml</span>
          </div>
          <SyntaxHighlighter
            language="yaml"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0 0 12px 12px',
              fontSize: '0.82rem',
              background: 'rgba(10, 15, 30, 0.95)',
            }}
            showLineNumbers
          >
            {dockerComposeSnippet}
          </SyntaxHighlighter>
        </motion.div>
      </div>
    </section>
  );
}
