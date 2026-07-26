// ============================================================
// Section — Proyectos
// Índice de trabajos + ficha técnica expandible
// ============================================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';
import { projects } from '../../lib/data';
import type { Project } from '../../types';

const EASE = [0.16, 1, 0.3, 1] as const;
const num = (i: number) => String(i + 1).padStart(2, '0');

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
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="sheet"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        <div className="sheet__head">
          <div>
            <span className="sheet__kicker mono">{project.badge}</span>
            <h2 className="sheet__title">{project.title}</h2>
          </div>
          <button onClick={onClose} className="sheet__close" aria-label={es ? 'Cerrar' : 'Close'}>
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="sheet__body">
          <p className="sheet__p">{project.longDescription}</p>

          <div className="sheet__block">
            <span className="sheet__label mono">{es ? 'Alcance' : 'Scope'}</span>
            <ul className="sheet__ul">
              {project.highlights.map((h, i) => (
                <li key={i} className="sheet__li">
                  <b>{num(i)}</b>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sheet__block">
            <span className="sheet__label mono">Stack</span>
            <div className="ix-tags" style={{ marginTop: 0 }}>
              {project.stack.map(t => (
                <span key={t} className="tag tag--md">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {(project.github || project.demo) && (
          <div className="sheet__foot">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
                <span>{es ? 'Repositorio' : 'Repository'}</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn">
                <span>Demo</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
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
          index="04"
          title={es ? 'Proyectos' : 'Projects'}
          note={es
            ? 'Selección de trabajos. Abre cualquiera para ver el alcance y el stack completo.'
            : 'Selected work. Open any entry to see its scope and full stack.'}
        />

        <div className="ix">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              className="ix-row ix-row--link"
              onClick={() => setOpen(project)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            >
              <span className="ix-num">{num(i)}</span>

              <div>
                <div className="ix-head">
                  <h3 className="ix-title">{project.title}</h3>
                </div>
                <span className="ix-kicker">{project.badge}</span>
              </div>

              <div>
                <p className="ix-desc">{project.description}</p>
                <div className="ix-tags">
                  {project.stack.slice(0, 4).map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="tag">+{project.stack.length - 4}</span>
                  )}
                </div>
              </div>

              <div className="ix-meta">
                <span>{es ? 'Ficha' : 'Detail'}</span>
                <span className="ix-arrow"><ArrowUpRight size={16} strokeWidth={1.5} /></span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectSheet project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
