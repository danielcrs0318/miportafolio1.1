// ============================================================
// Shared — TechBadge
// Badge de tecnología con estilo consistente
// ============================================================
import { cn } from '../../lib/utils';

interface TechBadgeProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md';
}

export function TechBadge({ name, color, size = 'sm' }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'tech-badge',
        size === 'md' && 'tech-badge--md'
      )}
      style={color ? { borderColor: `${color}55`, color } : undefined}
    >
      {name}
    </span>
  );
}
