import { resolveUltramodernBuildArtifact } from '@modern-js/runtime-extensions/build-identity';

declare const ULTRAMODERN_BUILD_MARKER: string;
declare const ULTRAMODERN_SOURCE_REVISION: string;

const ultramodernBuildArtifact = resolveUltramodernBuildArtifact(
  {
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
  } as const,
  {
    buildMarker: () => ULTRAMODERN_BUILD_MARKER,
    sourceRevision: () => ULTRAMODERN_SOURCE_REVISION,
  }
);

export const ultramodernDeliveryUnit = ultramodernBuildArtifact.deliveryUnit;
export const ultramodernUiMarker = ultramodernBuildArtifact.surfaces.ui;
export const ultramodernApiMarker = ultramodernBuildArtifact.surfaces.api;
