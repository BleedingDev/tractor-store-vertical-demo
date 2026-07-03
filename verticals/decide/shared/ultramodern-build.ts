export const ultramodernDeliveryUnit = {
  appId: 'decide',
  build: '5eaf60929a19f5f1',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  kind: 'microvertical-delivery-unit',
  packageName: '@tractor-store-vertical-demo/decide',
  schemaVersion: 1,
  sourceRevision: 'workspace',
  unitId: 'tractor-store-vertical-demo/decide',
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
