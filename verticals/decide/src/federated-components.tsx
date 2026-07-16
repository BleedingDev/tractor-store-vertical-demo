import { createLazyComponent } from '@module-federation/modern-js-v3/react';
import { getInstance } from '@module-federation/modern-js-v3/runtime';
import { createDistributedSsrComponent } from '@modern-js/runtime/module-federation';
import type { ComponentType, FunctionComponent, ReactNode } from 'react';
import type AddToCartComponent from '@tractor-store-vertical-demo/checkout/AddToCart';
import type CartPageComponent from '@tractor-store-vertical-demo/checkout/CartPage';
import type CheckoutPageComponent from '@tractor-store-vertical-demo/checkout/CheckoutPage';
import type FooterComponent from '@tractor-store-vertical-demo/explore/Footer';
import type HeaderComponent from '@tractor-store-vertical-demo/explore/Header';
import type HomePageComponent from '@tractor-store-vertical-demo/explore/HomePage';
import type MiniCartComponent from '@tractor-store-vertical-demo/checkout/MiniCart';
import type ProductGridComponent from '@tractor-store-vertical-demo/explore/ProductGrid';
import type RecommendationsComponent from '@tractor-store-vertical-demo/explore/Recommendations';
import type StorePickerComponent from '@tractor-store-vertical-demo/explore/StorePicker';
import type ThanksPageComponent from '@tractor-store-vertical-demo/checkout/ThanksPage';

type AddToCartProps = RemoteComponentProps<typeof AddToCartComponent>;
type CartPageProps = RemoteComponentProps<typeof CartPageComponent>;
type CheckoutPageProps = RemoteComponentProps<typeof CheckoutPageComponent>;
type FooterProps = RemoteComponentProps<typeof FooterComponent>;
type HeaderProps = RemoteComponentProps<typeof HeaderComponent>;
type HomePageProps = RemoteComponentProps<typeof HomePageComponent>;
type MiniCartProps = RemoteComponentProps<typeof MiniCartComponent>;
type ProductGridProps = RemoteComponentProps<typeof ProductGridComponent>;
type RecommendationsProps = RemoteComponentProps<typeof RecommendationsComponent>;
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
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<AddToCartProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () =>
          import('checkout/AddToCart') as Promise<RemoteComponentModule<AddToCartProps>>,
        loading: null,
      }),
    expose: './AddToCart',
    fallback,
    remote: 'checkout',
  }),
  CartPage: createDistributedSsrComponent<CartPageProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<CartPageProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () => import('checkout/CartPage') as Promise<RemoteComponentModule<CartPageProps>>,
        loading: null,
      }),
    expose: './CartPage',
    fallback,
    remote: 'checkout',
  }),
  CheckoutPage: createDistributedSsrComponent<CheckoutPageProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<CheckoutPageProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () =>
          import('checkout/CheckoutPage') as Promise<RemoteComponentModule<CheckoutPageProps>>,
        loading: null,
      }),
    expose: './CheckoutPage',
    fallback,
    remote: 'checkout',
  }),
  Footer: createDistributedSsrComponent<FooterProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<FooterProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () => import('explore/Footer') as Promise<RemoteComponentModule<FooterProps>>,
        loading: null,
      }),
    expose: './Footer',
    fallback,
    remote: 'explore',
  }),
  Header: createDistributedSsrComponent<HeaderProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<HeaderProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () => import('explore/Header') as Promise<RemoteComponentModule<HeaderProps>>,
        loading: null,
      }),
    expose: './Header',
    fallback,
    remote: 'explore',
  }),
  HomePage: createDistributedSsrComponent<HomePageProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<HomePageProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () => import('explore/HomePage') as Promise<RemoteComponentModule<HomePageProps>>,
        loading: null,
      }),
    expose: './HomePage',
    fallback,
    remote: 'explore',
  }),
  MiniCart: createDistributedSsrComponent<MiniCartProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<MiniCartProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () => import('checkout/MiniCart') as Promise<RemoteComponentModule<MiniCartProps>>,
        loading: null,
      }),
    expose: './MiniCart',
    fallback,
    remote: 'checkout',
  }),
  ProductGrid: createDistributedSsrComponent<ProductGridProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<ProductGridProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () =>
          import('explore/ProductGrid') as Promise<RemoteComponentModule<ProductGridProps>>,
        loading: null,
      }),
    expose: './ProductGrid',
    fallback,
    remote: 'explore',
  }),
  Recommendations: createDistributedSsrComponent<RecommendationsProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<RecommendationsProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () =>
          import('explore/Recommendations') as Promise<RemoteComponentModule<RecommendationsProps>>,
        loading: null,
      }),
    expose: './Recommendations',
    fallback,
    remote: 'explore',
  }),
  StorePicker: createDistributedSsrComponent<StorePickerProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<StorePickerProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () =>
          import('explore/StorePicker') as Promise<RemoteComponentModule<StorePickerProps>>,
        loading: null,
      }),
    expose: './StorePicker',
    fallback,
    remote: 'explore',
  }),
  ThanksPage: createDistributedSsrComponent<ThanksPageProps>({
    createComponent: () =>
      createLazyComponent<RemoteComponentModule<ThanksPageProps>, 'default'>({
        export: 'default',
        fallback,
        instance: getInstance(),
        loader: () =>
          import('checkout/ThanksPage') as Promise<RemoteComponentModule<ThanksPageProps>>,
        loading: null,
      }),
    expose: './ThanksPage',
    fallback,
    remote: 'checkout',
  }),
});
