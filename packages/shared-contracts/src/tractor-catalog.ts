export const logoUrl = 'https://blueprint.the-tractor.store/cdn/img/logo.svg';

export const sizedImage = (template: string, size: number) =>
  template.replace('[size]', String(size));

export const responsiveImage = (template: string, sizes: number[]) =>
  sizes.map((size) => `${sizedImage(template, size)} ${size}w`).join(', ');

export const productSlug = (name: string) =>
  name
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/^-|-$/gu, '');

const productImage = (sku: string) =>
  `https://blueprint.the-tractor.store/cdn/img/product/[size]/${sku}.webp`;

type TractorCategory = 'autonomous' | 'classic';

interface TractorVariantInput {
  baseName: string;
  cartName?: string;
  category: TractorCategory;
  color: string;
  finish?: string;
  id: string;
  labelKey?: string;
  price: number;
  sku: string;
}

const variantRows: readonly TractorVariantInput[] = [
  {
    baseName: 'Sapphire Sunworker 460R',
    category: 'autonomous',
    color: '#c83c36',
    id: 'AU-04',
    price: 8500,
    sku: 'AU-04-RD',
  },
  {
    baseName: 'Field Pioneer',
    category: 'autonomous',
    color: '#f5f5f0',
    id: 'AU-08',
    price: 4500,
    sku: 'AU-08-WH',
  },
  {
    baseName: 'SmartFarm Titan',
    category: 'autonomous',
    color: '#b65f35',
    id: 'AU-02',
    price: 4000,
    sku: 'AU-02-OG',
  },
  {
    baseName: 'Verde Voyager',
    category: 'autonomous',
    color: '#7d7564',
    id: 'AU-07',
    price: 4000,
    sku: 'AU-07-MT',
  },
  {
    baseName: 'EcoGrow Crop Commander',
    cartName: 'EcoGrow Crop Commander Zestful Horizon',
    category: 'autonomous',
    color: '#f4c624',
    finish: 'Zestful Horizon',
    id: 'AU-05',
    price: 3400,
    sku: 'AU-05-ZH',
  },
  {
    baseName: 'FarmFleet Sovereign',
    category: 'autonomous',
    color: '#b44d3f',
    id: 'AU-06',
    price: 2100,
    sku: 'AU-06-CZ',
  },
  {
    baseName: 'FutureHarvest Navigator',
    category: 'autonomous',
    color: '#49b6bd',
    id: 'AU-03',
    price: 1600,
    sku: 'AU-03-TQ',
  },
  {
    baseName: 'TerraFirma AutoCultivator T-300',
    cartName: 'TerraFirma AutoCultivator T-300 Silver',
    category: 'autonomous',
    color: '#bfc1c4',
    finish: 'Silver',
    id: 'AU-01',
    price: 1000,
    sku: 'AU-01-SI',
  },
  {
    baseName: 'Holland Hamster',
    cartName: 'Holland Hamster Polder Green',
    category: 'classic',
    color: '#c2b280',
    finish: 'Polder Green',
    id: 'CL-08',
    labelKey: 'decide.product.variants.polderGreen',
    price: 7750,
    sku: 'CL-08-GR',
  },
  {
    baseName: 'Holland Hamster',
    cartName: 'Holland Hamster Tulip Magenta',
    category: 'classic',
    color: '#d65282',
    finish: 'Tulip Magenta',
    id: 'CL-08',
    labelKey: 'decide.product.variants.tulipMagenta',
    price: 7900,
    sku: 'CL-08-PI',
  },
  {
    baseName: 'Rapid Racer',
    category: 'classic',
    color: '#2580bd',
    id: 'CL-13',
    price: 7500,
    sku: 'CL-13-BL',
  },
  {
    baseName: 'Fieldmaster Classic',
    cartName: 'Fieldmaster Classic Vintage Pink',
    category: 'classic',
    color: '#d99aaa',
    finish: 'Vintage Pink',
    id: 'CL-15',
    price: 6200,
    sku: 'CL-15-PI',
  },
  {
    baseName: 'Fieldmaster Classic',
    cartName: 'Fieldmaster Classic Sahara Dust',
    category: 'classic',
    color: '#d2bd81',
    finish: 'Sahara Dust',
    id: 'CL-15',
    price: 6200,
    sku: 'CL-15-SD',
  },
  {
    baseName: 'Heritage Workhorse',
    category: 'classic',
    color: '#7b8f65',
    id: 'CL-01',
    price: 5700,
    sku: 'CL-01-GR',
  },
  {
    baseName: 'Celerity Cruiser',
    category: 'classic',
    color: '#2580bd',
    id: 'CL-12',
    price: 3200,
    sku: 'CL-12-BL',
  },
  {
    baseName: 'Scandinavia Sower',
    cartName: 'Scandinavia Sower Baltic Blue',
    category: 'classic',
    color: '#2580bd',
    finish: 'Baltic Blue',
    id: 'CL-11',
    price: 3100,
    sku: 'CL-11-SK',
  },
  {
    baseName: 'TerraFirma Veneto',
    category: 'classic',
    color: '#2580bd',
    id: 'CL-09',
    price: 2950,
    sku: 'CL-09-BL',
  },
  {
    baseName: 'Greenland Rover',
    category: 'classic',
    color: '#7b8f65',
    id: 'CL-07',
    price: 2900,
    sku: 'CL-07-GR',
  },
  {
    baseName: 'Danamark Steadfast',
    category: 'classic',
    color: '#7d7564',
    id: 'CL-06',
    price: 2800,
    sku: 'CL-06-MT',
  },
  {
    baseName: 'Countryside Commander',
    category: 'classic',
    color: '#c9899e',
    id: 'CL-05',
    price: 2700,
    sku: 'CL-05-PT',
  },
  {
    baseName: 'Falcon Crest Farm',
    category: 'classic',
    color: '#2580bd',
    id: 'CL-02',
    price: 2600,
    sku: 'CL-02-BL',
  },
  {
    baseName: 'Global Gallant',
    cartName: 'Global Gallant Sahara Dawn',
    category: 'classic',
    color: '#d96c2c',
    finish: 'Sahara Dawn',
    id: 'CL-10',
    price: 2600,
    sku: 'CL-10-SD',
  },
  {
    baseName: 'Falcon Crest Work',
    category: 'classic',
    color: '#7b8f65',
    id: 'CL-03',
    price: 2300,
    sku: 'CL-03-GR',
  },
  {
    baseName: 'Caribbean Cruiser',
    category: 'classic',
    color: '#7b8f65',
    id: 'CL-14',
    price: 2300,
    sku: 'CL-14-GR',
  },
  {
    baseName: 'Broadfield Majestic',
    category: 'classic',
    color: '#2580bd',
    id: 'CL-04',
    price: 2200,
    sku: 'CL-04-BL',
  },
] as const;

