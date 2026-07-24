// ============================================================
// Section — Services
// ============================================================
import { motion } from 'framer-motion';
import { Layout, Building2, Boxes, Wrench, Container, type LucideIcon } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
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
    title: { es: 'Landing Pages', en: 'Landing Pages' },
    description: {
      es: 'Páginas de aterrizaje modernas, rápidas y orientadas a conversión para lanzar productos, campañas o startups.',
      en: 'Modern, fast, conversion-focused landing pages to launch products, campaigns, or startups.',
    },
  },
  {
    id: 'corporate',
    icon: Building2,
    title: { es: 'Páginas Web Corporativas', en: 'Corporate Websites' },
    description: {
      es: 'Sitios institucionales con identidad de marca, secciones claras y presencia profesional para tu empresa.',
      en: 'Institutional sites with brand identity, clear sections, and a professional presence for your business.',
    },
  },
  {
    id: 'custom',
    icon: Boxes,
    title: { es: 'Sistemas a Medida', en: 'Custom Systems' },
    description: {
      es: 'Aplicaciones fullstack hechas a tu medida: paneles, e-commerce, autenticación, APIs y despliegue en producción.',
      en: 'Fullstack apps tailored to your needs: dashboards, e-commerce, auth, APIs, and production deployment.',
    },
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: { es: 'Mantenimiento y Actualización', en: 'Maintenance & Updates' },
    description: {
      es: 'Soporte continuo, mejoras, correcciones y actualización de tu sitio o sistema para que siga funcionando al día.',
      en: 'Ongoing support, improvements, fixes, and updates so your site or system stays current and reliable.',
    },
  },
  {
    id: 'docker-deploy',
    icon: Container,
    title: {
      es: 'Implementación con Docker en servidores Linux',
      en: 'Docker Deployment on Linux Servers',
    },
    description: {
      es: 'Despliegue y orquestación en producción con Docker Compose, Nginx, Traefik (SSL/HTTPS) y monitoreo con Portainer.io en servidores Linux.',
      en: 'Production deployment and orchestration with Docker Compose, Nginx, Traefik (SSL/HTTPS), and Portainer.io monitoring on Linux servers.',
    },
  },
];

export function Services() {
  const { lang } = useLangStore();

  return (
    <section id="services" className="section section--alt">
      <div className="container">
        <SectionTitle
          title={lang === 'es' ? 'Servicios' : 'Services'}
          subtitle={lang === 'es'
            ? 'Soluciones digitales pensadas para tu negocio'
            : 'Digital solutions built for your business'}
        />

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="service-card-icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="service-card-title">{service.title[lang]}</h3>
                <p className="service-card-desc">{service.description[lang]}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
