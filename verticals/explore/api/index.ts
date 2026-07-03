import { defineEffectBff, Effect, HttpApiBuilder, Layer } from '@modern-js/plugin-bff/effect-edge';
import {
  exploreEffectApi,
  exploreOperationContexts,
  makeExploreNotFound,
  ultramodernApiMarker,
} from '../shared/api.ts';
import type { OperationContext } from '../shared/api.ts';
import { tractorProducts } from '@tractor-store-vertical-demo/shared-contracts/tractor-catalog';

const exploreItems = tractorProducts.map((product) => ({
  category: product.category,
  id: product.sku,
  image: product.image,
  marker: ultramodernApiMarker,
  name: product.name,
  price: product.startPrice,
  productId: product.id,
  sku: product.sku,
  slug: product.slug,
  title: `${product.name} listing ${product.sku}, from ${product.startPrice} Ø`,
}));

const findExploreItem = (id: string) =>
  exploreItems.find((item) => item.sku === id || item.slug === id);

const operationAttributes = (operationContext: OperationContext) => ({
  'modernjs.operation.id': operationContext.operationId,
  'modernjs.operation.method': operationContext.method,
  'modernjs.operation.route': operationContext.routePath,
  'modernjs.operation.source': operationContext.source,
  ...(typeof operationContext.traceId === 'string'
    ? { 'modernjs.trace.id': operationContext.traceId }
    : {}),
});

const exploreLayer = HttpApiBuilder.group(exploreEffectApi, 'explore', (handlers) =>
  handlers
    .handle('list', ({ query }) =>
      Effect.succeed({
        items: typeof query.limit === 'number' ? exploreItems.slice(0, query.limit) : exploreItems,
      }).pipe(
        Effect.withSpan('ultramodern.effect.explore.list', {
          attributes: operationAttributes(exploreOperationContexts.list),
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
        Effect.withSpan('ultramodern.effect.explore.readiness', {
          attributes: operationAttributes(exploreOperationContexts.readiness),
          kind: 'server',
        }),
      ),
    )
    .handle('get', ({ params }) => {
      const match = findExploreItem(params.id);
      const result =
        match === undefined ? Effect.fail(makeExploreNotFound(params.id)) : Effect.succeed(match);
      return result.pipe(
        Effect.withSpan('ultramodern.effect.explore.get', {
          attributes: operationAttributes(exploreOperationContexts.get),
          kind: 'server',
        }),
      );
    })
    .handle('create', ({ payload }) => {
      const item =
        findExploreItem(payload.title) ??
        exploreItems.find((candidate) => candidate.name === payload.title);
      const result =
        item === undefined
          ? Effect.fail(makeExploreNotFound(payload.title))
          : Effect.succeed({ item });

      return result.pipe(
        Effect.withSpan('ultramodern.effect.explore.create', {
          attributes: operationAttributes(exploreOperationContexts.create),
          kind: 'server',
        }),
      );
    }),
);

const layer = HttpApiBuilder.layer(exploreEffectApi).pipe(Layer.provide(exploreLayer));

const bff: unknown = defineEffectBff({
  api: exploreEffectApi,
  layer,
});

export default bff;
