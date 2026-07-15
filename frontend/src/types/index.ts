// ============================================================
// TypeScript Interfaces — Portafolio Daniel Eduardo Molina
// ============================================================

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  badge: string;
  badgeColor: string;
  highlights: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
  level?: number;
}

import type { LucideIcon } from 'lucide-react';

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: SkillItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'experience';
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Language = 'es' | 'en';
export type Theme = 'dark' | 'light';
