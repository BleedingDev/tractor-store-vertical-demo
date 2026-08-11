import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import type { ComponentProps } from 'react';

import Recommendations from '../../../../../components/recommendations';

export default function RecommendationsFragmentPage() {
  const props = useDistributedSsrFragmentProps<
    ComponentProps<typeof Recommendations>
  >({
    boundaryId: 'verticalExplore',
    expose: './Recommendations',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./Recommendations"
      />
      <Recommendations {...props} />
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./Recommendations"
      />
    </>
  );
}
