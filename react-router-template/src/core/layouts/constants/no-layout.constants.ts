const createDynamicPath = (prefix: string, suffix: string) =>
  new RegExp(`^${prefix}\/[^/]+${suffix}$`);

export const NO_LAYOUT_CONFIG = [
  {
    type: 'exact',
    path: '/',
  },
  {
    type: 'exact',
    path: '/record-video',
  },
  {
    type: 'pattern',
    pattern: /^\/test\/.+$/, // matches /test/{anything} but NOT /test
  },
  {
    type: 'pattern',
    pattern: createDynamicPath('/return-orders', '/put away'), // matches /return-orders/{id}/put away
  },
] as const;
