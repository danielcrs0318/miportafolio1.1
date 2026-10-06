import { useEffect, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Screen, ScreenBody } from '../ScreenMotion';
import { useContentMotion } from '../../hooks/useContentMotion';
import type { Certification } from '../../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Check, Loader2, Terminal } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { certifications, projects, skillCategories, stats, timeline } from '../../lib/data';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';
import { sendContactMessage, wakeBackend } from '../../lib/api';
import { useLangStore } from '../../store/langStore';
import { useThemeStore } from '../../store/themeStore';

function ScreenHead({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  const reduced = useReducedMotion();
  return <motion.header className="screen-head" variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3 } } }}>
    <span className="screen-head__number">/ {number}</span>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </motion.header>;
}

export function AboutScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const [selected, setSelected] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [mobileView, setMobileView] = useState<'profile' | 'journey'>('profile');
  const item = timeline[selected];
  const milestone = es ? item : item.en ?? item;
  const journeyMotion = useContentMotion(selected);
  const skillMotion = useContentMotion(selectedSkill);
  const paneMotion = useContentMotion(mobileView);
  const journeyPaneMotion = useContentMotion(mobileView);
  return <Screen className="screen screen--about">
    <ScreenHead number="01" title={es ? 'Sobre mi' : 'About me'} subtitle={es ? 'Ingenieria, producto y despliegue en una misma practica.' : 'Engineering, product, and deployment in one practice.'} />
    <div className="about-screen__switch" role="group" aria-label={es ? 'Ver seccion' : 'View section'}>
      <button type="button" className={mobileView === 'profile' ? 'is-active' : ''} onClick={() => setMobileView('profile')} aria-pressed={mobileView === 'profile'}>{es ? 'Perfil' : 'Profile'}</button>
      <button type="button" className={mobileView === 'journey' ? 'is-active' : ''} onClick={() => setMobileView('journey')} aria-pressed={mobileView === 'journey'}>{es ? 'Trayectoria' : 'Journey'}</button>
    </div>
    <ScreenBody className="screen-body about-screen">
      <div ref={paneMotion} className={'about-screen__profile' + (mobileView === 'journey' ? ' about-screen__mobile-hide' : '')}>
        <p className="screen-lead">{es ? 'Convierto problemas complejos en productos simples, utiles y listos para produccion.' : 'I turn complex problems into simple, useful products ready for production.'}</p>
        <p className="screen-copy">{es ? 'Soy Ingeniero en Ciencias de la Computacion de UNICAH. Trabajo desde Siguatepeque, Honduras, en interfaces, APIs, datos y servidores Linux.' : 'I am a Computer Science Engineer from UNICAH. Based in Siguatepeque, Honduras, I work across interfaces, APIs, data, and Linux servers.'}</p>
        <div className="screen-stats">
          {stats.map(stat => <div key={stat.label}><strong>{stat.value}{stat.suffix}</strong><span>{es ? stat.label : stat.labelEn ?? stat.label}</span></div>)}
        </div>
        <div className="screen-skills" aria-label={es ? 'Tecnologias' : 'Technologies'}>
          {skillCategories.map((category, index) => <button type="button" key={category.id} className={selectedSkill === index ? 'is-active' : ''} onClick={() => setSelectedSkill(index)} aria-pressed={selectedSkill === index}>{es ? category.title : category.titleEn ?? category.title}</button>)}
        </div>
        <p ref={skillMotion} className="screen-skill-detail">{skillCategories[selectedSkill].skills.map(skill => skill.name).join(' · ')}</p>
      </div>
      <div ref={journeyPaneMotion} className={'screen-feature' + (mobileView === 'profile' ? ' about-screen__mobile-hide' : '')}>
        <span className="screen-eyebrow">{es ? 'TRAYECTORIA' : 'JOURNEY'}</span>
        <div className="screen-options" role="group" aria-label={es ? 'Seleccionar etapa' : 'Select milestone'}>
          {timeline.map((entry, index) => <button type="button" key={entry.title} className={selected === index ? 'is-active' : ''} onClick={() => setSelected(index)} aria-pressed={selected === index}>{String(index + 1).padStart(2, '0')}</button>)}
        </div>
        <article ref={journeyMotion} className="screen-selected">
          <span className="screen-selected__meta">{item.year} / {milestone.institution}</span>
          <h2>{milestone.title}</h2>
          <p>{milestone.description}</p>
        </article>
      </div>
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
  const reduced = useReducedMotion();
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
  const reduced = useReducedMotion();
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
  const [params, setParams] = useSearchParams();
  const [showScope, setShowScope] = useState(false);
  const selectedId = Number(params.get('ver'));
  const project = projects.find(item => item.id === selectedId) ?? projects[0];
  const imageMotion = useContentMotion(project.id);
  const projectMotion = useContentMotion(`${project.id}-${showScope}`);
  const selectProject = (id: number) => { setParams({ ver: String(id) }); setShowScope(false); };
  return <Screen className="screen screen--projects">
    <ScreenHead number="04" title={es ? 'Proyectos' : 'Projects'} subtitle={es ? 'Productos publicados y sistemas construidos de principio a fin.' : 'Published products and systems built end to end.'} />
    <div className="project-picker" role="group" aria-label={es ? 'Seleccionar proyecto' : 'Select project'}>
      {projects.map((entry, index) => <button key={entry.id} type="button" onClick={() => selectProject(entry.id)} className={project.id === entry.id ? 'is-active' : ''} aria-pressed={project.id === entry.id}><span>0{index + 1}</span> {entry.title}</button>)}
    </div>
    <ScreenBody className={'screen-body project-screen' + (showScope ? ' project-screen--scope' : '')}>
      <div ref={imageMotion} className="project-screen__media">
        <img src={project.image} alt={es ? 'Vista previa de ' + project.title : 'Preview of ' + project.title} />
      </div>
      <article className="project-screen__detail">
        <div ref={projectMotion} className="project-screen__copy">
        <span className="screen-selected__meta">{project.badge}</span>
        <h2>{project.title}</h2>
        <p>{showScope ? project.highlights.join(' · ') : project.longDescription}</p>
        <div className="project-screen__stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
        </div>
        <div className="project-screen__actions">
          <button type="button" onClick={() => setShowScope(value => !value)}>{showScope ? (es ? 'Resumen' : 'Summary') : (es ? 'Alcance' : 'Scope')}</button>
          {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{es ? 'Ver sitio' : 'Live site'} <ArrowUpRight size={15} /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>}
        </div>
      </article>
    </ScreenBody>
  </Screen>;
}

