import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import type { ComponentProps } from 'react';

import MiniCart from '../../../../../components/mini-cart';

export default function MiniCartFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof MiniCart>>(
    {
      boundaryId: 'verticalCheckout',
      expose: './MiniCart',
    }
  );

  return (
    <>
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./MiniCart"
      />
      <MiniCart {...props} />
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./MiniCart"
      />
    </>
  );
}
