import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import LoginPage from './pages/login';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginPage/>
  </StrictMode>,
);
