export const ultramodernRouteNamespace = 'checkout' as const;

export const ultramodernRouteMetadata = [
  {
    "mfBoundaryId": "verticalCheckout",
    "namespace": "checkout",
    "ownerAppId": "checkout",
    "canonicalPath": "/",
    "id": "checkout-home",
    "localisedPaths": {
      "cs": "/",
      "en": "/"
    },
    "titleKey": "checkout.title"
  },
  {
    "mfBoundaryId": "verticalCheckout",
    "namespace": "checkout",
    "ownerAppId": "checkout",
    "canonicalPath": "/cart",
    "id": "checkout-cart",
    "localisedPaths": {
      "cs": "/kosik",
      "en": "/cart"
    },
    "titleKey": "checkout.routes.cart"
  },
  {
    "mfBoundaryId": "verticalCheckout",
    "namespace": "checkout",
    "ownerAppId": "checkout",
    "canonicalPath": "/checkout",
    "id": "checkout-start",
    "localisedPaths": {
      "cs": "/pokladna",
      "en": "/checkout"
    },
    "titleKey": "checkout.routes.checkout"
  },
  {
    "mfBoundaryId": "verticalCheckout",
    "namespace": "checkout",
    "ownerAppId": "checkout",
    "canonicalPath": "/checkout/thank-you",
    "id": "checkout-thank-you-parent",
    "localisedPaths": {
      "cs": "/pokladna/dekujeme",
      "en": "/checkout/thank-you"
    },
    "titleKey": "checkout.routes.thankYou"
  },
  {
    "mfBoundaryId": "verticalCheckout",
    "namespace": "checkout",
    "ownerAppId": "checkout",
    "canonicalPath": "/checkout/thank-you/:orderId?",
    "id": "checkout-thank-you",
    "localisedPaths": {
      "cs": "/pokladna/dekujeme/:orderId?",
      "en": "/checkout/thank-you/:orderId?"
    },
    "titleKey": "checkout.routes.thankYou"
  },
  {
    "mfBoundaryId": "verticalCheckout",
    "namespace": "checkout",
    "ownerAppId": "checkout",
    "canonicalPath": "/unavailable",
    "id": "checkout-unavailable",
    "localisedPaths": {
      "cs": "/nedostupne",
      "en": "/unavailable"
    },
    "titleKey": "checkout.routes.unavailable"
  }
] as const;

export const ultramodernLocalisedUrls = {
  "/cart": {
    "cs": "/kosik",
    "en": "/cart"
  },
  "/kosik": {
    "cs": "/kosik",
    "en": "/cart"
  },
  "/checkout": {
    "cs": "/pokladna",
    "en": "/checkout"
  },
  "/pokladna": {
    "cs": "/pokladna",
    "en": "/checkout"
  },
  "/checkout/thank-you": {
    "cs": "/pokladna/dekujeme",
    "en": "/checkout/thank-you"
  },
  "/pokladna/dekujeme": {
    "cs": "/pokladna/dekujeme",
    "en": "/checkout/thank-you"
  },
  "/checkout/thank-you/:orderId?": {
    "cs": "/pokladna/dekujeme/:orderId?",
    "en": "/checkout/thank-you/:orderId?"
  },
  "/pokladna/dekujeme/:orderId?": {
    "cs": "/pokladna/dekujeme/:orderId?",
    "en": "/checkout/thank-you/:orderId?"
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
