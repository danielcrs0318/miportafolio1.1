import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../lib/constants';
import { useLangStore } from '../store/langStore';
import { useThemeStore } from '../store/themeStore';
import avatar from '/assets/fotoperfilCV.jpeg';

const pageLinks = [
  { path: '/sobre-mi', es: 'Sobre mi', en: 'About', detailEs: 'perfil', detailEn: 'profile' },
  { path: '/servicios', es: 'Servicios', en: 'Services', detailEs: 'lo que hago', detailEn: 'what I do' },
  { path: '/certificados', es: 'Certificados', en: 'Certificates', detailEs: 'formacion', detailEn: 'training' },
  { path: '/proyectos', es: 'Proyectos', en: 'Projects', detailEs: 'trabajo', detailEn: 'work' },
  { path: '/devops', es: 'DevOps', en: 'DevOps', detailEs: 'despliegues', detailEn: 'deployments' },
  { path: '/contacto', es: 'Contacto', en: 'Contact', detailEs: 'hablemos', detailEn: 'let us talk' },
];

export function HomeCard() {
  const { lang, toggleLang } = useLangStore();
  const { theme, toggleTheme } = useThemeStore();
  const es = lang === 'es';

  return (
    <main id="main-content" className="card-home">
      <div className="home-card-wrap">
      <article className="home-card">
        <div className="home-card__top">
          <div className="home-card__identity">
            <Link to="/sobre-mi" className="home-card__lead">&gt; daniel.molina</Link>
            <p className="home-card__intro">
              {es ? 'Fullstack developer desde Honduras. Creo productos web y los llevo a produccion.' : 'Fullstack developer from Honduras. I build web products and ship them.'}
            </p>
          </div>
          <div className="home-card__media">
            <button type="button" className="home-card__theme" onClick={toggleTheme} aria-label={theme === 'dark' ? (es ? 'Cambiar a tema claro' : 'Switch to light theme') : (es ? 'Cambiar a tema oscuro' : 'Switch to dark theme')}>
              {theme === 'dark' ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
            </button>
            <img src={avatar} alt="Daniel Eduardo Molina Carias" className="home-card__photo" width="118" height="164" decoding="async" />
          </div>
        </div>

        <div className="home-card__content">
        <section className="home-group home-group--pages" aria-labelledby="home-links">
          <h2 id="home-links">{es ? 'PAGINAS' : 'PAGES'}</h2>
          <ul>
            {pageLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}>
                  <span className="home-link__label">{es ? link.es : link.en}</span>
                  <small>{es ? link.detailEs : link.detailEn}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-group home-group--projects" aria-labelledby="home-projects">
          <h2 id="home-projects">{es ? 'PROYECTOS' : 'PROJECTS'}</h2>
          <ul>
            <li><Link to="/proyectos?ver=3"><span className="home-link__label">Mandados<wbr />Express</span><small>landing page</small></Link></li>
            <li><Link to="/proyectos?ver=4"><span className="home-link__label">Deco Floristeria</span><small>landing page</small></Link></li>
            <li><Link to="/proyectos?ver=5"><span className="home-link__label">POS Honduras</span><small>fullstack</small></Link></li>
          </ul>
        </section>

        <section className="home-group home-group--socials" aria-labelledby="home-socials">
          <h2 id="home-socials">SOCIALS</h2>
          <ul>
            <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={'mailto:' + EMAIL}>Email</a></li>
            <li><a href={CV_URL} download>{es ? 'Descargar CV' : 'Download CV'}</a></li>
          </ul>
        </section>
        </div>

        <div className="home-card__bottom">
          <span>&gt; Daniel Molina</span>
          <button type="button" onClick={toggleLang} aria-label={es ? 'Cambiar a ingles' : 'Switch to Spanish'}>{es ? 'EN' : 'ES'}</button>
        </div>
      </article>
      </div>
    </main>
  );
}
