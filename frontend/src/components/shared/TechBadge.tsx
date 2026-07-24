// ============================================================
// Shared — TechBadge
// Badge de tecnología con estilo consistente
// ============================================================
import { cn } from '../../lib/utils';

interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md';
}

export function TechBadge({ name, size = 'sm' }: TechBadgeProps) {
  return (
    <span className={cn('tech-badge', size === 'md' && 'tech-badge--md')}>
      {name}
    </span>
  );
}
