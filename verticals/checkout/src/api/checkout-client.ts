import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/bff-effect/effect-client';

import {
  checkoutApiContract,
  checkoutApi,
  checkoutOperationContexts,
} from '../../shared/api';
import type { OperationContext } from '../../shared/api';

export interface CheckoutClientOptions {
  baseUrl?: string | URL;
  locale?: string;
  operationContext?: OperationContext;
  traceparent?: string;
}

const makeCheckoutClient = (options: CheckoutClientOptions = {}) =>
  makeEffectHttpApiClient(checkoutApi, {
    baseUrl: options.baseUrl ?? checkoutApiContract.apiPrefix,
  });

export const createCheckoutClient = (options: CheckoutClientOptions = {}) =>
  makeCheckoutClient(options);

export const listCheckout = (
  options: CheckoutClientOptions & { limit?: number } = {}
) =>
  runEffectRequest(
    Effect.flatMap(
      makeCheckoutClient({
        ...options,
        operationContext:
          options.operationContext ?? checkoutOperationContexts.list,
      }),
      (client) => client.checkout.list({ query: { limit: options.limit } })
    )
  );

export const getCheckoutReadiness = (options: CheckoutClientOptions = {}) =>
  runEffectRequest(
    Effect.flatMap(
      makeCheckoutClient({
        ...options,
        operationContext:
          options.operationContext ?? checkoutOperationContexts.readiness,
      }),
      (client) => client.foundation.readiness({})
    )
  );

export const getCheckout = (id: string, options: CheckoutClientOptions = {}) =>
  runEffectRequest(
    Effect.flatMap(
      makeCheckoutClient({
        ...options,
        operationContext:
          options.operationContext ?? checkoutOperationContexts.get,
      }),
      (client) => client.checkout.get({ params: { id } })
    )
  );

export const createCheckout = (
  sku: string,
  options: CheckoutClientOptions & { quantity?: number } = {}
) =>
  runEffectRequest(
    Effect.flatMap(
      makeCheckoutClient({
        ...options,
        operationContext:
          options.operationContext ?? checkoutOperationContexts.create,
      }),
      (client) =>
        client.checkout.create({
          payload: { quantity: options.quantity, sku },
        })
    )
  );