const stages = [
  { name: 'GitHub', es: 'El codigo se versiona en GitHub. Cada cambio queda revisable y preparado para integrar.', en: 'Code is versioned on GitHub. Every change is reviewable and ready to integrate.', command: 'git push origin main', logs: { es: ['Conectando con el repositorio...', 'Cambios enviados y versionados.'], en: ['Connecting to repository...', 'Changes pushed and versioned.'] } },
  { name: 'Actions', es: 'GitHub Actions automatiza la integracion y prepara el despliegue sin pasos manuales repetidos.', en: 'GitHub Actions automates integration and prepares deployment without repeated manual steps.', command: 'gh workflow run deploy.yml', logs: { es: ['Ejecutando pruebas y compilacion...', 'Workflow completado sin errores.'], en: ['Running tests and build...', 'Workflow finished without errors.'] } },
  { name: 'Docker', es: 'Docker Compose empaqueta los servicios y mantiene entornos consistentes entre desarrollo y produccion.', en: 'Docker Compose packages services and keeps development and production environments consistent.', command: 'docker compose up -d --build', logs: { es: ['Creando imagenes y servicios...', 'Contenedores iniciados.'], en: ['Building images and services...', 'Containers started.'] } },
  { name: 'Traefik', es: 'Traefik y Nginx enrutan el trafico, gestionan HTTPS y publican las aplicaciones de forma segura.', en: 'Traefik and Nginx route traffic, manage HTTPS, and serve applications securely.', command: 'traefik check --configFile=traefik.yml', logs: { es: ['Verificando rutas y certificados...', 'HTTPS activo y trafico enrutado.'], en: ['Checking routes and certificates...', 'HTTPS active and traffic routed.'] } },
  { name: 'Portainer', es: 'Portainer permite observar contenedores, revisar su estado y mantener la operacion diaria.', en: 'Portainer makes it easy to observe containers, check health, and manage daily operations.', command: 'docker ps --format "{{.Status}}"', logs: { es: ['Consultando estado de contenedores...', 'Servicios saludables y disponibles.'], en: ['Checking container status...', 'Services healthy and available.'] } },
];

