import { redirect, type MiddlewareFunction } from 'react-router';
import { useAuthStore } from '../stores/auth.store';
import { initKeycloak } from '@/shared/service/api/keycloak';

const PUBLIC_PATHS = ['/login-error', '/unauthorized'];

export const authMiddleware: MiddlewareFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (PUBLIC_PATHS.some((path) => url.pathname.startsWith(path))) {
    return;
  }

  const authenticated = await initKeycloak();

  if (!authenticated) {
    throw redirect('/login-error');
  }

  if (!useAuthStore.getState().user) {
    await useAuthStore.getState().fetchUser();
  }

  if (!useAuthStore.getState().user) {
    throw redirect('/login-error');
  }
};
