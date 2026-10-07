import type { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const ease = [0.22, 1, 0.36, 1] as const;

export function Screen({ children, className }: PropsWithChildren<{ className: string }>) {
  const reduced = usePrefersReducedMotion();
  return <motion.section className={className} initial="hidden" animate="visible"
    variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.05 } } }}>
    {children}
  </motion.section>;
}

export function ScreenBody({ children, className }: PropsWithChildren<{ className: string }>) {
  const reduced = usePrefersReducedMotion();
  return <motion.div className={className} variants={{
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3, ease, staggerChildren: reduced ? 0 : 0.05 } },
  }}>{children}</motion.div>;
}

