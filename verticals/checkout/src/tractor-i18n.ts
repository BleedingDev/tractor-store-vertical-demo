import { useLocation } from '@modern-js/plugin-tanstack/runtime';
import csResource from '../locales/cs/checkout.json';
import enResource from '../locales/en/checkout.json';

type Language = 'cs' | 'en';
type TranslationValue = Record<string, unknown> | string;
type TranslationResource = Record<string, TranslationValue>;

const resources = {
  cs: csResource as TranslationResource,
  en: enResource as TranslationResource,
} satisfies Record<Language, TranslationResource>;
const routeSegments = {
  cs: {
    cart: 'kosik',
    checkout: 'pokladna',
    tractors: 'traktory',
  },
  en: {
    cart: 'cart',
    checkout: 'checkout',
    tractors: 'tractors',
  },
} satisfies Record<Language, Record<'cart' | 'checkout' | 'tractors', string>>;

const languageFromPath = (pathname: string): Language => {
  const segment = pathname.split('/').find(Boolean);
  return segment === 'cs' ? 'cs' : 'en';
};

const readPath = (resource: TranslationResource, key: string): string | undefined => {
  let current: TranslationValue | undefined = resource;
  for (const segment of key.split('.')) {
    if (typeof current !== 'object' || current === null) {
      return;
    }
    current = current[segment] as TranslationValue | undefined;
  }
  return typeof current === 'string' ? current : undefined;
};

const interpolate = (value: string, options: Record<string, number | string>) => {
  let text = value;
  for (const [key, replacement] of Object.entries(options)) {
    text = text.replaceAll(`{{${key}}}`, String(replacement));
  }
  return text;
};

export const useCheckoutI18n = () => {
  const location = useLocation();
  const language = languageFromPath(location.pathname);
  const translate = (key: string, options: Record<string, number | string> = {}) =>
    interpolate(readPath(resources[language], key) ?? readPath(resources.en, key) ?? key, options);

  return {
    language,
    routeSegment: (name: 'cart' | 'checkout' | 'tractors') => routeSegments[language][name],
    t: translate,
  };
};
