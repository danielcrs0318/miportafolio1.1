// ============================================================
// Layout — Footer
// Colofón, índice y firma
// ============================================================
import { Heart } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, EMAIL, CV_URL, NAV_ITEMS } from '../../lib/constants';
import { useLangStore } from '../../store/langStore';

export function Footer() {
  const { lang } = useLangStore();
  const es = lang === 'es';
  const year = new Date().getFullYear();

  const goTo = (href: string) =>
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__cols">
          <div>
            <span className="foot__k mono">{es ? 'Colofón' : 'Colophon'}</span>
            <p className="foot__blurb">
              {es
                ? 'Ingeniero en Ciencias de la Computación. Diseño, desarrollo y pongo en producción sitios y sistemas web para empresas y emprendedores, desde Honduras y de forma remota.'
                : 'Computer Science Engineer. I design, build, and ship websites and web systems for companies and founders, from Honduras and remotely.'}
            </p>
            <p className="foot__avail mono">
              <i className="live-dot" aria-hidden="true" />
              {es ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
            </p>
          </div>

          <div>
            <span className="foot__k mono">{es ? 'Índice' : 'Index'}</span>
            <nav className="foot__list">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => { e.preventDefault(); goTo(item.href); }}
                  className="uline"
                >
                  {es ? item.label : item.labelEn}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="foot__k mono">{es ? 'Enlaces' : 'Elsewhere'}</span>
            <div className="foot__list">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="uline">GitHub</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="uline">LinkedIn</a>
              <a href={`mailto:${EMAIL}`} className="uline">Email</a>
              <a href={CV_URL} download className="uline">{es ? 'Currículum (PDF)' : 'Résumé (PDF)'}</a>
            </div>
          </div>
        </div>

        <span className="foot__word" aria-hidden="true">
          <span>Daniel</span>
          <span>Molina</span>
        </span>

        <div className="foot__bottom mono">
          <span>© {year} Daniel Eduardo Molina Carias</span>
          <span>
            {es ? 'Hecho con' : 'Made with'}
            <i className="foot__heart"><Heart size={11} fill="currentColor" strokeWidth={0} /></i>
            {es ? 'en Honduras' : 'in Honduras'}
          </span>
        </div>
      </div>
    </footer>
  );
}
