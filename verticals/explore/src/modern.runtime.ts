import { defineRuntimeConfig } from '@modern-js/runtime';
import { createInstance } from 'i18next';
import csResource from '../locales/cs/explore.json';
import enResource from '../locales/en/explore.json';
import { ultramodernRouteNamespace } from './routes/ultramodern-route-metadata';

const i18nInstance = createInstance();
const resources = {
  cs: { [ultramodernRouteNamespace]: csResource, translation: csResource },
  en: { [ultramodernRouteNamespace]: enResource, translation: enResource },
} as const;

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
      resources,
      supportedLngs: ['en', 'cs'],
    },
  },
  router: {
    framework: 'tanstack',
  },
});
