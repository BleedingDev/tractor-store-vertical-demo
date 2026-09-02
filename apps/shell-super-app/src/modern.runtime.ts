import type { I18nInstance } from '@modern-js/plugin-i18n/runtime';
import { defineRuntimeConfig } from '@modern-js/runtime';
import { ultramodernBoundaryDebuggerPlugin } from '@modern-js/runtime/boundary-debugger';
import { createInstance } from 'i18next';

import csResource from '../locales/cs/shell.json';
import enResource from '../locales/en/shell.json';
import { ultramodernRouteNamespace } from './routes/ultramodern-route-metadata';

type LocaleResource = string | { readonly [key: string]: LocaleResource };

const flattenLocaleResource = (
  resource: LocaleResource,
  prefix = ''
): Record<string, string> => {
  if (typeof resource === 'string') {
    return prefix.length > 0 ? { [prefix]: resource } : {};
  }

  return Object.fromEntries(
    Object.entries(resource).flatMap(([key, value]) => {
      const nextKey = prefix.length > 0 ? `${prefix}.${key}` : key;
      return typeof value === 'string'
        ? [[nextKey, value]]
        : Object.entries(flattenLocaleResource(value, nextKey));
    })
  );
};

const i18nInstance = createInstance();
const resources = {
  cs: { [ultramodernRouteNamespace]: flattenLocaleResource(csResource) },
  en: { [ultramodernRouteNamespace]: flattenLocaleResource(enResource) },
} as const;

export default defineRuntimeConfig({
  i18n: {
    i18nInstance: i18nInstance as I18nInstance,
    initOptions: {
      defaultNS: ultramodernRouteNamespace,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      ns: [ultramodernRouteNamespace, 'translation'],
      resources,
      supportedLngs: ['en', 'cs'],
    },
  },
  plugins: [
    ultramodernBoundaryDebuggerPlugin({
      metadata: {
        appId: 'shell-super-app',
        boundaries: [
          {
            appId: 'shell-super-app',
            label: 'Shell Super App',
            mfName: 'shellSuperApp',
            ownerTeam: 'super-app-platform',
            packageName: '@tractor-store-vertical-demo/shell-super-app',
            role: 'host',
          },
          {
            appId: 'explore',
            label: 'explore Vertical',
            mfName: 'verticalExplore',
            ownerTeam: 'super-app-platform',
            packageName: '@tractor-store-vertical-demo/explore',
            role: 'vertical',
          },
          {
            appId: 'decide',
            label: 'decide Vertical',
            mfName: 'verticalDecide',
            ownerTeam: 'super-app-platform',
            packageName: '@tractor-store-vertical-demo/decide',
            role: 'vertical',
          },
          {
            appId: 'checkout',
            label: 'checkout Vertical',
            mfName: 'verticalCheckout',
            ownerTeam: 'super-app-platform',
            packageName: '@tractor-store-vertical-demo/checkout',
            role: 'vertical',
          },
        ],
        schemaVersion: 1,
      },
    }),
  ],

  router: {
    framework: 'tanstack',
  },
});
