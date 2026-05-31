import { createLazyComponent } from '@module-federation/modern-js-v3/react';
import { getInstance, loadRemote } from '@module-federation/modern-js-v3/runtime';
import { Suspense, useEffect, useMemo, useState } from 'react';
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

interface RemoteComponentModule<Props extends object> {
  default: ComponentType<Props>;
}

const loadRemoteComponent = <Props extends object>(specifier: string) =>
  loadRemote<RemoteComponentModule<Props>>(specifier).then((module) => {
    if (module === null) {
      throw new Error(`Remote module unavailable: ${specifier}`);
    }
    return module;
  });

const remoteFallback = ({ error }: { error: Error }) => (
  <div
    className="shell:rounded-xl shell:border shell:border-red-900/20 shell:bg-red-50 shell:px-4 shell:py-3 shell:text-sm shell:font-semibold shell:text-red-900"
    data-remote-error={error.name}
  >
    Vertical unavailable
  </div>
);

const createHydratedRemote = <Props extends object>(
  ServerComponent: ComponentType<Props>,
  specifier: string,
) =>
  function HydratedRemote(props: Props) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    const FederatedComponent = useMemo(() => {
      if (hydrated === false) {
        return;
      }
      const instance = getInstance();
      if (instance === null) {
        return;
      }
      return createLazyComponent({
        export: 'default',
        fallback: remoteFallback,
        instance,
        loader: () => loadRemoteComponent<Props>(specifier),
        loading: <ServerComponent {...props} />,
      });
    }, [hydrated]);

    if (FederatedComponent === undefined) {
      return <ServerComponent {...props} />;
    }

    return (
      <Suspense fallback={<ServerComponent {...props} />}>
        <FederatedComponent {...props} />
      </Suspense>
    );
  };

export const Header = createHydratedRemote(HeaderServer, 'explore/Header');
export const Footer = createHydratedRemote(FooterServer, 'explore/Footer');
export const HomePage = createHydratedRemote(HomePageServer, 'explore/HomePage');
export const ProductGrid = createHydratedRemote(ProductGridServer, 'explore/ProductGrid');
export const StorePicker = createHydratedRemote(StorePickerServer, 'explore/StorePicker');
export const Recommendations = createHydratedRemote(
  RecommendationsServer,
  'explore/Recommendations',
);
export const ProductPage = createHydratedRemote(ProductPageServer, 'decide/ProductPage');
export const MiniCart = createHydratedRemote(MiniCartServer, 'checkout/MiniCart');
export const CartPage = createHydratedRemote(CartPageServer, 'checkout/CartPage');
