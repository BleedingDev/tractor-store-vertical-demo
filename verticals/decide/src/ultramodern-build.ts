export const ultramodernVerticalIdentity = {
  appId: 'decide',
  build: '5eaf60929a19f5f1',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  packageName: '@tractor-store-vertical-demo/decide',
  version: '0.1.0',
} as const;

export const ultramodernUiMarker = {
  ...ultramodernVerticalIdentity,
  surface: 'ui',
} as const;

export const ultramodernApiMarker = {
  ...ultramodernVerticalIdentity,
  surface: 'effect-bff',
} as const;
