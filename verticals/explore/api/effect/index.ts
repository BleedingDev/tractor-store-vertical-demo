import {
  defineEffectBff,
  Effect,
  HttpApiBuilder,
  Layer,
} from '@modern-js/plugin-bff/effect-edge';
import { ultramodernApiMarker } from '../../src/ultramodern-build';
import {
  exploreEffectApi,
  exploreOperationContexts,
  ExploreNotFound,
  type OperationContext,
} from '../../shared/effect/api';

const exploreItems = [
  {
    id: 'starter-explore',
    marker: ultramodernApiMarker,
    title: 'Wire a real explore source here',
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

const exploreLayer = HttpApiBuilder.group(
  exploreEffectApi,
  'explore',
  (handlers) =>
    handlers
      .handle('list', ({ query }) =>
        Effect.succeed({
          items:
            typeof query.limit === 'number'
              ? exploreItems.slice(0, query.limit)
              : exploreItems,
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
        const item = exploreItems.find(item => item.id === params.id);
        return (item !== undefined
          ? Effect.succeed(item)
          : Effect.fail(new ExploreNotFound({ id: params.id }))).pipe(
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
              .replaceAll(/[^a-z0-9]+/g, '-')
              .replaceAll(/^-|-$/g, '')}`,
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

const layer = HttpApiBuilder.layer(exploreEffectApi).pipe(
  Layer.provide(exploreLayer),
);

export default defineEffectBff({
  api: exploreEffectApi,
  layer,
});
