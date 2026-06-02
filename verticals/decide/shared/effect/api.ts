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
  deployProfile: Schema.String,
  packageName: Schema.String,
  surface: Schema.String,
  version: Schema.String,
});

export const decideItemSchema = Schema.Struct({
  id: Schema.String,
  marker: decideMarkerSchema,
  title: Schema.String,
});

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

export class DecideNotFound extends Schema.TaggedErrorClass<DecideNotFound>()('DecideNotFound', {
  id: Schema.String,
}) {}

export const decideNotFoundSchema = DecideNotFound.pipe(HttpApiSchema.status(404));

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
      HttpApiEndpoint.get('list', '/effect/decide', {
        query: {
          limit: Schema.optional(Schema.NumberFromString),
        },
        success: Schema.Struct({
          items: Schema.Array(decideItemSchema),
        }),
      }),
    )
    .add(
      HttpApiEndpoint.get('readiness', '/effect/decide/readiness', {
        success: decideReadinessSchema,
      }),
    )
    .add(
      HttpApiEndpoint.get('get', '/effect/decide/:id', {
        error: decideNotFoundSchema,
        params: {
          id: Schema.String,
        },
        success: decideItemSchema,
      }),
    )
    .add(
      HttpApiEndpoint.post('create', '/effect/decide', {
        payload: decideCreatePayloadSchema,
        success: Schema.Struct({
          item: decideItemSchema,
        }),
      }),
    ),
);

export const decideOperationContexts = {
  create: {
    method: 'POST',
    operationId: 'DecideEffectApi:decide:create',
    routePath: '/effect/decide',
    source: 'generated-client',
  },
  get: {
    method: 'GET',
    operationId: 'DecideEffectApi:decide:get',
    routePath: '/effect/decide/:id',
    source: 'generated-client',
  },
  list: {
    method: 'GET',
    operationId: 'DecideEffectApi:decide:list',
    routePath: '/effect/decide',
    source: 'generated-client',
  },
  readiness: {
    method: 'GET',
    operationId: 'DecideEffectApi:decide:readiness',
    routePath: '/effect/decide/readiness',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const decideApiContract = {
  basePath: '/decide-api/effect/decide',
  ownerId: 'decide',
  readinessPath: '/decide-api/effect/decide/readiness',
  servicePrefix: '/decide-api',
} as const;
