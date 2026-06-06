import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/plugin-bff/effect-client';

export const checkoutMarkerSchema = Schema.Struct({
  appId: Schema.String,
  build: Schema.String,
  deployProfile: Schema.String,
  packageName: Schema.String,
  surface: Schema.String,
  version: Schema.String,
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

export const checkoutNotFoundSchema = CheckoutNotFound.pipe(HttpApiSchema.status(404));

export interface OperationContext {
  operationId: string;
  routePath: string;
  method: string;
  source: string;
  traceId?: string;
}

export const checkoutEffectApi = HttpApi.make('CheckoutEffectApi').add(
  HttpApiGroup.make('checkout')
    .add(
      HttpApiEndpoint.get('list', '/effect/checkout', {
        query: {
          limit: Schema.optional(Schema.FiniteFromString),
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
        error: checkoutNotFoundSchema,
        params: {
          id: Schema.String,
        },
        success: checkoutItemSchema,
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
  create: {
    method: 'POST',
    operationId: 'CheckoutEffectApi:checkout:create',
    routePath: '/effect/checkout',
    source: 'generated-client',
  },
  get: {
    method: 'GET',
    operationId: 'CheckoutEffectApi:checkout:get',
    routePath: '/effect/checkout/:id',
    source: 'generated-client',
  },
  list: {
    method: 'GET',
    operationId: 'CheckoutEffectApi:checkout:list',
    routePath: '/effect/checkout',
    source: 'generated-client',
  },
  readiness: {
    method: 'GET',
    operationId: 'CheckoutEffectApi:checkout:readiness',
    routePath: '/effect/checkout/readiness',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const checkoutApiContract = {
  basePath: '/checkout-api/effect/checkout',
  ownerId: 'checkout',
  readinessPath: '/checkout-api/effect/checkout/readiness',
  servicePrefix: '/checkout-api',
} as const;
