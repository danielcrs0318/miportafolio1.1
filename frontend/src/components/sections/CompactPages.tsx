import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Screen, ScreenBody } from '../ScreenMotion';
import { JourneyTerminal } from '../JourneyTerminal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { Certification } from '../../types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2, Terminal } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { certifications, projects, stats } from '../../lib/data';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';
import { sendContactMessage, wakeBackend } from '../../lib/api';
import { useLangStore } from '../../store/langStore';
import { useThemeStore } from '../../store/themeStore';

function ScreenHead({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  const reduced = usePrefersReducedMotion();
  return <motion.header className="screen-head" variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3 } } }}>
    <span className="screen-head__number">/ {number}</span>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </motion.header>;
}

const featuredWork = [
  {
    number: '01',
    title: { es: 'Sitios para negocios', en: 'Sites for businesses' },
    detail: { es: 'MandadosExpress y Deco Floristeria: experiencias claras, adaptadas a movil y con contacto directo.', en: 'MandadosExpress and Deco Floristeria: clear, mobile-ready experiences with direct contact.' },
    href: '/proyectos?ver=3',
    action: { es: 'Ver proyectos', en: 'View projects' },
  },
  {
    number: '02',
    title: { es: 'Sistemas de negocio', en: 'Business systems' },
    detail: { es: 'POS Honduras: ventas, inventario, caja y roles de usuario en una sola aplicacion.', en: 'POS Honduras: sales, inventory, cash management, and user roles in one application.' },
    href: '/proyectos?ver=5',
    action: { es: 'Ver el sistema', en: 'View the system' },
  },
  {
    number: '03',
    title: { es: 'Entrega a produccion', en: 'Production delivery' },
    detail: { es: 'Un proceso de integracion y despliegue con pruebas, contenedores, HTTPS y verificacion.', en: 'An integration and deployment process with tests, containers, HTTPS, and verification.' },
    href: '/devops',
    action: { es: 'Ver pipeline', en: 'View pipeline' },
  },
];

export function AboutScreen() {
  const es = useLangStore(state => state.lang === 'es');
  return <Screen className="screen screen--about">
    <ScreenHead number="01" title={es ? 'Sobre mi' : 'About me'} subtitle={es ? 'Ingenieria, producto y despliegue en una misma practica.' : 'Engineering, product, and deployment in one practice.'} />
    <ScreenBody className="screen-body about-screen">
      <div className="about-screen__profile">
        <div className="about-screen__story">
          <p className="screen-lead">{es ? 'Convierto problemas complejos en productos simples, utiles y listos para produccion.' : 'I turn complex problems into simple, useful products ready for production.'}</p>
          <p className="screen-copy">{es ? 'Soy Ingeniero en Ciencias de la Computacion de UNICAH. Trabajo desde Siguatepeque, Honduras, en interfaces, APIs, datos y servidores Linux.' : 'I am a Computer Science Engineer from UNICAH. Based in Siguatepeque, Honduras, I work across interfaces, APIs, data, and Linux servers.'}</p>
        </div>
        <div className="screen-stats">
          {stats.map(stat => <div key={stat.label}><strong>{stat.value}{stat.suffix}</strong><span>{es ? stat.label : stat.labelEn ?? stat.label}</span></div>)}
        </div>
      </div>
      <JourneyTerminal es={es} />
      <section className="about-screen__work" aria-labelledby="about-work-title">
        <div className="about-screen__work-heading">
          <h2 id="about-work-title">{es ? 'TRABAJO APLICADO' : 'WORK IN PRACTICE'}</h2>
          <p>{es ? 'Ejemplos concretos de lo que construyo y entrego.' : 'Concrete examples of what I build and deliver.'}</p>
        </div>
        <div className="about-screen__work-list">
          {featuredWork.map(item => <article className="about-screen__work-item" key={item.number}>
            <span className="about-screen__work-number">{item.number}</span>
            <h3>{es ? item.title.es : item.title.en}</h3>
            <p>{es ? item.detail.es : item.detail.en}</p>
            <Link to={item.href}>{es ? item.action.es : item.action.en} <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </article>)}
        </div>
      </section>
    </ScreenBody>
  </Screen>;
}

