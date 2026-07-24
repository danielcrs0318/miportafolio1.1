// ============================================================
// Section — Projects
// 4 tarjetas glassmorphism + Modal expandible
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { TechBadge } from '../shared/TechBadge';
import { useLangStore } from '../../store/langStore';
import { projects } from '../../lib/data';
import type { Project } from '../../types';

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLangStore();
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content modal-content--minimal"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header modal-header--minimal">
            <div className="modal-header-text">
              <span className="modal-badge modal-badge--minimal">
                {project.badge}
              </span>
              <h2 className="modal-title modal-title--minimal">{project.title}</h2>
            </div>
            <button onClick={onClose} className="modal-close" aria-label="Cerrar">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body modal-body--minimal">
            <p className="modal-desc modal-desc--minimal">{project.longDescription}</p>

            <div className="modal-block">
              <p className="modal-label">
                {lang === 'es' ? 'Características' : 'Features'}
              </p>
              <ul className="modal-features">
                {project.highlights.map((h, i) => (
                  <li key={i} className="modal-feature">{h}</li>
                ))}
              </ul>
            </div>

            <div className="modal-block">
              <p className="modal-label">
                {lang === 'es' ? 'Stack' : 'Stack'}
              </p>
              <div className="modal-stack-tags">
                {project.stack.map(t => (
                  <TechBadge key={t} name={t} size="md" />
                ))}
              </div>
            </div>
          </div>

          {(project.github || project.demo) && (
            <div className="modal-footer modal-footer--minimal">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link-btn"
                >
                  {lang === 'es' ? 'Código' : 'Code'}
                  <ArrowUpRight size={16} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link-btn modal-link-btn--secondary"
                >
                  Demo
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLangStore();

  return (
    <>
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        whileHover={{ y: -10, transition: { duration: 0.28, ease: 'easeOut' } }}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
      >
        <div className="project-badge">
          {project.badge}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-stack">
          {project.stack.slice(0, 4).map(t => (
            <TechBadge key={t} name={t} />
          ))}
          {project.stack.length > 4 && (
            <span className="tech-badge">+{project.stack.length - 4}</span>
          )}
        </div>

        <div className="project-cta">
          <span className="project-cta-text">
            {lang === 'es' ? 'Ver detalles →' : 'View details →'}
          </span>
        </div>

        <div className="project-glow-border" aria-hidden="true" />
        <div className="project-glow-blob" aria-hidden="true" />
      </motion.div>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

export function Projects() {
  const { lang } = useLangStore();

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Proyectos' : 'Projects'}
          subtitle={lang === 'es'
            ? 'Sistemas reales construidos con propósito'
            : 'Real systems built with purpose'}
        />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
