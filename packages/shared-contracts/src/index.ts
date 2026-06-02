export const ultramodernWorkspaceContract = {
  ownership: 'topology/ownership.json',
  preset: 'presetUltramodern',
  topology: 'topology/reference-topology.json',
} as const;

export type TractorLanguage = 'cs' | 'en';
export type TractorCategory = 'autonomous' | 'classic';
export interface TractorRouteTo {
  search?: Record<string, string>;
  to: string;
}

const localizedSegment = (language: TractorLanguage, segments: Record<TractorLanguage, string>) =>
  segments[language];

const withSearch = (pathname: string, search?: Record<string, string | undefined>) => {
  if (search === undefined) {
    return pathname;
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value !== undefined && value.length > 0) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query.length > 0 ? `${pathname}?${query}` : pathname;
};

export const tractorRoutes = {
  cart: (language: TractorLanguage, search?: { sku?: string | undefined }) =>
    withSearch(`/${language}/${localizedSegment(language, { cs: 'kosik', en: 'cart' })}`, search),
  checkout: (language: TractorLanguage) =>
    `/${language}/${localizedSegment(language, { cs: 'pokladna', en: 'checkout' })}`,
  home: (language: TractorLanguage) => `/${language}`,
  product: (language: TractorLanguage, slug: string, search?: { sku?: string | undefined }) =>
    withSearch(
      `/${language}/${localizedSegment(language, { cs: 'traktory', en: 'tractors' })}/${slug}`,
      search,
    ),
  stores: (language: TractorLanguage) =>
    `/${language}/${localizedSegment(language, { cs: 'prodejci', en: 'stores' })}`,
  tractors: (language: TractorLanguage, search?: { category?: TractorCategory | undefined }) =>
    withSearch(
      `/${language}/${localizedSegment(language, { cs: 'traktory', en: 'tractors' })}`,
      search,
    ),
} as const;

export const tractorRouteTo = (pathname: string): TractorRouteTo => {
  const [to = '/', query = ''] = pathname.split('?');
  if (query.length === 0) {
    return { to };
  }

  return {
    search: Object.fromEntries(new URLSearchParams(query)),
    to,
  };
};
