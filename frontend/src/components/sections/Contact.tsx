// ============================================================
// Section — Contact
// Formulario + warmup Render free tier + reintentos
// ============================================================
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Send, Mail, Loader2, GitBranch, Link2 } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';
import { sendContactMessage, wakeBackend } from '../../lib/api';
import { useBackendWarmup } from '../../hooks/useBackendWarmup';

const contactSchema = z.object({
  name:    z.string().min(2,  'El nombre debe tener al menos 2 caracteres'),
  email:   z.string().email('Ingresa un correo electrónico válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { lang } = useLangStore();
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { apiReady, waking } = useBackendWarmup(sectionRef);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onFocusField = () => {
    // Refuerza el wakeup al empezar a escribir
    void wakeBackend();
  };

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    if (!apiReady) {
      toast.message(
        lang === 'es'
          ? 'Despertando el servidor… esto puede tardar unos segundos.'
          : 'Waking up the server… this may take a few seconds.'
      );
    }

    try {
      const result = await sendContactMessage(data);

      if (!result.ok) {
        if (result.status === 429) {
          toast.error(
            lang === 'es'
              ? 'Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.'
              : 'Too many attempts. Wait 15 minutes and try again.'
          );
          return;
        }
        if (result.status === 400) {
          toast.error(result.message);
          return;
        }
        if (result.waking) {
          toast.error(
            lang === 'es'
              ? 'El servidor está iniciando. Espera ~30 s e inténtalo de nuevo.'
              : 'The server is starting. Wait ~30s and try again.'
          );
          return;
        }
        toast.error(
          lang === 'es'
            ? (result.message || 'Error al enviar. Inténtalo de nuevo.')
            : (result.message || 'Failed to send. Please try again.')
        );
        return;
      }

      toast.success(
        lang === 'es'
          ? 'Mensaje enviado. Te responderé pronto.'
          : 'Message sent. I will get back to you soon.'
      );
      reset();
    } catch {
      toast.error(
        lang === 'es'
          ? 'Error al enviar. Inténtalo de nuevo.'
          : 'Failed to send. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { name: 'GitHub',   url: GITHUB_URL,   icon: <GitBranch size={22} aria-hidden="true" />, label: 'danielcrs0318' },
    { name: 'LinkedIn', url: LINKEDIN_URL, icon: <Link2 size={22} aria-hidden="true" />, label: 'daniel-molina' },
    { name: 'Email',    url: `mailto:${EMAIL}`, icon: <Mail size={22} aria-hidden="true" />, label: EMAIL },
  ];

  const statusLabel = waking
    ? (lang === 'es' ? 'Conectando con el servidor…' : 'Connecting to server…')
    : apiReady
      ? (lang === 'es' ? 'Servidor listo' : 'Server ready')
      : null;

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <Toaster position="top-right" richColors />
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Contacto' : 'Contact'}
          subtitle={lang === 'es'
            ? '¿Tienes un proyecto en mente? Hablemos.'
            : 'Have a project in mind? Let\'s talk.'}
        />

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-info-title">
              {lang === 'es' ? 'Conectemos' : "Let's Connect"}
            </h3>
            <p className="contact-info-text">
              {lang === 'es'
                ? 'Estoy disponible para proyectos freelance, posiciones full-time o simplemente para charlar sobre tecnología. ¡No dudes en escribirme!'
                : "I'm available for freelance projects, full-time positions, or just to chat about tech. Feel free to reach out!"}
            </p>

            <div className="contact-socials">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.name !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label={s.name}
                >
                  <span className="contact-social-icon">{s.icon}</span>
                  <span className="contact-social-label">{s.label}</span>
                </a>
              ))}
            </div>

            <div className="contact-response-time">
              <span className="status-dot" />
              {lang === 'es'
                ? 'Respondo en menos de 24 horas'
                : 'I respond within 24 hours'}
            </div>

            {statusLabel && (
              <p
                className="contact-api-status"
                style={{
                  marginTop: '0.75rem',
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                aria-live="polite"
              >
                {waking && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
                {statusLabel}
              </p>
            )}
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">
                {lang === 'es' ? 'Nombre' : 'Name'}
              </label>
              <input
                id="contact-name"
                {...register('name')}
                className="form-input"
                placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                autoComplete="name"
                onFocus={onFocusField}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">
                {lang === 'es' ? 'Correo Electrónico' : 'Email'}
              </label>
              <input
                id="contact-email"
                type="email"
                {...register('email')}
                className="form-input"
                placeholder={lang === 'es' ? 'tu@correo.com' : 'your@email.com'}
                autoComplete="email"
                onFocus={onFocusField}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <input
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
            />

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">
                {lang === 'es' ? 'Mensaje' : 'Message'}
              </label>
              <textarea
                id="contact-message"
                {...register('message')}
                className="form-input form-textarea"
                rows={5}
                placeholder={lang === 'es'
                  ? 'Cuéntame sobre tu proyecto...'
                  : 'Tell me about your project...'}
                onFocus={onFocusField}
              />
              {errors.message && <span className="form-error">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
              id="contact-submit"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> {
                  waking || !apiReady
                    ? (lang === 'es' ? 'Despertando servidor…' : 'Waking server…')
                    : (lang === 'es' ? 'Enviando...' : 'Sending...')
                }</>
              ) : (
                <><Send size={18} /> {lang === 'es' ? 'Enviar Mensaje' : 'Send Message'}</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
