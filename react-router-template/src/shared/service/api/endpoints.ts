// type Id = string | number;

export const endpoints = {
  // ─── Auth ───────────────────────────────────────
  auth: {
    authInfo: "/authInfo",
  },
} as const;

export type EndpointKey = keyof typeof endpoints;
export type Endpoints<K extends EndpointKey> = (typeof endpoints)[K];
