import type { RouteObject } from 'react-router';
// import { queryClient } from '@/shared/lib';

export const demoRoutes: RouteObject[] = [
  {
    path: '/demo',
    lazy: async () => {
      const { default: DemoPage } =
        await import('@/pages/demo/DemoPage');
    //   const { demoListLoader } =
    //     await import('./loaders/demoList.loader');

      return {
        Component: DemoPage,
        // loader: demoListLoader(queryClient),
      };
    },
  },
];
