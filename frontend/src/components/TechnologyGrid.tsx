import { useState } from 'react';
import {
  ArrowLeftRight, Atom, Blocks, Boxes, Braces, CodeXml, Container, Database,
  GitBranch, Globe, GlobeLock, HardHat, Hexagon, KeyRound, LayoutGrid, Leaf,
  MessageSquareText, Move, Network, Route, ScanSearch, SearchCheck, Server,
  ShieldCheck, Sparkles, Timer, Waypoints, Wind, Zap,
  type LucideIcon,
} from 'lucide-react';
import { skillCategories } from '../lib/data';

const skillIcons: Record<string, LucideIcon> = {
  React: Atom,
  TypeScript: Braces,
  'Next.js': Globe,
  Vite: Zap,
  'Tailwind CSS': Wind,
  'Framer Motion': Move,
  MUI: LayoutGrid,
  'Node.js': Hexagon,
  Express: Route,
  Python: CodeXml,
  'REST APIs': ArrowLeftRight,
  'JWT Auth': KeyRound,
  PostgreSQL: Database,
  MongoDB: Leaf,
  'Prisma ORM': Boxes,
  Pinecone: Network,
  'OpenAI API': Sparkles,
  Embeddings: ScanSearch,
  'Prompt Engineering': MessageSquareText,
  'Semantic Search': SearchCheck,
  Docker: Container,
  'Docker Compose': Blocks,
  Nginx: Server,
  Traefik: Waypoints,
  'GitHub Actions': GitBranch,
  'reCAPTCHA v2/v3': ShieldCheck,
  'Helmet.js': HardHat,
  JWT: KeyRound,
  'Rate Limiting': Timer,
  CORS: GlobeLock,
};

const skillLogos: Record<string, string> = {
  React: 'react',
  TypeScript: 'typescript',
  'Next.js': 'nextdotjs',
  Vite: 'vite',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
  MUI: 'mui',
  'Node.js': 'nodedotjs',
  Express: 'express',
  Python: 'python',
  PostgreSQL: 'postgresql',
  MongoDB: 'mongodb',
  'Prisma ORM': 'prisma',
  Docker: 'docker',
  'Docker Compose': 'docker',
  Nginx: 'nginx',
  Traefik: 'traefikproxy',
  'GitHub Actions': 'githubactions',
  'JWT Auth': 'jsonwebtokens',
  JWT: 'jsonwebtokens',
};

function TechnologyIcon({ name, fallback: Fallback }: { name: string; fallback: LucideIcon }) {
  const [failed, setFailed] = useState(false);
  const logo = skillLogos[name];
  return <span className="about-screen__technology-icon" aria-hidden="true">
    {logo && !failed
      ? <img src={`/assets/skills/${logo}.svg`} alt="" loading="lazy" onError={() => setFailed(true)} />
      : <Fallback size={21} strokeWidth={1.8} />}
  </span>;
}

export function TechnologyGrid({ es }: { es: boolean }) {
  return <section className="about-screen__technologies" aria-labelledby="about-technologies">
    <h2 id="about-technologies">{es ? 'TECNOLOGIAS' : 'TECHNOLOGIES'}</h2>
    <div className="about-screen__technology-grid">
      {skillCategories.map(category => {
        const CategoryIcon = category.icon;
        return <div className="about-screen__technology-group" key={category.id}>
          <h3><CategoryIcon size={15} strokeWidth={1.8} aria-hidden="true" />{es ? category.title : category.titleEn ?? category.title}</h3>
          <ul>
            {category.skills.map(skill => {
              const Icon = skillIcons[skill.name] ?? CategoryIcon;
              return <li key={skill.name} title={skill.name}>
                <TechnologyIcon name={skill.name} fallback={Icon} />
                <span className="about-screen__technology-label">{skill.name}</span>
              </li>;
            })}
          </ul>
        </div>;
      })}
    </div>
  </section>;
}
