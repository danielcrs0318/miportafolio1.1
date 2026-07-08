// ============================================================
// Layout — Footer
// Links sociales y copyright
// ============================================================
import { Mail, Code2, Heart } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <Code2 size={20} className="text-accent-cyan" />
          <span className="font-semibold">Daniel<span className="text-accent-cyan">.</span></span>
          <p className="footer-tagline">Ingeniería con propósito.</p>
        </div>

        {/* Social links */}
        <div className="footer-socials">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="GitHub"
          >
            <span className="social-btn-text">GH</span>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="LinkedIn"
          >
            <span className="social-btn-text">IN</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="social-btn"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          © {year} Daniel Eduardo Molina Carias. Hecho con{' '}
          <Heart size={14} className="inline text-accent-cyan" fill="currentColor" /> en Honduras.
        </p>
      </div>
    </footer>
  );
}
