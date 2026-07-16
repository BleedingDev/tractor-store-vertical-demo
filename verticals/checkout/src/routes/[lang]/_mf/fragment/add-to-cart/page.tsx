import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import AddToCart from '../../../../../components/add-to-cart';

export default function AddToCartFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof AddToCart>>({
    boundaryId: 'verticalCheckout',
    expose: './AddToCart',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./AddToCart"
      />
      <AddToCart {...props} />
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./AddToCart"
      />
    </>
  );
}
