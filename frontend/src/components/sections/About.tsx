// ============================================================
// Section — Sobre mí
// Lead editorial, cifras, disciplinas y trayectoria en texto plano
// ============================================================
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useCountUp } from '../../hooks/useCountUp';
import { useLangStore } from '../../store/langStore';
import { stats, timeline, skillCategories } from '../../lib/data';
import type { Stat } from '../../types';

const EASE = [0.16, 1, 0.3, 1] as const;

function Figure({ value, suffix, label }: Stat) {
  const { count, ref } = useCountUp(value, 1600);
  return (
    <div ref={ref} className="figure">
      <span className="figure__n">
        {count}
        {suffix && <sup>{suffix}</sup>}
      </span>
      <span className="figure__l mono">{label}</span>
    </div>
  );
}

export function About() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="about" className="band">
      <div className="shell">
        <SectionHeader
          index="01"
          title={es ? 'Sobre mí' : 'About'}
          note={es
            ? 'Quién está detrás del código, con qué trabajo y cómo llegué hasta aquí.'
            : 'Who is behind the code, what I work with, and how I got here.'}
        />

        <div className="about__grid">
          <motion.p
            className="about__lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {es
              ? 'Escribo código que termina en producción, no en una carpeta de capturas de pantalla.'
              : 'I write code that ends up in production, not in a folder full of screenshots.'}
          </motion.p>

          <motion.div
            className="about__body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <p>
              {es
                ? 'Soy Ingeniero en Ciencias de la Computación egresado de UNICAH y trabajo desde Siguatepeque, Honduras. Me muevo cómodo en todo el ciclo: interfaz en React y TypeScript, API en Node.js, base de datos en PostgreSQL y el servidor Linux donde todo eso termina corriendo.'
                : "I'm a Computer Science Engineer from UNICAH, working out of Siguatepeque, Honduras. I move across the whole cycle: React and TypeScript on the interface, Node.js on the API, PostgreSQL for data, and the Linux server where all of it ends up running."}
            </p>
            <p>
              {es
                ? 'He construido desde landing pages para PYMES hondureñas hasta sistemas con autenticación, auditoría, búsqueda semántica con IA y despliegue contenerizado. Lo que me diferencia no es la cantidad de frameworks, sino que cada proyecto queda listo para el día en que recibe usuarios reales.'
                : 'I have built everything from landing pages for Honduran small businesses to systems with authentication, auditing, AI semantic search, and containerized deployment. What sets me apart is not the number of frameworks, but that every project is ready for the day it meets real users.'}
            </p>

            <div className="about__tags">
              <span className="tag tag--md"><MapPin size={12} strokeWidth={1.5} />Siguatepeque, HN</span>
              <span className="tag tag--md"><GraduationCap size={12} strokeWidth={1.5} />UNICAH</span>
              <span className="tag tag--md"><Briefcase size={12} strokeWidth={1.5} />Freelance</span>
            </div>
          </motion.div>
        </div>

        <div className="block">
          <div className="block__label mono">
            <span>{es ? 'Cifras' : 'Figures'}</span>
            <span>2026</span>
          </div>
          <div className="figures">
            {stats.map(s => <Figure key={s.label} {...s} />)}
          </div>
        </div>

        <div className="block">
          <div className="block__label mono">
            <span>{es ? 'Herramientas por disciplina' : 'Tools by discipline'}</span>
            <span>{skillCategories.length}</span>
          </div>
          <div className="disciplines">
            {skillCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  className="disc-row"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="disc-row__k">
                    <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                    {cat.title}
                  </span>
                  <span className="disc-row__v">
                    {cat.skills.map(s => s.name).join(' · ')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="block">
          <div className="block__label mono">
            <span>{es ? 'Trayectoria' : 'Journey'}</span>
            <span>2022 — 2026</span>
          </div>
          <div className="journey">
            {timeline.map((item, i) => (
              <motion.article
                key={i}
                className="jrow"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              >
                <span className="jrow__year mono">{item.year}</span>
                <div>
                  <h3 className="jrow__role">{item.title}</h3>
                  <span className="jrow__org">{item.institution}</span>
                </div>
                <p className="jrow__desc">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
