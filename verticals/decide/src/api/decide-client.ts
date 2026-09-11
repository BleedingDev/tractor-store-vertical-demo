import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/bff-effect/effect-client';

import {
  decideApiContract,
  decideApi,
  decideOperationContexts,
} from '../../shared/api';
import type { OperationContext } from '../../shared/api';

export interface DecideClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

const makeDecideClient = (options: DecideClientOptions = {}) =>
  makeEffectHttpApiClient(decideApi, {
    baseUrl: options.baseUrl ?? decideApiContract.apiPrefix,
  });

export const createDecideClient = (options: DecideClientOptions = {}) =>
  makeDecideClient(options);

export const listDecide = (
  options: DecideClientOptions & { limit?: number } = {}
) =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext:
          options.operationContext ?? decideOperationContexts.list,
      }),
      (client) => client.decide.list({ query: { limit: options.limit } })
    )
  );

export const getDecideReadiness = (options: DecideClientOptions = {}) =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext:
          options.operationContext ?? decideOperationContexts.readiness,
      }),
      (client) => client.foundation.readiness({})
    )
  );

export const getDecide = (id: string, options: DecideClientOptions = {}) =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext:
          options.operationContext ?? decideOperationContexts.get,
      }),
      (client) => client.decide.get({ params: { id } })
    )
  );

export const createDecide = (
  title: string,
  options: DecideClientOptions = {}
) =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext:
          options.operationContext ?? decideOperationContexts.create,
      }),
      (client) => client.decide.create({ payload: { title } })
    )
  );
