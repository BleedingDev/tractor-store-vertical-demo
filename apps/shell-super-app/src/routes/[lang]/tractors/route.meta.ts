const routeMeta = {
  canonicalPath: '/tractors',
  descriptionKey: 'shell.seo.description',
  id: 'shell-tractors',
  indexable: false,
  localisedPaths: {
    cs: '/traktory',
    en: '/tractors',
  },
  mfBoundaryId: 'shellSuperApp',
  namespace: 'shell',
  ownerAppId: 'shell-super-app',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'shell.routes.listing',
} as const;

export default routeMeta;
export { routeMeta };
