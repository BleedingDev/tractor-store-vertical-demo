import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import Footer from '../../../../../components/footer';

export default function FooterFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof Footer>>({
    boundaryId: 'verticalExplore',
    expose: './Footer',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./Footer"
      />
      <Footer {...props} />
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./Footer"
      />
    </>
  );
}
