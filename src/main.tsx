import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
//import { RouterProvider } from 'react-router';
//import router from './routes/router';
import Landing from './pages/landing';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing/>
  </StrictMode>,
);
