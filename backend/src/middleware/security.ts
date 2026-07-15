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
];

function getAllowedOrigins(): string[] {
  const fromEnv = process.env.FRONTEND_URL
    ?.split(',')
    .map((url) => url.trim())
    .filter(Boolean) ?? [];

  return [...new Set([...DEFAULT_ORIGINS, ...fromEnv])];
}

function isAllowedOrigin(origin: string): boolean {
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;

  // Previews de Vercel (*.vercel.app)
  if (origin.endsWith('.vercel.app')) return true;

  return false;
}

export const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});

export const corsMiddleware: RequestHandler = cors({
  origin: (origin, callback) => {
    if (!origin || isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
