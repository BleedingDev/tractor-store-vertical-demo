import { decideEffectApi, ultramodernApiMarker } from '../shared/api.ts';

export {
  decideApiContract as contract,
  decideOperationContexts as operationContexts,
} from '../shared/api.ts';
export { default, default as runtime } from './index.ts';

export const backendFederationContract = {
  compatibility: {
    build: ultramodernApiMarker.build,
    contractVersion: 'microvertical-server-effect-v1',
    nodeAdapterVersion: 'backend-mf-effect-v1',
    packageName: '@tractor-store-vertical-demo/decide',
  },
  executionSurfaces: ['node-mf-runtime'],
  exposes: ['./effect-api'],
  name: 'verticalDecideBackend',
  openapiPath: '/decide-api/openapi.json',
  readinessPath: '/decide-api/decide/readiness',
  role: 'microvertical-server',
  runtimeFramework: 'effect',
  strictEffectApproach: true,
} as const;

export const api: unknown = decideEffectApi;
