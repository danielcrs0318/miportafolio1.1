// ============================================================
// Section — Contact
// Formulario real + react-hook-form + Zod + Sonner toast
// ============================================================
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Send, Mail, Loader2, GitBranch, Link2 } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(
            lang === 'es'
              ? 'Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.'
              : 'Too many attempts. Wait 15 minutes and try again.'
          );
          return;
        }
        if (res.status === 400 && body.message) {
          toast.error(body.message);
          return;
        }
        throw new Error('Server error');
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

  return (
    <section id="contact" className="section">
      <Toaster position="top-right" richColors />
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Contacto' : 'Contact'}
          subtitle={lang === 'es'
            ? '¿Tienes un proyecto en mente? Hablemos.'
            : 'Have a project in mind? Let\'s talk.'}
        />

        <div className="contact-grid">
          {/* Left — Social links */}
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

            {/* Response time */}
            <div className="contact-response-time">
              <span className="status-dot" />
              {lang === 'es'
                ? 'Respondo en menos de 24 horas'
                : 'I respond within 24 hours'}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Name */}
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
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            {/* Email */}
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
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            {/* Honeypot — oculto para usuarios, visible para bots */}
            <input
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
            />

            {/* Message */}
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
              />
              {errors.message && <span className="form-error">{errors.message.message}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
              id="contact-submit"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> {lang === 'es' ? 'Enviando...' : 'Sending...'}</>
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
