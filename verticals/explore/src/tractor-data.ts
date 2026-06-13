import {
  logoUrl,
  productSlug,
  responsiveImage,
  sizedImage,
  tractorProducts,
} from '@tractor-store-vertical-demo/shared-contracts/tractor-catalog';

export { logoUrl, productSlug, responsiveImage, sizedImage };

export const teasers = [
  {
    image: 'https://blueprint.the-tractor.store/cdn/img/scene/[size]/classics.webp',
    slug: 'classic',
    title: 'Classic Tractors',
  },
  {
    image: 'https://blueprint.the-tractor.store/cdn/img/scene/[size]/autonomous.webp',
    slug: 'autonomous',
    title: 'Autonomous Tractors',
  },
] as const;

export const classicProducts = tractorProducts.filter((product) => product.category === 'classic');

export const autonomousProducts = tractorProducts.filter(
  (product) => product.category === 'autonomous',
);

export const recommendations = [
  ['AU-01-SI', 'TerraFirma AutoCultivator T-300 Silver'],
  ['CL-11-SK', 'Scandinavia Sower Baltic Blue'],
  ['CL-08-GR', 'Holland Hamster Polder Green'],
  ['CL-10-SD', 'Global Gallant Sahara Dawn'],
].map(([sku, name]) => ({
  image: `https://blueprint.the-tractor.store/cdn/img/product/[size]/${sku}.webp`,
  name,
  sku,
  slug: productSlug(String(name).replace(/ (Baltic Blue|Polder Green|Sahara Dawn|Silver)$/u, '')),
}));

export const productRecommendations = [
  ['CL-10-SD', 'Global Gallant Sahara Dawn'],
  ['CL-15-SD', 'Fieldmaster Classic Sahara Dust'],
  ['CL-15-PI', 'Fieldmaster Classic Vintage Pink'],
  ['AU-05-ZH', 'EcoGrow Crop Commander Zestful Horizon'],
].map(([sku, name]) => ({
  image: `https://blueprint.the-tractor.store/cdn/img/product/[size]/${sku}.webp`,
  name,
  sku,
  slug: productSlug(
    String(name).replace(/ (Sahara Dawn|Sahara Dust|Vintage Pink|Zestful Horizon)$/u, ''),
  ),
}));

export const stores = [
  ['store-a', 'Aurora Flagship Store', 'Astronaut Way 1', 'Arlington'],
  ['store-b', 'Big Micro Machines', 'Broadway 2', 'Burlington'],
  ['store-c', 'Central Mall', 'Clown Street 3', 'Cryo'],
  ['store-d', 'Downtown Model Store', 'Duck Street 4', 'Davenport'],
].map(([id, name, street, city], index) => ({
  city,
  id,
  image: `https://blueprint.the-tractor.store/cdn/img/store/[size]/store-${index + 1}.webp`,
  name,
  street,
}));
