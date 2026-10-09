import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Folder, House, Layers3, Mail, Maximize2, Minimize2, Search, Terminal, UserRound, Wifi, type LucideIcon } from 'lucide-react';
import { projects } from '../lib/data';

type DesktopApp = { path: string; es: string; en: string; icon: LucideIcon; color: string };
type WindowMode = 'open' | 'minimized' | 'closed';

const apps: DesktopApp[] = [
  { path: '/', es: 'Inicio', en: 'Home', icon: House, color: 'linear-gradient(145deg, #6b7280, #27272a)' },
  { path: '/sobre-mi', es: 'Sobre mi', en: 'About', icon: UserRound, color: 'linear-gradient(145deg, #34d399, #0d9488)' },
  { path: '/servicios', es: 'Servicios', en: 'Services', icon: Layers3, color: 'linear-gradient(145deg, #818cf8, #4f46e5)' },
  { path: '/certificados', es: 'Certificados', en: 'Certificates', icon: Award, color: 'linear-gradient(145deg, #c4b5fd, #7c3aed)' },
  { path: '/proyectos', es: 'Proyectos', en: 'Projects', icon: Folder, color: 'linear-gradient(145deg, #38bdf8, #2563eb)' },
  { path: '/devops', es: 'DevOps', en: 'DevOps', icon: Terminal, color: 'linear-gradient(145deg, #64748b, #111827)' },
  { path: '/contacto', es: 'Contacto', en: 'Contact', icon: Mail, color: 'linear-gradient(145deg, #60a5fa, #1d4ed8)' },
];

