import { createLazyComponent } from '@module-federation/modern-js-v3/react';
import { getInstance, loadRemote } from '@module-federation/modern-js-v3/runtime';
import { Suspense, useEffect, useMemo, useState, type ComponentType } from 'react';
import HeaderServer from '@tractor-store-vertical-demo/explore/Header';
import StorePickerServer from '@tractor-store-vertical-demo/explore/StorePicker';
import RecommendationsServer from '@tractor-store-vertical-demo/explore/Recommendations';
import ProductPageServer from '@tractor-store-vertical-demo/decide/ProductPage';
import MiniCartServer from '@tractor-store-vertical-demo/checkout/MiniCart';
import CartPageServer from '@tractor-store-vertical-demo/checkout/CartPage';

type RemoteComponentModule = {
  default: ComponentType;
};

const loadRemoteComponent = async (specifier: string) => {
  const module = await loadRemote<RemoteComponentModule>(specifier);
  if (!module) {
    throw new Error(`Remote module unavailable: ${specifier}`);
  }
  return module;
};

const remoteFallback =
  ({ error }: { error: Error }) =>
    <div className="shell:rounded-xl shell:border shell:border-red-900/20 shell:bg-red-50 shell:px-4 shell:py-3 shell:text-sm shell:font-semibold shell:text-red-900" data-remote-error={error.name}>Vertical unavailable</div>;

const createHydratedRemote = (
  ServerComponent: ComponentType,
  specifier: string,
) => {
  return function HydratedRemote() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    const FederatedComponent = useMemo(() => {
      if (!hydrated) {
        return undefined;
      }
      const instance = getInstance();
      if (!instance) {
        return undefined;
      }
      return createLazyComponent({
        export: 'default',
        fallback: remoteFallback,
        instance,
        loader: () => loadRemoteComponent(specifier),
        loading: <ServerComponent />,
      });
    }, [hydrated]);

    if (!FederatedComponent) {
      return <ServerComponent />;
    }

    return (
      <Suspense fallback={<ServerComponent />}>
        <FederatedComponent />
      </Suspense>
    );
  };
};

export const Header = createHydratedRemote(HeaderServer, 'explore/Header');
export const StorePicker = createHydratedRemote(StorePickerServer, 'explore/StorePicker');
export const Recommendations = createHydratedRemote(RecommendationsServer, 'explore/Recommendations');
export const ProductPage = createHydratedRemote(ProductPageServer, 'decide/ProductPage');
export const MiniCart = createHydratedRemote(MiniCartServer, 'checkout/MiniCart');
export const CartPage = createHydratedRemote(CartPageServer, 'checkout/CartPage');
