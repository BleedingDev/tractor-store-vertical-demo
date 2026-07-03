export const ultramodernDeliveryUnit = {
  appId: 'checkout',
  build: '37c25641b66d32b5',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  kind: 'microvertical-delivery-unit',
  packageName: '@tractor-store-vertical-demo/checkout',
  schemaVersion: 1,
  sourceRevision: 'workspace',
  unitId: 'tractor-store-vertical-demo/checkout',
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
