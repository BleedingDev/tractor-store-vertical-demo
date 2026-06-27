import { defineEffectBff, Effect, HttpApiBuilder, Layer } from '@modern-js/plugin-bff/effect-edge';
import {
  exploreEffectApi,
  exploreOperationContexts,
  makeExploreNotFound,
  ultramodernApiMarker,
} from '../../shared/effect/api.ts';
import type { OperationContext } from '../../shared/effect/api.ts';

const exploreItems = [
  {
    id: 'classic-tractors',
    marker: ultramodernApiMarker,
    title: '15 Classic tractor listings served by Explore',
  },
  {
    id: 'autonomous-tractors',
    marker: ultramodernApiMarker,
    title: '8 Autonomous tractor listings served by Explore',
  },
  {
    id: 'store-locator',
    marker: ultramodernApiMarker,
    title: '4 Tractor Store locations served by Explore',
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
      const match = exploreItems.find((exploreItem) => exploreItem.id === params.id);
      const result =
        match === undefined ? Effect.fail(makeExploreNotFound(params.id)) : Effect.succeed(match);
      return result.pipe(
        Effect.withSpan('ultramodern.effect.explore.get', {
          attributes: operationAttributes(exploreOperationContexts.get),
          kind: 'server',
        }),
      );
    })
    .handle('create', ({ payload }) =>
      Effect.succeed({
        item: {
          id: `generated-explore-${payload.title
            .toLowerCase()
            .replaceAll(/[^a-z0-9]+/gu, '-')
            .replaceAll(/^-|-$/gu, '')}`,
          marker: ultramodernApiMarker,
          title: payload.title,
        },
      }).pipe(
        Effect.withSpan('ultramodern.effect.explore.create', {
          attributes: operationAttributes(exploreOperationContexts.create),
          kind: 'server',
        }),
      ),
    ),
);

const layer = HttpApiBuilder.layer(exploreEffectApi).pipe(Layer.provide(exploreLayer));

const bff: unknown = defineEffectBff({
  api: exploreEffectApi,
  layer,
});

export default bff;
