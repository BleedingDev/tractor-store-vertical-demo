export const logoUrl = 'https://blueprint.the-tractor.store/cdn/img/logo.svg';

export const sizedImage = (template: string, size: number) =>
  template.replace('[size]', String(size));

export const responsiveImage = (template: string, sizes: number[]) =>
  sizes.map((size) => `${sizedImage(template, size)} ${size}w`).join(', ');

export const productSlug = (name: string) =>
  name
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '');

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

export const classicProducts = [
  ['CL-08', 'Holland Hamster', 'CL-08-GR', 7750],
  ['CL-13', 'Rapid Racer', 'CL-13-BL', 7500],
  ['CL-15', 'Fieldmaster Classic', 'CL-15-PI', 6200],
  ['CL-01', 'Heritage Workhorse', 'CL-01-GR', 5700],
  ['CL-12', 'Celerity Cruiser', 'CL-12-BL', 3200],
  ['CL-11', 'Scandinavia Sower', 'CL-11-SK', 3100],
  ['CL-09', 'TerraFirma Veneto', 'CL-09-BL', 2950],
  ['CL-07', 'Greenland Rover', 'CL-07-GR', 2900],
  ['CL-06', 'Danamark Steadfast', 'CL-06-MT', 2800],
  ['CL-05', 'Countryside Commander', 'CL-05-PT', 2700],
  ['CL-02', 'Falcon Crest Farm', 'CL-02-BL', 2600],
  ['CL-10', 'Global Gallant', 'CL-10-SD', 2600],
  ['CL-03', 'Falcon Crest Work', 'CL-03-GR', 2300],
  ['CL-14', 'Caribbean Cruiser', 'CL-14-GR', 2300],
  ['CL-04', 'Broadfield Majestic', 'CL-04-BL', 2200],
].map(([id, name, sku, startPrice]) => ({
  id,
  image: `https://blueprint.the-tractor.store/cdn/img/product/[size]/${sku}.webp`,
  name,
  sku,
  slug: productSlug(String(name)),
  startPrice: Number(startPrice),
}));

export const autonomousProducts = [
  ['AU-04', 'Sapphire Sunworker 460R', 'AU-04-RD', 8500],
  ['AU-08', 'Field Pioneer', 'AU-08-WH', 4500],
  ['AU-02', 'SmartFarm Titan', 'AU-02-OG', 4000],
  ['AU-07', 'Verde Voyager', 'AU-07-MT', 4000],
  ['AU-05', 'EcoGrow Crop Commander', 'AU-05-ZH', 3400],
  ['AU-06', 'FarmFleet Sovereign', 'AU-06-CZ', 2100],
  ['AU-03', 'FutureHarvest Navigator', 'AU-03-TQ', 1600],
  ['AU-01', 'TerraFirma AutoCultivator T-300', 'AU-01-SI', 1000],
].map(([id, name, sku, startPrice]) => ({
  id,
  image: `https://blueprint.the-tractor.store/cdn/img/product/[size]/${sku}.webp`,
  name,
  sku,
  slug: productSlug(String(name)),
  startPrice: Number(startPrice),
}));

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
  ['store-a', 'Fendtastic Tractors', 'Eckernforder Str. 123', 'Aachen'],
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
