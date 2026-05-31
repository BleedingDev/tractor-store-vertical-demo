import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/plugin-bff/effect-client';

export const exploreMarkerSchema = Schema.Struct({
  appId: Schema.String,
  build: Schema.String,
  deployProfile: Schema.String,
  packageName: Schema.String,
  surface: Schema.String,
  version: Schema.String,
});

export const exploreItemSchema = Schema.Struct({
  id: Schema.String,
  marker: exploreMarkerSchema,
  title: Schema.String,
});

export const exploreReadinessSchema = Schema.Struct({
  checks: Schema.Struct({
    effectBff: Schema.Literal('ready'),
    moduleFederation: Schema.Literal('ready'),
    ssr: Schema.Literal('ready'),
    translations: Schema.Literal('ready'),
  }),
  marker: exploreMarkerSchema,
  status: Schema.Literal('ready'),
  versionSkew: Schema.Literal('none'),
});

export const exploreCreatePayloadSchema = Schema.Struct({
  title: Schema.String,
});

export class ExploreNotFound extends Schema.TaggedErrorClass<ExploreNotFound>()('ExploreNotFound', {
  id: Schema.String,
}) {}

export const exploreNotFoundSchema = ExploreNotFound.pipe(HttpApiSchema.status(404));

export interface OperationContext {
  operationId: string;
  routePath: string;
  method: string;
  source: string;
  traceId?: string;
}

export const exploreEffectApi = HttpApi.make('ExploreEffectApi').add(
  HttpApiGroup.make('explore')
    .add(
      HttpApiEndpoint.get('list', '/effect/explore', {
        query: {
          limit: Schema.optional(Schema.NumberFromString),
        },
        success: Schema.Struct({
          items: Schema.Array(exploreItemSchema),
        }),
      }),
    )
    .add(
      HttpApiEndpoint.get('readiness', '/effect/explore/readiness', {
        success: exploreReadinessSchema,
      }),
    )
    .add(
      HttpApiEndpoint.get('get', '/effect/explore/:id', {
        error: exploreNotFoundSchema,
        params: {
          id: Schema.String,
        },
        success: exploreItemSchema,
      }),
    )
    .add(
      HttpApiEndpoint.post('create', '/effect/explore', {
        payload: exploreCreatePayloadSchema,
        success: Schema.Struct({
          item: exploreItemSchema,
        }),
      }),
    ),
);

export const exploreOperationContexts = {
  create: {
    method: 'POST',
    operationId: 'ExploreEffectApi:explore:create',
    routePath: '/effect/explore',
    source: 'generated-client',
  },
  get: {
    method: 'GET',
    operationId: 'ExploreEffectApi:explore:get',
    routePath: '/effect/explore/:id',
    source: 'generated-client',
  },
  list: {
    method: 'GET',
    operationId: 'ExploreEffectApi:explore:list',
    routePath: '/effect/explore',
    source: 'generated-client',
  },
  readiness: {
    method: 'GET',
    operationId: 'ExploreEffectApi:explore:readiness',
    routePath: '/effect/explore/readiness',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const exploreApiContract = {
  basePath: '/explore-api/effect/explore',
  ownerId: 'explore',
  readinessPath: '/explore-api/effect/explore/readiness',
  servicePrefix: '/explore-api',
} as const;
