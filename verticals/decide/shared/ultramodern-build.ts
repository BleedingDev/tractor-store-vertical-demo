const ultramodernBuildArtifact = {
  deliveryUnit: {
    appId: 'decide',
    build: '3c6187684f45d1f7',
    buildMarker: '3c6187684f45d1f7',
    deployProfile: 'cloudflare-ssr-mf-effect-v1',
    kind: 'microvertical-delivery-unit',
    packageName: '@tractor-store-vertical-demo/decide',
    schemaVersion: 1,
    sourceRevision: 'workspace',
    unitId: 'tractor-store-vertical-demo/decide',
    version: '0.1.0',
  },
  kind: 'ultramodern-build-artifact',
  schemaVersion: 1,
  surfaces: {
    api: {
      appId: 'decide',
      build: '3c6187684f45d1f7',
      buildMarker: '3c6187684f45d1f7',
      deployProfile: 'cloudflare-ssr-mf-effect-v1',
      kind: 'microvertical-delivery-unit',
      packageName: '@tractor-store-vertical-demo/decide',
      schemaVersion: 1,
      sourceRevision: 'workspace',
      surface: 'api',
      unitId: 'tractor-store-vertical-demo/decide',
      version: '0.1.0',
    },
    ui: {
      appId: 'decide',
      build: '3c6187684f45d1f7',
      buildMarker: '3c6187684f45d1f7',
      deployProfile: 'cloudflare-ssr-mf-effect-v1',
      kind: 'microvertical-delivery-unit',
      packageName: '@tractor-store-vertical-demo/decide',
      schemaVersion: 1,
      sourceRevision: 'workspace',
      surface: 'ui',
      unitId: 'tractor-store-vertical-demo/decide',
      version: '0.1.0',
    },
  },
} as const;

export { ultramodernBuildArtifact };

export const ultramodernDeliveryUnit = ultramodernBuildArtifact.deliveryUnit;
export const ultramodernVerticalIdentity = ultramodernDeliveryUnit;
export const ultramodernUiMarker = ultramodernBuildArtifact.surfaces.ui;
export const ultramodernApiMarker = ultramodernBuildArtifact.surfaces.api;