export function DevOpsScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const [selected, setSelected] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycleDone, setCycleDone] = useState(false);
  const stage = stages[selected];
  const detailMotion = useContentMotion(selected);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (cycleDone) {
        setSelected(0);
        setCompleted(0);
        setVisibleLines(0);
        setCycleDone(false);
      } else if (visibleLines < stage.logs.es.length) {
        setVisibleLines(lines => lines + 1);
      } else if (selected < stages.length - 1) {
        setCompleted(selected + 1);
        setSelected(index => index + 1);
        setVisibleLines(0);
      } else {
        setCompleted(stages.length);
        setCycleDone(true);
      }
    }, cycleDone ? 1800 : visibleLines === 0 ? 650 : visibleLines === 1 ? 700 : 950);
    return () => window.clearTimeout(timer);
  }, [cycleDone, selected, visibleLines, stage.logs.es.length]);

  const selectStage = (index: number) => {
    setSelected(index);
    setCompleted(index);
    setVisibleLines(0);
    setCycleDone(false);
  };
  const statusLabel = cycleDone ? (es ? 'Secuencia completada' : 'Sequence complete')
    : (es ? 'Simulacion en curso' : 'Simulation running');

  return <Screen className="screen screen--devops">
    <ScreenHead number="05" title="DevOps" subtitle={es ? 'Del repositorio al servidor, con un proceso claro y repetible.' : 'From repository to server with a clear, repeatable process.'} />
    <ScreenBody className="screen-body devops-screen">
      <div className="devops-terminal">
        <div className="devops-terminal__bar">
          <div className="devops-terminal__dots" aria-hidden="true"><i/><i/><i/></div>
          <span><Terminal size={14} aria-hidden="true"/> daniel@deploy:~</span>
          <span className="devops-terminal__auto"><span aria-hidden="true" />AUTO</span>
        </div>
        <div className="devops-terminal__workspace">
          <div className="devops-terminal__steps" role="group" aria-label={es ? 'Seleccionar etapa' : 'Select stage'}>
            <span className="devops-terminal__prompt">$ {es ? 'pipeline · 5 etapas' : 'pipeline · 5 stages'}</span>
            {stages.map((entry, index) => <button type="button" key={entry.name} className={(selected === index ? 'is-active ' : '') + (completed > index ? 'is-complete' : '')} onClick={() => selectStage(index)} aria-pressed={selected === index}>
              <span className="devops-terminal__step-index">0{index + 1}</span><span>{entry.name}</span>{completed > index && <Check size={14} aria-hidden="true"/>}
            </button>)}
            <div className="devops-terminal__progress" aria-hidden="true">{stages.map((entry, index) => <span key={entry.name} className={completed > index ? 'is-complete' : selected === index ? 'is-current' : ''} />)}</div>
          </div>
          <div ref={detailMotion} className="devops-terminal__output">
            <span className="devops-terminal__prompt">$ ./pipeline.sh --stage=0{selected + 1}</span>
            <span className="devops-terminal__phase">[{es ? 'ETAPA' : 'STAGE'} 0{selected + 1}/0{stages.length}]</span>
            <h2 aria-live="polite">{stage.name}</h2>
            <p>{es ? stage.es : stage.en}</p>
            <code>&gt; {stage.command}</code>
            <div className="devops-terminal__log" aria-label={es ? 'Salida de la simulacion' : 'Simulation output'}>
              {stage.logs[es ? 'es' : 'en'].slice(0, visibleLines).map((line, index) => <span key={index}><b>{index === 0 ? '›' : '✓'}</b> {line}</span>)}
            </div>
            <span className="devops-terminal__ready" aria-live="polite"><span aria-hidden="true"/> {statusLabel}</span>
          </div>
        </div>
      </div>
    </ScreenBody>
  </Screen>;
}

export function ContactScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const reduced = useReducedMotion();
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
