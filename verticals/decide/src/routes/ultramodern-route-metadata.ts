export const ultramodernRouteNamespace = 'decide' as const;

export const ultramodernRouteMetadata = [
  {
    canonicalPath: '/',
    id: 'decide-home',
    localisedPaths: {
      cs: '/',
      en: '/',
    },
    mfBoundaryId: 'verticalDecide',
    namespace: 'decide',
    ownerAppId: 'decide',
    titleKey: 'decide.title',
  },
  {
    canonicalPath: '/tractors',
    id: 'decide-listing-parent',
    localisedPaths: {
      cs: '/traktory',
      en: '/tractors',
    },
    mfBoundaryId: 'verticalDecide',
    namespace: 'decide',
    ownerAppId: 'decide',
    titleKey: 'decide.routes.listing',
  },
  {
    canonicalPath: '/tractors/:slug',
    id: 'decide-product-detail',
    localisedPaths: {
      cs: '/traktory/:slug',
      en: '/tractors/:slug',
    },
    mfBoundaryId: 'verticalDecide',
    namespace: 'decide',
    ownerAppId: 'decide',
    titleKey: 'decide.routes.productDetail',
  },
  {
    canonicalPath: '/unavailable',
    id: 'decide-unavailable',
    localisedPaths: {
      cs: '/nedostupne',
      en: '/unavailable',
    },
    mfBoundaryId: 'verticalDecide',
    namespace: 'decide',
    ownerAppId: 'decide',
    titleKey: 'decide.routes.unavailable',
  },
] as const;

export const ultramodernLocalisedUrls = {
  '/nedostupne': {
    cs: '/nedostupne',
    en: '/unavailable',
  },
  '/tractors': {
    cs: '/traktory',
    en: '/tractors',
  },
  '/tractors/:slug': {
    cs: '/traktory/:slug',
    en: '/tractors/:slug',
  },
  '/traktory': {
    cs: '/traktory',
    en: '/tractors',
  },
  '/traktory/:slug': {
    cs: '/traktory/:slug',
    en: '/tractors/:slug',
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
