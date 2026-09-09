import { resolveUltramodernBuildArtifact } from '@modern-js/runtime-extensions/build-identity';

declare const ULTRAMODERN_BUILD_MARKER: string;
declare const ULTRAMODERN_SOURCE_REVISION: string;

const ultramodernBuildArtifact = resolveUltramodernBuildArtifact(
  {
    deliveryUnit: {
      appId: 'shell-super-app',
      build: '052f175d1feea977',
      buildMarker: '052f175d1feea977',
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
        build: '052f175d1feea977',
        buildMarker: '052f175d1feea977',
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
        build: '052f175d1feea977',
        buildMarker: '052f175d1feea977',
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
  } as const,
  {
    buildMarker: () => ULTRAMODERN_BUILD_MARKER,
    sourceRevision: () => ULTRAMODERN_SOURCE_REVISION,
  }
);

export const ultramodernDeliveryUnit = ultramodernBuildArtifact.deliveryUnit;
export const ultramodernUiMarker = ultramodernBuildArtifact.surfaces.ui;
