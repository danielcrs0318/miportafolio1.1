// ============================================================
// DevOps — Deploy Pipeline "Player"
// Vista tipo video: push → GitHub Actions → Docker → Linux → Portainer
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  GitBranch,
  Boxes,
  Server,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { useLangStore } from '../../store/langStore';

type Line = { text: string; kind?: 'cmd' | 'out' | 'ok' | 'muted' | 'warn' };
type ContainerRow = { name: string; image: string; state: 'running' | 'starting'; cpu: number; mem: number };

interface Stage {
  id: string;
  icon: LucideIcon;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  file?: string;
  duration: number;
  lines?: Line[];
  dashboard?: ContainerRow[];
}

const STAGES: Stage[] = [
  {
    id: 'push',
    icon: GitBranch,
    title: { es: 'Push a GitHub', en: 'Push to GitHub' },
    subtitle: { es: 'El desarrollador sube cambios a la rama main', en: 'Developer pushes to the main branch' },
    file: 'bash — local',
    duration: 4200,
    lines: [
      { text: '$ git add .', kind: 'cmd' },
      { text: '$ git commit -m "feat: nueva versión del portafolio"', kind: 'cmd' },
      { text: '$ git push origin main', kind: 'cmd' },
      { text: 'Enumerating objects: 24, done.', kind: 'muted' },
      { text: 'To github.com:danielcrs0318/portafolio.git', kind: 'out' },
      { text: '   a1b2c3d..e4f5g6h  main -> main', kind: 'out' },
      { text: '✓ Workflow "Deploy" disparado automáticamente', kind: 'ok' },
    ],
  },
  {
    id: 'actions',
    icon: Workflow,
    title: { es: 'GitHub Actions', en: 'GitHub Actions' },
    subtitle: { es: 'El workflow de CI/CD se ejecuta en la nube', en: 'The CI/CD workflow runs in the cloud' },
    file: '.github/workflows/deploy.yml',
    duration: 6500,
    lines: [
      { text: 'name: Deploy', kind: 'out' },
      { text: 'on:', kind: 'out' },
      { text: '  push:', kind: 'out' },
      { text: '    branches: [main]', kind: 'out' },
      { text: 'jobs:', kind: 'out' },
      { text: '  build-and-deploy:', kind: 'out' },
      { text: '    runs-on: ubuntu-latest', kind: 'warn' },
      { text: '    steps:', kind: 'out' },
      { text: '      - uses: actions/checkout@v4', kind: 'muted' },
      { text: '      - name: Build & push image', kind: 'muted' },
      { text: '        run: |', kind: 'muted' },
      { text: '          docker build -t ghcr.io/daniel/app:latest .', kind: 'cmd' },
      { text: '          docker push ghcr.io/daniel/app:latest', kind: 'cmd' },
      { text: '      - name: Deploy vía SSH', kind: 'muted' },
      { text: '        uses: appleboy/ssh-action@v1', kind: 'muted' },
    ],
  },
  {
    id: 'docker',
    icon: Boxes,
    title: { es: 'Build & Push de imagen Docker', en: 'Docker Image Build & Push' },
    subtitle: { es: 'Se construye y publica la imagen en el registry', en: 'Image is built and pushed to the registry' },
    file: 'runner: ubuntu-latest',
    duration: 5200,
    lines: [
      { text: '$ docker build -t ghcr.io/daniel/app:latest .', kind: 'cmd' },
      { text: ' => [1/5] FROM node:20-alpine', kind: 'muted' },
      { text: ' => [4/5] RUN npm ci', kind: 'muted' },
      { text: ' => [5/5] RUN npm run build', kind: 'muted' },
      { text: ' => exporting layers', kind: 'muted' },
      { text: '✓ Imagen construida — 128 MB', kind: 'ok' },
      { text: '$ docker push ghcr.io/daniel/app:latest', kind: 'cmd' },
      { text: 'latest: digest: sha256:9f2c... pushed', kind: 'out' },
      { text: '✓ Imagen publicada en GHCR', kind: 'ok' },
    ],
  },
  {
    id: 'server',
    icon: Server,
    title: { es: 'Despliegue en servidor Linux', en: 'Deploy to Linux Server' },
    subtitle: { es: 'SSH al VPS y levantamiento con Docker Compose', en: 'SSH into the VPS and Docker Compose up' },
    file: 'ssh deploy@vps-linux',
    duration: 5200,
    lines: [
      { text: '$ ssh deploy@vps-linux', kind: 'cmd' },
      { text: 'Welcome to Ubuntu 22.04 LTS (GNU/Linux)', kind: 'muted' },
      { text: '$ docker compose pull', kind: 'cmd' },
      { text: '$ docker compose up -d', kind: 'cmd' },
      { text: ' ✔ Container app-web       Started', kind: 'ok' },
      { text: ' ✔ Container app-api       Started', kind: 'ok' },
      { text: ' ✔ Container portainer     Running', kind: 'ok' },
      { text: '✓ Despliegue completado sin downtime', kind: 'ok' },
    ],
  },
  {
    id: 'portainer',
    icon: Gauge,
    title: { es: 'Monitoreo con Portainer.io', en: 'Monitoring with Portainer.io' },
    subtitle: { es: 'Contenedores supervisados en tiempo real', en: 'Containers monitored in real time' },
    file: 'portainer.io — dashboard',
    duration: 6000,
    dashboard: [
      { name: 'app-web', image: 'ghcr.io/daniel/app:latest', state: 'running', cpu: 12, mem: 34 },
      { name: 'app-api', image: 'ghcr.io/daniel/api:latest', state: 'running', cpu: 21, mem: 48 },
      { name: 'traefik', image: 'traefik:v3', state: 'running', cpu: 4, mem: 18 },
      { name: 'portainer', image: 'portainer/portainer-ce', state: 'running', cpu: 2, mem: 22 },
    ],
  },
];

