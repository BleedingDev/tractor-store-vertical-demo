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

export const exploreMarkerSchema = MicroVerticalBuildMarkerSchema;

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

export { ultramodernApiMarker } from './ultramodern-build.ts';

export const exploreReadinessSchema = MicroVerticalReadinessSchema;

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

export type OperationContext = MicroVerticalOperationContext;

export const exploreFoundationApi = HttpApi.make('ExploreApiFoundation').add(
  HttpApiGroup.make('foundation').add(
    HttpApiEndpoint.get('readiness', '/explore/readiness', {
      success: exploreReadinessSchema,
    })
  )
);

export const exploreApi = HttpApi.make('ExploreApi')
  .addHttpApi(exploreFoundationApi)
  .add(
    HttpApiGroup.make('explore')
      .add(
        HttpApiEndpoint.get('list', '/explore', {
          query: {
            limit: Schema.optional(Schema.FiniteFromString),
          },
          success: Schema.Struct({
            items: Schema.Array(exploreItemSchema),
          }),
        })
      )
      .add(
        HttpApiEndpoint.get('get', '/explore/:id', {
          error: exploreNotFoundSchema,
          params: {
            id: Schema.String,
          },
          success: exploreItemSchema,
        })
      )
      .add(
        HttpApiEndpoint.post('create', '/explore', {
          error: exploreNotFoundSchema,
          payload: exploreCreatePayloadSchema,
          success: Schema.Struct({
            item: exploreItemSchema,
          }),
        })
      )
  );

export const exploreOperationContexts = {
  create: createMicroVerticalOperationContext({
    method: 'POST',
    operationId: 'ExploreApi:explore:create',
    routePath: '/explore',
  }),
  get: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'ExploreApi:explore:get',
    routePath: '/explore/:id',
  }),
  list: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'ExploreApi:explore:list',
    routePath: '/explore',
  }),
  readiness: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'ExploreApi:/explore/readiness',
    routePath: '/explore/readiness',
  }),
} satisfies Record<string, OperationContext>;

export const exploreApiContract = {
  apiPrefix: '/explore-api',
  basePath: '/explore-api/explore',
  ownerId: 'explore',
  readinessPath: '/explore-api/explore/readiness',
} as const;
