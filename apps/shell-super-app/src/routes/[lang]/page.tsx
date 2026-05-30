import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { Helmet } from '@modern-js/runtime/head';
import { useLocation } from '@modern-js/plugin-tanstack/runtime';
import ShellFrame from '../shell-frame';
import { StorePicker } from '../vertical-components';
import { ultramodernLocalisedUrls } from '../ultramodern-route-metadata';
import { ultramodernUiMarker } from '../../ultramodern-build';

const heroField = '/assets/ultramodern/hero-field.svg';

const fallbackLanguage = 'en';
const supportedLanguages = ['en', 'cs'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const localisedUrls = ultramodernLocalisedUrls as Record<
  string,
  Record<SupportedLanguage, string>
>;

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  supportedLanguages.includes(value as SupportedLanguage);

const normalisePath = (pathname: string) => {
  const normalised = pathname.replace(/\/+$/u, '').replace(/\/+/gu, '/');
  return normalised.length > 0 ? normalised : '/';
};

const stripLanguagePrefix = (pathname: string) => {
  const segments = normalisePath(pathname).split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLanguage(segments[0] ?? '')) {
    segments.shift();
  }
  return `/${segments.join('/')}`;
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const paramName = (segment: string) => segment.slice(1).replace(/\?$/u, '');

const matchPattern = (pathname: string, pattern: string) => {
  const names: string[] = [];
  const source = normalisePath(pattern)
    .split('/')
    .filter(Boolean)
    .map(segment => {
      if (segment.startsWith(':')) {
        names.push(paramName(segment));
        return segment.endsWith('?') ? '(?:/([^/]+))?' : '/([^/]+)';
      }
      return `/${escapeRegExp(segment)}`;
    })
    .join('');
  const match = new RegExp(`^${source || '/'}$`).exec(normalisePath(pathname));

  if (!match) {
    return undefined;
  }

  return names.reduce<Record<string, string>>((params, name, index) => {
    params[name] = decodeURIComponent(match[index + 1] ?? '');
    return params;
  }, {});
};

const buildPath = (pattern: string, params: Record<string, string>) => {
  const path = normalisePath(pattern)
    .split('/')
    .filter(Boolean)
    .map(segment => {
      if (!segment.startsWith(':')) {
        return segment;
      }
      const value = params[paramName(segment)];
      return value ? encodeURIComponent(value) : '';
    })
    .filter(Boolean)
    .join('/');

  return `/${path}`;
};

const resolveLocalisedPath = (
  pathname: string,
  targetLanguage: SupportedLanguage,
) => {
  const pathWithoutLanguage = stripLanguagePrefix(pathname);

  for (const entry of Object.values(localisedUrls)) {
    const targetPattern = entry[targetLanguage];
    if (!targetPattern) {
      continue;
    }

    for (const language of supportedLanguages) {
      const sourcePattern = entry[language];
      const params = sourcePattern
        ? matchPattern(pathWithoutLanguage, sourcePattern)
        : undefined;
      if (params) {
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

const absoluteUrl = (pathname: string) => {
  const origin = ULTRAMODERN_SITE_URL.replace(/\/+$/u, '');
  return `${origin}${pathname}`;
};

const locationSuffix = (location: {
  hash?: unknown;
  search?: unknown;
  searchStr?: unknown;
}) => {
  const locationSearch =
    typeof location.searchStr === 'string'
      ? location.searchStr
      : typeof location.search === 'string'
        ? location.search
        : '';
  const locationHash = typeof location.hash === 'string' ? location.hash : '';

  return `${locationSearch}${locationHash}`;
};

const LocalizedHead = () => {
  const location = useLocation();
  const canonicalPath = localizedPath(location.pathname, fallbackLanguage);

  return (
    <Helmet>
      <link rel="canonical" href={absoluteUrl(canonicalPath)} />
      {supportedLanguages.map(code => (
        <link
          href={absoluteUrl(localizedPath(location.pathname, code))}
          hrefLang={code}
          key={code}
          rel="alternate"
        />
      ))}
      <link
        href={absoluteUrl(localizedPath(location.pathname, fallbackLanguage))}
        hrefLang="x-default"
        rel="alternate"
      />
    </Helmet>
  );
};

export default function ShellHome() {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <ShellFrame>
      <LocalizedHead />
      <section className="shell:mx-auto shell:grid shell:max-w-7xl shell:items-center shell:gap-8 shell:py-8 shell:md:grid-cols-[0.9fr_1.1fr] shell:lg:gap-14">
        <div className="shell:min-w-0">
          <p className="shell:text-xs shell:font-black shell:uppercase shell:tracking-[0.18em] shell:text-emerald-800">{t('shell.hero.eyebrow')}</p>
          <h1 className="shell:mt-3 shell:max-w-3xl shell:text-5xl shell:font-black shell:leading-none shell:tracking-normal shell:text-stone-950 shell:md:text-7xl">{t('shell.title')}</h1>
          <p className="shell:mt-5 shell:max-w-2xl shell:text-lg shell:leading-8 shell:text-stone-600">{t('shell.hero.lede')}</p>
          <div className="shell:mt-7 shell:flex shell:flex-wrap shell:gap-3">
            <a className="shell:inline-flex shell:min-h-11 shell:items-center shell:justify-center shell:rounded-full shell:bg-emerald-800 shell:px-5 shell:font-bold shell:text-white shell:shadow-lg shell:shadow-stone-900/10" href={`/${language}/tractors/field-loader-112`}>
            {t('shell.hero.primary')}
            </a>
            <a className="shell:inline-flex shell:min-h-11 shell:items-center shell:justify-center shell:rounded-full shell:border shell:border-stone-900/15 shell:bg-white/90 shell:px-5 shell:font-bold shell:text-stone-950 shell:shadow-lg shell:shadow-stone-900/10" href={`/${language}/tractors`}>
            {t('shell.hero.secondary')}
            </a>
          </div>
        </div>
        <img alt="" className="shell:aspect-[16/10] shell:w-full shell:rounded-3xl shell:bg-stone-200 shell:object-cover shell:shadow-2xl shell:shadow-stone-900/20" src={heroField} />
      </section>
      <StorePicker />
      <p className="shell:sr-only" data-testid="ultramodern-preset">presetUltramodern workspace</p>
      <p className="shell:sr-only" data-build-marker={ultramodernUiMarker.build} data-testid="ultramodern-ui-marker">
        {ultramodernUiMarker.appId}:{ultramodernUiMarker.version}
      </p>
    </ShellFrame>
  );
}
