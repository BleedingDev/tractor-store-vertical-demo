import { useParams, useSearch } from '@modern-js/plugin-tanstack/runtime';

import DecideProductPage from '../../../../components/product-page';
import { UltramodernRouteHead } from '../../../ultramodern-route-head';

export default function DecideProductRoute() {
  const slug = useParams({ select: (params) => params.slug, strict: false });
  const sku = useSearch({ select: (search) => search.sku, strict: false });

  return (
    <>
      <UltramodernRouteHead />
      <DecideProductPage
        {...(sku === undefined ? {} : { sku })}
        {...(slug === undefined ? {} : { slug })}
      />
    </>
  );
}
