import { makeEffectHttpApiClient, runEffectRequest } from '@modern-js/plugin-bff/effect-client';
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

export function createCheckoutClient(options: CheckoutClientOptions = {}) {
  return makeEffectHttpApiClient(checkoutEffectApi, {
    baseUrl: options.baseUrl ?? checkoutApiContract.servicePrefix,
  });
}

export function listCheckout(options: CheckoutClientOptions & { limit?: number } = {}) {
  return runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.list,
    }),
  ).then((client) => runEffectRequest(client.checkout.list({ query: { limit: options.limit } })));
}

export function getCheckoutReadiness(options: CheckoutClientOptions = {}) {
  return runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.readiness,
    }),
  ).then((client) => runEffectRequest(client.checkout.readiness({})));
}

export function getCheckout(id: string, options: CheckoutClientOptions = {}) {
  return runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.get,
    }),
  ).then((client) => runEffectRequest(client.checkout.get({ params: { id } })));
}

export function createCheckout(title: string, options: CheckoutClientOptions = {}) {
  return runEffectRequest(
    createCheckoutClient({
      ...options,
      operationContext: options.operationContext ?? checkoutOperationContexts.create,
    }),
  ).then((client) => runEffectRequest(client.checkout.create({ payload: { title } })));
}
