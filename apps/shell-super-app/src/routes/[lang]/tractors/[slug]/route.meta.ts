const routeMeta = {
  canonicalPath: '/tractors/:slug',
  descriptionKey: 'shell.seo.description',
  id: 'shell-product-detail',
  indexable: false,
  localisedPaths: {
    cs: '/traktory/:slug',
    en: '/tractors/:slug',
  },
  mfBoundaryId: 'shellSuperApp',
  namespace: 'shell',
  ownerAppId: 'shell-super-app',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'shell.routes.productDetail',
} as const;

export default routeMeta;
export { routeMeta };
