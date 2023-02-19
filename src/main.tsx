import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { InputPage } from './pages/InputPage';
import { Records } from './pages/Records';
import { AppRoutes } from './routes.enum';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: `/${AppRoutes.Input}`,
        element: <InputPage />,
      },
      {
        path: `/${AppRoutes.Records}`,
        element: <Records />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />);