const services = [
  { title: { es: 'Landing pages', en: 'Landing pages' }, desc: { es: 'Paginas rapidas y orientadas a conversion para lanzar un producto, una campana o una startup.', en: 'Fast, conversion-focused pages to launch a product, campaign, or startup.' }, tech: 'React / TypeScript / SEO' },
  { title: { es: 'Sitios corporativos', en: 'Corporate websites' }, desc: { es: 'Sitios institucionales con identidad de marca, arquitectura clara y SEO tecnico.', en: 'Institutional sites with brand identity, clear architecture, and technical SEO.' }, tech: 'Diseno / Contenido / SEO' },
  { title: { es: 'Sistemas a medida', en: 'Custom systems' }, desc: { es: 'Aplicaciones fullstack con paneles, comercio, autenticacion, APIs y roles de usuario.', en: 'Fullstack apps with dashboards, commerce, authentication, APIs, and user roles.' }, tech: 'Frontend / API / Datos' },
  { title: { es: 'Despliegue en Linux', en: 'Linux deployment' }, desc: { es: 'Produccion con Docker Compose, Nginx, Traefik con SSL y monitoreo en Portainer.', en: 'Production with Docker Compose, Nginx, Traefik with SSL, and Portainer monitoring.' }, tech: 'Docker / Traefik / CI-CD' },
  { title: { es: 'Mantenimiento', en: 'Maintenance' }, desc: { es: 'Soporte continuo, correcciones, rendimiento y nuevas funciones sobre proyectos en linea.', en: 'Ongoing support, fixes, performance work, and new features on live projects.' }, tech: 'Soporte / Mejora continua' },
];

export function ServicesScreen() {
  const lang = useLangStore(state => state.lang);
  const reduced = usePrefersReducedMotion();
  return <Screen className="screen screen--services">
    <ScreenHead number="02" title={lang === 'es' ? 'Servicios' : 'Services'} subtitle={lang === 'es' ? 'Soluciones concretas para llevar una idea a produccion.' : 'Practical ways to bring an idea into production.'} />
    <ScreenBody className="screen-body service-screen">
      {services.map((service, index) => <motion.article className="service-card" key={service.title.en}
        variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3 } } }}>
        <span className="service-card__number">0{index + 1} / 0{services.length}</span>
        <h2>{service.title[lang]}</h2>
        <p>{service.desc[lang]}</p>
        <span className="service-card__tech">{service.tech}</span>
      </motion.article>)}
    </ScreenBody>
  </Screen>;
}

function CertificateLogo({ cert }: { cert: Certification }) {
  const [failed, setFailed] = useState(false);
  const Icon = cert.icon;
  return <div className={'cert-screen__logo' + (cert.issuer === 'Google Cloud' ? ' cert-screen__logo--wide' : '')}>
    {cert.logo && !failed ? <img src={cert.logo.src} alt={cert.logo.alt} onError={() => setFailed(true)} /> : <Icon size={32} strokeWidth={1.5} aria-label={cert.issuer} />}
  </div>;
}

export function CertificationsScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  return <Screen className="screen screen--certifications">
    <ScreenHead number="03" title={es ? 'Certificados' : 'Certificates'} subtitle={es ? 'Formacion continua en desarrollo, seguridad e IA.' : 'Continuous learning in development, security, and AI.'} />
    <ScreenBody className="screen-body cert-screen">
      {certifications.map((cert, index) => {
        return <motion.button type="button" className={'cert-screen__item' + (selected === index ? ' is-selected' : '')} key={cert.id}
          aria-pressed={selected === index} aria-label={`${cert.title}, ${cert.issuer}, ${cert.year}, ${cert.status === 'completed' ? (es ? 'Completado' : 'Completed') : (es ? 'En progreso' : 'In progress')}`}
          onClick={() => setSelected(value => value === index ? null : index)}
          whileTap={reduced ? undefined : { scale: 0.985 }}
          variants={{ hidden: { opacity: reduced ? 1 : 0 }, visible: { opacity: 1, transition: { duration: reduced ? 0 : 0.3 } } }}>
          <span className="cert-screen__index">0{index + 1}</span>
          <CertificateLogo cert={cert} />
          <div><h2>{cert.title}</h2><p>{cert.issuer} / {cert.year}</p></div>
          <span className="cert-screen__status">{cert.status === 'completed' ? (es ? 'Completado' : 'Completed') : (es ? 'En progreso' : 'In progress')}</span>
        </motion.button>;
      })}
    </ScreenBody>
  </Screen>;
}

