import type { RouteObject } from 'react-router';
import { authMiddleware } from '../middlewares/auth.middleware';

export const routes: RouteObject[] = [
  {
    id: 'root',
    middleware: [authMiddleware],
    HydrateFallback: () => null,
    lazy: async () => {
      const { default: RootLayout } = await import('../layouts');
      const { default: ErrorPage } = await import('@/pages/ErrorPage');
      return { Component: RootLayout, ErrorBoundary: ErrorPage };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } =
            await import('@/pages/RootRedirectPage');
          return { Component };
        },
      },
      ...(await import('@/features/demo/route')).demoRoutes,
    ],
  },
  {
    path: '/login-error',
    lazy: async () => {
      const { default: LoginErrorPage } =
        await import('@/pages/LoginErrorPage');
      return { Component: LoginErrorPage };
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { default: NotFoundPage } = await import('@/pages/NotFoundPage');
      return { Component: NotFoundPage };
    },
  },
];
