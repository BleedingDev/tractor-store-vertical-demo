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

export const createDecideClient = (options: DecideClientOptions = {}) =>
  makeEffectHttpApiClient(decideEffectApi, {
    baseUrl: options.baseUrl ?? decideApiContract.servicePrefix,
  });

export const listDecide = (options: DecideClientOptions & { limit?: number } = {}) =>
  runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.list,
    }).pipe(Effect.flatMap((client) => client.decide.list({ query: { limit: options.limit } }))),
  );

export const getDecideReadiness = (options: DecideClientOptions = {}) =>
  runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.readiness,
    }).pipe(Effect.flatMap((client) => client.decide.readiness({}))),
  );

export const getDecide = (id: string, options: DecideClientOptions = {}) =>
  runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.get,
    }).pipe(Effect.flatMap((client) => client.decide.get({ params: { id } }))),
  );

export const createDecide = (title: string, options: DecideClientOptions = {}) =>
  runEffectRequest(
    createDecideClient({
      ...options,
      operationContext: options.operationContext ?? decideOperationContexts.create,
    }).pipe(Effect.flatMap((client) => client.decide.create({ payload: { title } }))),
  );
