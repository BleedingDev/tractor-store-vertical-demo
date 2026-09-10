import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/bff-effect/effect-client';

import {
  exploreApiContract,
  exploreApi,
  exploreOperationContexts,
} from '../../shared/api';
import type { OperationContext } from '../../shared/api';

export interface ExploreClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

const makeExploreClient = (options: ExploreClientOptions = {}) =>
  makeEffectHttpApiClient(exploreApi, {
    baseUrl: options.baseUrl ?? exploreApiContract.apiPrefix,
  });

export const createExploreClient = (options: ExploreClientOptions = {}) =>
  makeExploreClient(options);

export const listExplore = (
  options: ExploreClientOptions & { limit?: number } = {}
) =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext:
          options.operationContext ?? exploreOperationContexts.list,
      }),
      (client) => client.explore.list({ query: { limit: options.limit } })
    )
  );

export const getExploreReadiness = (options: ExploreClientOptions = {}) =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext:
          options.operationContext ?? exploreOperationContexts.readiness,
      }),
      (client) => client.foundation.readiness({})
    )
  );

export const getExplore = (id: string, options: ExploreClientOptions = {}) =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext:
          options.operationContext ?? exploreOperationContexts.get,
      }),
      (client) => client.explore.get({ params: { id } })
    )
  );

export const createExplore = (
  title: string,
  options: ExploreClientOptions = {}
) =>
  runEffectRequest(
    Effect.flatMap(
      makeExploreClient({
        ...options,
        operationContext:
          options.operationContext ?? exploreOperationContexts.create,
      }),
      (client) => client.explore.create({ payload: { title } })
    )
  );
