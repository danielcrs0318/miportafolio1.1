export type MailPayload = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
};

function getResendApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw Object.assign(new Error('RESEND_API_KEY no está configurada'), {
      code: 'EENVELOPE',
    });
  }
  return apiKey;
}

function getFromAddress(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    'Portafolio <onboarding@resend.dev>'
  );
}

export function assertResendConfigured(): void {
  getResendApiKey();
  if (!process.env.EMAIL_TO?.trim()) {
    throw Object.assign(new Error('EMAIL_TO no está configurada'), {
      code: 'EENVELOPE',
    });
  }
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.EMAIL_TO?.trim());
}

/** Envía correo exclusivamente por Resend (HTTPS) */
export async function sendMail(mail: MailPayload): Promise<void> {
  const apiKey = getResendApiKey();
  const from = getFromAddress();

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
      new Error(`Resend HTTP ${res.status}: ${body.slice(0, 300)}`),
      { code: res.status === 401 || res.status === 403 ? 'EAUTH' : 'ECONNECTION' }
    );
  }
}

export function getMailErrorInfo(error: unknown): { code: string; message: string } {
  if (!error || typeof error !== 'object') {
    return { code: 'UNKNOWN', message: String(error) };
  }
  const err = error as { code?: string; message?: string };
  return {
    code: err.code || 'UNKNOWN',
    message: err.message || 'Error desconocido al enviar correo',
  };
}
