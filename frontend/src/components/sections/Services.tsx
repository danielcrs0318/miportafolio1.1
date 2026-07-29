// ============================================================
// Section — Services
// ============================================================
import { motion } from 'framer-motion';
import { Layout, Building2, Boxes, Wrench, Container, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { useLangStore } from '../../store/langStore';

interface Service {
  id: string;
  icon: LucideIcon;
  title: { es: string; en: string };
  description: { es: string; en: string };
}

const services: Service[] = [
  {
    id: 'landings',
    icon: Layout,
    title: { es: 'Landing pages', en: 'Landing pages' },
    description: {
      es: 'Páginas rápidas y orientadas a conversión para lanzar un producto, una campaña o una startup.',
      en: 'Fast, conversion-focused pages to launch a product, campaign, or startup.',
    },
  },
  {
    id: 'corporate',
    icon: Building2,
    title: { es: 'Sitios corporativos', en: 'Corporate websites' },
    description: {
      es: 'Sitios institucionales con identidad de marca, arquitectura clara y SEO técnico.',
      en: 'Institutional sites with brand identity, clear architecture, and technical SEO.',
    },
  },
  {
    id: 'custom',
    icon: Boxes,
    title: { es: 'Sistemas a medida', en: 'Custom systems' },
    description: {
      es: 'Aplicaciones fullstack: paneles, e-commerce, autenticación, APIs y roles de usuario.',
      en: 'Fullstack apps: dashboards, e-commerce, authentication, APIs, and user roles.',
    },
  },
  {
    id: 'docker-deploy',
    icon: Container,
    title: { es: 'Despliegue en Linux', en: 'Linux deployment' },
    description: {
      es: 'Producción con Docker Compose, Nginx, Traefik con SSL y monitoreo en Portainer.io.',
      en: 'Production with Docker Compose, Nginx, Traefik with SSL, and Portainer.io monitoring.',
    },
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: { es: 'Mantenimiento', en: 'Maintenance' },
    description: {
      es: 'Soporte continuo, correcciones, rendimiento y nuevas funciones sobre proyectos en línea.',
      en: 'Ongoing support, fixes, performance work, and new features on live projects.',
    },
  },
];

export function Services() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="services" className="band">
      <div className="shell">
        <SectionHeader
          title={es ? 'services' : 'services'}
          note={es
            ? 'Formas concretas de trabajar juntos.'
            : 'Concrete ways we can work together.'}
        />

        <div className="ix">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                className="ix-row ix-row--trio"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ix-head">
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="ix-title">{service.title[lang]}</h3>
                </div>
                <p className="ix-desc">{service.description[lang]}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
