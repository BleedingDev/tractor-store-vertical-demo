import { createLazyComponent } from '@module-federation/modern-js-v3/react';
import { getInstance, loadRemote } from '@module-federation/modern-js-v3/runtime';
import { Suspense, useEffect, useMemo, useState, type ComponentType } from 'react';
import RecommendationsServer from '@tractor-store-vertical-demo/explore/Recommendations';
import AddToCartServer from '@tractor-store-vertical-demo/checkout/AddToCart';

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
    <div className="decide:rounded-xl decide:border decide:border-red-900/20 decide:bg-red-50 decide:px-4 decide:py-3 decide:text-sm decide:font-semibold decide:text-red-900" data-remote-error={error.name}>Vertical unavailable</div>;

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

export const AddToCart = createHydratedRemote(AddToCartServer, 'checkout/AddToCart');
export const Recommendations = createHydratedRemote(RecommendationsServer, 'explore/Recommendations');
