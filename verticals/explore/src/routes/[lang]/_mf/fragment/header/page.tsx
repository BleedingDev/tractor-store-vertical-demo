import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import type { ComponentProps } from 'react';

import Header from '../../../../../components/header';

export default function HeaderFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof Header>>({
    boundaryId: 'verticalExplore',
    expose: './Header',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./Header"
      />
      <Header {...props} />
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./Header"
      />
    </>
  );
}
