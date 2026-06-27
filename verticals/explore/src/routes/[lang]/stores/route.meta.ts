const routeMeta = {
  canonicalPath: '/stores',
  descriptionKey: 'explore.seo.description',
  id: 'explore-store-picker',
  indexable: false,
  localisedPaths: {
    cs: '/prodejci',
    en: '/stores',
  },
  mfBoundaryId: 'verticalExplore',
  namespace: 'explore',
  ownerAppId: 'explore',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'explore.routes.storePicker',
} as const;

export default routeMeta;
export { routeMeta };