export function ProjectsScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const reduced = usePrefersReducedMotion();
  const [params, setParams] = useSearchParams();
  const [visibleLine, setVisibleLine] = useState(0);
  const selectedId = Number(params.get('ver'));
  const project = projects.find(item => item.id === selectedId) ?? projects[0];
  const projectIndex = projects.findIndex(item => item.id === project.id);
  const step = reduced ? 3 : visibleLine;
  const changeProject = (offset: number) => {
    const next = projects[(projectIndex + offset + projects.length) % projects.length];
    setVisibleLine(0);
    setParams({ ver: String(next.id) }, { replace: true });
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!reduced && visibleLine < 3) {
        setVisibleLine(value => value + 1);
      } else {
        const index = projects.findIndex(item => item.id === project.id);
        setVisibleLine(0);
        setParams({ ver: String(projects[(index + 1) % projects.length].id) }, { replace: true });
      }
    }, !reduced && visibleLine < 3 ? 620 : 5400);
    return () => window.clearTimeout(timer);
  }, [project.id, reduced, setParams, visibleLine]);

  return <Screen className="screen screen--projects">
    <ScreenHead number="04" title={es ? 'Proyectos' : 'Projects'} subtitle={es ? 'Productos publicados y sistemas construidos de principio a fin.' : 'Published products and systems built end to end.'} />
    <ScreenBody className="screen-body projects-terminal-screen">
      <div className="project-terminal">
        <div className="devops-terminal__bar">
          <div className="devops-terminal__dots" aria-hidden="true"><i/><i/><i/></div>
          <span><Terminal size={14} aria-hidden="true"/> projects — zsh</span>
          <span className="devops-terminal__auto"><span aria-hidden="true" />AUTO</span>
        </div>
        <div className="project-terminal__body">
          <div className="project-terminal__command"><span>daniel@macbook ~/portfolio/projects %</span> ./showcase.sh --project={project.id}</div>
          <div className="project-terminal__sequence" aria-live="polite">
            <span className={step >= 1 ? 'is-visible' : ''}><b>›</b> {es ? 'Localizando proyecto' : 'Locating project'}: {project.title}</span>
            <span className={step >= 2 ? 'is-visible' : ''}><b>›</b> {es ? 'Cargando captura y recursos...' : 'Loading preview and assets...'}</span>
            <span className={step >= 3 ? 'is-visible' : ''}><b>✓</b> {es ? 'Vista previa lista.' : 'Preview ready.'}</span>
          </div>
          <div className="project-terminal__workspace">
            <div className="project-terminal__media">
              <motion.img key={project.id} src={project.image} alt={es ? 'Vista previa de ' + project.title : 'Preview of ' + project.title}
                initial={false} animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.985 }} transition={{ duration: reduced ? 0 : 0.35 }} />
              <span className="project-terminal__media-caption">preview/{project.id}.png</span>
            </div>
            <article className="project-terminal__detail" aria-live="polite">
              <span className="project-terminal__eyebrow">PROJECT {String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              <h2>{project.title}</h2>
              <p>{project.longDescription}</p>
              <div className="project-terminal__stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
              <div className="project-terminal__actions">
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{es ? 'Ver sitio' : 'Live site'} <ArrowUpRight size={15} /></a>}
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>}
              </div>
            </article>
          </div>
          <div className="project-terminal__footer">
            <div className="project-terminal__progress" role="progressbar" aria-label={es ? 'Progreso del proyecto' : 'Project loading progress'} aria-valuemin={0} aria-valuemax={3} aria-valuenow={step}><span style={{ transform: `scaleX(${step / 3})` }} /></div>
            <div className="project-terminal__controls">
              <span>{String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => changeProject(-1)} aria-label={es ? 'Proyecto anterior' : 'Previous project'}><ArrowLeft size={16} /></button>
              <button type="button" onClick={() => changeProject(1)} aria-label={es ? 'Proyecto siguiente' : 'Next project'}><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </ScreenBody>
  </Screen>;
}

