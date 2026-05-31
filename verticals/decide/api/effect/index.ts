import { defineEffectBff, Effect, HttpApiBuilder, Layer } from '@modern-js/plugin-bff/effect-edge';
import { ultramodernApiMarker } from '../../src/ultramodern-build.ts';
import {
  decideEffectApi,
  decideOperationContexts,
  DecideNotFound,
} from '../../shared/effect/api.ts';
import type { OperationContext } from '../../shared/effect/api.ts';

const decideItems = [
  {
    id: 'CL-08',
    marker: ultramodernApiMarker,
    title: 'Holland Hamster product detail with CL-08-GR and CL-08-PI variants',
  },
  {
    id: 'CL-08-GR',
    marker: ultramodernApiMarker,
    title: 'Holland Hamster Polder Green, 7750 Ø, in stock',
  },
  {
    id: 'CL-08-PI',
    marker: ultramodernApiMarker,
    title: 'Holland Hamster Tulip Magenta, 7900 Ø, in stock',
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

const decideLayer = HttpApiBuilder.group(decideEffectApi, 'decide', (handlers) =>
  handlers
    .handle('list', ({ query }) =>
      Effect.succeed({
        items: typeof query.limit === 'number' ? decideItems.slice(0, query.limit) : decideItems,
      }).pipe(
        Effect.withSpan('ultramodern.effect.decide.list', {
          attributes: operationAttributes(decideOperationContexts.list),
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
        Effect.withSpan('ultramodern.effect.decide.readiness', {
          attributes: operationAttributes(decideOperationContexts.readiness),
          kind: 'server',
        }),
      ),
    )
    .handle('get', ({ params }) => {
      const item = decideItems.find((item) => item.id === params.id);
      return (
        item !== undefined
          ? Effect.succeed(item)
          : Effect.fail(new DecideNotFound({ id: params.id }))
      ).pipe(
        Effect.withSpan('ultramodern.effect.decide.get', {
          attributes: operationAttributes(decideOperationContexts.get),
          kind: 'server',
        }),
      );
    })
    .handle('create', ({ payload }) =>
      Effect.succeed({
        item: {
          id: `generated-decide-${payload.title
            .toLowerCase()
            .replaceAll(/[^a-z0-9]+/g, '-')
            .replaceAll(/^-|-$/g, '')}`,
          marker: ultramodernApiMarker,
          title: payload.title,
        },
      }).pipe(
        Effect.withSpan('ultramodern.effect.decide.create', {
          attributes: operationAttributes(decideOperationContexts.create),
          kind: 'server',
        }),
      ),
    ),
);

const layer = HttpApiBuilder.layer(decideEffectApi).pipe(Layer.provide(decideLayer));

export default defineEffectBff({
  api: decideEffectApi,
  layer,
});
