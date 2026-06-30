import { z } from 'zod';

const envSchema = z.object({
  // API
  VITE_API_BASE_URL: z.url(),
  // Keycloak
  VITE_KEYCLOAK_URL: z.url(),
  VITE_KEYCLOAK_REALM: z.string().min(1),
  VITE_KEYCLOAK_CLIENT_ID: z.string().min(1),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:\n' + z.prettifyError(parsed.error)
  );
  throw new Error('Invalid environment variables');
}

const envVars = parsed.data;

export const env = {
  // Environment
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
  // API
  API_BASE_URL: envVars.VITE_API_BASE_URL,
  // Keycloak
  KEYCLOAK_URL: envVars.VITE_KEYCLOAK_URL,
  KEYCLOAK_REALM: envVars.VITE_KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID: envVars.VITE_KEYCLOAK_CLIENT_ID,
} as const;

export type Env = typeof env;

export type EnvVars = z.infer<typeof envSchema>;