export function MacDesktop({ children, currentPath, lang, onLang }: {
  children: ReactNode;
  currentPath: string;
  lang: 'es' | 'en';
  onLang: () => void;
}) {
  const navigate = useNavigate();
  const [windowSession, setWindowSession] = useState<{ path: string; mode: WindowMode }>({ path: currentPath, mode: 'open' });
  const [maximizedSession, setMaximizedSession] = useState({ path: currentPath, value: false });
  const [offsetSession, setOffsetSession] = useState({ path: currentPath, x: 0, y: 0 });
  const [bouncing, setBouncing] = useState<string | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const dockRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const windowSlotRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const drag = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number; nextX: number; nextY: number } | null>(null);
  const dragFrame = useRef<number | null>(null);
  const dockFrame = useRef<number | null>(null);
  const dockCenters = useRef<number[] | null>(null);
  const dockPointerX = useRef(0);
  const bounceTimer = useRef<number | null>(null);

  const current = apps.find(item => item.path === currentPath) ?? apps[0];
  const windowTitle = currentPath === '/' ? 'Daniel Molina' : (lang === 'es' ? current.es : current.en);
  const titlebarTitle = currentPath === '/contacto' ? (lang === 'es' ? 'Mensaje nuevo' : 'New message') : currentPath === '/devops' ? 'daniel — zsh — 80×24' : windowTitle;
  const windowState = windowSession.path === currentPath ? windowSession.mode : 'open';
  const maximized = maximizedSession.path === currentPath && maximizedSession.value;
  const offset = offsetSession.path === currentPath ? offsetSession : { x: 0, y: 0 };
  const clock = useMemo(() => {
    const locale = lang === 'es' ? 'es-HN' : 'en-US';
    const date = new Intl.DateTimeFormat(locale, { timeZone: 'America/Tegucigalpa', weekday: 'short', day: 'numeric', month: 'short' }).format(now).replace(/[,.]/g, '');
    const time = new Intl.DateTimeFormat(locale, { timeZone: 'America/Tegucigalpa', hour: '2-digit', minute: '2-digit' }).format(now);
    return `${date}  ${time}`;
  }, [lang, now]);
  const widgetClock = useMemo(() => new Intl.DateTimeFormat(lang === 'es' ? 'es-HN' : 'en-US', {
    timeZone: 'America/Tegucigalpa', hour: '2-digit', minute: '2-digit',
  }).format(now), [lang, now]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => {
    if (bounceTimer.current !== null) window.clearTimeout(bounceTimer.current);
    if (dragFrame.current !== null) window.cancelAnimationFrame(dragFrame.current);
    if (dockFrame.current !== null) window.cancelAnimationFrame(dockFrame.current);
  }, []);

  useEffect(() => {
    drag.current = null;
    if (dragFrame.current !== null) window.cancelAnimationFrame(dragFrame.current);
    dragFrame.current = null;
    windowSlotRef.current?.classList.remove('is-dragging');
  }, [currentPath]);

  useLayoutEffect(() => {
    const slot = windowSlotRef.current;
    const dockButton = dockRefs.current[currentPath];
    if (!slot || !dockButton) return;
    const windowRect = slot.getBoundingClientRect();
    const dockRect = dockButton.getBoundingClientRect();
    slot.style.setProperty('--mac-dock-x', `${dockRect.left + dockRect.width / 2 - windowRect.left - windowRect.width / 2}px`);
    slot.style.setProperty('--mac-dock-y', `${dockRect.top + dockRect.height / 2 - windowRect.top - windowRect.height / 2}px`);
  }, [currentPath, windowState, maximized, offset.x, offset.y]);

  const toggleMaximized = () => setMaximizedSession(previous => ({ path: currentPath, value: previous.path === currentPath ? !previous.value : true }));

  const activate = useCallback((path: string, toggleCurrent = false) => {
    if (toggleCurrent && path === currentPath && windowState === 'open') {
      setWindowSession({ path, mode: 'minimized' });
    } else {
      setWindowSession({ path, mode: 'open' });
      if (path !== currentPath) navigate(path);
    }
    setSpotlightOpen(false);
    setBouncing(path);
    if (bounceTimer.current !== null) window.clearTimeout(bounceTimer.current);
    bounceTimer.current = window.setTimeout(() => setBouncing(null), 1050);
  }, [currentPath, navigate, windowState]);

  const results = useMemo(() => {
    const appResults = apps.map(item => ({ key: item.path, title: lang === 'es' ? item.es : item.en, kind: lang === 'es' ? 'Pagina' : 'Page', icon: item.icon, color: item.color, path: item.path }));
    const projectResults = projects.map(item => ({ key: `project-${item.id}`, title: item.title, kind: lang === 'es' ? 'Proyecto' : 'Project', icon: Folder, color: 'linear-gradient(145deg, #38bdf8, #2563eb)', path: `/proyectos?ver=${item.id}` }));
    const term = query.trim().toLocaleLowerCase();
    return [...appResults, ...projectResults].filter(item => item.title.toLocaleLowerCase().includes(term)).slice(0, 9);
  }, [lang, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSpotlightOpen(value => !value);
        setQuery('');
        setSelectedResult(0);
        return;
      }
      if (!spotlightOpen) return;
      if (event.key === 'Escape') { setSpotlightOpen(false); return; }
      if (event.key === 'ArrowDown') { event.preventDefault(); setSelectedResult(value => Math.min(value + 1, results.length - 1)); }
      if (event.key === 'ArrowUp') { event.preventDefault(); setSelectedResult(value => Math.max(value - 1, 0)); }
      if (event.key === 'Enter' && results[selectedResult]) { event.preventDefault(); activate(results[selectedResult].path); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activate, results, selectedResult, spotlightOpen]);

  useEffect(() => {
    if (spotlightOpen) searchRef.current?.focus();
  }, [spotlightOpen]);

  function onDockEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch' || window.innerWidth <= 720) return;
    event.currentTarget.classList.add('is-magnifying');
    dockCenters.current = apps.map(item => {
      const rect = dockRefs.current[item.path]?.getBoundingClientRect();
      return rect ? rect.left + rect.width / 2 : 0;
    });
  }

  function onDockMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch' || window.innerWidth <= 720) return;
    if (!dockCenters.current) onDockEnter(event);
    dockPointerX.current = event.clientX;
    if (dockFrame.current !== null) return;
    dockFrame.current = window.requestAnimationFrame(() => {
      dockFrame.current = null;
      const centers = dockCenters.current;
      if (!centers) return;
      centers.forEach((center, index) => {
        const button = dockRefs.current[apps[index].path];
        if (!button) return;
        const distance = dockPointerX.current - center;
        const influence = Math.max(0, 1 - Math.abs(distance) / 120);
        const scale = 1 + influence * .42;
        const shift = distance === 0 ? 0 : -Math.sign(distance) * influence * 9;
        button.style.transform = `translate3d(${shift}px, 0, 0) scale(${scale})`;
      });
    });
  }

  function onDockLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.classList.remove('is-magnifying');
    dockCenters.current = null;
    if (dockFrame.current !== null) window.cancelAnimationFrame(dockFrame.current);
    dockFrame.current = null;
    apps.forEach(item => { const button = dockRefs.current[item.path]; if (button) button.style.transform = ''; });
  }

  function paintDragPosition() {
    const position = drag.current;
    const slot = windowSlotRef.current;
    if (!position || !slot) return;
    slot.style.setProperty('--mac-offset-x', `${position.nextX}px`);
    slot.style.setProperty('--mac-offset-y', `${position.nextY}px`);
  }

  function onTitlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0 || window.innerWidth <= 800 || maximized || (event.target instanceof Element && event.target.closest('button'))) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, originX: offset.x, originY: offset.y, nextX: offset.x, nextY: offset.y };
    windowSlotRef.current?.classList.add('is-dragging');
  }

  function onTitlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    const limitX = Math.max(0, window.innerWidth / 2 - 110);
    const limitY = Math.max(0, window.innerHeight / 2 - 90);
    drag.current.nextX = Math.max(-limitX, Math.min(limitX, drag.current.originX + event.clientX - drag.current.x));
    drag.current.nextY = Math.max(-limitY, Math.min(limitY, drag.current.originY + event.clientY - drag.current.y));
    if (dragFrame.current !== null) return;
    dragFrame.current = window.requestAnimationFrame(() => {
      dragFrame.current = null;
      paintDragPosition();
    });
  }

  function finishDrag(event: PointerEvent<HTMLElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    if (dragFrame.current !== null) window.cancelAnimationFrame(dragFrame.current);
    dragFrame.current = null;
    paintDragPosition();
    setOffsetSession({ path: currentPath, x: drag.current.nextX, y: drag.current.nextY });
    drag.current = null;
    windowSlotRef.current?.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function hideWindow(mode: 'minimized' | 'closed') {
    setWindowSession({ path: currentPath, mode });
    window.requestAnimationFrame(() => dockRefs.current[current.path]?.focus());
  }

  return <div className="mac-shell">
    <div className="mac-wallpaper" aria-hidden="true" />
    <header className="mac-menubar">
      <div className="mac-menubar__left">
        <button type="button" className="mac-menubar__symbol" onClick={() => activate('/')} aria-label={lang === 'es' ? 'Ir al inicio' : 'Go home'}><svg className="mac-menubar__apple" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9S9.1 7 7.9 7c-1.7 0-3.2 1-4.1 2.5-1.7 3-.4 7.5 1.3 9.9.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-4zM14 5.4c.7-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z" /></svg></button>
        <strong className="mac-menubar__app">{windowTitle}</strong>
        <button type="button" className="mac-menubar__link" onClick={() => activate('/sobre-mi')}>{lang === 'es' ? 'Sobre mi' : 'About'}</button>
        <button type="button" className="mac-menubar__link" onClick={() => activate('/proyectos')}>{lang === 'es' ? 'Proyectos' : 'Projects'}</button>
        <button type="button" className="mac-menubar__link" onClick={() => activate('/contacto')}>{lang === 'es' ? 'Contacto' : 'Contact'}</button>
      </div>
      <div className="mac-menubar__right">
        <Wifi size={16} className="mac-menubar__wifi" aria-hidden="true" />
        <button type="button" onClick={() => { setSpotlightOpen(true); setQuery(''); setSelectedResult(0); }} aria-label={lang === 'es' ? 'Buscar en el portafolio' : 'Search portfolio'} title="Ctrl/⌘ + K"><Search size={16} /></button>
        <button type="button" onClick={onLang} aria-label={lang === 'es' ? 'Cambiar a ingles' : 'Switch to Spanish'}>{lang.toUpperCase()}</button>
        <time className="mac-menubar__clock">{clock}</time>
      </div>
    </header>

    <div className="mac-desktop">
      <div className="mac-desktop__shortcuts">
        {[apps[4], apps[1]].map(item => <button type="button" key={item.path} onClick={() => activate(item.path)}>
          <span className="mac-desktop__shortcut-icon" style={{ background: item.color }}><item.icon size={25} /></span>
          <span>{lang === 'es' ? item.es : item.en}</span>
        </button>)}
      </div>
      <div className={'mac-desktop__widget' + (windowState === 'open' ? ' mac-desktop__widget--behind' : '')}>
        <span>{lang === 'es' ? 'DISPONIBILIDAD' : 'AVAILABILITY'}</span>
        <strong>{widgetClock}</strong>
        <small>Honduras · UTC−6</small>
        <em><i />{lang === 'es' ? 'Abierto a proyectos' : 'Open for projects'}</em>
      </div>

      <div ref={windowSlotRef} className={'mac-window-slot' + (maximized ? ' is-maximized' : '')} style={{ '--mac-offset-x': `${offset.x}px`, '--mac-offset-y': `${offset.y}px` } as CSSProperties}>
        <section key={currentPath} className={`mac-window${currentPath === '/' ? ' mac-window--home' : ''}${currentPath === '/devops' ? ' mac-window--terminal' : ''} mac-window--${windowState}${maximized ? ' mac-window--maximized' : ''}`} aria-label={lang === 'es' ? `Ventana de ${windowTitle}` : `${windowTitle} window`} aria-hidden={windowState !== 'open'} inert={windowState !== 'open'}>
          <header className="mac-window__titlebar" onDoubleClick={() => { if (window.innerWidth > 800) toggleMaximized(); }} onPointerDown={onTitlePointerDown} onPointerMove={onTitlePointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}>
            <div className="mac-window__traffic">
              <button type="button" className="mac-window__close" onClick={() => hideWindow('closed')} aria-label={lang === 'es' ? 'Cerrar ventana' : 'Close window'}><span>×</span></button>
              <button type="button" className="mac-window__minimize" onClick={() => hideWindow('minimized')} aria-label={lang === 'es' ? 'Minimizar ventana' : 'Minimize window'}><span>−</span></button>
              <button type="button" className="mac-window__maximize" onClick={toggleMaximized} aria-label={maximized ? (lang === 'es' ? 'Restaurar ventana' : 'Restore window') : (lang === 'es' ? 'Maximizar ventana' : 'Maximize window')}><span>{maximized ? <Minimize2 size={9} /> : <Maximize2 size={9} />}</span></button>
            </div>
            <div className="mac-window__title"><current.icon size={15} aria-hidden="true" /><span>{titlebarTitle}</span></div>
            <span className="mac-window__location">portfolio.local</span>
          </header>
          <div className="mac-window__body">{children}</div>
        </section>
      </div>
    </div>

    <nav className="mac-dock" aria-label={lang === 'es' ? 'Aplicaciones del portafolio' : 'Portfolio applications'} onPointerEnter={onDockEnter} onPointerMove={onDockMove} onPointerLeave={onDockLeave}>
      {apps.map(item => <button type="button" key={item.path} data-dock-item ref={node => { dockRefs.current[item.path] = node; }}
        className={'mac-dock__item' + (item.path === currentPath && windowState !== 'closed' ? ' is-running' : '') + (bouncing === item.path ? ' is-bouncing' : '')}
        onClick={() => activate(item.path, true)} aria-label={lang === 'es' ? item.es : item.en} aria-current={item.path === currentPath && windowState === 'open' ? 'page' : undefined}>
        <span className="mac-dock__icon" style={{ background: item.color }}><item.icon size={24} strokeWidth={1.9} /></span>
        <span className="mac-dock__tip">{lang === 'es' ? item.es : item.en}</span>
      </button>)}
    </nav>

    {spotlightOpen && <div className="mac-spotlight" role="presentation" onPointerDown={event => { if (event.target === event.currentTarget) setSpotlightOpen(false); }}>
      <div className="mac-spotlight__panel" role="dialog" aria-modal="true" aria-label={lang === 'es' ? 'Buscar en el portafolio' : 'Search portfolio'}>
        <div className="mac-spotlight__search"><Search size={21} aria-hidden="true" /><input ref={searchRef} value={query} onChange={event => { setQuery(event.target.value); setSelectedResult(0); }} placeholder={lang === 'es' ? 'Buscar en el portafolio' : 'Search portfolio'} aria-label={lang === 'es' ? 'Buscar' : 'Search'} /><kbd>ESC</kbd></div>
        <div className="mac-spotlight__results">
          {results.map((result, index) => <button type="button" key={result.key} className={index === selectedResult ? 'is-selected' : ''} onMouseEnter={() => setSelectedResult(index)} onClick={() => activate(result.path)}>
            <span style={{ background: result.color }}><result.icon size={18} /></span><strong>{result.title}</strong><small>{result.kind}</small>
          </button>)}
          {results.length === 0 && <p>{lang === 'es' ? 'Sin resultados.' : 'No results.'}</p>}
        </div>
      </div>
    </div>}
  </div>;
}
