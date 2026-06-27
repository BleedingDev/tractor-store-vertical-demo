import ShellFrame from '../../../shell-frame';
import { UltramodernRouteHead } from '../../../ultramodern-route-head';
import { ProductPage } from '../../../vertical-components';

export default function ShellProductPage() {
  return (
    <ShellFrame boundary="decide">
      <UltramodernRouteHead />
      <ProductPage />
    </ShellFrame>
  );
}
