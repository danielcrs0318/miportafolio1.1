import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Animate existing content instead of remounting controls, preserving focus and form state.
export function useContentMotion(selection: string | number) {
  const scope = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const previous = useRef(selection);
  useEffect(() => {
    if (!scope.current) return;
    if (previous.current === selection) return;
    previous.current = selection;
    if (reduced) return;
    const playback = scope.current.animate([
      { opacity: 0.65, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 300, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    return () => playback.cancel();
  }, [selection, reduced]);
  return scope;
}