const pipelineSteps = [
  { command: 'git push origin main', result: { es: 'Cambios enviados y versionados.', en: 'Changes pushed and versioned.' } },
  { command: 'gh workflow run deploy.yml', result: { es: 'Pruebas y compilacion completadas.', en: 'Tests and build completed.' } },
  { command: 'docker compose up -d --build', result: { es: 'Imagenes creadas y contenedores iniciados.', en: 'Images built and containers started.' } },
  { command: 'traefik check --configFile=traefik.yml', result: { es: 'HTTPS activo y trafico enrutado.', en: 'HTTPS active and traffic routed.' } },
  { command: 'docker ps --format "{{.Status}}"', result: { es: 'Servicios saludables y disponibles.', en: 'Services healthy and available.' } },
];
const pipelinePath = '~/portfolio';

export function DevOpsScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const [visibleCount, setVisibleCount] = useState(0);
  const lines = pipelineSteps.flatMap(stage => [
    { kind: 'command', text: stage.command },
    { kind: 'success', text: stage.result[es ? 'es' : 'en'] },
  ]);
  lines.push({ kind: 'success', text: es ? 'Pipeline completado. Servicios disponibles.' : 'Pipeline complete. Services available.' });
  const complete = visibleCount === lines.length;
  const progress = visibleCount / lines.length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisibleCount(count => count >= lines.length ? 0 : count + 1);
    }, complete ? 2400 : 620);
    return () => window.clearTimeout(timer);
  }, [complete, visibleCount, lines.length]);

  return <Screen className="screen screen--devops">
    <ScreenHead number="05" title="DevOps" subtitle={es ? 'Del repositorio al servidor, con un proceso claro y repetible.' : 'From repository to server with a clear, repeatable process.'} />
    <ScreenBody className="screen-body devops-screen">
      <div className="devops-terminal">
        <div className="devops-terminal__bar">
          <div className="devops-terminal__dots" aria-hidden="true"><i/><i/><i/></div>
          <span><Terminal size={14} aria-hidden="true"/> deploy — zsh</span>
          <span className="devops-terminal__auto"><span aria-hidden="true" />AUTO</span>
        </div>
        <div className="devops-terminal__output">
          <div className="devops-terminal__heading">
            <span className="devops-terminal__prompt"><span>daniel@macbook {pipelinePath} %</span> ./pipeline.sh --deploy</span>
            <span className={complete ? 'is-complete' : ''}>{complete ? (es ? 'FINALIZADO' : 'COMPLETE') : (es ? 'EN EJECUCION' : 'RUNNING')}</span>
          </div>
          <div className="devops-terminal__workspace">
            <div className="devops-terminal__log" aria-label={es ? 'Salida del pipeline' : 'Pipeline output'}>
              {lines.map((line, index) => <span key={index} className={`devops-terminal__line devops-terminal__line--${line.kind}${index < visibleCount ? ' is-visible' : ''}`} aria-hidden={index >= visibleCount}>
                {line.kind === 'command'
                  ? <><span className="devops-terminal__base-path">{pipelinePath} %</span> <span className="devops-terminal__command-text">{line.text}</span></>
                  : <><b aria-hidden="true">✓</b> {line.text}</>}
              </span>)}
            </div>
            <div className="devops-terminal__claude" role="img" aria-label={es ? 'Claude Code pixelado' : 'Pixelated Claude Code'}>
              <svg className="claude-code-sprite" viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
                <g fill="#D97757">
                  <path d="M6 4h20v5h3v6h-3v6H6v-6H3V9h3zM6 21h3v8H6zM11 21h3v8h-3zM19 21h3v8h-3zM24 21h3v8h-3z" />
                </g>
                <g className="claude-code-sprite__eyes" fill="#090d11">
                  <path d="M8 10h3v2h2v2h-2v2H8v-2h3v-2H8z" />
                  <path d="M8 10h3v2h2v2h-2v2H8v-2h3v-2H8z" transform="translate(32 0) scale(-1 1)" />
                </g>
              </svg>
            </div>
          </div>
          <div className="devops-terminal__footer">
            <div className="devops-terminal__progress" role="progressbar" aria-label={es ? 'Progreso del pipeline' : 'Pipeline progress'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
            <span className={'devops-terminal__ready' + (complete ? ' is-complete' : '')} aria-live="polite"><span aria-hidden="true"/> {complete ? (es ? 'Despliegue completado' : 'Deployment complete') : (es ? 'Despliegue automatico en curso' : 'Automatic deployment running')}</span>
          </div>
        </div>
      </div>
    </ScreenBody>
  </Screen>;
}

