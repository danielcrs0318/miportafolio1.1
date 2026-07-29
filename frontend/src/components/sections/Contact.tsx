// ============================================================
// Section — Contact
// ============================================================
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';
import { sendContactMessage, wakeBackend } from '../../lib/api';
import { useBackendWarmup } from '../../hooks/useBackendWarmup';
import { useThemeStore } from '../../store/themeStore';

const EASE = [0.22, 1, 0.36, 1] as const;

const contactSchema = z.object({
  name:    z.string().min(2,  'El nombre debe tener al menos 2 caracteres'),
  email:   z.string().email('Ingresa un correo electrónico válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const es = lang === 'es';
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { apiReady, waking } = useBackendWarmup(sectionRef);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onFocusField = () => { void wakeBackend(); };

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    if (!apiReady) {
      toast.message(
        es
          ? 'Despertando el servidor… esto puede tardar unos segundos.'
          : 'Waking up the server… this may take a few seconds.'
      );
    }

    try {
      const result = await sendContactMessage(data);
      if (!result.ok) {
        if (result.status === 429) {
          toast.error(es
            ? 'Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.'
            : 'Too many attempts. Wait 15 minutes and try again.');
          return;
        }
        if (result.status === 400) {
          toast.error(result.message);
          return;
        }
        if (result.waking) {
          toast.error(es
            ? 'El servidor está iniciando. Espera ~30 s e inténtalo de nuevo.'
            : 'The server is starting. Wait ~30s and try again.');
          return;
        }
        toast.error(result.message || (es ? 'Error al enviar.' : 'Failed to send.'));
        return;
      }
      toast.success(es ? 'Mensaje enviado. Te responderé pronto.' : 'Message sent. I will get back to you soon.');
      reset();
    } catch {
      toast.error(es ? 'Error al enviar. Inténtalo de nuevo.' : 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    { k: 'Email',    v: EMAIL,           url: `mailto:${EMAIL}`, external: false },
    { k: 'GitHub',   v: 'danielcrs0318', url: GITHUB_URL,        external: true },
    { k: 'LinkedIn', v: 'daniel-molina', url: LINKEDIN_URL,      external: true },
  ];

  const serverStatus = waking
    ? (es ? 'Conectando…' : 'Connecting…')
    : apiReady
      ? (es ? 'Servidor listo' : 'Server ready')
      : null;

  return (
    <section id="contact" className="band" ref={sectionRef}>
      <Toaster position="bottom-right" theme={theme === 'dark' ? 'dark' : 'light'} />
      <div className="shell">
        <SectionHeader
          title={es ? 'contact' : 'contact'}
          note={es
            ? 'Cuéntame qué necesitas construir. Respondo en menos de 24 horas.'
            : 'Tell me what you need to build. I reply within 24 hours.'}
        />

        <div className="contact__grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="contact__statement">
              {es
                ? '¿Tienes un proyecto en mente? Hablemos antes de escribir la primera línea.'
                : 'Have a project in mind? Let\'s talk before writing the first line.'}
            </p>

            <div className="channels">
              {channels.map(c => (
                <a
                  key={c.k}
                  href={c.url}
                  className="channel"
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                >
                  <span className="channel__k">{c.k}</span>
                  <span className="channel__v">{c.v}</span>
                  <ArrowUpRight size={14} strokeWidth={1.75} className="channel__go" aria-hidden="true" />
                </a>
              ))}
            </div>

            <p className="contact__status" aria-live="polite">
              {waking
                ? <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                : <i className="live-dot" aria-hidden="true" />}
              {serverStatus ?? (es ? 'Respuesta en menos de 24 h' : 'Reply within 24 h')}
            </p>
          </motion.div>

          <motion.form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            <div className="form__head">
              <h3 className="form__title">{es ? 'Enviar un mensaje' : 'Send a message'}</h3>
              <p className="form__hint">
                {es
                  ? 'Completa los campos y te responderé lo antes posible.'
                  : 'Fill in the fields and I will get back to you soon.'}
              </p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-name">{es ? 'Nombre' : 'Name'}</label>
              <input
                id="contact-name"
                {...register('name')}
                className={`field__input${errors.name ? ' field__input--err' : ''}`}
                placeholder={es ? 'Tu nombre completo' : 'Your full name'}
                autoComplete="name"
                onFocus={onFocusField}
              />
              {errors.name && <span className="field__err">{errors.name.message}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-email">{es ? 'Correo' : 'Email'}</label>
              <input
                id="contact-email"
                type="email"
                {...register('email')}
                className={`field__input${errors.email ? ' field__input--err' : ''}`}
                placeholder="tu@correo.com"
                autoComplete="email"
                onFocus={onFocusField}
              />
              {errors.email && <span className="field__err">{errors.email.message}</span>}
            </div>

            <input
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="field__honeypot"
            />

            <div className="field">
              <label className="field__label" htmlFor="contact-message">{es ? 'Mensaje' : 'Message'}</label>
              <textarea
                id="contact-message"
                {...register('message')}
                className={`field__input field__textarea${errors.message ? ' field__input--err' : ''}`}
                rows={5}
                placeholder={es
                  ? 'Cuéntame sobre tu proyecto, plazos y objetivos.'
                  : 'Tell me about your project, timeline, and goals.'}
                onFocus={onFocusField}
              />
              {errors.message && <span className="field__err">{errors.message.message}</span>}
            </div>

            <button type="submit" disabled={loading} className="btn btn--fill btn--wide" id="contact-submit">
              <span>
                {loading
                  ? (waking || !apiReady
                      ? (es ? 'Despertando servidor…' : 'Waking server…')
                      : (es ? 'Enviando…' : 'Sending…'))
                  : (es ? 'Enviar mensaje' : 'Send message')}
              </span>
              {loading
                ? <Loader2 size={15} className="animate-spin" />
                : <ArrowUpRight size={15} strokeWidth={1.75} />}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
