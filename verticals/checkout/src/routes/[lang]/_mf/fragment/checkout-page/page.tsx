import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import CheckoutPage from '../../../../../components/checkout-page';

export default function CheckoutPageFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof CheckoutPage>>({
    boundaryId: 'verticalCheckout',
    expose: './CheckoutPage',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./CheckoutPage"
      />
      <CheckoutPage {...props} />
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./CheckoutPage"
      />
    </>
  );
}
