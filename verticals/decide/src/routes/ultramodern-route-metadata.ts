export const ultramodernRouteNamespace = 'decide' as const;

export const ultramodernRouteMetadata = [
  {
    "mfBoundaryId": "verticalDecide",
    "namespace": "decide",
    "ownerAppId": "decide",
    "canonicalPath": "/",
    "id": "decide-home",
    "localisedPaths": {
      "cs": "/",
      "en": "/"
    },
    "titleKey": "decide.title"
  },
  {
    "mfBoundaryId": "verticalDecide",
    "namespace": "decide",
    "ownerAppId": "decide",
    "canonicalPath": "/tractors",
    "id": "decide-listing-parent",
    "localisedPaths": {
      "cs": "/traktory",
      "en": "/tractors"
    },
    "titleKey": "decide.routes.listing"
  },
  {
    "mfBoundaryId": "verticalDecide",
    "namespace": "decide",
    "ownerAppId": "decide",
    "canonicalPath": "/tractors/:slug",
    "id": "decide-product-detail",
    "localisedPaths": {
      "cs": "/traktory/:slug",
      "en": "/tractors/:slug"
    },
    "titleKey": "decide.routes.productDetail"
  },
  {
    "mfBoundaryId": "verticalDecide",
    "namespace": "decide",
    "ownerAppId": "decide",
    "canonicalPath": "/unavailable",
    "id": "decide-unavailable",
    "localisedPaths": {
      "cs": "/nedostupne",
      "en": "/unavailable"
    },
    "titleKey": "decide.routes.unavailable"
  }
] as const;

export const ultramodernLocalisedUrls = {
  "/tractors": {
    "cs": "/traktory",
    "en": "/tractors"
  },
  "/traktory": {
    "cs": "/traktory",
    "en": "/tractors"
  },
  "/tractors/:slug": {
    "cs": "/traktory/:slug",
    "en": "/tractors/:slug"
  },
  "/traktory/:slug": {
    "cs": "/traktory/:slug",
    "en": "/tractors/:slug"
  },
  "/unavailable": {
    "cs": "/nedostupne",
    "en": "/unavailable"
  },
  "/nedostupne": {
    "cs": "/nedostupne",
    "en": "/unavailable"
  }
} as const;

export const ultramodernRouteConfig = {
  source: 'route-owned',
  namespace: ultramodernRouteNamespace,
  localisedUrls: ultramodernLocalisedUrls,
  routes: ultramodernRouteMetadata,
} as const;
