// ============================================================
// Despierta el backend de Render al entrar en Contacto
// ============================================================
import { useEffect, useRef, useState, type RefObject } from 'react';
import { pingBackend, wakeBackend } from '../lib/api';

/** Render free duerme ~15 min; ping cada 10 min mantiene el servicio vivo */
const KEEPALIVE_MS = 10 * 60 * 1000;

/**
 * Observa la sección de contacto y despierta el API en cuanto es visible.
 * También hace keepalive mientras el usuario interactúa con el formulario.
 */
export function useBackendWarmup(
  sectionRef: RefObject<HTMLElement | null>
): { apiReady: boolean; waking: boolean } {
  const [apiReady, setApiReady] = useState(false);
  const [waking, setWaking] = useState(false);
  const startedRef = useRef(false);
  const keepaliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const startWarmup = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setWaking(true);

      void wakeBackend().then((ok) => {
        setApiReady(ok);
        setWaking(false);
      });

      keepaliveRef.current = setInterval(() => {
        void pingBackend().then((ok) => {
          if (ok) setApiReady(true);
        });
      }, KEEPALIVE_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startWarmup();
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (keepaliveRef.current) clearInterval(keepaliveRef.current);
    };
  }, [sectionRef]);

  return { apiReady, waking };
}
