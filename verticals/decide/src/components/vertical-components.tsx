import type { ComponentType } from 'react';
import RecommendationsServer from '@tractor-store-vertical-demo/explore/Recommendations';
import AddToCartServer from '@tractor-store-vertical-demo/checkout/AddToCart';

const createComposedVertical = <Props extends object = Record<string, never>>(
  ServerComponent: ComponentType<Props>,
) => ServerComponent;

export const AddToCart = createComposedVertical(AddToCartServer);
export const Recommendations = createComposedVertical(RecommendationsServer);
