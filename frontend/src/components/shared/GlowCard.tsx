// ============================================================
// Shared — GlowCard
// Tarjeta glassmorphism con borde glow animado
// ============================================================
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export function GlowCard({ children, className, glowColor = '#00D4FF', delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn('glass-card group', className)}
      style={{ '--glow-color': glowColor } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}
