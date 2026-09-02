export const validateSearch = (search: Record<string, unknown>) => ({
  sku: typeof search['sku'] === 'string' ? search['sku'] : undefined,
});
