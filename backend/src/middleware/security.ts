// ============================================================
// Backend — Security Middleware
// Helmet + CORS configurado
// ============================================================
import helmet from 'helmet';
import cors from 'cors';
import { RequestHandler } from 'express';

const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://danielmolina.dev',
  'https://www.danielmolina.dev',
];

function getAllowedOrigins(): string[] {
  const fromEnv = process.env.FRONTEND_URL
    ?.split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean) ?? [];

  return [...new Set([...DEFAULT_ORIGINS, ...fromEnv])];
}

function isAllowedOrigin(origin: string): boolean {
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;

  // Previews y producción en Vercel
  try {
    const host = new URL(origin).hostname;
    if (host.endsWith('.vercel.app')) return true;
  } catch {
    return false;
  }

  return false;
}

export const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});

export const corsMiddleware: RequestHandler = cors({
  origin: (origin, callback) => {
    // Sin Origin = Postman/health checks/same-origin proxy
    if (!origin || isAllowedOrigin(origin)) {
      // Nunca lanzar Error aquí: provoca 500 en el cliente
      callback(null, true);
    } else {
      console.warn(`[CORS] Origin bloqueado: ${origin}`);
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // false evita problemas con orígenes dinámicos en Vercel/Render
  credentials: false,
  optionsSuccessStatus: 204,
});
