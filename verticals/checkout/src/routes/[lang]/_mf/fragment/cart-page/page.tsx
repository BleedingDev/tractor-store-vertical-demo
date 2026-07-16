import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import CartPage from '../../../../../components/cart-page';

export default function CartPageFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof CartPage>>({
    boundaryId: 'verticalCheckout',
    expose: './CartPage',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./CartPage"
      />
      <CartPage {...props} />
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./CartPage"
      />
    </>
  );
}
