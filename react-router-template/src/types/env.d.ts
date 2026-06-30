/// <reference types="vite/client" />

import type { EnvVars } from "@/config/env.config";

declare global {
  interface ImportMetaEnv extends EnvVars {}
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