export function ContactScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const reduced = usePrefersReducedMotion();
  const theme = useThemeStore(state => state.theme);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || message.trim().length < 10) {
      toast.error(es ? 'Revisa tu nombre, correo y mensaje (minimo 10 caracteres).' : 'Check your name, email, and message (at least 10 characters).');
      return;
    }
    setLoading(true);
    try {
      const result = await sendContactMessage({ name: name.trim(), email: email.trim(), message: message.trim(), website });
      if (result.ok) {
        toast.success(es ? 'Mensaje enviado. Te respondere pronto.' : 'Message sent. I will get back to you soon.');
        setName(''); setEmail(''); setMessage(''); setWebsite('');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(es ? 'Error al enviar. Intentalo de nuevo.' : 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <Screen className="screen screen--contact">
    <Toaster position="bottom-right" theme={theme} />
    <ScreenHead number="06" title={es ? 'Contacto' : 'Contact'} subtitle={es ? 'Cuentame que necesitas construir. Respondo en menos de 24 horas.' : 'Tell me what you need to build. I reply within 24 hours.'} />
    <ScreenBody className="screen-body contact-screen">
      <motion.div className="contact-screen__intro" variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : .3 } } }}>
        <span className="contact-screen__availability"><span aria-hidden="true" />{es ? 'Disponible para nuevos proyectos' : 'Available for new projects'}</span>
        <p className="screen-lead">{es ? 'Hagamos que tu idea llegue a produccion.' : 'Let us bring your idea into production.'}</p>
        <div className="contact-screen__channels">
          <a href={'mailto:' + EMAIL}>Email <span>{EMAIL}</span><ArrowUpRight size={15} /></a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub <span>danielcrs0318</span><ArrowUpRight size={15} /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn <span>daniel-molina</span><ArrowUpRight size={15} /></a>
        </div>
        <button type="button" className="contact-screen__back" onClick={() => navigate('/proyectos')}>{es ? 'Ver proyectos' : 'View projects'} <ArrowUpRight size={15} /></button>
      </motion.div>
      <motion.form variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : .3, delay: reduced ? 0 : .05 } } }} aria-busy={loading} className="contact-screen__form" onSubmit={onSubmit} onFocus={() => { void wakeBackend(); }}>
        <label htmlFor="screen-name">{es ? 'Nombre' : 'Name'}<input id="screen-name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" required minLength={2} /></label>
        <label htmlFor="screen-email">{es ? 'Correo' : 'Email'}<input id="screen-email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" type="email" required /></label>
        <label htmlFor="screen-message">{es ? 'Mensaje' : 'Message'}<textarea id="screen-message" value={message} onChange={event => setMessage(event.target.value)} rows={4} required minLength={10} /></label>
        <input className="screen-honeypot" value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" disabled={loading}>{loading ? <Loader2 className="animate-spin" size={17} /> : null}{loading ? (es ? 'Enviando...' : 'Sending...') : (es ? 'Enviar mensaje' : 'Send message')} <ArrowUpRight size={16} /></button>
      </motion.form>
    </ScreenBody>
  </Screen>;
}
