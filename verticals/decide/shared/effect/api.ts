import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/plugin-bff/effect-client';

export const decideMarkerSchema = Schema.Struct({
  appId: Schema.String,
  packageName: Schema.String,
  version: Schema.String,
  build: Schema.String,
  deployProfile: Schema.String,
  surface: Schema.String,
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

export class DecideNotFound extends Schema.TaggedErrorClass<DecideNotFound>()(
  'DecideNotFound',
  {
    id: Schema.String,
  },
) {}

export const decideNotFoundSchema = DecideNotFound.pipe(
  HttpApiSchema.status(404),
);

export type OperationContext = {
  operationId: string;
  routePath: string;
  method: string;
  source: string;
  traceId?: string;
};

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
        params: {
          id: Schema.String,
        },
        success: decideItemSchema,
        error: decideNotFoundSchema,
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
  list: {
    operationId: 'DecideEffectApi:decide:list',
    routePath: '/effect/decide',
    method: 'GET',
    source: 'generated-client',
  },
  readiness: {
    operationId: 'DecideEffectApi:decide:readiness',
    routePath: '/effect/decide/readiness',
    method: 'GET',
    source: 'generated-client',
  },
  get: {
    operationId: 'DecideEffectApi:decide:get',
    routePath: '/effect/decide/:id',
    method: 'GET',
    source: 'generated-client',
  },
  create: {
    operationId: 'DecideEffectApi:decide:create',
    routePath: '/effect/decide',
    method: 'POST',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const decideApiContract = {
  basePath: '/decide-api/effect/decide',
  ownerId: 'decide',
  servicePrefix: '/decide-api',
  readinessPath: '/decide-api/effect/decide/readiness',
} as const;
