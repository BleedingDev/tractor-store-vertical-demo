import type { ComponentType } from 'react';
import HeaderServer from '@tractor-store-vertical-demo/explore/Header';
import FooterServer from '@tractor-store-vertical-demo/explore/Footer';
import HomePageServer from '@tractor-store-vertical-demo/explore/HomePage';
import ProductGridServer from '@tractor-store-vertical-demo/explore/ProductGrid';
import StorePickerServer from '@tractor-store-vertical-demo/explore/StorePicker';
import RecommendationsServer from '@tractor-store-vertical-demo/explore/Recommendations';
import ProductPageServer from '@tractor-store-vertical-demo/decide/ProductPage';
import MiniCartServer from '@tractor-store-vertical-demo/checkout/MiniCart';
import CartPageServer from '@tractor-store-vertical-demo/checkout/CartPage';

const createComposedVertical = <Props extends object>(ServerComponent: ComponentType<Props>) =>
  ServerComponent;

export const Header = createComposedVertical(HeaderServer);
export const Footer = createComposedVertical(FooterServer);
export const HomePage = createComposedVertical(HomePageServer);
export const ProductGrid = createComposedVertical(ProductGridServer);
export const StorePicker = createComposedVertical(StorePickerServer);
export const Recommendations = createComposedVertical(RecommendationsServer);
export const ProductPage = createComposedVertical(ProductPageServer);
export const MiniCart = createComposedVertical(MiniCartServer);
export const CartPage = createComposedVertical(CartPageServer);
