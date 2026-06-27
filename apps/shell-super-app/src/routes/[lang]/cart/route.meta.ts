const routeMeta = {
  canonicalPath: '/cart',
  descriptionKey: 'shell.seo.description',
  id: 'shell-cart',
  indexable: false,
  localisedPaths: {
    cs: '/kosik',
    en: '/cart',
  },
  mfBoundaryId: 'shellSuperApp',
  namespace: 'shell',
  ownerAppId: 'shell-super-app',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'shell.routes.cart',
} as const;

export default routeMeta;
export { routeMeta };
