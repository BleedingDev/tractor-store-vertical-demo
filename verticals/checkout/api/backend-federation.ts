import runtime from './index.ts';
import { ultramodernApiMarker } from '../shared/ultramodern-build.ts';
import {
  checkoutApi as api,
  checkoutApiContract as contract,
  checkoutOperationContexts as operationContexts,
} from '../shared/api.ts';

export const backendFederationContract = {
  compatibility: {
    build: ultramodernApiMarker.build,
    contractVersion: 'microvertical-server-effect-v1',
    nodeAdapterVersion: 'backend-mf-effect-v1',
    packageName: ultramodernApiMarker.packageName,
    sourceRevision: ultramodernApiMarker.sourceRevision,
    unitId: ultramodernApiMarker.unitId,
  },
  contractVersion: 'microvertical-server-effect-v1',
  executionSurfaces: ['node-mf-runtime'],
  exposes: ['./effect-api'],
  name: 'verticalCheckoutBackend',
  nodeAdapterVersion: 'backend-mf-effect-v1',
  openapiPath: '/checkout-api/openapi.json',
  readinessPath: '/checkout-api/checkout/readiness',
  role: 'microvertical-server',
  runtimeFramework: 'effect',
  strictEffectApproach: true,
} as const;

export { api, contract, operationContexts, runtime };

export default runtime;
