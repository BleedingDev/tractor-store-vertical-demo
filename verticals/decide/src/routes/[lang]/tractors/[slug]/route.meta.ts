const routeMeta = {
  canonicalPath: '/tractors/:slug',
  descriptionKey: 'decide.seo.description',
  id: 'decide-product-detail',
  indexable: false,
  localisedPaths: {
    cs: '/traktory/:slug',
    en: '/tractors/:slug',
  },
  mfBoundaryId: 'verticalDecide',
  namespace: 'decide',
  ownerAppId: 'decide',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'decide.routes.productDetail',
} as const;

export default routeMeta;
export { routeMeta };
