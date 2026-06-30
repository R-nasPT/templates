import { env } from '@/config/env.config';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: env.KEYCLOAK_URL,
  realm: env.KEYCLOAK_REALM,
  clientId: env.KEYCLOAK_CLIENT_ID,
});

let isInitialized = false;
let initPromise: Promise<boolean> | null = null;

export const initKeycloak = async (): Promise<boolean> => {
  if (isInitialized) {
    return keycloak.authenticated || false;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const authenticated = await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        pkceMethod: 'S256',
      });

      isInitialized = true;

      if (authenticated) {
        keycloak.onTokenExpired = () => {
          console.info('⏰ Token expired, refreshing...');
          keycloak
            .updateToken(30)
            .then((refreshed) => {
              if (refreshed) {
                console.info('✅ Token refreshed on expiry');
              }
            })
            .catch(() => {
              console.error('❌ Failed to refresh expired token');
              keycloak.login();
            });
        };

        keycloak.onAuthRefreshSuccess = () => {
          console.info('✅ Auth refresh success');
        };

        keycloak.onAuthRefreshError = () => {
          console.error('❌ Auth refresh error');
          keycloak.login();
        };
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak init failed:', error);
      isInitialized = true;
      return false;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
};

export function logoutFromKeycloak() {
  keycloak.logout({
    redirectUri: window.location.origin,
  });
}

export function isAuthenticated(): boolean {
  return keycloak.authenticated || false;
}

export { keycloak };
