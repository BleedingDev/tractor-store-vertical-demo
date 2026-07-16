import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import HomePage from '../../../../../components/home-page';

export default function HomePageFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof HomePage>>({
    boundaryId: 'verticalExplore',
    expose: './HomePage',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./HomePage"
      />
      <HomePage {...props} />
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./HomePage"
      />
    </>
  );
}
