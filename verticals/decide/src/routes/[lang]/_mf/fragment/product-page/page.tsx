import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import ProductPage from '../../../../../components/product-page';

export default function ProductPageFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof ProductPage>>({
    boundaryId: 'verticalDecide',
    expose: './ProductPage',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalDecide"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./ProductPage"
      />
      <ProductPage {...props} />
      <template
        data-modern-boundary-id="verticalDecide"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./ProductPage"
      />
    </>
  );
}
