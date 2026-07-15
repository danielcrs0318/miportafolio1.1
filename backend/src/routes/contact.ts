// ============================================================
// Backend — Contact Route
// POST /api/contact → Zod validation → Nodemailer
// ============================================================
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { contactLimiter } from '../middleware/rateLimiter';
import { escapeHtml } from '../utils/escapeHtml';
import { getTransporter, resetTransporter } from '../utils/mailer';

const router = Router();

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().optional(),
});

function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const err = error as { code?: string; responseCode?: number };
  return err.code === 'EAUTH' || err.responseCode === 535;
}

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
  const emailUser = process.env.EMAIL_USER!;
  const emailTo = process.env.EMAIL_TO?.trim() || emailUser;

  try {
    const transporter = getTransporter();

    // 1) Notificación al dueño — crítico
    await transporter.sendMail({
      from: `"Portafolio" <${emailUser}>`,
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

    // 2) Auto-reply — no crítico (no debe tumbar el envío)
    try {
      await transporter.sendMail({
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
            <p style="color: #4A5568; font-size: 12px; margin-top: 16px;">${escapeHtml(emailUser)}</p>
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
    console.error('[Contact] Error sending email:', error);

    if (isAuthError(error)) {
      resetTransporter();
      return res.status(503).json({
        success: false,
        message: 'Error de autenticación del correo. Revisa EMAIL_USER y EMAIL_PASS en Render.',
      });
    }

    resetTransporter();
    return res.status(500).json({
      success: false,
      message: 'Error interno al enviar el mensaje. Inténtalo de nuevo en unos segundos.',
    });
  }
});

export default router;