const TICK = 40;

export function DeployPipeline() {
  const { lang } = useLangStore();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);

  const stage = STAGES[active];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { inView.current = entry?.isIntersecting ?? false; },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const step = (TICK / stage.duration) * 100;
    const timer = setInterval(() => {
      if (!inView.current) return;
      setProgress((p) => {
        if (p + step >= 100) {
          setActive((a) => (a + 1) % STAGES.length);
          return 0;
        }
        return p + step;
      });
    }, TICK);
    return () => clearInterval(timer);
  }, [playing, stage.duration]);

  const goTo = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  const restart = () => {
    setActive(0);
    setProgress(0);
    setPlaying(true);
  };

  const StageIcon = stage.icon;

  return (
    <div className="pipeline" ref={containerRef}>
      {/* Barra superior */}
      <div className="pipeline__bar">
        <div className="pipeline__dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <span className="pipeline__file">{stage.file}</span>
        <span className="pipeline__live mono">
          <i className="live-dot" aria-hidden="true" />
          CI/CD
        </span>
      </div>

      {/* Pantalla */}
      <div className="pipeline__screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            className="pipeline__stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pipeline__head">
              <StageIcon size={20} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h4 className="pipeline__title">{stage.title[lang]}</h4>
                <p className="pipeline__sub">{stage.subtitle[lang]}</p>
              </div>
            </div>

            {stage.lines && (
              <div className="pipeline__term">
                {stage.lines.map((line, i) => (
                  <motion.div
                    key={i}
                    className={`term-line term-line--${line.kind ?? 'out'}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.13, duration: 0.25 }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>
            )}

            {stage.dashboard && (
              <div className="panel">
                <div className="panel__head">
                  <span>Container</span>
                  <span>State</span>
                  <span>CPU</span>
                  <span>MEM</span>
                </div>
                {stage.dashboard.map((c, i) => (
                  <motion.div
                    key={c.name}
                    className="panel__row"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.3 }}
                  >
                    <div className="panel__name">
                      <span className="panel__cname">{c.name}</span>
                      <span className="panel__image">{c.image}</span>
                    </div>
                    <span className="panel__state">
                      <i className="live-dot" aria-hidden="true" />
                      running
                    </span>
                    <div className="panel__metric">
                      <span>{String(c.cpu).padStart(2, '0')}%</span>
                      <div className="panel__bar"><i style={{ width: `${c.cpu}%` }} /></div>
                    </div>
                    <div className="panel__metric">
                      <span>{String(c.mem).padStart(2, '0')}%</span>
                      <div className="panel__bar panel__bar--dim"><i style={{ width: `${c.mem}%` }} /></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div className="pipeline__controls">
        <button
          className="pipeline__btn"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <Pause size={14} strokeWidth={1.5} /> : <Play size={14} strokeWidth={1.5} />}
        </button>
        <button className="pipeline__btn" onClick={restart} aria-label="Reiniciar">
          <RotateCcw size={13} strokeWidth={1.5} />
        </button>

        <div className="pipeline__track">
          <i style={{ width: `${progress}%` }} />
        </div>

        <span className="pipeline__count">
          {String(active + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
        </span>
      </div>

      {/* Etapas */}
      <div className="pipeline__steps">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              className={`pipeline__step ${i === active ? 'on' : ''} ${i < active ? 'done' : ''}`}
              onClick={() => goTo(i)}
              type="button"
            >
              <span><Icon size={14} strokeWidth={1.5} aria-hidden="true" /></span>
              <span className="pipeline__step-label">{s.title[lang]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
