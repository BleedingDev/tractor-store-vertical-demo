declare const ULTRAMODERN_BUILD_MARKER: string;
declare const ULTRAMODERN_SOURCE_REVISION: string;

const ultramodernGeneratedBuildArtifact = {
  deliveryUnit: {
    appId: 'decide',
    build: '36fc602031c23930',
    buildMarker: '36fc602031c23930',
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
      build: '36fc602031c23930',
      buildMarker: '36fc602031c23930',
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
      build: '36fc602031c23930',
      buildMarker: '36fc602031c23930',
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
const ultramodernBuildMarker =
  typeof ULTRAMODERN_BUILD_MARKER === 'string'
    ? ULTRAMODERN_BUILD_MARKER
    : ultramodernGeneratedBuildArtifact.deliveryUnit.buildMarker;
const ultramodernSourceRevision =
  typeof ULTRAMODERN_SOURCE_REVISION === 'string'
    ? ULTRAMODERN_SOURCE_REVISION
    : ultramodernGeneratedBuildArtifact.deliveryUnit.sourceRevision;
const ultramodernBuildArtifact = {
  ...ultramodernGeneratedBuildArtifact,
  deliveryUnit: {
    ...ultramodernGeneratedBuildArtifact.deliveryUnit,
    build: ultramodernBuildMarker,
    buildMarker: ultramodernBuildMarker,
    sourceRevision: ultramodernSourceRevision,
  },
  surfaces: {
    api: {
      ...ultramodernGeneratedBuildArtifact.surfaces.api,
      build: ultramodernBuildMarker,
      buildMarker: ultramodernBuildMarker,
      sourceRevision: ultramodernSourceRevision,
    },
    ui: {
      ...ultramodernGeneratedBuildArtifact.surfaces.ui,
      build: ultramodernBuildMarker,
      buildMarker: ultramodernBuildMarker,
      sourceRevision: ultramodernSourceRevision,
    },
  },
} as const;

export { ultramodernBuildArtifact };

export const ultramodernDeliveryUnit = ultramodernBuildArtifact.deliveryUnit;
export const ultramodernVerticalIdentity = ultramodernDeliveryUnit;
export const ultramodernUiMarker = ultramodernBuildArtifact.surfaces.ui;
export const ultramodernApiMarker = ultramodernBuildArtifact.surfaces.api;
