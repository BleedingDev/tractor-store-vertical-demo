const routeMeta = {
  canonicalPath: '/stores',
  descriptionKey: 'shell.seo.description',
  id: 'shell-stores',
  indexable: false,
  localisedPaths: {
    cs: '/prodejci',
    en: '/stores',
  },
  mfBoundaryId: 'shellSuperApp',
  namespace: 'shell',
  ownerAppId: 'shell-super-app',
  public: false,
  publicSurface: 'private-app-screen',
  titleKey: 'shell.routes.storePicker',
} as const;

export default routeMeta;
export { routeMeta };
