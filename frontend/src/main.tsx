// ============================================================
// main.tsx — Bootstrap React app
// ============================================================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './terminal-theme.css';
import './card-layout.css';
import './experience.css';
import './macos.css';
import './macos-content.css';
import './macos-apps.css';
import './macos-reference.css';
import './macos-home.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
