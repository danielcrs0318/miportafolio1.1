// ============================================================
// Hook — useScrollSpy
// Detecta cuál sección está activa basado en el scroll
// ============================================================
import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id.replace('#', ''));
        if (el && el.offsetTop <= scrollY) current = id;
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [sectionIds, offset]);

  return activeId;
}
