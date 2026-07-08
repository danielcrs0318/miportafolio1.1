// ============================================================
// Backend — Security Middleware
// Helmet + CORS configurado
// ============================================================
import helmet from 'helmet';
import cors from 'cors';
import { RequestHandler } from 'express';

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://danielmolina.dev',
];

export const helmetMiddleware = helmet({
  contentSecurityPolicy: false, // SPA no necesita CSP estricto en API
  crossOriginEmbedderPolicy: false,
});

export const corsMiddleware: RequestHandler = cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (Postman, server-to-server) y orígenes permitidos
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
