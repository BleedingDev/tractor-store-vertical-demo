import { useLocation } from '@modern-js/plugin-tanstack/runtime';
import csResource from '../../locales/cs/shell.json';
import enResource from '../../locales/en/shell.json';

type Language = 'cs' | 'en';
type TranslationValue = Record<string, unknown> | string;
type TranslationResource = Record<string, TranslationValue>;

const resources = {
  cs: csResource as TranslationResource,
  en: enResource as TranslationResource,
} satisfies Record<Language, TranslationResource>;

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

export const useShellI18n = () => {
  const location = useLocation();
  const language = languageFromPath(location.pathname);
  const translate = (key: string) =>
    readPath(resources[language], key) ?? readPath(resources.en, key) ?? key;

  return {
    language,
    t: translate,
  };
};
