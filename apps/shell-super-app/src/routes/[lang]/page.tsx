import { useModernI18n } from '@modern-js/plugin-i18n/runtime';

import { ultramodernUiMarker } from '../../ultramodern-build';
import ShellFrame from '../shell-frame';
import { UltramodernRouteHead } from '../ultramodern-route-head';
import { HomePage } from '../vertical-components';

export default function ShellHome() {
  useModernI18n();

  return (
    <ShellFrame>
      <UltramodernRouteHead />
      <HomePage />
      <p className="shell:sr-only" data-testid="ultramodern-preset">
        presetUltramodern workspace
      </p>
      <p
        className="shell:sr-only"
        data-build-marker={ultramodernUiMarker.build}
        data-testid="ultramodern-ui-marker"
      >
        {ultramodernUiMarker.appId}:{ultramodernUiMarker.version}
      </p>
    </ShellFrame>
  );
}
