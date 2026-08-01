// ============================================================
// Section — Projects / work
// ============================================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';
import { projects } from '../../lib/data';
import type { Project } from '../../types';

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (i: number) => String(i + 1).padStart(2, '0');
const orderedProjects = [...projects].sort(
  (a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)),
);

function ProjectSheet({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLangStore();
  const es = lang === 'es';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="sheet-scrim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="sheet"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        <div className="sheet__head">
          <div>
            <span className="sheet__kicker">{project.badge}</span>
            <h2 className="sheet__title">{project.title}</h2>
          </div>
          <button onClick={onClose} className="sheet__close" aria-label={es ? 'Cerrar' : 'Close'}>
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        {project.demo && project.image && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="sheet__preview"
          >
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
            />
            <span className="sheet__preview-label mono">
              {es ? 'Abrir sitio' : 'Open site'}
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </span>
          </a>
        )}

        <div className="sheet__body">
          <p className="sheet__p">{project.longDescription}</p>

          <div className="sheet__block">
            <span className="sheet__label">{es ? 'Alcance' : 'Scope'}</span>
            <ul className="sheet__ul">
              {project.highlights.map((h, i) => (
                <li key={i} className="sheet__li">
                  <b>{pad(i)}</b>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sheet__block">
            <span className="sheet__label">Stack</span>
            <div className="ix-tags" style={{ marginTop: 0 }}>
              {project.stack.map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {(project.github || project.demo) && (
          <div className="sheet__foot">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--fill">
                {es ? 'Repositorio' : 'Repository'}
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                Demo
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { lang } = useLangStore();
  const es = lang === 'es';
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="band">
      <div className="shell">
        <SectionHeader
          title={es ? 'work' : 'work'}
          note={es
            ? 'Algunos de mis proyectos más recientes.'
            : 'Some of my latest work.'}
        />

        <div className="ix ix--projects">
          {orderedProjects.map((project, i) => (
            <motion.article
              key={project.id}
              className={`ix-card ${project.demo ? 'ix-card--live' : ''}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
            >
              {project.demo && project.image ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ix-preview"
                  aria-label={es ? `Ver ${project.title} en vivo` : `View ${project.title} live`}
                >
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                  />
                  <span className="ix-live mono">
                    <i className="live-dot" aria-hidden="true" />
                    Live
                  </span>
                </a>
              ) : (
                <div className="ix-preview ix-preview--placeholder" aria-hidden="true">
                  <span>{project.title}</span>
                  <small>{project.badge}</small>
                </div>
              )}

              <button
                type="button"
                className="ix-row ix-row--link"
                onClick={() => setOpen(project)}
              >
                <div>
                  <h3 className="ix-title">{project.title}</h3>
                  <span className="ix-kicker">{project.badge}</span>
                </div>

                <div>
                  <p className="ix-desc">{project.description}</p>
                  <div className="ix-tags">
                    {project.stack.slice(0, 4).map(t => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="chip">+{project.stack.length - 4}</span>
                    )}
                  </div>
                </div>

                <div className="ix-meta">
                  <span>{es ? 'Ver' : 'View'}</span>
                  <span className="ix-arrow"><ArrowUpRight size={16} strokeWidth={1.75} /></span>
                </div>
              </button>

              {(project.github || project.demo) && (
                <div className="ix-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ix-link"
                    >
                      GitHub
                      <ArrowUpRight size={14} strokeWidth={1.75} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ix-link ix-link--live"
                    >
                      Demo
                      <ArrowUpRight size={14} strokeWidth={1.75} />
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectSheet project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
