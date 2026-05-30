export const ultramodernVerticalIdentity = {
  appId: 'checkout',
  packageName: '@tractor-store-vertical-demo/checkout',
  version: '0.1.0',
  build: '37c25641b66d32b5',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
} as const;

export const ultramodernUiMarker = {
  ...ultramodernVerticalIdentity,
  surface: 'ui',
} as const;

export const ultramodernApiMarker = {
  ...ultramodernVerticalIdentity,
  surface: 'effect-bff',
} as const;
