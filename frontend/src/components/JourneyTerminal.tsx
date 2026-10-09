import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { timeline } from '../lib/data';
import { useContentMotion } from '../hooks/useContentMotion';

export function JourneyTerminal({ es }: { es: boolean }) {
  const [selected, setSelected] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = timeline[selected];
  const milestone = es ? item : item.en ?? item;
  const contentMotion = useContentMotion(selected);
  const lines = es
    ? ['Consultando trayectoria...', `Experiencia de ${item.year} cargada.`]
    : ['Reading journey...', `Experience from ${item.year} loaded.`];

  useEffect(() => {
    if (paused) return;
    const delay = visibleLines === 0 ? 600 : visibleLines === 1 ? 800 : selected === timeline.length - 1 ? 2200 : 1800;
    const timer = window.setTimeout(() => {
      if (visibleLines < lines.length) {
        setVisibleLines(count => count + 1);
      } else {
        setSelected(index => (index + 1) % timeline.length);
        setVisibleLines(0);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [selected, visibleLines, paused, lines.length]);

  return <section className="screen-feature journey" aria-label={es ? 'Trayectoria' : 'Journey'}>
    <div className="journey-terminal">
      <div className="journey-terminal__body">
        <div className="journey-terminal__command">
          <code><span className="journey-terminal__shell">daniel@macbook ~ %</span> <span className="journey-terminal__command-text">{es ? 'trayectoria --actual' : 'journey --current'}</span></code>
          <div className="journey-terminal__controls">
            <span className={paused ? 'is-paused' : ''}>{paused ? (es ? 'PAUSA' : 'PAUSED') : 'AUTO'}</span>
            <button type="button" onClick={() => setPaused(value => !value)}
              aria-label={paused ? (es ? 'Reanudar trayectoria' : 'Resume journey') : (es ? 'Pausar trayectoria' : 'Pause journey')}
              title={paused ? (es ? 'Reanudar' : 'Resume') : (es ? 'Pausar' : 'Pause')}>
              {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <article ref={contentMotion} className="journey-terminal__output" id="journey-terminal-output">
          <span className="journey-terminal__meta">{item.year} / {milestone.institution}</span>
          <h2>{milestone.title}</h2>
          <p>{milestone.description}</p>
        </article>
        <div className="journey-terminal__log" aria-label={es ? 'Salida de la simulacion' : 'Simulation output'}>
          {lines.slice(0, visibleLines).map((line, index) => <span key={`${selected}-${index}`}><b>{index === 0 ? '›' : '✓'}</b> {line}</span>)}
        </div>
      </div>
    </div>
  </section>;
}
