import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import ProductGrid from '../../../../../components/product-grid';

export default function ProductGridFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof ProductGrid>>({
    boundaryId: 'verticalExplore',
    expose: './ProductGrid',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./ProductGrid"
      />
      <ProductGrid {...props} />
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./ProductGrid"
      />
    </>
  );
}
