const ultramodernBuildArtifact = {
  deliveryUnit: {
    appId: 'checkout',
    build: '7d5413e907d393e5',
    buildMarker: '7d5413e907d393e5',
    deployProfile: 'cloudflare-ssr-mf-effect-v1',
    kind: 'microvertical-delivery-unit',
    packageName: '@tractor-store-vertical-demo/checkout',
    schemaVersion: 1,
    sourceRevision: 'workspace',
    unitId: 'tractor-store-vertical-demo/checkout',
    version: '0.1.0',
  },
  kind: 'ultramodern-build-artifact',
  schemaVersion: 1,
  surfaces: {
    api: {
      appId: 'checkout',
      build: '7d5413e907d393e5',
      buildMarker: '7d5413e907d393e5',
      deployProfile: 'cloudflare-ssr-mf-effect-v1',
      kind: 'microvertical-delivery-unit',
      packageName: '@tractor-store-vertical-demo/checkout',
      schemaVersion: 1,
      sourceRevision: 'workspace',
      surface: 'api',
      unitId: 'tractor-store-vertical-demo/checkout',
      version: '0.1.0',
    },
    ui: {
      appId: 'checkout',
      build: '7d5413e907d393e5',
      buildMarker: '7d5413e907d393e5',
      deployProfile: 'cloudflare-ssr-mf-effect-v1',
      kind: 'microvertical-delivery-unit',
      packageName: '@tractor-store-vertical-demo/checkout',
      schemaVersion: 1,
      sourceRevision: 'workspace',
      surface: 'ui',
      unitId: 'tractor-store-vertical-demo/checkout',
      version: '0.1.0',
    },
  },
} as const;

export { ultramodernBuildArtifact };

export const ultramodernDeliveryUnit = ultramodernBuildArtifact.deliveryUnit;
export const ultramodernVerticalIdentity = ultramodernDeliveryUnit;
export const ultramodernUiMarker = ultramodernBuildArtifact.surfaces.ui;
export const ultramodernApiMarker = ultramodernBuildArtifact.surfaces.api;
