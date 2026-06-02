export const ultramodernVerticalIdentity = {
  appId: 'shell-super-app',
  build: 'e4790fcd02e02a11',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  packageName: '@tractor-store-vertical-demo/shell-super-app',
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
