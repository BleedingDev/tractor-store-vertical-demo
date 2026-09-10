import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  Schema,
} from '@modern-js/bff-effect/effect-client';
import {
  MicroVerticalBuildMarkerSchema,
  MicroVerticalReadinessSchema,
  createMicroVerticalOperationContext,
} from '@modern-js/bff-effect/microvertical-api';
import type { MicroVerticalOperationContext } from '@modern-js/bff-effect/microvertical-api';

export const decideMarkerSchema = MicroVerticalBuildMarkerSchema;

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

export const decideReadinessSchema = MicroVerticalReadinessSchema;

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

export type OperationContext = MicroVerticalOperationContext;

export const decideFoundationApi = HttpApi.make('DecideApiFoundation').add(
  HttpApiGroup.make('foundation').add(
    HttpApiEndpoint.get('readiness', '/decide/readiness', {
      success: decideReadinessSchema,
    })
  )
);

export const decideApi = HttpApi.make('DecideApi')
  .addHttpApi(decideFoundationApi)
  .add(
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
  create: createMicroVerticalOperationContext({
    method: 'POST',
    operationId: 'DecideApi:decide:create',
    routePath: '/decide',
  }),
  get: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'DecideApi:decide:get',
    routePath: '/decide/:id',
  }),
  list: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'DecideApi:decide:list',
    routePath: '/decide',
  }),
  readiness: createMicroVerticalOperationContext({
    method: 'GET',
    operationId: 'DecideApi:/decide/readiness',
    routePath: '/decide/readiness',
  }),
} satisfies Record<string, OperationContext>;

export const decideApiContract = {
  apiPrefix: '/decide-api',
  basePath: '/decide-api/decide',
  ownerId: 'decide',
  readinessPath: '/decide-api/decide/readiness',
} as const;
