// ============================================================
// Backend — Contact Route
// POST /api/contact → Zod validation → Nodemailer
// ============================================================
import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

// Zod schema
const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  message: z.string().min(10).max(2000),
});

// Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password de Gmail
  },
});

// POST /api/contact
router.post('/', contactLimiter, async (req: Request, res: Response) => {
  // 1. Validate
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: 'Datos inválidos',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, message } = parsed.data;

  try {
    // 2. Send email to Daniel
    await transporter.sendMail({
      from: `"Portafolio" <${process.env.EMAIL_USER}>`,
      to:   process.env.EMAIL_USER, // Daniel recibe el mensaje
      replyTo: email,
      subject: `📬 Nuevo mensaje de contacto — ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #0D1B2A; color: #E8EDF5; padding: 32px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
          <h2 style="color: #00D4FF; margin-bottom: 8px;">📬 Nuevo mensaje de contacto</h2>
          <p style="color: #8892A4; margin-bottom: 24px;">Desde tu portafolio danielmolina.dev</p>
          
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p><strong style="color: #00D4FF;">Nombre:</strong> ${name}</p>
            <p style="margin-top: 8px;"><strong style="color: #00D4FF;">Email:</strong> <a href="mailto:${email}" style="color: #00D4FF;">${email}</a></p>
          </div>
          
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 20px;">
            <p><strong style="color: #00D4FF;">Mensaje:</strong></p>
            <p style="margin-top: 8px; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="margin-top: 24px; color: #4A5568; font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
        </div>
      `,
    });

    // 3. Send auto-reply to the sender
    await transporter.sendMail({
      from: `"Daniel Molina" <${process.env.EMAIL_USER}>`,
      to:   email,
      subject: '✅ Recibí tu mensaje — Daniel Molina',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #0D1B2A; color: #E8EDF5; padding: 32px; border-radius: 12px; border: 1px solid rgba(0,212,255,0.2);">
          <h2 style="color: #00D4FF; margin-bottom: 8px;">¡Hola, ${name}! 👋</h2>
          <p style="color: #8892A4; margin-bottom: 24px;">Ingeniero en Ciencias de la Computación | Siguatepeque, Honduras</p>
          
          <p style="line-height: 1.7;">Gracias por contactarme. He recibido tu mensaje y te responderé en menos de 24 horas.</p>
          
          <div style="background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.2); border-radius: 8px; padding: 16px; margin: 24px 0;">
            <p style="color: #8892A4; font-style: italic;">"${message.slice(0, 200)}${message.length > 200 ? '...' : ''}"</p>
          </div>
          
          <p>Mientras tanto, puedes revisar mi trabajo en <a href="https://github.com/danielcrs0318" style="color: #00D4FF;">GitHub</a>.</p>
          
          <p style="margin-top: 24px;">Saludos,<br/><strong>Daniel Eduardo Molina Carias</strong></p>
          <p style="color: #4A5568; font-size: 12px; margin-top: 16px;">eduardocarias3003@gmail.com</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente.',
    });

  } catch (error) {
    console.error('[Contact] Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno al enviar el mensaje.',
    });
  }
});

export default router;