const listedSkus = new Set([
  'AU-04-RD',
  'AU-08-WH',
  'AU-02-OG',
  'AU-07-MT',
  'AU-05-ZH',
  'AU-06-CZ',
  'AU-03-TQ',
  'AU-01-SI',
  'CL-08-GR',
  'CL-13-BL',
  'CL-15-PI',
  'CL-01-GR',
  'CL-12-BL',
  'CL-11-SK',
  'CL-09-BL',
  'CL-07-GR',
  'CL-06-MT',
  'CL-05-PT',
  'CL-02-BL',
  'CL-10-SD',
  'CL-03-GR',
  'CL-14-GR',
  'CL-04-BL',
]);

export const tractorProductVariants = variantRows.map((product) => ({
  ...product,
  cartName: product.cartName ?? product.baseName,
  image: productImage(product.sku),
  slug: productSlug(product.baseName),
  variantLabel: product.labelKey ?? product.finish ?? product.baseName,
}));

export const tractorProducts = tractorProductVariants
  .filter((product) => listedSkus.has(product.sku))
  .map((product) => ({
    category: product.category,
    id: product.id,
    image: product.image,
    name: product.baseName,
    sku: product.sku,
    slug: product.slug,
    startPrice: product.price,
  }));

export const findTractorVariant = (sku: string | null | undefined) =>
  tractorProductVariants.find((product) => product.sku === sku);

export const findListedTractorBySlug = (slug: string | null | undefined) =>
  tractorProducts.find((product) => product.slug === slug);

export type TractorProduct = (typeof tractorProducts)[number];
export type TractorProductVariant = (typeof tractorProductVariants)[number];
