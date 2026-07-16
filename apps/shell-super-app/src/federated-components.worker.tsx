import { DistributedSsrBoundary } from '@modern-js/runtime/module-federation';
import type { ComponentType, ReactNode } from 'react';
import type AddToCartComponent from '@tractor-store-vertical-demo/checkout/AddToCart';
import type CartPageComponent from '@tractor-store-vertical-demo/checkout/CartPage';
import type CheckoutPageComponent from '@tractor-store-vertical-demo/checkout/CheckoutPage';
import type FooterComponent from '@tractor-store-vertical-demo/explore/Footer';
import type HeaderComponent from '@tractor-store-vertical-demo/explore/Header';
import type HomePageComponent from '@tractor-store-vertical-demo/explore/HomePage';
import type MiniCartComponent from '@tractor-store-vertical-demo/checkout/MiniCart';
import type ProductGridComponent from '@tractor-store-vertical-demo/explore/ProductGrid';
import type ProductPageComponent from '@tractor-store-vertical-demo/decide/ProductPage';
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
type ProductPageProps = RemoteComponentProps<typeof ProductPageComponent>;
type RecommendationsProps = RemoteComponentProps<typeof RecommendationsComponent>;
type StorePickerProps = RemoteComponentProps<typeof StorePickerComponent>;
type ThanksPageProps = RemoteComponentProps<typeof ThanksPageComponent>;

type RemoteComponentProps<Component> =
  Component extends ComponentType<infer Props>
    ? Props extends object
      ? Props
      : Record<string, never>
    : Record<string, never>;

export const createFederatedComponents = (fallback: ReactNode) => ({
  AddToCart: (props: AddToCartProps) => (
    <DistributedSsrBoundary
      expose="./AddToCart"
      fallback={fallback}
      fragmentProps={props}
      remote="checkout"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  CartPage: (props: CartPageProps) => (
    <DistributedSsrBoundary
      expose="./CartPage"
      fallback={fallback}
      fragmentProps={props}
      remote="checkout"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  CheckoutPage: (props: CheckoutPageProps) => (
    <DistributedSsrBoundary
      expose="./CheckoutPage"
      fallback={fallback}
      fragmentProps={props}
      remote="checkout"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  Footer: (props: FooterProps) => (
    <DistributedSsrBoundary
      expose="./Footer"
      fallback={fallback}
      fragmentProps={props}
      remote="explore"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  Header: (props: HeaderProps) => (
    <DistributedSsrBoundary
      expose="./Header"
      fallback={fallback}
      fragmentProps={props}
      remote="explore"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  HomePage: (props: HomePageProps) => (
    <DistributedSsrBoundary
      expose="./HomePage"
      fallback={fallback}
      fragmentProps={props}
      remote="explore"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  MiniCart: (props: MiniCartProps) => (
    <DistributedSsrBoundary
      expose="./MiniCart"
      fallback={fallback}
      fragmentProps={props}
      remote="checkout"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  ProductGrid: (props: ProductGridProps) => (
    <DistributedSsrBoundary
      expose="./ProductGrid"
      fallback={fallback}
      fragmentProps={props}
      remote="explore"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  ProductPage: (props: ProductPageProps) => (
    <DistributedSsrBoundary
      expose="./ProductPage"
      fallback={fallback}
      fragmentProps={props}
      remote="decide"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  Recommendations: (props: RecommendationsProps) => (
    <DistributedSsrBoundary
      expose="./Recommendations"
      fallback={fallback}
      fragmentProps={props}
      remote="explore"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  StorePicker: (props: StorePickerProps) => (
    <DistributedSsrBoundary
      expose="./StorePicker"
      fallback={fallback}
      fragmentProps={props}
      remote="explore"
    >
      {null}
    </DistributedSsrBoundary>
  ),
  ThanksPage: (props: ThanksPageProps) => (
    <DistributedSsrBoundary
      expose="./ThanksPage"
      fallback={fallback}
      fragmentProps={props}
      remote="checkout"
    >
      {null}
    </DistributedSsrBoundary>
  ),
});
