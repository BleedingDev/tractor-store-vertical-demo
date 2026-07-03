export const ultramodernVerticalIdentity = {
  appId: 'explore',
  build: 'b3dc004d99d5acb2',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  packageName: '@tractor-store-vertical-demo/explore',
  version: '0.1.0',
} as const;

export const ultramodernUiMarker = {
  ...ultramodernVerticalIdentity,
  surface: 'ui',
} as const;

export const ultramodernApiMarker = {
  ...ultramodernVerticalIdentity,
  surface: 'api',
} as const;
