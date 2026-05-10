import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import ErrorPage from '@/pages/error';
import { useThemeStore } from '@/modules/theme-controller';
import { basename } from '@/constant';

const router = createBrowserRouter(
  [
    {
      path: '/',
      lazy: async () => {
        const { default: Component } = await import('@/pages/home');
        return { Component };
      },
      errorElement: <ErrorPage />,
    },
  ],
  {
    basename,
  },
);

function App() {
  const initTheme = useThemeStore.getState().initTheme;

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return <RouterProvider router={router} />;
}

export default App;
