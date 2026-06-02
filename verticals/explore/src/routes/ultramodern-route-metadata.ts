export const ultramodernRouteNamespace = 'explore' as const;

export const ultramodernRouteMetadata = [
  {
    canonicalPath: '/',
    id: 'explore-home',
    localisedPaths: {
      cs: '/',
      en: '/',
    },
    mfBoundaryId: 'verticalExplore',
    namespace: 'explore',
    ownerAppId: 'explore',
    titleKey: 'explore.title',
  },
  {
    canonicalPath: '/tractors',
    id: 'explore-listing',
    localisedPaths: {
      cs: '/traktory',
      en: '/tractors',
    },
    mfBoundaryId: 'verticalExplore',
    namespace: 'explore',
    ownerAppId: 'explore',
    titleKey: 'explore.routes.listing',
  },
  {
    canonicalPath: '/stores',
    id: 'explore-store-picker',
    localisedPaths: {
      cs: '/prodejci',
      en: '/stores',
    },
    mfBoundaryId: 'verticalExplore',
    namespace: 'explore',
    ownerAppId: 'explore',
    titleKey: 'explore.routes.storePicker',
  },
  {
    canonicalPath: '/unavailable',
    id: 'explore-unavailable',
    localisedPaths: {
      cs: '/nedostupne',
      en: '/unavailable',
    },
    mfBoundaryId: 'verticalExplore',
    namespace: 'explore',
    ownerAppId: 'explore',
    titleKey: 'explore.routes.unavailable',
  },
] as const;

export const ultramodernLocalisedUrls = {
  '/nedostupne': {
    cs: '/nedostupne',
    en: '/unavailable',
  },
  '/prodejci': {
    cs: '/prodejci',
    en: '/stores',
  },
  '/stores': {
    cs: '/prodejci',
    en: '/stores',
  },
  '/tractors': {
    cs: '/traktory',
    en: '/tractors',
  },
  '/traktory': {
    cs: '/traktory',
    en: '/tractors',
  },
  '/unavailable': {
    cs: '/nedostupne',
    en: '/unavailable',
  },
} as const;

export const ultramodernRouteConfig = {
  localisedUrls: ultramodernLocalisedUrls,
  namespace: ultramodernRouteNamespace,
  routes: ultramodernRouteMetadata,
  source: 'route-owned',
} as const;
