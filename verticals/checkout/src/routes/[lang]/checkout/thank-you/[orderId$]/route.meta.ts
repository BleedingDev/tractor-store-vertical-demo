const routeMeta = {
  canonicalPath: '/checkout/thank-you/:orderId?',
  descriptionKey: 'checkout.seo.description',
  id: 'checkout-thank-you',
  indexable: false,
  localisedPaths: {
    cs: '/pokladna/dekujeme/:orderId?',
    en: '/checkout/thank-you/:orderId?',
  },
  mfBoundaryId: 'verticalCheckout',
  namespace: 'checkout',
  ownerAppId: 'checkout',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'checkout.routes.thankYou',
} as const;

export default routeMeta;
export { routeMeta };
