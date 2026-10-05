// ============================================================
// main.tsx — Bootstrap React app
// ============================================================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './terminal-theme.css';
import './card-layout.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
