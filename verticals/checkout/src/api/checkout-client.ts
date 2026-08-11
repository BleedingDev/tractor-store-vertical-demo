import {
  Effect,
  makeEffectHttpApiClient,
  runEffectRequest,
} from '@modern-js/plugin-bff/effect-client';

import {
  checkoutApiContract,
  checkoutEffectApi,
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
  makeEffectHttpApiClient(checkoutEffectApi, {
    baseUrl: options.baseUrl ?? checkoutApiContract.servicePrefix,
  });

export const createCheckoutClient = (
  options: CheckoutClientOptions = {}
): unknown => makeCheckoutClient(options);

export const listCheckout = (
  options: CheckoutClientOptions & { limit?: number } = {}
): Promise<unknown> =>
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

export const getCheckoutReadiness = (
  options: CheckoutClientOptions = {}
): Promise<unknown> =>
  runEffectRequest(
    Effect.flatMap(
      makeCheckoutClient({
        ...options,
        operationContext:
          options.operationContext ?? checkoutOperationContexts.readiness,
      }),
      (client) => client.checkout.readiness({})
    )
  );

export const getCheckout = (
  id: string,
  options: CheckoutClientOptions = {}
): Promise<unknown> =>
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
): Promise<unknown> =>
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
