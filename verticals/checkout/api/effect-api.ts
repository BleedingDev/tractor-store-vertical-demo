import apiRuntime from './index.ts';
import {
  checkoutApiContract,
  checkoutEffectApi,
  checkoutOperationContexts,
  ultramodernApiMarker,
} from '../shared/api.ts';

export const backendFederationContract = {
  compatibility: {
    build: ultramodernApiMarker.build,
    contractVersion: 'microvertical-server-effect-v1',
    nodeAdapterVersion: 'backend-mf-effect-v1',
    packageName: '@tractor-store-vertical-demo/checkout',
  },
  executionSurfaces: ['node-mf-runtime'],
  exposes: ['./effect-api'],
  name: 'verticalCheckoutBackend',
  openapiPath: '/checkout-api/openapi.json',
  readinessPath: '/checkout-api/checkout/readiness',
  role: 'microvertical-server',
  runtimeFramework: 'effect',
  strictEffectApproach: true,
} as const;

export const api: unknown = checkoutEffectApi;
export const contract = checkoutApiContract;
export const operationContexts = checkoutOperationContexts;
export const runtime = apiRuntime;

export default apiRuntime;
