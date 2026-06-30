import { env } from '@/config/env.config';
import { keycloak } from './keycloak';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

apiClient.interceptors.request.use(async (config) => {
  if (!keycloak.authenticated) {
    console.warn('⚠️ Keycloak not authenticated, skipping token refresh');
    return config;
  }

  try {
    const refreshed = await keycloak.updateToken(5);

    if (refreshed) {
      console.info('✅ Token refreshed before request');
    }

    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
  } catch (error) {
    console.error('❌ Failed to refresh token in request interceptor:', error);
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
  }

  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers.Pragma = 'no-cache';
  config.headers.Expires = '0';
  
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.info('🔄 Attempting to refresh token after 401...');
        const refreshed = await keycloak.updateToken(-1);

        if (refreshed && keycloak.token) {
          console.info('Token refreshed via keycloak');

          originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
          return apiClient(originalRequest);
        }

        throw new Error('Token refresh returned false');
      } catch (refreshError) {
        console.error('❌ Failed to refresh token after 401:', refreshError);

        keycloak.login();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
