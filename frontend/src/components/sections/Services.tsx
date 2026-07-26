// ============================================================
// Section — Servicios
// Índice numerado: qué hago y con qué se entrega
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
  stack: string[];
}

const services: Service[] = [
  {
    id: 'landings',
    icon: Layout,
    title: { es: 'Landing pages', en: 'Landing pages' },
    description: {
      es: 'Páginas de aterrizaje rápidas y orientadas a conversión para lanzar un producto, una campaña o una startup.',
      en: 'Fast, conversion-focused landing pages to launch a product, a campaign, or a startup.',
    },
    stack: ['React', 'Vite', 'Framer Motion'],
  },
  {
    id: 'corporate',
    icon: Building2,
    title: { es: 'Sitios corporativos', en: 'Corporate websites' },
    description: {
      es: 'Sitios institucionales con identidad de marca, arquitectura de contenido clara y SEO técnico bien resuelto.',
      en: 'Institutional sites with brand identity, clear content architecture, and solid technical SEO.',
    },
    stack: ['Next.js', 'SEO', 'CMS'],
  },
  {
    id: 'custom',
    icon: Boxes,
    title: { es: 'Sistemas a medida', en: 'Custom systems' },
    description: {
      es: 'Aplicaciones fullstack completas: paneles, e-commerce, autenticación, APIs, reportes y roles de usuario.',
      en: 'Complete fullstack applications: dashboards, e-commerce, authentication, APIs, reporting, and user roles.',
    },
    stack: ['Node.js', 'PostgreSQL', 'Prisma'],
  },
  {
    id: 'docker-deploy',
    icon: Container,
    title: { es: 'Despliegue en servidores Linux', en: 'Linux server deployment' },
    description: {
      es: 'Puesta en producción con Docker Compose, Nginx como proxy, Traefik con SSL automático y monitoreo en Portainer.io.',
      en: 'Production setup with Docker Compose, Nginx as proxy, Traefik with automatic SSL, and Portainer.io monitoring.',
    },
    stack: ['Docker', 'Traefik', 'Portainer'],
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: { es: 'Mantenimiento y evolución', en: 'Maintenance & evolution' },
    description: {
      es: 'Soporte continuo, correcciones, mejoras de rendimiento y nuevas funciones sobre proyectos que ya están en línea.',
      en: 'Ongoing support, fixes, performance work, and new features on projects that are already live.',
    },
    stack: ['Soporte', 'Performance', 'Auditoría'],
  },
];

export function Services() {
  const { lang } = useLangStore();
  const es = lang === 'es';

  return (
    <section id="services" className="band band--tint">
      <div className="shell">
        <SectionHeader
          index="02"
          title={es ? 'Servicios' : 'Services'}
          note={es
            ? 'Cinco formas concretas de trabajar juntos, de una landing simple a una infraestructura completa.'
            : 'Five concrete ways to work together, from a simple landing page to full infrastructure.'}
        />

        <div className="ix">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                className="ix-row ix-row--trio"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="ix-num">{String(i + 1).padStart(2, '0')}</span>

                <div>
                  <div className="ix-head">
                    <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="ix-title">{service.title[lang]}</h3>
                  </div>
                </div>

                <div>
                  <p className="ix-desc">{service.description[lang]}</p>
                  <div className="ix-tags">
                    {service.stack.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
