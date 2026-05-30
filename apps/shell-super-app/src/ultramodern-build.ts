export const ultramodernVerticalIdentity = {
  appId: 'shell-super-app',
  packageName: '@tractor-store-vertical-demo/shell-super-app',
  version: '0.1.0',
  build: 'e4790fcd02e02a11',
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
