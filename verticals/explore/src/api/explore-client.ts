import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/plugin-bff/effect-client';
import { exploreApiContract, exploreEffectApi, exploreOperationContexts } from '../../shared/api';
import type { OperationContext } from '../../shared/api';

export interface ExploreClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

const makeExploreClient = (options: ExploreClientOptions = {}) =>
  makeEffectHttpApiClient(exploreEffectApi, {
    baseUrl: options.baseUrl ?? exploreApiContract.servicePrefix,
  });

export const createExploreClient = (options: ExploreClientOptions = {}): unknown =>
  makeExploreClient(options);

export const listExplore = (
  options: ExploreClientOptions & { limit?: number } = {},
): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext: options.operationContext ?? exploreOperationContexts.list,
      }),
      (client) => client.explore.list({ query: { limit: options.limit } }),
    ),
  );

export const getExploreReadiness = (options: ExploreClientOptions = {}): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext: options.operationContext ?? exploreOperationContexts.readiness,
      }),
      (client) => client.explore.readiness({}),
    ),
  );

export const getExplore = (id: string, options: ExploreClientOptions = {}): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext: options.operationContext ?? exploreOperationContexts.get,
      }),
      (client) => client.explore.get({ params: { id } }),
    ),
  );

export const createExplore = (
  title: string,
  options: ExploreClientOptions = {},
): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext: options.operationContext ?? exploreOperationContexts.create,
      }),
      (client) => client.explore.create({ payload: { title } }),
    ),
  );
