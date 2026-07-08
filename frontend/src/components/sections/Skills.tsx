// ============================================================
// Section — Skills & Tech Stack
// Grid por categorías con animaciones hover glow
// ============================================================
import { motion } from 'framer-motion';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';
import { skillCategories } from '../../lib/data';

export function Skills() {
  const { lang } = useLangStore();

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Skills & Tech Stack' : 'Skills & Tech Stack'}
          subtitle={lang === 'es'
            ? 'Tecnologías con las que construyo soluciones reales'
            : 'Technologies I use to build real solutions'}
        />

        <div className="skills-grid">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
            >
              {/* Category header */}
              <div className="skill-category-header">
                <span className="skill-category-icon">
                  {(() => {
                    const Icon = cat.icon;
                    return <Icon size={18} aria-hidden="true" />;
                  })()}
                </span>
                <h3 className="skill-category-title">{cat.title}</h3>
              </div>

              {/* Skills list */}
              <div className="skill-items">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIdx * 0.05 + i * 0.05 }}
                    whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
