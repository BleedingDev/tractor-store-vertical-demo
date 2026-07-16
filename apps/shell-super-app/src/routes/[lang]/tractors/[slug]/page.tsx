import { useParams, useSearch } from '@modern-js/plugin-tanstack/runtime';
import ShellFrame from '../../../shell-frame';
import { UltramodernRouteHead } from '../../../ultramodern-route-head';
import { ProductPage } from '../../../vertical-components';

export default function ShellProductPage() {
  const slug = useParams({ select: (params) => params.slug, strict: false });
  const sku = useSearch({ select: (search) => search.sku, strict: false });

  return (
    <ShellFrame boundary="decide">
      <UltramodernRouteHead />
      <ProductPage sku={sku} slug={slug} />
    </ShellFrame>
  );
}
