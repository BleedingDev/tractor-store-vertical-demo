import {
  defineEffectBff,
  Effect,
  HttpApiBuilder,
  Layer,
} from '@modern-js/plugin-bff/effect-edge';
import { ultramodernApiMarker } from '../../src/ultramodern-build';
import {
  checkoutEffectApi,
  checkoutOperationContexts,
  CheckoutNotFound,
  type OperationContext,
} from '../../shared/effect/api';

const checkoutItems = [
  {
    id: 'starter-checkout',
    marker: ultramodernApiMarker,
    title: 'Wire a real checkout source here',
  },
];

const operationAttributes = (operationContext: OperationContext) => {
  return {
    'modernjs.operation.id': operationContext.operationId,
    'modernjs.operation.method': operationContext.method,
    'modernjs.operation.route': operationContext.routePath,
    'modernjs.operation.source': operationContext.source,
    ...(typeof operationContext.traceId === 'string'
      ? { 'modernjs.trace.id': operationContext.traceId }
      : {}),
  };
};

const checkoutLayer = HttpApiBuilder.group(
  checkoutEffectApi,
  'checkout',
  (handlers) =>
    handlers
      .handle('list', ({ query }) =>
        Effect.succeed({
          items:
            typeof query.limit === 'number'
              ? checkoutItems.slice(0, query.limit)
              : checkoutItems,
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
        const item = checkoutItems.find(item => item.id === params.id);
        return (item !== undefined
          ? Effect.succeed(item)
          : Effect.fail(new CheckoutNotFound({ id: params.id }))).pipe(
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
              .replaceAll(/[^a-z0-9]+/g, '-')
              .replaceAll(/^-|-$/g, '')}`,
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

const layer = HttpApiBuilder.layer(checkoutEffectApi).pipe(
  Layer.provide(checkoutLayer),
);

export default defineEffectBff({
  api: checkoutEffectApi,
  layer,
});
