// ============================================================
// Portfolio Data — Daniel Eduardo Molina Carias
// ============================================================
import type { Project, SkillCategory, TimelineItem, Stat, Certification } from '../types';
import { Monitor, Rocket, Hourglass, Zap, Settings2, Database, Cpu, Server, Shield, GitPullRequest, ShieldCheck, Sparkles } from 'lucide-react';

// ── Projects ─────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 3,
    title: 'MandadosExpress',
    description: 'Landing page para startup de delivery de mandados en Honduras',
    longDescription:
      'Landing page moderna y completamente responsive para una startup de delivery en Honduras. Diseno mobile-first con 12 secciones completas, paleta dark orange/black y animaciones de scroll suaves.',
    stack: ['React 18', 'MUI', 'Framer Motion', 'TypeScript'],
    badge: 'Landing Page | PYME',
    badgeColor: '#3D8BFF',
    highlights: [
      '12 secciones completamente disenadas',
      'Paleta de colores dark orange/black personalizada',
      'Diseno mobile-first 100% responsive',
      'Animaciones de scroll y hover con Framer Motion',
      'SEO optimizado',
    ],
    github: 'https://github.com/danielcrs0318/landingmandaditos24-7',
    demo: 'https://landingmandaditos24-7.vercel.app',
    image: '/assets/previews/mandadosexpress.png',
  },
  {
    id: 4,
    title: 'Deco Floristeria',
    description: 'Landing page elegante para floristeria hondurena',
    longDescription:
      'Landing page elegante y femenina para una floristeria en Honduras. Incluye galeria de productos animada, formulario de contacto y CTA de WhatsApp, con un diseno floral calido y personalizado.',
    stack: ['React 18', 'MUI', 'Framer Motion', 'TypeScript'],
    badge: 'Landing Page | PYME',
    badgeColor: '#3D8BFF',
    highlights: [
      'Tema floral calido completamente personalizado',
      'Galeria de productos animada',
      'Formulario de contacto integrado',
      'CTA de WhatsApp directo',
      'Diseno elegante y moderno',
    ],
    github: 'https://github.com/danielcrs0318/landingDecoFloristeria',
    demo: 'https://landing-deco-floristeria.vercel.app/',
    image: '/assets/previews/deco-floristeria.png',
  },
  {
    id: 5,
    title: 'POS Honduras',
    description: 'Punto de venta web para retail: ventas, inventario, caja y facturacion',
    longDescription:
      'Sistema de punto de venta para retail en Honduras. Incluye ventas en mostrador, inventario, caja, clientes, proveedores, reportes, auditoria y facturacion fiscal CAI opcional, con soporte multi-sucursal.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'NestJS', 'Prisma', 'MySQL', 'Resend'],
    badge: 'Fullstack System | POS',
    badgeColor: '#3D8BFF',
    highlights: [
      'Ventas rapidas con codigo de barras y pagos mixtos',
      'Inventario, compras, clientes y proveedores',
      'Caja, reportes PDF y auditoria de acciones',
      'Facturacion fiscal CAI opcional (SAR)',
      'Multi-sucursal con roles (admin, cajero, supervisor)',
    ],
    github: 'https://github.com/danielcrs0318/puntodeventaweb',
    demo: 'https://puntodeventaweb-alpha.vercel.app/login',
    image: '/assets/previews/pos-honduras.png',
  },
];

// ── Certifications ────────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: 'github-essentials',
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    year: '2025',
    color: '#3D8BFF',
    icon: GitPullRequest,
    status: 'completed',
  },
  {
    id: 'cisco-cybersecurity',
    title: 'Fundamentos de Ciberseguridad',
    issuer: 'Cisco',
    year: '2025',
    color: '#3D8BFF',
    icon: ShieldCheck,
    status: 'completed',
  },
  {
    id: 'generative-ai-leader',
    title: 'Generative AI Leader',
    issuer: 'Google Cloud',
    year: '2026',
    color: '#3D8BFF',
    icon: Sparkles,
    status: 'in-progress',
  },
];

// ── Skills ────────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Monitor,
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Next.js' },
      { name: 'Vite' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'MUI' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Settings2,
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Python' },
      { name: 'REST APIs' },
      { name: 'JWT Auth' },
    ],
  },
  {
    id: 'databases',
    title: 'Bases de Datos',
    icon: Database,
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Prisma ORM' },
      { name: 'Pinecone' },
    ],
  },
  {
    id: 'ai',
    title: 'IA / ML',
    icon: Cpu,
    skills: [
      { name: 'OpenAI API' },
      { name: 'Embeddings' },
      { name: 'Pinecone' },
      { name: 'Prompt Engineering' },
      { name: 'Semantic Search' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: Server,
    skills: [
      { name: 'Docker' },
      { name: 'Docker Compose' },
      { name: 'Nginx' },
      { name: 'Traefik' },
      { name: 'GitHub Actions' },
    ],
  },
  {
    id: 'security',
    title: 'Seguridad',
    icon: Shield,
    skills: [
      { name: 'reCAPTCHA v2/v3' },
      { name: 'Helmet.js' },
      { name: 'JWT' },
      { name: 'Rate Limiting' },
      { name: 'CORS' },
    ],
  },
];

// ── Timeline ───────────────────────────────────────────────────
export const timeline: TimelineItem[] = [
  {
    year: '2022 – 2026',
    title: 'Ingenieria en Ciencias de la Computacion',
    institution: 'UNICAH — Universidad Catolica de Honduras',
    description:
      'Formacion completa en ingenieria de software, estructuras de datos, algoritmos, sistemas operativos y desarrollo de aplicaciones web y moviles.',
    type: 'education',
  },
  {
    year: '2026',
    title: 'Desarrollador Fullstack — Proyectos PYME',
    institution: 'Freelance',
    description:
      'Desarrollo de landing pages para PYMES hondurenas: MandadosExpress y Deco Floristeria. Diseno, desarrollo e implementacion completa.',
    type: 'experience',
  },
  {
    year: '2026',
    title: 'Sistema de punto de venta web',
    institution: 'Proyecto personal',
    description:
      'Desarrollo de POS Honduras para ventas, inventario, caja y facturacion con soporte multi-sucursal.',
    type: 'experience',
  },
  {
    year: '2026',
    title: 'Especializacion en DevOps y Cloud',
    institution: 'Autodidacta',
    description:
      'Profundizacion en contenedorizacion con Docker, CI/CD con GitHub Actions y despliegue con Traefik + Let\'s Encrypt.',
    type: 'experience',
  },
];

// ── Stats ──────────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: 1,  suffix: '',  label: 'Sistema Fullstack',  icon: Monitor },
  { value: 2,  suffix: '',  label: 'Landing Pages PYME',  icon: Rocket },
  { value: 1,  suffix: '+', label: 'Ano de experiencia', icon: Hourglass },
  { value: 12, suffix: '+', label: 'Tecnologias',         icon: Zap },
];
