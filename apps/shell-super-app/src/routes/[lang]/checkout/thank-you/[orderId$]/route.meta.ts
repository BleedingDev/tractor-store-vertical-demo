const routeMeta = {
  canonicalPath: '/checkout/thank-you/:orderId?',
  descriptionKey: 'shell.seo.description',
  id: 'shell-checkout-thank-you',
  indexable: false,
  localisedPaths: {
    cs: '/pokladna/dekujeme/:orderId?',
    en: '/checkout/thank-you/:orderId?',
  },
  mfBoundaryId: 'shellSuperApp',
  namespace: 'shell',
  ownerAppId: 'shell-super-app',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'checkout.routes.thankYou',
} as const;

export default routeMeta;
export { routeMeta };
