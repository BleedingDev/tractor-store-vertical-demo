const routeMeta = {
  canonicalPath: '/cart',
  descriptionKey: 'checkout.seo.description',
  id: 'checkout-cart',
  indexable: false,
  localisedPaths: {
    cs: '/kosik',
    en: '/cart',
  },
  mfBoundaryId: 'verticalCheckout',
  namespace: 'checkout',
  ownerAppId: 'checkout',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'checkout.routes.cart',
} as const;

export default routeMeta;
export { routeMeta };
