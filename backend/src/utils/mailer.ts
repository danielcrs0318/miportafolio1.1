import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

const PLACEHOLDER_PASSWORDS = [
  'your_gmail_app_password_here',
  'tu_app_password_de_gmail',
  'tu-app-password',
  'changeme',
];

export function assertEmailCredentials(): { user: string; pass: string } {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, '');

  if (!user || !pass) {
    throw new Error('EMAIL_USER y EMAIL_PASS deben estar configurados en backend/.env');
  }

  if (PLACEHOLDER_PASSWORDS.includes(pass.toLowerCase()) || pass.length < 16) {
    throw new Error(
      'EMAIL_PASS es un placeholder o inválido. Crea un App Password en https://myaccount.google.com/apppasswords y pégalo en backend/.env'
    );
  }

  return { user, pass };
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { user, pass } = assertEmailCredentials();

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  return transporter;
}

/** Fuerza recrear el transporter (útil tras cambiar .env en dev) */
export function resetTransporter(): void {
  transporter = null;
}

export async function verifyEmailConfig(): Promise<void> {
  const transport = getTransporter();
  await transport.verify();
}
