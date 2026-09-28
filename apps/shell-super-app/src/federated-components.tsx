import { createDistributedSsrComponent } from '@modern-js/federation-runtime';
import { createLazyComponent } from '@module-federation/modern-js-v3/react';
import { getInstance } from '@module-federation/modern-js-v3/runtime';
import type AddToCartComponent from '@tractor-store-vertical-demo/checkout/AddToCart';
import type CartPageComponent from '@tractor-store-vertical-demo/checkout/CartPage';
import type CheckoutPageComponent from '@tractor-store-vertical-demo/checkout/CheckoutPage';
import type MiniCartComponent from '@tractor-store-vertical-demo/checkout/MiniCart';
import type ThanksPageComponent from '@tractor-store-vertical-demo/checkout/ThanksPage';
import type ProductPageComponent from '@tractor-store-vertical-demo/decide/ProductPage';
import type FooterComponent from '@tractor-store-vertical-demo/explore/Footer';
import type HeaderComponent from '@tractor-store-vertical-demo/explore/Header';
import type HomePageComponent from '@tractor-store-vertical-demo/explore/HomePage';
import type ProductGridComponent from '@tractor-store-vertical-demo/explore/ProductGrid';
import type RecommendationsComponent from '@tractor-store-vertical-demo/explore/Recommendations';
import type StorePickerComponent from '@tractor-store-vertical-demo/explore/StorePicker';
import type { ComponentType, FunctionComponent, ReactNode } from 'react';

type AddToCartProps = RemoteComponentProps<typeof AddToCartComponent>;
type CartPageProps = RemoteComponentProps<typeof CartPageComponent>;
type CheckoutPageProps = RemoteComponentProps<typeof CheckoutPageComponent>;
type FooterProps = RemoteComponentProps<typeof FooterComponent>;
type HeaderProps = RemoteComponentProps<typeof HeaderComponent>;
type HomePageProps = RemoteComponentProps<typeof HomePageComponent>;
type MiniCartProps = RemoteComponentProps<typeof MiniCartComponent>;
type ProductGridProps = RemoteComponentProps<typeof ProductGridComponent>;
type ProductPageProps = RemoteComponentProps<typeof ProductPageComponent>;
type RecommendationsProps = RemoteComponentProps<
  typeof RecommendationsComponent
>;
type StorePickerProps = RemoteComponentProps<typeof StorePickerComponent>;
type ThanksPageProps = RemoteComponentProps<typeof ThanksPageComponent>;

interface RemoteComponentModule<Props extends object> {
  default: FunctionComponent<Props>;
}
type RemoteComponentProps<Component> =
  Component extends ComponentType<infer Props>
    ? Props extends object
      ? Props
      : Record<string, never>
    : Record<string, never>;

export const createFederatedComponents = (fallback: ReactNode) => ({
  AddToCart: createDistributedSsrComponent<AddToCartProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<AddToCartProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('checkout/AddToCart') as Promise<
            RemoteComponentModule<AddToCartProps>
          >,
      }),
    expose: './AddToCart',
    fallback,
    remote: 'checkout',
  }),
  CartPage: createDistributedSsrComponent<CartPageProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<CartPageProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('checkout/CartPage') as Promise<
            RemoteComponentModule<CartPageProps>
          >,
      }),
    expose: './CartPage',
    fallback,
    remote: 'checkout',
  }),
  CheckoutPage: createDistributedSsrComponent<CheckoutPageProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<CheckoutPageProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('checkout/CheckoutPage') as Promise<
            RemoteComponentModule<CheckoutPageProps>
          >,
      }),
    expose: './CheckoutPage',
    fallback,
    remote: 'checkout',
  }),
  Footer: createDistributedSsrComponent<FooterProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<FooterProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('explore/Footer') as Promise<
            RemoteComponentModule<FooterProps>
          >,
      }),
    expose: './Footer',
    fallback,
    remote: 'explore',
  }),
  Header: createDistributedSsrComponent<HeaderProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<HeaderProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('explore/Header') as Promise<
            RemoteComponentModule<HeaderProps>
          >,
      }),
    expose: './Header',
    fallback,
    remote: 'explore',
  }),
  HomePage: createDistributedSsrComponent<HomePageProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<HomePageProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('explore/HomePage') as Promise<
            RemoteComponentModule<HomePageProps>
          >,
      }),
    expose: './HomePage',
    fallback,
    remote: 'explore',
  }),
  MiniCart: createDistributedSsrComponent<MiniCartProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<MiniCartProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('checkout/MiniCart') as Promise<
            RemoteComponentModule<MiniCartProps>
          >,
      }),
    expose: './MiniCart',
    fallback,
    remote: 'checkout',
  }),
  ProductGrid: createDistributedSsrComponent<ProductGridProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<ProductGridProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('explore/ProductGrid') as Promise<
            RemoteComponentModule<ProductGridProps>
          >,
      }),
    expose: './ProductGrid',
    fallback,
    remote: 'explore',
  }),
  ProductPage: createDistributedSsrComponent<ProductPageProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<ProductPageProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('decide/ProductPage') as Promise<
            RemoteComponentModule<ProductPageProps>
          >,
      }),
    expose: './ProductPage',
    fallback,
    remote: 'decide',
  }),
  Recommendations: createDistributedSsrComponent<RecommendationsProps>({
    createComponent: (options) =>
      createLazyComponent<
        RemoteComponentModule<RecommendationsProps>,
        'default'
      >({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('explore/Recommendations') as Promise<
            RemoteComponentModule<RecommendationsProps>
          >,
      }),
    expose: './Recommendations',
    fallback,
    remote: 'explore',
  }),
  StorePicker: createDistributedSsrComponent<StorePickerProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<StorePickerProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('explore/StorePicker') as Promise<
            RemoteComponentModule<StorePickerProps>
          >,
      }),
    expose: './StorePicker',
    fallback,
    remote: 'explore',
  }),
  ThanksPage: createDistributedSsrComponent<ThanksPageProps>({
    createComponent: (options) =>
      createLazyComponent<RemoteComponentModule<ThanksPageProps>, 'default'>({
        ...options,
        instance: getInstance(),
        loader: () =>
          import('checkout/ThanksPage') as Promise<
            RemoteComponentModule<ThanksPageProps>
          >,
      }),
    expose: './ThanksPage',
    fallback,
    remote: 'checkout',
  }),
});
