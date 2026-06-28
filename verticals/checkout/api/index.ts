import { defineEffectBff, Effect, HttpApiBuilder, Layer } from '@modern-js/plugin-bff/effect-edge';
import {
  checkoutEffectApi,
  checkoutOperationContexts,
  makeCheckoutNotFound,
  ultramodernApiMarker,
} from '../shared/api.ts';
import type { OperationContext } from '../shared/api.ts';

const checkoutItems = [
  {
    id: 'basket-default',
    marker: ultramodernApiMarker,
    title: 'Basket with one Holland Hamster Polder Green line item',
  },
  {
    id: 'CL-08-GR',
    marker: ultramodernApiMarker,
    title: 'Checkout line item for Holland Hamster Polder Green, quantity 1, total 7750 Ø',
  },
];

const operationAttributes = (operationContext: OperationContext) => ({
  'modernjs.operation.id': operationContext.operationId,
  'modernjs.operation.method': operationContext.method,
  'modernjs.operation.route': operationContext.routePath,
  'modernjs.operation.source': operationContext.source,
  ...(typeof operationContext.traceId === 'string'
    ? { 'modernjs.trace.id': operationContext.traceId }
    : {}),
});

const checkoutLayer = HttpApiBuilder.group(checkoutEffectApi, 'checkout', (handlers) =>
  handlers
    .handle('list', ({ query }) =>
      Effect.succeed({
        items:
          typeof query.limit === 'number' ? checkoutItems.slice(0, query.limit) : checkoutItems,
      }).pipe(
        Effect.withSpan('ultramodern.effect.checkout.list', {
          attributes: operationAttributes(checkoutOperationContexts.list),
          kind: 'server',
        }),
      ),
    )
    .handle('readiness', () =>
      Effect.succeed({
        checks: {
          effectBff: 'ready' as const,
          moduleFederation: 'ready' as const,
          ssr: 'ready' as const,
          translations: 'ready' as const,
        },
        marker: ultramodernApiMarker,
        status: 'ready' as const,
        versionSkew: 'none' as const,
      }).pipe(
        Effect.withSpan('ultramodern.effect.checkout.readiness', {
          attributes: operationAttributes(checkoutOperationContexts.readiness),
          kind: 'server',
        }),
      ),
    )
    .handle('get', ({ params }) => {
      const match = checkoutItems.find((checkoutItem) => checkoutItem.id === params.id);
      const result =
        match === undefined ? Effect.fail(makeCheckoutNotFound(params.id)) : Effect.succeed(match);
      return result.pipe(
        Effect.withSpan('ultramodern.effect.checkout.get', {
          attributes: operationAttributes(checkoutOperationContexts.get),
          kind: 'server',
        }),
      );
    })
    .handle('create', ({ payload }) =>
      Effect.succeed({
        item: {
          id: `generated-checkout-${payload.title
            .toLowerCase()
            .replaceAll(/[^a-z0-9]+/gu, '-')
            .replaceAll(/^-|-$/gu, '')}`,
          marker: ultramodernApiMarker,
          title: payload.title,
        },
      }).pipe(
        Effect.withSpan('ultramodern.effect.checkout.create', {
          attributes: operationAttributes(checkoutOperationContexts.create),
          kind: 'server',
        }),
      ),
    ),
);

const layer = HttpApiBuilder.layer(checkoutEffectApi).pipe(Layer.provide(checkoutLayer));

const bff: unknown = defineEffectBff({
  api: checkoutEffectApi,
  layer,
});

export default bff;
