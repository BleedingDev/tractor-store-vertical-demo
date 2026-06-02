import { createLazyComponent } from '@module-federation/bridge-react';
import { getInstance, loadRemote } from '@module-federation/modern-js-v3/runtime';
import { Suspense, useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import RecommendationsServer from '@tractor-store-vertical-demo/explore/Recommendations';
import AddToCartServer from '@tractor-store-vertical-demo/checkout/AddToCart';

interface RemoteComponentModule<Props extends object = Record<string, never>> {
  default: ComponentType<Props>;
}

const loadRemoteComponent = <Props extends object>(specifier: string) =>
  // eslint-disable-next-line promise/prefer-await-to-then
  loadRemote<RemoteComponentModule<Props>>(specifier).then((module) => {
    if (module === null) {
      throw new Error(`Remote module unavailable: ${specifier}`);
    }
    return module;
  });

const remoteFallback = ({ error }: { error: Error }) => (
  <div
    className="decide:rounded-xl decide:border decide:border-red-900/20 decide:bg-red-50 decide:px-4 decide:py-3 decide:text-sm decide:font-semibold decide:text-red-900"
    data-remote-error={error.name}
  >
    Vertical unavailable
  </div>
);

const createHydratedRemote = <Props extends object = Record<string, never>>(
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
    }, [hydrated, props]);

    if (FederatedComponent === undefined) {
      return <ServerComponent {...props} />;
    }

    return (
      <Suspense fallback={<ServerComponent {...props} />}>
        <FederatedComponent {...props} />
      </Suspense>
    );
  };

export const AddToCart = createHydratedRemote(AddToCartServer, 'checkout/AddToCart');
export const Recommendations = createHydratedRemote(
  RecommendationsServer,
  'explore/Recommendations',
);
