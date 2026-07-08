// ============================================================
// Shared — SectionTitle
// Título estandarizado con línea decorativa
// ============================================================
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, className, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={cn('mb-14', align === 'center' ? 'text-center' : 'text-left', className)}
    >
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className={cn('title-line', align === 'center' ? 'mx-auto' : '')} />
    </motion.div>
  );
}
