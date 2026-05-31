export const ultramodernRouteNamespace = 'checkout' as const;

export const ultramodernRouteMetadata = [
  {
    canonicalPath: '/',
    id: 'checkout-home',
    localisedPaths: {
      cs: '/',
      en: '/',
    },
    mfBoundaryId: 'verticalCheckout',
    namespace: 'checkout',
    ownerAppId: 'checkout',
    titleKey: 'checkout.title',
  },
  {
    canonicalPath: '/cart',
    id: 'checkout-cart',
    localisedPaths: {
      cs: '/kosik',
      en: '/cart',
    },
    mfBoundaryId: 'verticalCheckout',
    namespace: 'checkout',
    ownerAppId: 'checkout',
    titleKey: 'checkout.routes.cart',
  },
  {
    canonicalPath: '/checkout',
    id: 'checkout-start',
    localisedPaths: {
      cs: '/pokladna',
      en: '/checkout',
    },
    mfBoundaryId: 'verticalCheckout',
    namespace: 'checkout',
    ownerAppId: 'checkout',
    titleKey: 'checkout.routes.checkout',
  },
  {
    canonicalPath: '/checkout/thank-you',
    id: 'checkout-thank-you-parent',
    localisedPaths: {
      cs: '/pokladna/dekujeme',
      en: '/checkout/thank-you',
    },
    mfBoundaryId: 'verticalCheckout',
    namespace: 'checkout',
    ownerAppId: 'checkout',
    titleKey: 'checkout.routes.thankYou',
  },
  {
    canonicalPath: '/checkout/thank-you/:orderId?',
    id: 'checkout-thank-you',
    localisedPaths: {
      cs: '/pokladna/dekujeme/:orderId?',
      en: '/checkout/thank-you/:orderId?',
    },
    mfBoundaryId: 'verticalCheckout',
    namespace: 'checkout',
    ownerAppId: 'checkout',
    titleKey: 'checkout.routes.thankYou',
  },
  {
    canonicalPath: '/unavailable',
    id: 'checkout-unavailable',
    localisedPaths: {
      cs: '/nedostupne',
      en: '/unavailable',
    },
    mfBoundaryId: 'verticalCheckout',
    namespace: 'checkout',
    ownerAppId: 'checkout',
    titleKey: 'checkout.routes.unavailable',
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
  '/nedostupne': {
    cs: '/nedostupne',
    en: '/unavailable',
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
