import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Screen, ScreenBody } from '../ScreenMotion';
import { JourneyTerminal } from '../JourneyTerminal';
import type { Certification } from '../../types';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Award, Building2, Folder, Layers3, Loader2, Mail, PanelsTopLeft, Rocket, Server, Terminal, UserRound, Wrench, X, type LucideIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { certifications, projects } from '../../lib/data';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';
import { sendContactMessage, wakeBackend } from '../../lib/api';
import { useLangStore } from '../../store/langStore';
import { useThemeStore } from '../../store/themeStore';
import avatar from '/assets/fotoperfilCV.jpeg';

function ScreenHead({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  const icons: Record<string, LucideIcon> = { '01': UserRound, '02': Layers3, '03': Award, '04': Folder, '05': Terminal, '06': Mail };
  const Icon = icons[number] ?? Folder;
  return <header className="screen-head">
    <span className={`screen-head__app-icon screen-head__app-icon--${number}`} aria-hidden="true"><Icon size={25} strokeWidth={1.8} /></span>
    <div className="screen-head__copy">
      <span className="screen-head__number">PORTFOLIO / {number}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  </header>;
}

type FinderOption = { id: string; label: string; icon: LucideIcon };

function FinderSidebar({ title, options, selected, onSelect }: { title: string; options: FinderOption[]; selected: string; onSelect: (id: string) => void }) {
  return <aside className="mac-finder__sidebar" aria-label={title}>
    <h2>{title}</h2>
    {options.map(option => <button key={option.id} type="button" className={selected === option.id ? 'is-active' : ''} onClick={() => onSelect(option.id)} aria-pressed={selected === option.id}>
      <option.icon size={15} strokeWidth={1.9} aria-hidden="true" />{option.label}
    </button>)}
  </aside>;
}

function FinderQuickLook({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return <div className="mac-quicklook" onPointerDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="mac-quicklook__card" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="mac-quicklook__close" onClick={onClose} aria-label="Cerrar" autoFocus><X size={16} /></button>
      {children}
    </section>
  </div>;
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
        <div className="mac-about__head"><img className="mac-about__avatar" src={avatar} alt="Retrato de Daniel Molina" width="828" height="1149" decoding="async" /><div className="mac-about__identity"><h2>Daniel <span>Molina</span></h2><p>{es ? 'Ingeniero en Ciencias de la Computacion · Fullstack, IA y DevOps' : 'Computer Science Engineer · Fullstack, AI and DevOps'}</p></div></div>
        <div className="about-screen__story">
          <p className="screen-lead">{es ? 'Convierto problemas complejos en productos simples, utiles y listos para produccion.' : 'I turn complex problems into simple, useful products ready for production.'}</p>
          <p className="screen-copy">{es ? 'Soy Ingeniero en Ciencias de la Computacion de UNICAH. Trabajo desde Siguatepeque, Honduras, en interfaces, APIs, datos y servidores Linux.' : 'I am a Computer Science Engineer from UNICAH. Based in Siguatepeque, Honduras, I work across interfaces, APIs, data, and Linux servers.'}</p>
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
  { category: 'web', icon: Rocket, title: { es: 'Landing pages', en: 'Landing pages' }, desc: { es: 'Paginas rapidas y orientadas a conversion para lanzar un producto, una campana o una startup.', en: 'Fast, conversion-focused pages to launch a product, campaign, or startup.' }, tech: 'React / TypeScript / SEO' },
  { category: 'web', icon: Building2, title: { es: 'Sitios corporativos', en: 'Corporate websites' }, desc: { es: 'Sitios institucionales con identidad de marca, arquitectura clara y SEO tecnico.', en: 'Institutional sites with brand identity, clear architecture, and technical SEO.' }, tech: 'Diseno / Contenido / SEO' },
  { category: 'systems', icon: PanelsTopLeft, title: { es: 'Sistemas a medida', en: 'Custom systems' }, desc: { es: 'Aplicaciones fullstack con paneles, comercio, autenticacion, APIs y roles de usuario.', en: 'Fullstack apps with dashboards, commerce, authentication, APIs, and user roles.' }, tech: 'Frontend / API / Datos' },
  { category: 'infra', icon: Server, title: { es: 'Despliegue en Linux', en: 'Linux deployment' }, desc: { es: 'Produccion con Docker Compose, Nginx, Traefik con SSL y monitoreo en Portainer.', en: 'Production with Docker Compose, Nginx, Traefik with SSL, and Portainer monitoring.' }, tech: 'Docker / Traefik / CI-CD' },
  { category: 'infra', icon: Wrench, title: { es: 'Mantenimiento', en: 'Maintenance' }, desc: { es: 'Soporte continuo, correcciones, rendimiento y nuevas funciones sobre proyectos en linea.', en: 'Ongoing support, fixes, performance work, and new features on live projects.' }, tech: 'Soporte / Mejora continua' },
];

export function ServicesScreen() {
  const lang = useLangStore(state => state.lang);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<(typeof services)[number] | null>(null);
  const options: FinderOption[] = [
    { id: 'all', label: lang === 'es' ? 'Todos' : 'All', icon: Layers3 },
    { id: 'web', label: 'Web', icon: Rocket },
    { id: 'systems', label: lang === 'es' ? 'Sistemas' : 'Systems', icon: PanelsTopLeft },
    { id: 'infra', label: lang === 'es' ? 'Infraestructura' : 'Infrastructure', icon: Server },
  ];
  return <Screen className="screen screen--services">
    <ScreenHead number="02" title={lang === 'es' ? 'Servicios' : 'Services'} subtitle={lang === 'es' ? 'Soluciones concretas para llevar una idea a produccion.' : 'Practical ways to bring an idea into production.'} />
    <ScreenBody className="screen-body service-screen mac-finder">
      <FinderSidebar title={lang === 'es' ? 'Favoritos' : 'Favorites'} options={options} selected={filter} onSelect={setFilter} />
      <div className="mac-finder__main">
        <div className="mac-finder__grid mac-finder__grid--services">
          {services.filter(service => filter === 'all' || service.category === filter).map(service => <button type="button" className="service-card mac-finder__tile" key={service.title.en} onClick={() => setSelected(service)}>
            <span className="service-card__icon" aria-hidden="true"><service.icon size={29} strokeWidth={1.7} /></span>
            <h2>{service.title[lang]}</h2>
            <p>{service.desc[lang]}</p>
            <span className="service-card__tech">{service.tech}</span>
          </button>)}
        </div>
        {selected && <FinderQuickLook title={selected.title[lang]} onClose={() => setSelected(null)}>
          <div className="mac-quicklook__hero mac-quicklook__hero--service"><selected.icon size={45} strokeWidth={1.6} /></div>
          <div className="mac-quicklook__content"><h2>{selected.title[lang]}</h2><p>{selected.desc[lang]}</p><div className="mac-quicklook__chips">{selected.tech.split(' / ').map(tech => <span key={tech}>{tech}</span>)}</div><Link to="/contacto" className="mac-quicklook__primary">{lang === 'es' ? 'Hablemos de tu proyecto' : 'Discuss your project'} <ArrowUpRight size={15} /></Link></div>
        </FinderQuickLook>}
      </div>
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
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const active = certifications.find(cert => cert.id === selected);
  const options: FinderOption[] = [
    { id: 'all', label: es ? 'Todos' : 'All', icon: Award },
    { id: 'completed', label: es ? 'Completados' : 'Completed', icon: Folder },
    { id: 'in-progress', label: es ? 'En progreso' : 'In progress', icon: Rocket },
  ];
  return <Screen className="screen screen--certifications">
    <ScreenHead number="03" title={es ? 'Certificados' : 'Certificates'} subtitle={es ? 'Formacion continua en desarrollo, seguridad e IA.' : 'Continuous learning in development, security, and AI.'} />
    <ScreenBody className="screen-body cert-screen mac-finder">
      <FinderSidebar title={es ? 'Favoritos' : 'Favorites'} options={options} selected={filter} onSelect={setFilter} />
      <div className="mac-finder__main">
        <div className="mac-finder__grid mac-finder__grid--certs">
          {certifications.filter(cert => filter === 'all' || cert.status === filter).map(cert => <button type="button" className="cert-screen__item mac-finder__tile" key={cert.id}
            onClick={() => setSelected(cert.id)} aria-label={`${cert.title}, ${cert.issuer}, ${cert.year}, ${cert.status === 'completed' ? (es ? 'Completado' : 'Completed') : (es ? 'En progreso' : 'In progress')}`}>
            <CertificateLogo cert={cert} />
            <h2>{cert.title}</h2>
            <p>{cert.issuer} / {cert.year}</p>
            <span className="cert-screen__status">{cert.status === 'completed' ? (es ? 'Completado' : 'Completed') : (es ? 'En progreso' : 'In progress')}</span>
          </button>)}
        </div>
        {active && <FinderQuickLook title={active.title} onClose={() => setSelected(null)}>
          <div className="mac-quicklook__hero mac-quicklook__hero--cert"><CertificateLogo cert={active} /></div>
          <div className="mac-quicklook__content"><h2>{active.title}</h2><p>{active.issuer} · {active.year}</p><div className="mac-quicklook__chips"><span>{active.status === 'completed' ? (es ? 'Completado' : 'Completed') : (es ? 'En progreso' : 'In progress')}</span></div></div>
        </FinderQuickLook>}
      </div>
    </ScreenBody>
  </Screen>;
}

export function ProjectsScreen() {
  const es = useLangStore(state => state.lang === 'es');
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const selectedId = Number(params.get('ver'));
  const selected = projects.find(item => item.id === selectedId);
  const closeLook = () => setParams({}, { replace: true });
  const options: FinderOption[] = [
    { id: 'all', label: es ? 'Todos' : 'All', icon: Layers3 },
    { id: 'landing', label: 'Landing pages', icon: PanelsTopLeft },
    { id: 'system', label: es ? 'Sistemas' : 'Systems', icon: Server },
  ];

  return <Screen className="screen screen--projects">
    <ScreenHead number="04" title={es ? 'Proyectos' : 'Projects'} subtitle={es ? 'Productos publicados y sistemas construidos de principio a fin.' : 'Published products and systems built end to end.'} />
    <ScreenBody className="screen-body projects-finder-screen mac-finder">
      <FinderSidebar title={es ? 'Favoritos' : 'Favorites'} options={options} selected={filter} onSelect={setFilter} />
      <div className="mac-finder__main">
        <div className="mac-finder__grid mac-finder__grid--projects">
          {projects.filter(project => filter === 'all' || (filter === 'landing' ? project.id !== 5 : project.id === 5)).map(project => <button type="button" className="mac-finder__tile mac-project-tile" key={project.id} onClick={() => setParams({ ver: String(project.id) }, { replace: true })}>
            <span className="mac-project-tile__thumb"><img src={project.image} alt="" loading="lazy" /></span>
            <strong>{project.title}</strong><small>{project.badge}</small>
          </button>)}
        </div>
        {selected && <FinderQuickLook title={selected.title} onClose={closeLook}>
          <div className="mac-quicklook__hero mac-quicklook__hero--project"><img src={selected.image} alt={es ? `Vista previa de ${selected.title}` : `Preview of ${selected.title}`} /></div>
          <div className="mac-quicklook__content"><h2>{selected.title}</h2><p>{selected.longDescription}</p>
            <div className="mac-quicklook__chips">{selected.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
            <div className="mac-quicklook__actions">{selected.demo && <a className="mac-quicklook__primary" href={selected.demo} target="_blank" rel="noopener noreferrer">{es ? 'Ver proyecto' : 'View project'} <ArrowUpRight size={15} /></a>}{selected.github && <a href={selected.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>}<button type="button" onClick={closeLook}>{es ? 'Cerrar' : 'Close'}</button></div>
          </div>
        </FinderQuickLook>}
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
            <div className="devops-terminal__ubuntu"><img src="/assets/brands/ubuntu-pixel.png" alt={es ? 'Logo de Ubuntu pixelado con su nombre' : 'Pixelated Ubuntu logo and wordmark'} width="1254" height="1254" decoding="async" /></div>
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
  const theme = useThemeStore(state => state.theme);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || message.trim().length < 10) {
      toast.error(es ? 'Revisa tu nombre, correo y mensaje (minimo 10 caracteres).' : 'Check your name, email, and message (at least 10 characters).');
      return;
    }
    setLoading(true);
    try {
      const fullMessage = subject.trim() ? `${es ? 'Asunto' : 'Subject'}: ${subject.trim()}\n\n${message.trim()}` : message.trim();
      const result = await sendContactMessage({ name: name.trim(), email: email.trim(), message: fullMessage, website });
      if (result.ok) {
        toast.success(es ? 'Mensaje enviado. Te respondere pronto.' : 'Message sent. I will get back to you soon.');
        setName(''); setEmail(''); setSubject(''); setMessage(''); setWebsite('');
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
    <ScreenBody className="screen-body contact-screen mac-mail">
      <form aria-busy={loading} className="contact-screen__form" onSubmit={onSubmit} onFocus={() => { void wakeBackend(); }}>
        <div className="mac-mail__field"><span>{es ? 'Para:' : 'To:'}</span><a href={'mailto:' + EMAIL}>{EMAIL}</a></div>
        <label className="mac-mail__field" htmlFor="screen-name"><span>{es ? 'Nombre:' : 'Name:'}</span><input id="screen-name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" required minLength={2} /></label>
        <label className="mac-mail__field" htmlFor="screen-email"><span>{es ? 'De:' : 'From:'}</span><input id="screen-email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" type="email" required /></label>
        <label className="mac-mail__field" htmlFor="screen-subject"><span>{es ? 'Asunto:' : 'Subject:'}</span><input id="screen-subject" value={subject} onChange={event => setSubject(event.target.value)} placeholder={es ? 'Hablemos de tu proyecto' : 'Let us talk about your project'} /></label>
        <label className="mac-mail__message" htmlFor="screen-message"><span className="sr-only">{es ? 'Mensaje' : 'Message'}</span><textarea id="screen-message" value={message} onChange={event => setMessage(event.target.value)} rows={5} placeholder={es ? 'Cuentame que necesitas construir…' : 'Tell me what you need to build…'} required minLength={10} /></label>
        <input className="screen-honeypot" value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="mac-mail__footer"><div className="mac-mail__links"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><img src="/assets/brands/github.svg" alt="" />GitHub</a><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065a2.064 2.064 0 1 1 4.128 0c0 1.139-.92 2.065-2.065 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>LinkedIn</a></div>
          <button type="submit" disabled={loading}>{loading ? <Loader2 className="animate-spin" size={17} /> : null}{loading ? (es ? 'Enviando...' : 'Sending...') : (es ? 'Enviar' : 'Send')} ↑</button></div>
      </form>
    </ScreenBody>
  </Screen>;
}
