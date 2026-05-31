import { makeEffectHttpApiClient, runEffectRequest } from '@modern-js/plugin-bff/effect-client';
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

export function createDecideClient(options: DecideClientOptions = {}) {
  return makeEffectHttpApiClient(decideEffectApi, {
    baseUrl: options.baseUrl ?? decideApiContract.servicePrefix,
  });
}

export function listDecide(options: DecideClientOptions & { limit?: number } = {}) {
  return runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.list,
    }),
  ).then((client) => runEffectRequest(client.decide.list({ query: { limit: options.limit } })));
}

export function getDecideReadiness(options: DecideClientOptions = {}) {
  return runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.readiness,
    }),
  ).then((client) => runEffectRequest(client.decide.readiness({})));
}

export function getDecide(id: string, options: DecideClientOptions = {}) {
  return runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.get,
    }),
  ).then((client) => runEffectRequest(client.decide.get({ params: { id } })));
}

export function createDecide(title: string, options: DecideClientOptions = {}) {
  return runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.create,
    }),
  ).then((client) => runEffectRequest(client.decide.create({ payload: { title } })));
}
