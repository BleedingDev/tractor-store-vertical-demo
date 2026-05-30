import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/plugin-bff/effect-client';

export const checkoutMarkerSchema = Schema.Struct({
  appId: Schema.String,
  packageName: Schema.String,
  version: Schema.String,
  build: Schema.String,
  deployProfile: Schema.String,
  surface: Schema.String,
});

export const checkoutItemSchema = Schema.Struct({
  id: Schema.String,
  marker: checkoutMarkerSchema,
  title: Schema.String,
});

export const checkoutReadinessSchema = Schema.Struct({
  checks: Schema.Struct({
    effectBff: Schema.Literal('ready'),
    moduleFederation: Schema.Literal('ready'),
    ssr: Schema.Literal('ready'),
    translations: Schema.Literal('ready'),
  }),
  marker: checkoutMarkerSchema,
  status: Schema.Literal('ready'),
  versionSkew: Schema.Literal('none'),
});

export const checkoutCreatePayloadSchema = Schema.Struct({
  title: Schema.String,
});

export class CheckoutNotFound extends Schema.TaggedErrorClass<CheckoutNotFound>()(
  'CheckoutNotFound',
  {
    id: Schema.String,
  },
) {}

export const checkoutNotFoundSchema = CheckoutNotFound.pipe(
  HttpApiSchema.status(404),
);

export type OperationContext = {
  operationId: string;
  routePath: string;
  method: string;
  source: string;
  traceId?: string;
};

export const checkoutEffectApi = HttpApi.make('CheckoutEffectApi').add(
  HttpApiGroup.make('checkout')
    .add(
      HttpApiEndpoint.get('list', '/effect/checkout', {
        query: {
          limit: Schema.optional(Schema.NumberFromString),
        },
        success: Schema.Struct({
          items: Schema.Array(checkoutItemSchema),
        }),
      }),
    )
    .add(
      HttpApiEndpoint.get('readiness', '/effect/checkout/readiness', {
        success: checkoutReadinessSchema,
      }),
    )
    .add(
      HttpApiEndpoint.get('get', '/effect/checkout/:id', {
        params: {
          id: Schema.String,
        },
        success: checkoutItemSchema,
        error: checkoutNotFoundSchema,
      }),
    )
    .add(
      HttpApiEndpoint.post('create', '/effect/checkout', {
        payload: checkoutCreatePayloadSchema,
        success: Schema.Struct({
          item: checkoutItemSchema,
        }),
      }),
    ),
);

export const checkoutOperationContexts = {
  list: {
    operationId: 'CheckoutEffectApi:checkout:list',
    routePath: '/effect/checkout',
    method: 'GET',
    source: 'generated-client',
  },
  readiness: {
    operationId: 'CheckoutEffectApi:checkout:readiness',
    routePath: '/effect/checkout/readiness',
    method: 'GET',
    source: 'generated-client',
  },
  get: {
    operationId: 'CheckoutEffectApi:checkout:get',
    routePath: '/effect/checkout/:id',
    method: 'GET',
    source: 'generated-client',
  },
  create: {
    operationId: 'CheckoutEffectApi:checkout:create',
    routePath: '/effect/checkout',
    method: 'POST',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const checkoutApiContract = {
  basePath: '/checkout-api/effect/checkout',
  ownerId: 'checkout',
  servicePrefix: '/checkout-api',
  readinessPath: '/checkout-api/effect/checkout/readiness',
} as const;
