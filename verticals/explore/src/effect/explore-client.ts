import { makeEffectHttpApiClient, runEffectRequest } from '@modern-js/plugin-bff/effect-client';
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

export function createExploreClient(options: ExploreClientOptions = {}) {
  return makeEffectHttpApiClient(exploreEffectApi, {
    baseUrl: options.baseUrl ?? exploreApiContract.servicePrefix,
  });
}

export function listExplore(options: ExploreClientOptions & { limit?: number } = {}) {
  return runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.list,
    }),
  ).then((client) => runEffectRequest(client.explore.list({ query: { limit: options.limit } })));
}

export function getExploreReadiness(options: ExploreClientOptions = {}) {
  return runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.readiness,
    }),
  ).then((client) => runEffectRequest(client.explore.readiness({})));
}

export function getExplore(id: string, options: ExploreClientOptions = {}) {
  return runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.get,
    }),
  ).then((client) => runEffectRequest(client.explore.get({ params: { id } })));
}

export function createExplore(title: string, options: ExploreClientOptions = {}) {
  return runEffectRequest(
    createExploreClient({
      ...options,
      operationContext: options.operationContext ?? exploreOperationContexts.create,
    }),
  ).then((client) => runEffectRequest(client.explore.create({ payload: { title } })));
}
