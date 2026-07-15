// ============================================================
// API helpers — wakeup Render free tier + contacto
// ============================================================

function resolveApiBase(): string {
  const raw = import.meta.env.VITE_API_URL?.trim();
  // Vacío o "same" = same-origin (útil con proxy de Vercel)
  if (!raw || raw === '/' || raw === 'same') return '';
  return raw.replace(/\/$/, '');
}

export const API_BASE_URL = resolveApiBase();

const HEALTH_URL = `${API_BASE_URL}/health`;
const CONTACT_URL = `${API_BASE_URL}/api/contact`;

/** Render free puede tardar ~50–90s en despertar */
const WAKE_TIMEOUT_MS = 120_000;
const WAKE_RETRY_MS = 3_000;
const CONTACT_TIMEOUT_MS = 90_000;
const PING_TIMEOUT_MS = 45_000;

let lastHealthyAt = 0;
let wakePromise: Promise<boolean> | null = null;

function isRecentlyHealthy(maxAgeMs = 90_000): boolean {
  return Date.now() - lastHealthyAt < maxAgeMs;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Ping ligero a /health para despertar el servicio en Render */
export async function pingBackend(): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(
      HEALTH_URL,
      { method: 'GET', cache: 'no-store', mode: 'cors' },
      PING_TIMEOUT_MS
    );
    if (res.ok) {
      lastHealthyAt = Date.now();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Espera hasta que el backend responda (cold start de Render).
 * Reutiliza una sola promesa si hay varios callers a la vez.
 */
export async function wakeBackend(force = false): Promise<boolean> {
  if (!force && isRecentlyHealthy()) return true;

  if (wakePromise) return wakePromise;

  wakePromise = (async () => {
    const deadline = Date.now() + WAKE_TIMEOUT_MS;

    while (Date.now() < deadline) {
      if (await pingBackend()) return true;
      await new Promise((r) => setTimeout(r, WAKE_RETRY_MS));
    }

    return false;
  })().finally(() => {
    wakePromise = null;
  });

  return wakePromise;
}

/** Arranca el wakeup en cuanto carga la página (no espera a Contacto) */
export function startEarlyWarmup(): void {
  if (typeof window === 'undefined') return;
  void wakeBackend();
}

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactResult =
  | { ok: true; message?: string }
  | { ok: false; status: number; message: string; waking?: boolean };

/**
 * Despierta el backend si hace falta y luego envía el formulario.
 * Reintenta hasta 2 veces si falla por red / cold start / 5xx.
 */
export async function sendContactMessage(
  data: ContactPayload
): Promise<ContactResult> {
  const awake = await wakeBackend();
  if (!awake) {
    return {
      ok: false,
      status: 503,
      message: 'El servidor está iniciando. Inténtalo de nuevo en unos segundos.',
      waking: true,
    };
  }

  const attempt = async (): Promise<ContactResult> => {
    try {
      const res = await fetchWithTimeout(
        CONTACT_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          mode: 'cors',
        },
        CONTACT_TIMEOUT_MS
      );

      const body = await res.json().catch(() => ({} as { message?: string }));

      if (res.ok) {
        return { ok: true, message: body.message };
      }

      return {
        ok: false,
        status: res.status,
        message: body.message || 'Error al enviar el mensaje.',
        waking: res.status === 503,
      };
    } catch {
      return {
        ok: false,
        status: 0,
        message: 'No se pudo conectar con el servidor.',
        waking: true,
      };
    }
  };

  let result = await attempt();

  for (let i = 0; i < 2 && !result.ok && (result.status === 0 || result.status >= 500); i++) {
    lastHealthyAt = 0;
    const retried = await wakeBackend(true);
    if (!retried) break;
    await new Promise((r) => setTimeout(r, 1500));
    result = await attempt();
  }

  return result;
}
