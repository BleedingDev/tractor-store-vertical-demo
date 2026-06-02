import { Outlet } from '@modern-js/plugin-tanstack/runtime';
import { ultramodernUiMarker } from '../ultramodern-build';
import './index.css';

export default function Layout() {
  return (
    <div data-app-id="shell-super-app" data-build-marker={ultramodernUiMarker.build}>
      <Outlet />
    </div>
  );
}
