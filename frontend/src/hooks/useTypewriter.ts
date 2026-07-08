// ============================================================
// Hook — useTypewriter
// Efecto de escritura que rota entre frases
// ============================================================
import { useState, useEffect } from 'react';

interface TypewriterOptions {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

export function useTypewriter({
  phrases,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseMs = 2000,
}: TypewriterOptions): string {
  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex(i => (i + 1) % phrases.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}
