// ============================================================
// Shared — SectionHeader
// Encabezado editorial: índice numérico + título + nota lateral
// ============================================================
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  index: string;
  title: string;
  note?: string;
}

export function SectionHeader({ index, title, note }: SectionHeaderProps) {
  return (
    <motion.header
      className="sec"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="sec__idx">({index})</span>
      <h2 className="sec__title">{title}</h2>
      {note && <p className="sec__note">{note}</p>}
    </motion.header>
  );
}
