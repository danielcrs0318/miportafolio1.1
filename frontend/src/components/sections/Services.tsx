// ============================================================
// Section — Services
// ============================================================
import { motion } from 'framer-motion';
import { Layout, Building2, Boxes, Wrench, type LucideIcon } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';
import { useLangStore } from '../../store/langStore';

interface Service {
  id: string;
  icon: LucideIcon;
  title: { es: string; en: string };
  description: { es: string; en: string };
  color: string;
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
    color: '#00D4FF',
  },
  {
    id: 'corporate',
    icon: Building2,
    title: { es: 'Páginas Web Corporativas', en: 'Corporate Websites' },
    description: {
      es: 'Sitios institucionales con identidad de marca, secciones claras y presencia profesional para tu empresa.',
      en: 'Institutional sites with brand identity, clear sections, and a professional presence for your business.',
    },
    color: '#8B5CF6',
  },
  {
    id: 'custom',
    icon: Boxes,
    title: { es: 'Sistemas a Medida', en: 'Custom Systems' },
    description: {
      es: 'Aplicaciones fullstack hechas a tu medida: paneles, e-commerce, autenticación, APIs y despliegue en producción.',
      en: 'Fullstack apps tailored to your needs: dashboards, e-commerce, auth, APIs, and production deployment.',
    },
    color: '#22C55E',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: { es: 'Mantenimiento y Actualización', en: 'Maintenance & Updates' },
    description: {
      es: 'Soporte continuo, mejoras, correcciones y actualización de tu sitio o sistema para que siga funcionando al día.',
      en: 'Ongoing support, improvements, fixes, and updates so your site or system stays current and reliable.',
    },
    color: '#FF6B35',
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
                style={{ '--service-color': service.color } as React.CSSProperties}
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
