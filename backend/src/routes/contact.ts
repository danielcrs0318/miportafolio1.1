// ============================================================
// Backend — Contact Route
// POST /api/contact → Zod validation → email (Resend o Gmail)
// ============================================================
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { contactLimiter } from '../middleware/rateLimiter';
import { escapeHtml } from '../utils/escapeHtml';
import {
  sendMail,
  resetTransporter,
  getMailErrorInfo,
  getEmailProvider,
} from '../utils/mailer';

const router = Router();

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().optional(),
});

function isAuthError(code: string): boolean {
  return code === 'EAUTH' || code.startsWith('SMTP_535') || code === 'SMTP_534';
}

router.get('/status', (_req, res) => {
  const hasUser = Boolean(process.env.EMAIL_USER?.trim());
  const hasPass = Boolean(process.env.EMAIL_PASS?.trim());
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  res.json({
    ok: hasResend || (hasUser && hasPass),
    provider: getEmailProvider(),
    emailUserConfigured: hasUser,
    emailPassConfigured: hasPass,
    resendConfigured: hasResend,
  });
});

router.post('/', contactLimiter, async (req: Request, res: Response) => {
  if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
    return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: 'Datos inválidos',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, message } = parsed.data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const emailUser = process.env.EMAIL_USER?.trim() || 'onboarding@resend.dev';
  const emailTo = process.env.EMAIL_TO?.trim() || emailUser;
  const fromName = `"Portafolio" <${emailUser}>`;

  try {
    await sendMail({
      from: fromName,
      to: emailTo,
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0D1B2A; color: #E8EDF5; padding: 32px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
          <h2 style="color: #00D4FF; margin-bottom: 8px;">Nuevo mensaje de contacto</h2>
          <p style="color: #8892A4; margin-bottom: 24px;">Desde tu portafolio</p>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p><strong style="color: #00D4FF;">Nombre:</strong> ${safeName}</p>
            <p style="margin-top: 8px;"><strong style="color: #00D4FF;">Email:</strong> <a href="mailto:${safeEmail}" style="color: #00D4FF;">${safeEmail}</a></p>
          </div>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 20px;">
            <p><strong style="color: #00D4FF;">Mensaje:</strong></p>
            <p style="margin-top: 8px; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
        </div>
      `,
      text: `Nuevo mensaje de ${name} <${email}>\n\n${message}`,
    });

    try {
      await sendMail({
        from: `"Daniel Molina" <${emailUser}>`,
        to: email,
        subject: 'Recibí tu mensaje — Daniel Molina',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0D1B2A; color: #E8EDF5; padding: 32px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
            <h2 style="color: #00D4FF; margin-bottom: 8px;">¡Hola, ${safeName}!</h2>
            <p style="line-height: 1.7;">Gracias por contactarme. He recibido tu mensaje y te responderé en menos de 24 horas.</p>
            <div style="background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.2); border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="color: #8892A4; font-style: italic;">"${safeMessage.slice(0, 200)}${message.length > 200 ? '...' : ''}"</p>
            </div>
            <p style="margin-top: 24px;">Saludos,<br/><strong>Daniel Eduardo Molina Carias</strong></p>
          </div>
        `,
        text: `Hola ${name},\n\nGracias por contactarme. Te responderé pronto.\n\nDaniel Molina`,
      });
    } catch (autoReplyError) {
      console.warn('[Contact] Auto-reply falló (el mensaje principal sí se envió):', autoReplyError);
    }

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente.',
    });
  } catch (error) {
    const info = getMailErrorInfo(error);
    console.error('[Contact] Error sending email:', info.code, info.message);

    resetTransporter();

    if (isAuthError(info.code)) {
      return res.status(503).json({
        success: false,
        message: 'Error de autenticación del correo. Revisa EMAIL_USER / EMAIL_PASS (o RESEND_API_KEY) en Render.',
        errorCode: info.code,
      });
    }

    // ETIMEDOUT / ECONNECTION = SMTP bloqueado en Render free
    const smtpBlocked = ['ETIMEDOUT', 'ECONNECTION', 'ESOCKET', 'ECONNREFUSED'].includes(info.code);

    return res.status(500).json({
      success: false,
      message: smtpBlocked
        ? 'Render bloquea SMTP de Gmail. Configura RESEND_API_KEY en Render (https://resend.com) o revisa EMAIL_PASS.'
        : `Error al enviar: ${info.message}`,
      errorCode: info.code,
    });
  }
});

export default router;
