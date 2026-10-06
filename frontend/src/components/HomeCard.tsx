import { Link } from 'react-router-dom';
import { Mail, Moon, Sun } from 'lucide-react';
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../lib/constants';
import { useLangStore } from '../store/langStore';
import { useThemeStore } from '../store/themeStore';
import avatar from '/assets/fotoperfilCV.jpeg';

const pageLinks = [
  { path: '/sobre-mi', es: 'Sobre mi', en: 'About' },
  { path: '/servicios', es: 'Servicios', en: 'Services' },
  { path: '/certificados', es: 'Certificados', en: 'Certificates' },
  { path: '/proyectos', es: 'Proyectos', en: 'Projects' },
  { path: '/devops', es: 'DevOps', en: 'DevOps' },
  { path: '/contacto', es: 'Contacto', en: 'Contact' },
];

export function HomeCard() {
  const { lang, toggleLang } = useLangStore();
  const { theme, toggleTheme } = useThemeStore();
  const es = lang === 'es';

  return (
    <main id="main-content" className="card-home">
      <div className="home-card-wrap">
        <article className="home-card">
          <div className="home-card__layout">
            <div className="home-card__visual">
              <img src={avatar} alt="Daniel Eduardo Molina Carias" className="home-card__photo" width="828" height="1149" decoding="async" />
              <Link to="/sobre-mi" className="home-card__signature">&gt; Daniel Molina</Link>
            </div>

            <div className="home-card__information">
              <div className="home-card__topline">
                <Link to="/sobre-mi" className="home-card__lead">&gt; daniel.molina</Link>
                <button type="button" className="home-card__theme" onClick={toggleTheme} aria-label={theme === 'dark' ? (es ? 'Cambiar a tema claro' : 'Switch to light theme') : (es ? 'Cambiar a tema oscuro' : 'Switch to dark theme')}>
                  {theme === 'dark' ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
                </button>
              </div>
              <p className="home-card__intro">
                {es ? 'Fullstack developer desde Honduras. Creo productos web y los llevo a produccion.' : 'Fullstack developer from Honduras. I build web products and ship them.'}
              </p>

              <div className="home-card__content">
                <section className="home-group" aria-labelledby="home-links">
                  <h2 id="home-links">{es ? 'PAGINAS' : 'PAGES'}</h2>
                  <ul>
                    {pageLinks.map(link => (
                      <li key={link.path}><Link to={link.path}>{es ? link.es : link.en}</Link></li>
                    ))}
                  </ul>
                </section>

                <section className="home-group" aria-labelledby="home-projects">
                  <h2 id="home-projects">{es ? 'PROYECTOS' : 'PROJECTS'}</h2>
                  <ul>
                    <li><Link to="/proyectos?ver=3">MandadosExpress</Link></li>
                    <li><Link to="/proyectos?ver=4">Deco Floristeria</Link></li>
                    <li><Link to="/proyectos?ver=5">POS Honduras</Link></li>
                  </ul>
                </section>

                <section className="home-group" aria-labelledby="home-socials">
                  <h2 id="home-socials">{es ? 'REDES' : 'SOCIALS'}</h2>
                  <ul className="home-socials">
                    <li><a className="home-socials__icon-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><img src="/assets/brands/github.svg" alt="" aria-hidden="true" /></a></li>
                    <li>
                      <a className="home-socials__icon-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065a2.064 2.064 0 1 1 4.128 0c0 1.139-.92 2.065-2.065 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </li>
                    <li><a className="home-socials__icon-link" href={'mailto:' + EMAIL} aria-label={es ? 'Enviar correo electronico' : 'Send email'} title={es ? 'Correo' : 'Email'}><Mail size={21} strokeWidth={1.8} aria-hidden="true" /></a></li>
                    <li className="home-socials__cv"><a href={CV_URL} download>{es ? 'Descargar CV' : 'Download CV'}</a></li>
                  </ul>
                </section>
              </div>
              <div className="home-card__footer">
                <Link to="/sobre-mi" className="home-card__mobile-signature">&gt; Daniel Molina</Link>
                <button type="button" className="home-card__lang" onClick={toggleLang} aria-label={es ? 'Cambiar a ingles' : 'Switch to Spanish'}>{es ? 'EN' : 'ES'}</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
