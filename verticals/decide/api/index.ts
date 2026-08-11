import {
  defineEffectBff,
  Effect,
  HttpApiBuilder,
  Layer,
} from '@modern-js/plugin-bff/effect-edge';
import { tractorProductVariants } from '@tractor-store-vertical-demo/shared-contracts/tractor-catalog';

import {
  decideEffectApi,
  decideOperationContexts,
  makeDecideNotFound,
  ultramodernApiMarker,
} from '../shared/api.ts';
import type { OperationContext } from '../shared/api.ts';

const decideItems = tractorProductVariants.map((product) => ({
  color: product.color,
  id: product.sku,
  image: product.image,
  marker: ultramodernApiMarker,
  name: product.cartName,
  price: product.price,
  productId: product.id,
  sku: product.sku,
  slug: product.slug,
  title: `${product.cartName} detail ${product.sku}, ${product.price} Ø`,
  variantLabel: product.variantLabel,
}));

const findDecideItem = (id: string) =>
  decideItems.find(
    (item) => item.sku === id || item.productId === id || item.slug === id
  );

const operationAttributes = (operationContext: OperationContext) => ({
  'modernjs.operation.id': operationContext.operationId,
  'modernjs.operation.method': operationContext.method,
  'modernjs.operation.route': operationContext.routePath,
  'modernjs.operation.source': operationContext.source,
  ...(typeof operationContext.traceId === 'string'
    ? { 'modernjs.trace.id': operationContext.traceId }
    : {}),
});

const decideLayer = HttpApiBuilder.group(
  decideEffectApi,
  'decide',
  (handlers) =>
    handlers
      .handle('list', ({ query }) =>
        Effect.succeed({
          items:
            typeof query.limit === 'number'
              ? decideItems.slice(0, query.limit)
              : decideItems,
        }).pipe(
          Effect.withSpan('ultramodern.effect.decide.list', {
            attributes: operationAttributes(decideOperationContexts.list),
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
          Effect.withSpan('ultramodern.effect.decide.readiness', {
            attributes: operationAttributes(decideOperationContexts.readiness),
            kind: 'server',
          })
        )
      )
      .handle('get', ({ params }) => {
        const match = findDecideItem(params.id);
        const result =
          match === undefined
            ? Effect.fail(makeDecideNotFound(params.id))
            : Effect.succeed(match);
        return result.pipe(
          Effect.withSpan('ultramodern.effect.decide.get', {
            attributes: operationAttributes(decideOperationContexts.get),
            kind: 'server',
          })
        );
      })
      .handle('create', ({ payload }) => {
        const item =
          findDecideItem(payload.title) ??
          decideItems.find((candidate) => candidate.name === payload.title);
        const result =
          item === undefined
            ? Effect.fail(makeDecideNotFound(payload.title))
            : Effect.succeed({ item });

        return result.pipe(
          Effect.withSpan('ultramodern.effect.decide.create', {
            attributes: operationAttributes(decideOperationContexts.create),
            kind: 'server',
          })
        );
      })
);

const layer = HttpApiBuilder.layer(decideEffectApi).pipe(
  Layer.provide(decideLayer)
);

const bff: unknown = defineEffectBff({
  api: decideEffectApi,
  layer,
});

export default bff;
