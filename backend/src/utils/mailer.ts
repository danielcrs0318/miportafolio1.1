import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

let transporter: Transporter | null = null;

const PLACEHOLDER_PASSWORDS = [
  'your_gmail_app_password_here',
  'tu_app_password_de_gmail',
  'tu-app-password',
  'changeme',
];

export type MailPayload = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
};

export function assertEmailCredentials(): { user: string; pass: string } {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, '');

  if (!user || !pass) {
    throw Object.assign(new Error('EMAIL_USER y EMAIL_PASS deben estar configurados en Render'), {
      code: 'EENVELOPE',
    });
  }

  if (PLACEHOLDER_PASSWORDS.includes(pass.toLowerCase()) || pass.length < 16) {
    throw Object.assign(
      new Error('EMAIL_PASS inválido. Usa un App Password de Google'),
      { code: 'EAUTH' }
    );
  }

  return { user, pass };
}

function createGmailTransport(port: 465 | 587): Transporter {
  const { user, pass } = assertEmailCredentials();

  const options: SMTPTransport.Options =
    port === 465
      ? {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user, pass },
          connectionTimeout: 25_000,
          greetingTimeout: 25_000,
          socketTimeout: 45_000,
        }
      : {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: { user, pass },
          connectionTimeout: 25_000,
          greetingTimeout: 25_000,
          socketTimeout: 45_000,
        };

  return nodemailer.createTransport(options);
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;
  // 587 suele funcionar mejor en hosts cloud que bloquean 465
  transporter = createGmailTransport(587);
  return transporter;
}

export function resetTransporter(): void {
  transporter = null;
}

export function hasResend(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getEmailProvider(): 'resend' | 'gmail' {
  return hasResend() ? 'resend' : 'gmail';
}

/** Envía correo por Resend (HTTPS) — recomendado en Render free */
async function sendWithResend(mail: MailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw Object.assign(new Error('RESEND_API_KEY no configurada'), { code: 'EENVELOPE' });

  const from =
    process.env.EMAIL_FROM?.trim() ||
    `Portafolio <${process.env.EMAIL_USER?.trim() || 'onboarding@resend.dev'}>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw Object.assign(
      new Error(`Resend HTTP ${res.status}: ${body.slice(0, 200)}`),
      { code: res.status === 401 || res.status === 403 ? 'EAUTH' : 'ECONNECTION' }
    );
  }
}

async function sendWithGmail(mail: MailPayload): Promise<void> {
  try {
    await getTransporter().sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  } catch (firstError) {
    // Reintento con puerto 465 si 587 falla
    console.warn('[Mailer] SMTP 587 falló, reintentando con 465…', firstError);
    resetTransporter();
    const alt = createGmailTransport(465);
    transporter = alt;
    await alt.sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  }
}

export async function sendMail(mail: MailPayload): Promise<void> {
  if (hasResend()) {
    await sendWithResend(mail);
    return;
  }
  await sendWithGmail(mail);
}

export async function verifyEmailConfig(): Promise<void> {
  if (hasResend()) return;
  await getTransporter().verify();
}

export function getMailErrorInfo(error: unknown): { code: string; message: string } {
  if (!error || typeof error !== 'object') {
    return { code: 'UNKNOWN', message: String(error) };
  }
  const err = error as { code?: string; message?: string; response?: string; responseCode?: number };
  const code = err.code || (err.responseCode ? `SMTP_${err.responseCode}` : 'UNKNOWN');
  const message = err.message || err.response || 'Error desconocido al enviar correo';
  return { code, message };
}
