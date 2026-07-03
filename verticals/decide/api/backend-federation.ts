import runtime from './index.ts';
import { ultramodernApiMarker } from '../shared/ultramodern-build.ts';
import {
  decideApi as api,
  decideApiContract as contract,
  decideOperationContexts as operationContexts,
} from '../shared/api.ts';

export const backendFederationContract = {
  compatibility: {
    build: ultramodernApiMarker.build,
    contractVersion: 'microvertical-server-effect-v1',
    nodeAdapterVersion: 'backend-mf-effect-v1',
    packageName: ultramodernApiMarker.packageName,
  },
  contractVersion: 'microvertical-server-effect-v1',
  executionSurfaces: ['node-mf-runtime'],
  exposes: ['./effect-api'],
  name: 'verticalDecideBackend',
  nodeAdapterVersion: 'backend-mf-effect-v1',
  openapiPath: '/decide-api/openapi.json',
  readinessPath: '/decide-api/decide/readiness',
  role: 'microvertical-server',
  runtimeFramework: 'effect',
  strictEffectApproach: true,
} as const;

export { api, contract, operationContexts, runtime };

export default runtime;
