import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
const Page404 = lazy(() => import('src/pages/404'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [
      { path: 'home', element: <HomePage /> },
      { path: '404', element: <Page404 /> },
    ],
  },
];
