import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/plugin-bff/effect-client';

export const decideMarkerSchema = Schema.Struct({
  appId: Schema.String,
  build: Schema.String,
  buildMarker: Schema.String,
  deployProfile: Schema.String,
  packageName: Schema.String,
  sourceRevision: Schema.String,
  surface: Schema.String,
  unitId: Schema.String,
  version: Schema.String,
});

export const decideItemSchema = Schema.Struct({
  color: Schema.String,
  id: Schema.String,
  image: Schema.String,
  marker: decideMarkerSchema,
  name: Schema.String,
  price: Schema.Finite,
  productId: Schema.String,
  sku: Schema.String,
  slug: Schema.String,
  title: Schema.String,
  variantLabel: Schema.String,
});

export { ultramodernApiMarker } from './ultramodern-build.ts';

export const decideReadinessSchema = Schema.Struct({
  checks: Schema.Struct({
    effectBff: Schema.Literal('ready'),
    moduleFederation: Schema.Literal('ready'),
    ssr: Schema.Literal('ready'),
    translations: Schema.Literal('ready'),
  }),
  marker: decideMarkerSchema,
  status: Schema.Literal('ready'),
  versionSkew: Schema.Literal('none'),
});

export const decideCreatePayloadSchema = Schema.Struct({
  title: Schema.String,
});

export interface DecideNotFound {
  readonly _tag: 'DecideNotFound';
  readonly id: string;
}

export const decideNotFoundSchema = Schema.TaggedStruct('DecideNotFound', {
  id: Schema.String,
}).pipe(HttpApiSchema.status(404));

export const makeDecideNotFound = (id: string): DecideNotFound => ({
  _tag: 'DecideNotFound',
  id,
});

export interface OperationContext {
  operationId: string;
  routePath: string;
  method: string;
  source: string;
  traceId?: string;
}

export const decideEffectApi = HttpApi.make('DecideEffectApi').add(
  HttpApiGroup.make('decide')
    .add(
      HttpApiEndpoint.get('list', '/decide', {
        query: {
          limit: Schema.optional(Schema.FiniteFromString),
        },
        success: Schema.Struct({
          items: Schema.Array(decideItemSchema),
        }),
      })
    )
    .add(
      HttpApiEndpoint.get('readiness', '/decide/readiness', {
        success: decideReadinessSchema,
      })
    )
    .add(
      HttpApiEndpoint.get('get', '/decide/:id', {
        error: decideNotFoundSchema,
        params: {
          id: Schema.String,
        },
        success: decideItemSchema,
      })
    )
    .add(
      HttpApiEndpoint.post('create', '/decide', {
        error: decideNotFoundSchema,
        payload: decideCreatePayloadSchema,
        success: Schema.Struct({
          item: decideItemSchema,
        }),
      })
    )
);

export const decideOperationContexts = {
  create: {
    method: 'POST',
    operationId: 'DecideEffectApi:decide:create',
    routePath: '/decide',
    source: 'generated-client',
  },
  get: {
    method: 'GET',
    operationId: 'DecideEffectApi:decide:get',
    routePath: '/decide/:id',
    source: 'generated-client',
  },
  list: {
    method: 'GET',
    operationId: 'DecideEffectApi:decide:list',
    routePath: '/decide',
    source: 'generated-client',
  },
  readiness: {
    method: 'GET',
    operationId: 'DecideEffectApi:decide:readiness',
    routePath: '/decide/readiness',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const decideApiContract = {
  basePath: '/decide-api/decide',
  ownerId: 'decide',
  readinessPath: '/decide-api/decide/readiness',
  servicePrefix: '/decide-api',
} as const;

export const decideApi = decideEffectApi;
