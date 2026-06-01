import { defineRuntimeConfig } from '@modern-js/runtime';
import { ultramodernBoundaryDebuggerPlugin } from '@modern-js/runtime/boundary-debugger';
import { createInstance } from 'i18next';
import { ultramodernRouteNamespace } from './routes/ultramodern-route-metadata';

const i18nInstance = createInstance();

export default defineRuntimeConfig({
  i18n: {
    i18nInstance,
    initOptions: {
      defaultNS: ultramodernRouteNamespace,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      ns: [ultramodernRouteNamespace, 'translation'],
      supportedLngs: ['en', 'cs'],
    },
  },
  plugins: [
    ultramodernBoundaryDebuggerPlugin({
      labels: {
        cs: { toggle: 'zobrazit hranice týmů' },
        en: { toggle: 'show team boundaries' },
      },
      metadata: {
        appId: 'shell-super-app',
        boundaries: [
          {
            appId: 'explore',
            color: 'var(--um-boundary-explore, #ff5a5f)',
            label: 'explore',
            mfName: 'explore',
            ownerTeam: 'tractor-explore',
            packageName: '@tractor-store-vertical-demo/explore',
            role: 'vertical',
          },
          {
            appId: 'decide',
            color: 'var(--um-boundary-decide, #30e27a)',
            label: 'decide',
            mfName: 'decide',
            ownerTeam: 'tractor-decide',
            packageName: '@tractor-store-vertical-demo/decide',
            role: 'vertical',
          },
          {
            appId: 'checkout',
            color: 'var(--um-boundary-checkout, #f6cf45)',
            label: 'checkout',
            mfName: 'checkout',
            ownerTeam: 'tractor-checkout',
            packageName: '@tractor-store-vertical-demo/checkout',
            role: 'vertical',
          },
        ],
        schemaVersion: 1,
      },
      storageKey: 'tractor-store.show-team-boundaries',
    }),
  ],
  router: {
    framework: 'tanstack',
  },
});
