// ============================================================
// Section — Projects
// 4 tarjetas glassmorphism + Modal expandible
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Check, Sparkles, Toolbox } from 'lucide-react';
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
          className="modal-content"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <span
                className="modal-badge"
                style={{ color: project.badgeColor, borderColor: `${project.badgeColor}55` }}
              >
                {project.badge}
              </span>
              <h2 className="modal-title">{project.title}</h2>
            </div>
            <button onClick={onClose} className="modal-close" aria-label="Cerrar">
              <X size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <p className="modal-desc">{project.longDescription}</p>

            {/* Highlights */}
            <div className="modal-highlights">
              <h3 className="modal-section-title">
                <Sparkles size={18} className="text-accent-cyan mr-2 inline-block" aria-hidden="true" />
                {lang === 'es' ? 'Características clave' : 'Key Features'}
              </h3>
              <ul className="highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="highlight-item">
                    <Check size={16} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div className="modal-stack">
              <h3 className="modal-section-title">
                <Toolbox size={18} className="text-accent-cyan mr-2 inline-block" aria-hidden="true" />
                {lang === 'es' ? 'Stack tecnológico' : 'Tech Stack'}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.stack.map(t => (
                  <TechBadge key={t} name={t} size="md" color={project.badgeColor} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="modal-footer">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span className="social-btn-text">GH</span>
                {lang === 'es' ? 'Ver Código' : 'View Code'}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={18} />
                Demo Live
              </a>
            )}
          </div>
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
        style={{ '--project-color': project.badgeColor } as React.CSSProperties}
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
        {/* Badge */}
        <div className="project-badge" style={{ color: project.badgeColor }}>
          {project.badge}
        </div>

        {/* Title & description */}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Stack preview */}
        <div className="project-stack">
          {project.stack.slice(0, 4).map(t => (
            <TechBadge key={t} name={t} />
          ))}
          {project.stack.length > 4 && (
            <span className="tech-badge">+{project.stack.length - 4}</span>
          )}
        </div>

        {/* CTA */}
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
