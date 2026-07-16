import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { Link, useLocation } from '@modern-js/plugin-tanstack/runtime';
import { UltramodernRouteHead } from '../ultramodern-route-head';
import { ultramodernLocalisedUrls } from '../ultramodern-route-metadata';
import { ultramodernUiMarker } from '../../ultramodern-build';

const supportedLanguages = ['en', 'cs'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const localisedUrls = ultramodernLocalisedUrls as Record<string, Record<SupportedLanguage, string>>;

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  supportedLanguages.includes(value as SupportedLanguage);

const normalisePath = (pathname: string) => {
  const normalised = pathname.replace(/\/+$/u, '').replaceAll(/\/+/gu, '/');
  return normalised.length > 0 ? normalised : '/';
};

const stripLanguagePrefix = (pathname: string) => {
  const segments = normalisePath(pathname).split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLanguage(segments[0] ?? '')) {
    segments.shift();
  }
  return `/${segments.join('/')}`;
};

const escapeRegExp = (value: string) => value.replaceAll(/[.*+?^${}()|[\]\\]/gu, '\\$&');

const paramName = (segment: string) => segment.slice(1).replace(/\?$/u, '');

const matchPattern = (pathname: string, pattern: string) => {
  const names: string[] = [];
  const source = normalisePath(pattern)
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      if (segment.startsWith(':')) {
        names.push(paramName(segment));
        return segment.endsWith('?') ? '(?:/([^/]+))?' : '/([^/]+)';
      }
      return `/${escapeRegExp(segment)}`;
    })
    .join('');
  const match = new RegExp(`^${source || '/'}$`, 'u').exec(normalisePath(pathname));

  if (match === null) {
    return;
  }

  const params: Record<string, string> = {};
  for (const [index, name] of names.entries()) {
    params[name] = decodeURIComponent(match[index + 1] ?? '');
  }
  return params;
};

const buildPath = (pattern: string, params: Record<string, string>) => {
  const path = normalisePath(pattern)
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      if (!segment.startsWith(':')) {
        return segment;
      }
      const value = params[paramName(segment)];
      return value !== undefined && value.length > 0 ? encodeURIComponent(value) : '';
    })
    .filter(Boolean)
    .join('/');

  return `/${path}`;
};

const resolveLocalisedPath = (pathname: string, targetLanguage: SupportedLanguage) => {
  const pathWithoutLanguage = stripLanguagePrefix(pathname);

  for (const entry of Object.values(localisedUrls)) {
    const targetPattern = entry[targetLanguage];
    if (targetPattern === undefined || targetPattern.length === 0) {
      continue;
    }

    for (const language of supportedLanguages) {
      const sourcePattern = entry[language];
      if (sourcePattern === undefined || sourcePattern.length === 0) {
        continue;
      }
      const params = matchPattern(pathWithoutLanguage, sourcePattern);
      if (params !== undefined) {
        return buildPath(targetPattern, params);
      }
    }
  }

  return pathWithoutLanguage;
};

const localizedPath = (pathname: string, language: SupportedLanguage) => {
  const pathWithoutLanguage = resolveLocalisedPath(pathname, language);
  return pathWithoutLanguage === '/' ? `/${language}` : `/${language}${pathWithoutLanguage}`;
};

export default function CheckoutHome() {
  const { language, t } = useModernI18n();
  const location = useLocation();
  return (
    <main className="checkout:min-h-screen checkout:bg-um-canvas checkout:px-4 checkout:py-6 checkout:text-um-foreground checkout:sm:px-8">
      <UltramodernRouteHead />
      <nav aria-label={t('checkout.language.switcher')} className="checkout:flex checkout:gap-3">
        {supportedLanguages.map((code) => (
          <Link
            aria-current={language === code ? 'page' : undefined}
            className="checkout:rounded-full checkout:border checkout:border-stone-900/15 checkout:bg-white checkout:px-4 checkout:py-2 checkout:text-sm checkout:font-bold checkout:text-stone-950 checkout:no-underline"
            hash={true}
            key={code}
            search={true}
            to={localizedPath(location.pathname, code)}
          >
            {t(`checkout.language.${code}`)}
          </Link>
        ))}
      </nav>
      <h1 className="checkout:mt-10 checkout:text-5xl checkout:font-black">
        {t('checkout.title')}
      </h1>
      <p
        className="checkout:mt-3 checkout:text-lg checkout:text-stone-600"
        data-modern-role="vertical"
      >
        {t('checkout.role')}
      </p>
      <p
        className="checkout:sr-only"
        data-build-marker={ultramodernUiMarker.build}
        data-testid="ultramodern-ui-marker"
      >
        {ultramodernUiMarker.appId}:{ultramodernUiMarker.version}
      </p>
    </main>
  );
}
