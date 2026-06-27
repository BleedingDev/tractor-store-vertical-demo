const routeMeta = {
  canonicalPath: '/checkout',
  descriptionKey: 'checkout.seo.description',
  id: 'checkout-start',
  indexable: false,
  localisedPaths: {
    cs: '/pokladna',
    en: '/checkout',
  },
  mfBoundaryId: 'verticalCheckout',
  namespace: 'checkout',
  ownerAppId: 'checkout',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'checkout.routes.checkout',
} as const;

export default routeMeta;
export { routeMeta };
