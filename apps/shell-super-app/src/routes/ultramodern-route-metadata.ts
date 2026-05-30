export const ultramodernRouteNamespace = 'shell' as const;

export const ultramodernRouteMetadata = [
  {
    "mfBoundaryId": "shellSuperApp",
    "namespace": "shell",
    "ownerAppId": "shell-super-app",
    "canonicalPath": "/",
    "id": "shell-home",
    "localisedPaths": {
      "cs": "/",
      "en": "/"
    },
    "titleKey": "shell.title"
  },
  {
    "mfBoundaryId": "shellSuperApp",
    "namespace": "shell",
    "ownerAppId": "shell-super-app",
    "canonicalPath": "/tractors",
    "id": "shell-tractors",
    "localisedPaths": {
      "cs": "/traktory",
      "en": "/tractors"
    },
    "titleKey": "shell.routes.listing"
  },
  {
    "mfBoundaryId": "shellSuperApp",
    "namespace": "shell",
    "ownerAppId": "shell-super-app",
    "canonicalPath": "/stores",
    "id": "shell-stores",
    "localisedPaths": {
      "cs": "/prodejci",
      "en": "/stores"
    },
    "titleKey": "shell.routes.storePicker"
  },
  {
    "mfBoundaryId": "shellSuperApp",
    "namespace": "shell",
    "ownerAppId": "shell-super-app",
    "canonicalPath": "/tractors/:slug",
    "id": "shell-product-detail",
    "localisedPaths": {
      "cs": "/traktory/:slug",
      "en": "/tractors/:slug"
    },
    "titleKey": "shell.routes.productDetail"
  },
  {
    "mfBoundaryId": "shellSuperApp",
    "namespace": "shell",
    "ownerAppId": "shell-super-app",
    "canonicalPath": "/cart",
    "id": "shell-cart",
    "localisedPaths": {
      "cs": "/kosik",
      "en": "/cart"
    },
    "titleKey": "shell.routes.cart"
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
  "/tractors/:slug": {
    "cs": "/traktory/:slug",
    "en": "/tractors/:slug"
  },
  "/traktory/:slug": {
    "cs": "/traktory/:slug",
    "en": "/tractors/:slug"
  },
  "/cart": {
    "cs": "/kosik",
    "en": "/cart"
  },
  "/kosik": {
    "cs": "/kosik",
    "en": "/cart"
  }
} as const;

export const ultramodernRouteConfig = {
  source: 'route-owned',
  namespace: ultramodernRouteNamespace,
  localisedUrls: ultramodernLocalisedUrls,
  routes: ultramodernRouteMetadata,
} as const;
