import { useEffect, useRef } from 'react';
import { useAnimate } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Animate existing content instead of remounting controls, preserving focus and form state.
export function useContentMotion(selection: string | number) {
  const [scope, animate] = useAnimate();
  const reduced = usePrefersReducedMotion();
  const previous = useRef(selection);
  useEffect(() => {
    if (!scope.current) return;
    if (previous.current === selection && !reduced) return;
    previous.current = selection;
    const playback = animate(scope.current, {
      opacity: reduced ? 1 : [0.65, 1], y: reduced ? 0 : [6, 0],
    }, { duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] });
    return () => playback.stop();
  }, [selection, reduced, scope, animate]);
  return scope;
}
