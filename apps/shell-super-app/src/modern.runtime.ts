import { defineRuntimeConfig } from '@modern-js/runtime';
import { createInstance } from 'i18next';
import csCheckoutResource from '../../../verticals/checkout/locales/cs/checkout.json';
import enCheckoutResource from '../../../verticals/checkout/locales/en/checkout.json';
import csDecideResource from '../../../verticals/decide/locales/cs/decide.json';
import enDecideResource from '../../../verticals/decide/locales/en/decide.json';
import csExploreResource from '../../../verticals/explore/locales/cs/explore.json';
import enExploreResource from '../../../verticals/explore/locales/en/explore.json';
import csResource from '../locales/cs/shell.json';
import enResource from '../locales/en/shell.json';
import { ultramodernRouteNamespace } from './routes/ultramodern-route-metadata';

type LocaleResource = Record<string, unknown>;

const mergeLocaleResources = (...resources: readonly LocaleResource[]) =>
  Object.assign({}, ...resources);

const i18nInstance = createInstance();
const csResources = mergeLocaleResources(
  csResource,
  csExploreResource,
  csDecideResource,
  csCheckoutResource,
);
const enResources = mergeLocaleResources(
  enResource,
  enExploreResource,
  enDecideResource,
  enCheckoutResource,
);
const resources = {
  cs: { [ultramodernRouteNamespace]: csResources, translation: csResources },
  en: { [ultramodernRouteNamespace]: enResources, translation: enResources },
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
