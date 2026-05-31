import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/plugin-bff/effect-client';
import {
  checkoutApiContract,
  checkoutEffectApi,
  checkoutOperationContexts,
} from '../../shared/effect/api';
import type { OperationContext } from '../../shared/effect/api';

export interface CheckoutClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

export const createCheckoutClient = (options: CheckoutClientOptions = {}) =>
  makeEffectHttpApiClient(checkoutEffectApi, {
    baseUrl: options.baseUrl ?? checkoutApiContract.servicePrefix,
  });

export const listCheckout = (options: CheckoutClientOptions & { limit?: number } = {}) =>
  runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.list,
    }).pipe(Effect.flatMap((client) => client.checkout.list({ query: { limit: options.limit } }))),
  );

export const getCheckoutReadiness = (options: CheckoutClientOptions = {}) =>
  runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.readiness,
    }).pipe(Effect.flatMap((client) => client.checkout.readiness({}))),
  );

export const getCheckout = (id: string, options: CheckoutClientOptions = {}) =>
  runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.get,
    }).pipe(Effect.flatMap((client) => client.checkout.get({ params: { id } }))),
  );

export const createCheckout = (title: string, options: CheckoutClientOptions = {}) =>
  runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.create,
    }).pipe(Effect.flatMap((client) => client.checkout.create({ payload: { title } }))),
  );
