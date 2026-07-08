// ============================================================
// Backend — Express Server
// ============================================================
import express from 'express';
import dotenv from 'dotenv';
import { helmetMiddleware, corsMiddleware } from './middleware/security';
import { generalLimiter } from './middleware/rateLimiter';
import contactRouter from './routes/contact';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middlewares globales ─────────────────────────────────────
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(generalLimiter);

// ── Health check ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'portfolio-api',
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ───────────────────────────────────────────────────
app.use('/api/contact', contactRouter);

// ── 404 handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Error handler ────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running on http://localhost:${PORT}`);
  console.log(`📬 Contact endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`❤️  Health check: GET http://localhost:${PORT}/health\n`);
});
