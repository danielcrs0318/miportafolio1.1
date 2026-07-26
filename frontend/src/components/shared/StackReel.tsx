// ============================================================
// Shared — StackReel
// Tira de tecnologías que se desplaza según el scroll de la página
// ============================================================
import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLangStore } from '../../store/langStore';

const STACK = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Prisma',
  'OpenAI API', 'Pinecone', 'Stripe', 'Docker', 'Docker Compose', 'Nginx',
  'Traefik', 'Portainer', 'GitHub Actions',
];

function Strip() {
  return (
    <div className="ticker__item">
      {STACK.map(name => (
        <Fragment key={name}>
          <span>{name}</span>
          <i />
        </Fragment>
      ))}
    </div>
  );
}

export function StackReel() {
  const { lang } = useLangStore();
  const ref = useRef<HTMLElement>(null);

  // El desplazamiento horizontal se ata al avance del scroll sobre la banda:
  // al bajar, la tira corre hacia la izquierda.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-52%']);

  return (
    <section className="ticker" ref={ref} aria-label={lang === 'es' ? 'Stack técnico' : 'Tech stack'}>
      <motion.div className="ticker__track" style={{ x }} aria-hidden="true">
        <Strip />
        <Strip />
      </motion.div>
    </section>
  );
}
