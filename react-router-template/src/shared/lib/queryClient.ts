import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: 'always',
      refetchOnMount: 'always',
      refetchOnReconnect: 'always',
      retry: 1,
    },
  },
});
