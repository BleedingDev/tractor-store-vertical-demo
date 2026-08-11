import {
  defineEffectBff,
  Effect,
  HttpApiBuilder,
  Layer,
} from '@modern-js/plugin-bff/effect-edge';
import {
  findTractorVariant,
  tractorProductVariants,
} from '@tractor-store-vertical-demo/shared-contracts/tractor-catalog';

import {
  checkoutEffectApi,
  checkoutOperationContexts,
  makeCheckoutNotFound,
  ultramodernApiMarker,
} from '../shared/api.ts';
import type { OperationContext } from '../shared/api.ts';

const normalizeQuantity = (quantity: number | undefined) =>
  typeof quantity === 'number' && Number.isFinite(quantity) && quantity > 0
    ? Math.trunc(quantity)
    : 1;

const checkoutItemFromSku = (sku: string, quantity = 1) => {
  const product = findTractorVariant(sku);
  if (product === undefined) {
    return;
  }

  const normalizedQuantity = normalizeQuantity(quantity);
  const lineTotal = product.price * normalizedQuantity;

  return {
    id: product.sku,
    image: product.image,
    lineTotal,
    marker: ultramodernApiMarker,
    name: product.cartName,
    price: product.price,
    quantity: normalizedQuantity,
    sku: product.sku,
    slug: product.slug,
    title: `Checkout line item for ${product.cartName}, quantity ${normalizedQuantity}, total ${lineTotal} Ø`,
  };
};

type CheckoutItem = NonNullable<ReturnType<typeof checkoutItemFromSku>>;

const isCheckoutItem = (
  item: ReturnType<typeof checkoutItemFromSku>
): item is CheckoutItem => item !== undefined;

const checkoutItems = tractorProductVariants
  .map((product) => checkoutItemFromSku(product.sku))
  .filter(isCheckoutItem);

const operationAttributes = (operationContext: OperationContext) => ({
  'modernjs.operation.id': operationContext.operationId,
  'modernjs.operation.method': operationContext.method,
  'modernjs.operation.route': operationContext.routePath,
  'modernjs.operation.source': operationContext.source,
  ...(typeof operationContext.traceId === 'string'
    ? { 'modernjs.trace.id': operationContext.traceId }
    : {}),
});

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
          })
        )
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
            attributes: operationAttributes(
              checkoutOperationContexts.readiness
            ),
            kind: 'server',
          })
        )
      )
      .handle('get', ({ params }) => {
        const match = checkoutItemFromSku(params.id);
        const result =
          match === undefined
            ? Effect.fail(makeCheckoutNotFound(params.id))
            : Effect.succeed(match);
        return result.pipe(
          Effect.withSpan('ultramodern.effect.checkout.get', {
            attributes: operationAttributes(checkoutOperationContexts.get),
            kind: 'server',
          })
        );
      })
      .handle('create', ({ payload }) => {
        const item = checkoutItemFromSku(payload.sku, payload.quantity);
        const result =
          item === undefined
            ? Effect.fail(makeCheckoutNotFound(payload.sku))
            : Effect.succeed({ item });

        return result.pipe(
          Effect.withSpan('ultramodern.effect.checkout.create', {
            attributes: operationAttributes(checkoutOperationContexts.create),
            kind: 'server',
          })
        );
      })
);

const layer = HttpApiBuilder.layer(checkoutEffectApi).pipe(
  Layer.provide(checkoutLayer)
);

const bff: unknown = defineEffectBff({
  api: checkoutEffectApi,
  layer,
});

export default bff;
