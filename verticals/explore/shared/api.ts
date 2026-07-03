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
  category: Schema.String,
  id: Schema.String,
  image: Schema.String,
  marker: exploreMarkerSchema,
  name: Schema.String,
  price: Schema.Finite,
  productId: Schema.String,
  sku: Schema.String,
  slug: Schema.String,
  title: Schema.String,
});

export const ultramodernApiMarker = {
  appId: 'explore',
  build: 'b3dc004d99d5acb2',
  deployProfile: 'cloudflare-ssr-mf-effect-v1',
  packageName: '@tractor-store-vertical-demo/explore',
  surface: 'effect-bff',
  version: '0.1.0',
} as const;

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

export interface ExploreNotFound {
  readonly _tag: 'ExploreNotFound';
  readonly id: string;
}

export const exploreNotFoundSchema = Schema.TaggedStruct('ExploreNotFound', {
  id: Schema.String,
}).pipe(HttpApiSchema.status(404));

export const makeExploreNotFound = (id: string): ExploreNotFound => ({
  _tag: 'ExploreNotFound',
  id,
});

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
      HttpApiEndpoint.get('list', '/explore', {
        query: {
          limit: Schema.optional(Schema.FiniteFromString),
        },
        success: Schema.Struct({
          items: Schema.Array(exploreItemSchema),
        }),
      }),
    )
    .add(
      HttpApiEndpoint.get('readiness', '/explore/readiness', {
        success: exploreReadinessSchema,
      }),
    )
    .add(
      HttpApiEndpoint.get('get', '/explore/:id', {
        error: exploreNotFoundSchema,
        params: {
          id: Schema.String,
        },
        success: exploreItemSchema,
      }),
    )
    .add(
      HttpApiEndpoint.post('create', '/explore', {
        error: exploreNotFoundSchema,
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
    routePath: '/explore',
    source: 'generated-client',
  },
  get: {
    method: 'GET',
    operationId: 'ExploreEffectApi:explore:get',
    routePath: '/explore/:id',
    source: 'generated-client',
  },
  list: {
    method: 'GET',
    operationId: 'ExploreEffectApi:explore:list',
    routePath: '/explore',
    source: 'generated-client',
  },
  readiness: {
    method: 'GET',
    operationId: 'ExploreEffectApi:explore:readiness',
    routePath: '/explore/readiness',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const exploreApiContract = {
  basePath: '/explore-api/explore',
  ownerId: 'explore',
  readinessPath: '/explore-api/explore/readiness',
  servicePrefix: '/explore-api',
} as const;

export const exploreApi = exploreEffectApi;
