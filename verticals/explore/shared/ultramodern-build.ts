export const ultramodernDeliveryUnit = {
  appId: 'explore',
  build: 'b3dc004d99d5acb2',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  kind: 'microvertical-delivery-unit',
  packageName: '@tractor-store-vertical-demo/explore',
  schemaVersion: 1,
  sourceRevision: 'workspace',
  unitId: 'tractor-store-vertical-demo/explore',
  version: '0.1.0',
} as const;

export const ultramodernVerticalIdentity = ultramodernDeliveryUnit;

export const ultramodernUiMarker = {
  ...ultramodernDeliveryUnit,
  surface: 'ui',
} as const;

export const ultramodernApiMarker = {
  ...ultramodernDeliveryUnit,
  surface: 'api',
} as const;
