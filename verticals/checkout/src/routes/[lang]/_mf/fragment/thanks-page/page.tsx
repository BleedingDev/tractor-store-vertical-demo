import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import ThanksPage from '../../../../../components/thanks-page';

export default function ThanksPageFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof ThanksPage>>({
    boundaryId: 'verticalCheckout',
    expose: './ThanksPage',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./ThanksPage"
      />
      <ThanksPage {...props} />
      <template
        data-modern-boundary-id="verticalCheckout"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./ThanksPage"
      />
    </>
  );
}
