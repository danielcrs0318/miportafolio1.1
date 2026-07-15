// ============================================================
// Portfolio Data — Daniel Eduardo Molina Carias
// ============================================================
import type { Project, SkillCategory, TimelineItem, Stat, Certification } from '../types';
import { Monitor, Rocket, Hourglass, Zap, Settings2, Database, Cpu, Server, Shield } from 'lucide-react';

// ── Projects ─────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: 'SprinFlow',
    description: 'Sistema de gestión de proyectos con metodología Kanban',
    longDescription:
      'Plataforma completa de gestión de proyectos que implementa la metodología Kanban con tiempo real via WebSockets. Incluye autenticación robusta, gestión de roles, sprints y un dashboard de métricas de productividad.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'TypeScript', 'Docker'],
    badge: 'Fullstack System',
    badgeColor: '#00D4FF',
    highlights: [
      'Tablero Kanban con drag & drop en tiempo real',
      'Autenticación JWT y sistema de roles',
      'Gestión de sprints y tareas con prioridades',
      'Dashboard con métricas de productividad',
      'WebSockets para actualizaciones en tiempo real',
    ],
    github: 'https://github.com/danielcrs0318',
  },
  {
    id: 2,
    title: 'AgroAI',
    description: 'Sistema inteligente de recomendaciones agrícolas con IA',
    longDescription:
      'Sistema de recomendaciones agrícolas que combina búsqueda semántica con embeddings vectoriales y modelos GPT de OpenAI. Incluye un panel de administración completo, auditoría de acciones y gestión multi-dispositivo de sesiones.',
    stack: ['React', 'Node.js', 'OpenAI API', 'Pinecone', 'PostgreSQL', 'TypeScript'],
    badge: 'AI-Powered System',
    badgeColor: '#7B2FBE',
    highlights: [
      'Embeddings vectoriales para búsqueda semántica (Pinecone)',
      'Integración con OpenAI GPT para recomendaciones inteligentes',
      'Login con reCAPTCHA v2/v3 para seguridad adicional',
      'Panel de administración completo',
      'Auditoría de acciones y log de actividad',
      'Gestión de sesiones multi-dispositivo',
    ],
    github: 'https://github.com/danielcrs0318',
  },
  {
    id: 3,
    title: 'MandadosExpress',
    description: 'Landing page para startup de delivery de mandados en Honduras',
    longDescription:
      'Landing page moderna y completamente responsive para una startup de delivery en Honduras. Diseño mobile-first con 12 secciones completas, paleta dark orange/black y animaciones de scroll suaves.',
    stack: ['React 18', 'MUI', 'Framer Motion', 'TypeScript'],
    badge: 'Landing Page | PYME',
    badgeColor: '#FF6B35',
    highlights: [
      '12 secciones completamente diseñadas',
      'Paleta de colores dark orange/black personalizada',
      'Diseño mobile-first 100% responsive',
      'Animaciones de scroll y hover con Framer Motion',
      'SEO optimizado',
    ],
    github: 'https://github.com/danielcrs0318',
  },
  {
    id: 4,
    title: 'Deco Floristería',
    description: 'Landing page elegante para floristería hondureña',
    longDescription:
      'Landing page elegante y femenina para una floristería en Honduras. Incluye galería de productos animada, formulario de contacto y CTA de WhatsApp, con un diseño floral cálido y personalizado.',
    stack: ['React 18', 'MUI', 'Framer Motion', 'TypeScript'],
    badge: 'Landing Page | PYME',
    badgeColor: '#E91E8C',
    highlights: [
      'Tema floral cálido completamente personalizado',
      'Galería de productos animada',
      'Formulario de contacto integrado',
      'CTA de WhatsApp directo',
      'Diseño elegante y moderno',
    ],
    github: 'https://github.com/danielcrs0318',
  },
  {
    id: 5,
    title: 'ShopNova',
    description: 'Tienda online fullstack con carrito, Stripe y panel admin',
    longDescription:
      'E-commerce completo construido con Next.js App Router, Prisma, NextAuth y Stripe. Incluye catálogo, detalle de producto, carrito, checkout, órdenes, direcciones, autenticación y panel de administración para productos, pedidos, envíos y categorías.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Stripe', 'Tailwind CSS'],
    badge: 'E-Commerce Fullstack',
    badgeColor: '#22C55E',
    highlights: [
      'Catálogo, carrito y checkout con Stripe',
      'Autenticación con NextAuth (login y registro)',
      'Panel admin: productos, pedidos, envíos y categorías',
      'Modelo de datos con Prisma (usuarios, órdenes, pagos)',
      'Notificaciones de venta y flujo logístico de pedidos',
    ],
    github: 'https://github.com/danielcrs0318/e-commerce-darwin',
  },
];

// ── Certifications ────────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: 'github-essentials',
    title: 'GitHub Essentials',
    issuer: 'GitHub',
    year: '2025',
    color: '#24292F',
  },
  {
    id: 'cisco-cybersecurity',
    title: 'Fundamentos de Ciberseguridad',
    issuer: 'Cisco',
    year: '2025',
    color: '#049FD9',
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
    title: 'Ingeniería en Ciencias de la Computación',
    institution: 'UNICAH — Universidad Católica de Honduras',
    description:
      'Formación completa en ingeniería de software, estructuras de datos, algoritmos, sistemas operativos y desarrollo de aplicaciones web y móviles.',
    type: 'education',
  },
  {
    year: '2026',
    title: 'Desarrollador Fullstack — Proyectos PYME',
    institution: 'Freelance',
    description:
      'Desarrollo de landing pages para PYMES hondureñas: MandadosExpress y Deco Floristería. Diseño, desarrollo e implementación completa.',
    type: 'experience',
  },
  {
    year: '2026',
    title: 'Sistemas con IA y Gestión de Proyectos',
    institution: 'Proyectos Universitarios / Personales',
    description:
      'Desarrollo de SprinFlow (Kanban fullstack) y AgroAI (sistema de recomendaciones con OpenAI + Pinecone). Implementación con Docker, Nginx y Traefik.',
    type: 'experience',
  },
  {
    year: '2026',
    title: 'Especialización en DevOps y Cloud',
    institution: 'Autodidacta',
    description:
      'Profundización en contenedorización con Docker, CI/CD con GitHub Actions y despliegue con Traefik + Let\'s Encrypt.',
    type: 'experience',
  },
];

// ── Stats ──────────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: 3,  suffix: '',  label: 'Sistemas Fullstack',  icon: Monitor },
  { value: 2,  suffix: '',  label: 'Landing Pages PYME',  icon: Rocket },
  { value: 1,  suffix: '+', label: 'Años de Experiencia', icon: Hourglass },
  { value: 12, suffix: '+', label: 'Tecnologías',         icon: Zap },
];

// ── Docker Compose snippet ─────────────────────────────────────
export const dockerComposeSnippet = `
services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
    environment:
      - VITE_API_URL=http://localhost:4000

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - EMAIL_USER=\${EMAIL_USER}
      - EMAIL_PASS=\${EMAIL_PASS}`;
