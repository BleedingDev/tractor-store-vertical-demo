import type { ComponentProps } from 'react';
import { useDistributedSsrFragmentProps } from '@modern-js/runtime/module-federation/distributed-ssr';
import StorePicker from '../../../../../components/store-picker';

export default function StorePickerFragmentPage() {
  const props = useDistributedSsrFragmentProps<ComponentProps<typeof StorePicker>>({
    boundaryId: 'verticalExplore',
    expose: './StorePicker',
  });

  return (
    <>
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="start"
        data-modern-mf-expose="./StorePicker"
      />
      <StorePicker {...props} />
      <template
        data-modern-boundary-id="verticalExplore"
        data-modern-distributed-ssr-marker="end"
        data-modern-mf-expose="./StorePicker"
      />
    </>
  );
}
