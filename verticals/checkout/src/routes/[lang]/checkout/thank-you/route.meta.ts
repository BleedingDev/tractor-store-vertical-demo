const routeMeta = {
  canonicalPath: '/checkout/thank-you',
  descriptionKey: 'checkout.seo.description',
  id: 'checkout-thank-you-parent',
  indexable: false,
  localisedPaths: {
    cs: '/pokladna/dekujeme',
    en: '/checkout/thank-you',
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
