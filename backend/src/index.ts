// ============================================================
// Backend — Express Server
// ============================================================
import express from 'express';
import dotenv from 'dotenv';
import { helmetMiddleware, corsMiddleware } from './middleware/security';
import { generalLimiter } from './middleware/rateLimiter';
import contactRouter from './routes/contact';
import { verifyEmailConfig } from './utils/mailer';

dotenv.config();

function validateEnv(): void {
  const required = ['EMAIL_USER', 'EMAIL_PASS'] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Variables de entorno faltantes: ${missing.join(', ')}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    return;
  }

  const pass = process.env.EMAIL_PASS?.replace(/\s/g, '') ?? '';
  const placeholders = [
    'your_gmail_app_password_here',
    'tu_app_password_de_gmail',
    'tu-app-password',
  ];
  if (placeholders.includes(pass.toLowerCase())) {
    console.error(
      '❌ EMAIL_PASS sigue siendo un placeholder. Genera un App Password en https://myaccount.google.com/apppasswords'
    );
  }
}

validateEnv();

const app = express();
const PORT = process.env.PORT || 4000;

// Render/Vercel usan proxy inverso — necesario para rate limiting por IP real
app.set('trust proxy', 1);

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Health fuera del rate limit — usado por Render y por el warmup del frontend
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'portfolio-api',
    timestamp: new Date().toISOString(),
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

async function start(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    try {
      await verifyEmailConfig();
      console.log('✅ Configuración de correo verificada');
    } catch (error) {
      console.warn('⚠️  No se pudo verificar el correo al iniciar. Revisa EMAIL_USER y EMAIL_PASS.');
      console.warn(error);
    }
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio API running on port ${PORT}`);
    console.log(`📬 Contact endpoint: POST /api/contact`);
    console.log(`❤️  Health check: GET /health\n`);
  });
}

start();
