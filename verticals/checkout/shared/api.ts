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
  image: Schema.String,
  lineTotal: Schema.Finite,
  marker: checkoutMarkerSchema,
  name: Schema.String,
  price: Schema.Finite,
  quantity: Schema.Finite,
  sku: Schema.String,
  slug: Schema.String,
  title: Schema.String,
});

export { ultramodernApiMarker } from './ultramodern-build.ts';

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
  quantity: Schema.optional(Schema.Finite),
  sku: Schema.String,
});

export interface CheckoutNotFound {
  readonly _tag: 'CheckoutNotFound';
  readonly id: string;
}

export const checkoutNotFoundSchema = Schema.TaggedStruct('CheckoutNotFound', {
  id: Schema.String,
}).pipe(HttpApiSchema.status(404));

export const makeCheckoutNotFound = (id: string): CheckoutNotFound => ({
  _tag: 'CheckoutNotFound',
  id,
});

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
      HttpApiEndpoint.get('list', '/checkout', {
        query: {
          limit: Schema.optional(Schema.FiniteFromString),
        },
        success: Schema.Struct({
          items: Schema.Array(checkoutItemSchema),
        }),
      }),
    )
    .add(
      HttpApiEndpoint.get('readiness', '/checkout/readiness', {
        success: checkoutReadinessSchema,
      }),
    )
    .add(
      HttpApiEndpoint.get('get', '/checkout/:id', {
        error: checkoutNotFoundSchema,
        params: {
          id: Schema.String,
        },
        success: checkoutItemSchema,
      }),
    )
    .add(
      HttpApiEndpoint.post('create', '/checkout', {
        error: checkoutNotFoundSchema,
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
    routePath: '/checkout',
    source: 'generated-client',
  },
  get: {
    method: 'GET',
    operationId: 'CheckoutEffectApi:checkout:get',
    routePath: '/checkout/:id',
    source: 'generated-client',
  },
  list: {
    method: 'GET',
    operationId: 'CheckoutEffectApi:checkout:list',
    routePath: '/checkout',
    source: 'generated-client',
  },
  readiness: {
    method: 'GET',
    operationId: 'CheckoutEffectApi:checkout:readiness',
    routePath: '/checkout/readiness',
    source: 'generated-client',
  },
} satisfies Record<string, OperationContext>;

export const checkoutApiContract = {
  basePath: '/checkout-api/checkout',
  ownerId: 'checkout',
  readinessPath: '/checkout-api/checkout/readiness',
  servicePrefix: '/checkout-api',
} as const;

export const checkoutApi = checkoutEffectApi;
