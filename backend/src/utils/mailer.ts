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

export function assertEmailCredentials(): { user: string; pass: string } {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, '');

  if (!user || !pass) {
    throw new Error('EMAIL_USER y EMAIL_PASS deben estar configurados');
  }

  if (PLACEHOLDER_PASSWORDS.includes(pass.toLowerCase()) || pass.length < 16) {
    throw new Error(
      'EMAIL_PASS inválido. Usa un App Password de https://myaccount.google.com/apppasswords'
    );
  }

  return { user, pass };
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { user, pass } = assertEmailCredentials();

  const options: SMTPTransport.Options = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 30_000,
    greetingTimeout: 30_000,
    socketTimeout: 60_000,
  };

  transporter = nodemailer.createTransport(options);
  return transporter;
}

export function resetTransporter(): void {
  transporter = null;
}

export async function verifyEmailConfig(): Promise<void> {
  const transport = getTransporter();
  await transport.verify();
}
