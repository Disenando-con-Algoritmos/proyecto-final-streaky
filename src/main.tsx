import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './routes/Router';
import { Provider } from 'react-redux';
import { store } from './redux/storeRedux/AppReducer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
