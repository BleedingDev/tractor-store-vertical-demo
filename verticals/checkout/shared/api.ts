import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/plugin-bff/effect-client';
import {
  MicroVerticalBuildMarkerSchema,
  MicroVerticalReadinessSchema,
  createMicroVerticalOperationContext,
} from '@tractor-store-vertical-demo/shared-contracts/microvertical-api-baseline';
import type { MicroVerticalOperationContext } from '@tractor-store-vertical-demo/shared-contracts/microvertical-api-baseline';

export const checkoutMarkerSchema = MicroVerticalBuildMarkerSchema;

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

export const checkoutReadinessSchema = MicroVerticalReadinessSchema;

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

export type OperationContext = MicroVerticalOperationContext;

export const checkoutFoundationApi = HttpApi.make('CheckoutApiFoundation').add(
  HttpApiGroup.make('foundation').add(
    HttpApiEndpoint.get('readiness', '/checkout/readiness', {
      success: checkoutReadinessSchema,
    })
  )
);

export const checkoutApi = HttpApi.make('CheckoutApi')
  .addHttpApi(checkoutFoundationApi)
  .add(
    HttpApiGroup.make('checkout')
      .add(
        HttpApiEndpoint.get('list', '/checkout', {
          query: {
            limit: Schema.optional(Schema.FiniteFromString),
          },
          success: Schema.Struct({
            items: Schema.Array(checkoutItemSchema),
          }),
        })
      )
      .add(
        HttpApiEndpoint.get('get', '/checkout/:id', {
          error: checkoutNotFoundSchema,
          params: {
            id: Schema.String,
          },
          success: checkoutItemSchema,
        })
      )
      .add(
        HttpApiEndpoint.post('create', '/checkout', {
          error: checkoutNotFoundSchema,
          payload: checkoutCreatePayloadSchema,
          success: Schema.Struct({
            item: checkoutItemSchema,
          }),
        })
      )
  );

export const checkoutOperationContexts = {
  create: createMicroVerticalOperationContext({
    method: 'POST',
    operationId: 'CheckoutApi:checkout:create',
    routePath: '/checkout',
  }),
  get: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'CheckoutApi:checkout:get',
    routePath: '/checkout/:id',
  }),
  list: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'CheckoutApi:checkout:list',
    routePath: '/checkout',
  }),
  readiness: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'CheckoutApi:/checkout/readiness',
    routePath: '/checkout/readiness',
  }),
} satisfies Record<string, OperationContext>;

export const checkoutApiContract = {
  apiPrefix: '/checkout-api',
  basePath: '/checkout-api/checkout',
  ownerId: 'checkout',
  readinessPath: '/checkout-api/checkout/readiness',
} as const;
