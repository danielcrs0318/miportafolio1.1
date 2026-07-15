// ============================================================
// Backend — Express Server
// ============================================================
import express from 'express';
import dotenv from 'dotenv';
import { helmetMiddleware, corsMiddleware } from './middleware/security';
import { generalLimiter } from './middleware/rateLimiter';
import contactRouter from './routes/contact';
import { assertResendConfigured, isResendConfigured } from './utils/mailer';

dotenv.config();

function validateEnv(): void {
  const required = ['RESEND_API_KEY', 'EMAIL_TO'] as const;
  const missing = required.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    console.error(`❌ Variables de entorno faltantes: ${missing.join(', ')}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

validateEnv();

const app = express();
const PORT = process.env.PORT || 4000;

app.set('trust proxy', 1);

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'portfolio-api',
    timestamp: new Date().toISOString(),
    email: {
      provider: 'resend',
      configured: isResendConfigured(),
    },
  });
});

app.use(generalLimiter);
app.use('/api/contact', contactRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

function start(): void {
  if (process.env.NODE_ENV === 'production') {
    try {
      assertResendConfigured();
      console.log('✅ Resend configurado');
    } catch (error) {
      console.warn('⚠️  Resend incompleto. Revisa RESEND_API_KEY y EMAIL_TO.');
      console.warn(error);
    }
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio API running on port ${PORT}`);
    console.log(`📬 Contact endpoint: POST /api/contact`);
    console.log(`❤️  Health check: GET /health`);
    console.log(`✉️  Provider: Resend\n`);
  });
}

start();
