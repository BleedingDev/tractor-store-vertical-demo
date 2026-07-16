import { exploreEffectApi, ultramodernApiMarker } from '../shared/api.ts';

export {
  exploreApiContract as contract,
  exploreOperationContexts as operationContexts,
} from '../shared/api.ts';
export { default, default as runtime } from './index.ts';

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
