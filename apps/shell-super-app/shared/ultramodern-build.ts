const ultramodernBuildArtifact = {
  deliveryUnit: {
    appId: 'shell-super-app',
    build: '6e0ed293344c063c',
    buildMarker: '6e0ed293344c063c',
    deployProfile: 'cloudflare-ssr-mf-effect-v1',
    kind: 'microvertical-delivery-unit',
    packageName: '@tractor-store-vertical-demo/shell-super-app',
    schemaVersion: 1,
    sourceRevision: 'workspace',
    unitId: 'tractor-store-vertical-demo/shell-super-app',
    version: '0.1.0',
  },
  kind: 'ultramodern-build-artifact',
  schemaVersion: 1,
  surfaces: {
    api: {
      appId: 'shell-super-app',
      build: '6e0ed293344c063c',
      buildMarker: '6e0ed293344c063c',
      deployProfile: 'cloudflare-ssr-mf-effect-v1',
      kind: 'microvertical-delivery-unit',
      packageName: '@tractor-store-vertical-demo/shell-super-app',
      schemaVersion: 1,
      sourceRevision: 'workspace',
      surface: 'api',
      unitId: 'tractor-store-vertical-demo/shell-super-app',
      version: '0.1.0',
    },
    ui: {
      appId: 'shell-super-app',
      build: '6e0ed293344c063c',
      buildMarker: '6e0ed293344c063c',
      deployProfile: 'cloudflare-ssr-mf-effect-v1',
      kind: 'microvertical-delivery-unit',
      packageName: '@tractor-store-vertical-demo/shell-super-app',
      schemaVersion: 1,
      sourceRevision: 'workspace',
      surface: 'ui',
      unitId: 'tractor-store-vertical-demo/shell-super-app',
      version: '0.1.0',
    },
  },
} as const;

export { ultramodernBuildArtifact };

export const ultramodernDeliveryUnit = ultramodernBuildArtifact.deliveryUnit;
export const ultramodernVerticalIdentity = ultramodernDeliveryUnit;
export const ultramodernUiMarker = ultramodernBuildArtifact.surfaces.ui;
export const ultramodernApiMarker = ultramodernBuildArtifact.surfaces.api;
