import type { ApiRoles, AuthSession } from '@/shared/types';
import { apiClient } from '@/shared/service/api/apiClient';
import { endpoints } from '@/shared/service/api/endpoints';
import { logoutFromKeycloak } from '@/shared/service/api/keycloak';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthUser {
  id: string;
  username: string;
  email: string;
  accountId: string;
  /**
   * The tenant the user is currently operating under.
   * Must always come from the signed JWT/session — never from client-side cache alone.
   * When switching tenants, call switchTenant() which re-fetches the token and
   * invalidates all tenant-scoped TanStack Query caches.
   */
  tenantId?: string;
  roles: ApiRoles[];
}

interface AuthState {
  user: AuthUser | null;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,

      fetchUser: async () => {
        try {
          const response = await apiClient.get<AuthSession>(
            endpoints.auth.authInfo
          );

          const roles = (Object.keys(response.data.roles) as ApiRoles[]).filter(
            (role) => response.data.roles[role]
          );

          set({
            user: {
              id: response.data.authInfo.userId,
              username: response.data.authInfo.userName,
              email: response.data.authInfo.userId,
              accountId: response.data.accountId,
              roles,
            },
          });
        } catch (error) {
          console.error('Failed to fetch auth info:', error);
          set({ user: null });
        }
      },

      logout: () => {
        set({ user: null });
        logoutFromKeycloak();
      },
    }),
    { name: 'auth-store' }
  )
);

export const useUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => !!s.user);
export const useUserRoles = () => useAuthStore((s) => s.user?.roles ?? []);
/** Always read tenantId from the signed token, not from client-side cache. */
export const useTenantId = () => useAuthStore((s) => s.user?.tenantId);
