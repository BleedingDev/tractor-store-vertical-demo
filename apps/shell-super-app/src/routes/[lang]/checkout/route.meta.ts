const routeMeta = {
  canonicalPath: '/checkout',
  descriptionKey: 'shell.seo.description',
  id: 'shell-checkout',
  indexable: false,
  localisedPaths: {
    cs: '/pokladna',
    en: '/checkout',
  },
  mfBoundaryId: 'shellSuperApp',
  namespace: 'shell',
  ownerAppId: 'shell-super-app',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'checkout.routes.checkout',
} as const;

export default routeMeta;
export { routeMeta };
