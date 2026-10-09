import { Link } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpRight, Award, ChevronRight, Code2, Folder, House, Layers3, Mail, Terminal, UserRound } from 'lucide-react';
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../lib/constants';
import { useLangStore } from '../store/langStore';

const pageLinks = [
  { path: '/sobre-mi', es: 'Sobre mi', en: 'About', icon: UserRound, color: '#34d399' },
  { path: '/servicios', es: 'Servicios', en: 'Services', icon: Layers3, color: '#a5b4fc' },
  { path: '/certificados', es: 'Certificados', en: 'Certificates', icon: Award, color: '#c4b5fd' },
  { path: '/proyectos', es: 'Proyectos', en: 'Projects', icon: Folder, color: '#60a5fa' },
  { path: '/devops', es: 'DevOps', en: 'DevOps', icon: Terminal, color: '#aeb8ca' },
  { path: '/contacto', es: 'Contacto', en: 'Contact', icon: Mail, color: '#67e8f9' },
];

const featuredProjects = [
  { path: '/proyectos?ver=3', name: 'MandadosExpress', es: 'Plataforma fullstack', en: 'Fullstack platform' },
  { path: '/proyectos?ver=4', name: 'Deco Floristeria', es: 'Comercio digital', en: 'Digital commerce' },
  { path: '/proyectos?ver=5', name: 'POS Honduras', es: 'Punto de venta', en: 'Point of sale' },
];

export function HomeCard() {
  const es = useLangStore(state => state.lang === 'es');

  return <main id="main-content" className="mac-home">
    <aside className="mac-home__sidebar" aria-label={es ? 'Navegacion del portafolio' : 'Portfolio navigation'}>
      <div className="mac-home__sidebar-heading">{es ? 'FAVORITOS' : 'FAVORITES'}</div>
      <nav className="mac-home__nav" aria-label={es ? 'Secciones' : 'Sections'}>
        {pageLinks.map(({ path, es: labelEs, en, icon: Icon, color }) =>
          <Link key={path} to={path} className="mac-home__nav-link">
            <Icon size={16} color={color} strokeWidth={1.9} aria-hidden="true" />
            <span>{es ? labelEs : en}</span>
          </Link>
        )}
      </nav>
      <div className="mac-home__sidebar-bottom"><span className="mac-home__available" aria-hidden="true" />{es ? 'Disponible para proyectos' : 'Available for projects'}</div>
    </aside>

    <div className="mac-home__main">
      <div className="mac-home__toolbar">
        <div className="mac-home__breadcrumb"><House size={15} aria-hidden="true" /><ChevronRight size={14} aria-hidden="true" /><span>Daniel Molina</span></div>
        <span className="mac-home__toolbar-view">portfolio.local</span>
      </div>

      <div className="mac-home__content">
        <header className="mac-home__intro">
          <div className="mac-home__identity-icon" aria-hidden="true"><Code2 size={34} strokeWidth={1.7} /></div>
          <div>
            <span className="mac-home__eyebrow">{es ? 'PORTAFOLIO PERSONAL' : 'PERSONAL PORTFOLIO'}</span>
            <h1>Daniel Molina</h1>
            <p>{es ? 'Fullstack developer desde Honduras. Creo productos web y los llevo a produccion.' : 'Fullstack developer from Honduras. I build web products and ship them.'}</p>
          </div>
        </header>

        <section className="mac-home__projects" aria-labelledby="mac-home-projects">
          <div className="mac-home__section-heading">
            <h2 id="mac-home-projects">{es ? 'Proyectos destacados' : 'Featured projects'}</h2>
            <Link to="/proyectos">{es ? 'Ver todos' : 'View all'} <ArrowUpRight size={13} aria-hidden="true" /></Link>
          </div>
          <div className="mac-home__list-header"><span>{es ? 'Nombre' : 'Name'}</span><span>{es ? 'Tipo' : 'Type'}</span></div>
          <div className="mac-home__project-list">
            {featuredProjects.map(project => <Link key={project.path} to={project.path} className="mac-home__project">
              <span className="mac-home__project-name"><Folder size={17} fill="#3b96e4" color="#67b8f4" strokeWidth={1.4} aria-hidden="true" />{project.name}</span>
              <span className="mac-home__project-type">{es ? project.es : project.en}</span>
              <ChevronRight className="mac-home__project-arrow" size={15} aria-hidden="true" />
            </Link>)}
          </div>
        </section>

        <section className="mac-home__connect" aria-labelledby="mac-home-connect">
          <h2 id="mac-home-connect">{es ? 'Conectar' : 'Connect'}</h2>
          <div className="mac-home__actions">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><img src="/assets/brands/github.svg" alt="" aria-hidden="true" /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" focusable="false" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065a2.064 2.064 0 1 1 4.128 0c0 1.139-.92 2.065-2.065 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
            <a href={'mailto:' + EMAIL} aria-label={es ? 'Enviar correo electronico' : 'Send email'} title={es ? 'Correo' : 'Email'}><Mail size={18} strokeWidth={1.8} aria-hidden="true" /></a>
            <a className="mac-home__cv" href={CV_URL} download><ArrowDownToLine size={15} aria-hidden="true" />{es ? 'Descargar CV' : 'Download CV'}</a>
          </div>
        </section>
      </div>

      <div className="mac-home__statusbar"><span>{es ? '6 secciones · 3 proyectos destacados' : '6 sections · 3 featured projects'}</span><span>Honduras · UTC−6</span></div>
    </div>
  </main>;
}
