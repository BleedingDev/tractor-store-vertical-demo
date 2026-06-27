import ShellFrame from '../../shell-frame';
import { UltramodernRouteHead } from '../../ultramodern-route-head';
import { StorePicker } from '../../vertical-components';

export default function ShellStoresPage() {
  return (
    <ShellFrame>
      <UltramodernRouteHead />
      <StorePicker />
    </ShellFrame>
  );
}
