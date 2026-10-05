import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
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
                  <h2 id="home-socials">SOCIALS</h2>
                  <ul>
                    <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href={'mailto:' + EMAIL}>Email</a></li>
                    <li><a href={CV_URL} download>{es ? 'Descargar CV' : 'Download CV'}</a></li>
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
