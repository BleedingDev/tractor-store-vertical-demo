import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/plugin-bff/effect-client';
import {
  exploreApiContract,
  exploreEffectApi,
  exploreOperationContexts,
} from '../../shared/effect/api';
import type { OperationContext } from '../../shared/effect/api';

export interface ExploreClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

export const createExploreClient = (options: ExploreClientOptions = {}) =>
  makeEffectHttpApiClient(exploreEffectApi, {
    baseUrl: options.baseUrl ?? exploreApiContract.servicePrefix,
  });

export const listExplore = (options: ExploreClientOptions & { limit?: number } = {}) =>
  runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.list,
    }).pipe(Effect.flatMap((client) => client.explore.list({ query: { limit: options.limit } }))),
  );

export const getExploreReadiness = (options: ExploreClientOptions = {}) =>
  runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.readiness,
    }).pipe(Effect.flatMap((client) => client.explore.readiness({}))),
  );

export const getExplore = (id: string, options: ExploreClientOptions = {}) =>
  runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.get,
    }).pipe(Effect.flatMap((client) => client.explore.get({ params: { id } }))),
  );

export const createExplore = (title: string, options: ExploreClientOptions = {}) =>
  runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.create,
    }).pipe(Effect.flatMap((client) => client.explore.create({ payload: { title } }))),
  );
