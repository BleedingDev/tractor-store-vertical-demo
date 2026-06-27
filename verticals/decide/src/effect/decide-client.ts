import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/plugin-bff/effect-client';
import {
  decideApiContract,
  decideEffectApi,
  decideOperationContexts,
} from '../../shared/effect/api';
import type { OperationContext } from '../../shared/effect/api';

export interface DecideClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

const makeDecideClient = (options: DecideClientOptions = {}) =>
  makeEffectHttpApiClient(decideEffectApi, {
    baseUrl: options.baseUrl ?? decideApiContract.servicePrefix,
  });

export const createDecideClient = (options: DecideClientOptions = {}): unknown =>
  makeDecideClient(options);

export const listDecide = (
  options: DecideClientOptions & { limit?: number } = {},
): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext: options.operationContext ?? decideOperationContexts.list,
      }),
      (client) => client.decide.list({ query: { limit: options.limit } }),
    ),
  );

export const getDecideReadiness = (options: DecideClientOptions = {}): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext: options.operationContext ?? decideOperationContexts.readiness,
      }),
      (client) => client.decide.readiness({}),
    ),
  );

export const getDecide = (id: string, options: DecideClientOptions = {}): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext: options.operationContext ?? decideOperationContexts.get,
      }),
      (client) => client.decide.get({ params: { id } }),
    ),
  );

export const createDecide = (title: string, options: DecideClientOptions = {}): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeDecideClient({
        ...options,
        operationContext: options.operationContext ?? decideOperationContexts.create,
      }),
      (client) => client.decide.create({ payload: { title } }),
    ),
  );
