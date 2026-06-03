export const ultramodernRouteNamespace = 'shell' as const;

export const ultramodernRouteMetadata = [
  {
    canonicalPath: '/',
    id: 'shell-home',
    localisedPaths: {
      cs: '/',
      en: '/',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'shell.title',
  },
  {
    canonicalPath: '/tractors',
    id: 'shell-tractors',
    localisedPaths: {
      cs: '/traktory',
      en: '/tractors',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'shell.routes.listing',
  },
  {
    canonicalPath: '/stores',
    id: 'shell-stores',
    localisedPaths: {
      cs: '/prodejci',
      en: '/stores',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'shell.routes.storePicker',
  },
  {
    canonicalPath: '/tractors/:slug',
    id: 'shell-product-detail',
    localisedPaths: {
      cs: '/traktory/:slug',
      en: '/tractors/:slug',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'shell.routes.productDetail',
  },
  {
    canonicalPath: '/cart',
    id: 'shell-cart',
    localisedPaths: {
      cs: '/kosik',
      en: '/cart',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'shell.routes.cart',
  },
  {
    canonicalPath: '/checkout',
    id: 'shell-checkout',
    localisedPaths: {
      cs: '/pokladna',
      en: '/checkout',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'checkout.routes.checkout',
  },
  {
    canonicalPath: '/checkout/thank-you',
    id: 'shell-checkout-thank-you-parent',
    localisedPaths: {
      cs: '/pokladna/dekujeme',
      en: '/checkout/thank-you',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'checkout.routes.thankYou',
  },
  {
    canonicalPath: '/checkout/thank-you/:orderId?',
    id: 'shell-checkout-thank-you',
    localisedPaths: {
      cs: '/pokladna/dekujeme/:orderId?',
      en: '/checkout/thank-you/:orderId?',
    },
    mfBoundaryId: 'shellSuperApp',
    namespace: 'shell',
    ownerAppId: 'shell-super-app',
    titleKey: 'checkout.routes.thankYou',
  },
] as const;

export const ultramodernLocalisedUrls = {
  '/cart': {
    cs: '/kosik',
    en: '/cart',
  },
  '/checkout': {
    cs: '/pokladna',
    en: '/checkout',
  },
  '/checkout/thank-you': {
    cs: '/pokladna/dekujeme',
    en: '/checkout/thank-you',
  },
  '/checkout/thank-you/:orderId?': {
    cs: '/pokladna/dekujeme/:orderId?',
    en: '/checkout/thank-you/:orderId?',
  },
  '/kosik': {
    cs: '/kosik',
    en: '/cart',
  },
  '/pokladna': {
    cs: '/pokladna',
    en: '/checkout',
  },
  '/pokladna/dekujeme': {
    cs: '/pokladna/dekujeme',
    en: '/checkout/thank-you',
  },
  '/pokladna/dekujeme/:orderId?': {
    cs: '/pokladna/dekujeme/:orderId?',
    en: '/checkout/thank-you/:orderId?',
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
} as const;

export const ultramodernRouteConfig = {
  localisedUrls: ultramodernLocalisedUrls,
  namespace: ultramodernRouteNamespace,
  routes: ultramodernRouteMetadata,
  source: 'route-owned',
} as const;
