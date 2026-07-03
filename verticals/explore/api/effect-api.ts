import apiRuntime from './index.ts';
import {
  exploreApiContract,
  exploreEffectApi,
  exploreOperationContexts,
  ultramodernApiMarker,
} from '../shared/api.ts';

export const backendFederationContract = {
  compatibility: {
    build: ultramodernApiMarker.build,
    contractVersion: 'microvertical-server-effect-v1',
    nodeAdapterVersion: 'backend-mf-effect-v1',
    packageName: '@tractor-store-vertical-demo/explore',
  },
  executionSurfaces: ['node-mf-runtime'],
  exposes: ['./effect-api'],
  name: 'verticalExploreBackend',
  openapiPath: '/explore-api/openapi.json',
  readinessPath: '/explore-api/explore/readiness',
  role: 'microvertical-server',
  runtimeFramework: 'effect',
  strictEffectApproach: true,
} as const;

export const api: unknown = exploreEffectApi;
export const contract = exploreApiContract;
export const operationContexts = exploreOperationContexts;
export const runtime = apiRuntime;

export default apiRuntime;
