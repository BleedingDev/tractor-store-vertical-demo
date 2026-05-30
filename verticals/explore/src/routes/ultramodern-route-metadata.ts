export const ultramodernRouteNamespace = 'explore' as const;

export const ultramodernRouteMetadata = [
  {
    "mfBoundaryId": "verticalExplore",
    "namespace": "explore",
    "ownerAppId": "explore",
    "canonicalPath": "/",
    "id": "explore-home",
    "localisedPaths": {
      "cs": "/",
      "en": "/"
    },
    "titleKey": "explore.title"
  },
  {
    "mfBoundaryId": "verticalExplore",
    "namespace": "explore",
    "ownerAppId": "explore",
    "canonicalPath": "/tractors",
    "id": "explore-listing",
    "localisedPaths": {
      "cs": "/traktory",
      "en": "/tractors"
    },
    "titleKey": "explore.routes.listing"
  },
  {
    "mfBoundaryId": "verticalExplore",
    "namespace": "explore",
    "ownerAppId": "explore",
    "canonicalPath": "/stores",
    "id": "explore-store-picker",
    "localisedPaths": {
      "cs": "/prodejci",
      "en": "/stores"
    },
    "titleKey": "explore.routes.storePicker"
  },
  {
    "mfBoundaryId": "verticalExplore",
    "namespace": "explore",
    "ownerAppId": "explore",
    "canonicalPath": "/unavailable",
    "id": "explore-unavailable",
    "localisedPaths": {
      "cs": "/nedostupne",
      "en": "/unavailable"
    },
    "titleKey": "explore.routes.unavailable"
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
  "/stores": {
    "cs": "/prodejci",
    "en": "/stores"
  },
  "/prodejci": {
    "cs": "/prodejci",
    "en": "/stores"
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
