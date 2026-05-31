import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { useLocation } from '@modern-js/plugin-tanstack/runtime';
import { AddToCart, Recommendations } from './vertical-components';

const image = (sku: string, size: number) =>
  `https://blueprint.the-tractor.store/cdn/img/product/${size}/${sku}.webp`;

const imageSet = (sku: string) =>
  [400, 800].map((size) => `${image(sku, size)} ${size}w`).join(', ');

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '');

const products = [
  {
    baseName: 'Holland Hamster',
    color: '#c2b280',
    finish: 'Polder Green',
    labelKey: 'decide.product.variants.polderGreen',
    price: 7750,
    sku: 'CL-08-GR',
  },
  {
    baseName: 'Holland Hamster',
    color: '#d65282',
    finish: 'Tulip Magenta',
    labelKey: 'decide.product.variants.tulipMagenta',
    price: 7900,
    sku: 'CL-08-PI',
  },
  {
    baseName: 'Global Gallant',
    color: '#d96c2c',
    finish: 'Sahara Dawn',
    price: 2600,
    sku: 'CL-10-SD',
  },
  {
    baseName: 'Fieldmaster Classic',
    color: '#d2bd81',
    finish: 'Sahara Dust',
    price: 6200,
    sku: 'CL-15-SD',
  },
  {
    baseName: 'Fieldmaster Classic',
    color: '#d99aaa',
    finish: 'Vintage Pink',
    price: 6200,
    sku: 'CL-15-PI',
  },
  {
    baseName: 'EcoGrow Crop Commander',
    color: '#f4c624',
    finish: 'Zestful Horizon',
    price: 3400,
    sku: 'AU-05-ZH',
  },
] as const;

const locationSearch = (location: { search?: unknown; searchStr?: unknown }) =>
  typeof location.searchStr === 'string'
    ? location.searchStr
    : typeof location.search === 'string'
      ? location.search
      : '';

const productName = (product: (typeof products)[number]) => `${product.baseName} ${product.finish}`;

export default function DecideProductPage() {
  const { i18nInstance, language } = useModernI18n();
  const location = useLocation();
  const t = i18nInstance['t'].bind(i18nInstance);
  const requestedSku = new URLSearchParams(locationSearch(location)).get('sku');
  const selected = products.find((product) => product.sku === requestedSku) ?? products[0];
  const variants = products.filter((product) => product.baseName === selected.baseName);

  return (
    <>
      <main
        className="decide:mx-auto decide:max-w-[calc(1000px+var(--outer-space)*2)] decide:px-[var(--outer-space)]"
        data-mf-boundary="decide"
        data-mf-remote="decide"
        data-mf-expose="./ProductPage"
      >
        <section className="decide:mb-4 decide:grid decide:items-center decide:justify-between decide:gap-10 decide:max-[499px]:[grid-template-areas:'image'_'information'] decide:min-[500px]:max-[999px]:grid-cols-[1fr_3fr_1fr] decide:min-[500px]:max-[999px]:[grid-template-areas:'._image_.'_'._information_.'] decide:min-[1000px]:min-h-[clamp(400px,calc(70vh-400px),650px)] decide:min-[1000px]:grid-cols-[4fr_5fr] decide:min-[1000px]:[grid-template-areas:'image_information'] decide:min-[1000px]:gap-[10%]">
          <img
            alt={productName(selected)}
            className="decide:[grid-area:image] decide:block decide:aspect-square decide:h-auto decide:w-full decide:object-contain"
            fetchPriority="high"
            height="400"
            sizes="(max-width: 767px) 80vw, 400px"
            src={image(selected.sku, 400)}
            srcSet={imageSet(selected.sku)}
            width="400"
          />
          <div className="decide:[grid-area:information]">
            <h1 className="decide:m-0 decide:text-[2.5rem] decide:font-normal decide:leading-tight decide:text-stone-950">
              {selected.baseName}
            </h1>
            <ul className="decide:mt-5 decide:list-none decide:p-0 decide:text-[1rem] decide:leading-relaxed decide:text-stone-800">
              <li className="decide:mb-3">{t('decide.product.features.quality')}</li>
              <li className="decide:mb-3">{t('decide.product.features.landscapes')}</li>
              <li className="decide:mb-3">{t('decide.product.features.comfort')}</li>
            </ul>
            <ul className="decide:mt-10 decide:flex decide:list-none decide:flex-wrap decide:gap-6 decide:p-0">
              {variants.map((variant) => (
                <li key={variant.sku}>
                  <a
                    aria-current={variant.sku === selected.sku ? 'true' : undefined}
                    className="decide:inline-flex decide:items-center decide:gap-2 decide:border-b decide:border-stone-950 decide:text-[1rem] decide:text-stone-950 decide:no-underline decide:focus-visible:outline decide:focus-visible:outline-2 decide:focus-visible:outline-offset-4 decide:focus-visible:outline-[#f6cf45]"
                    href={`/${language}/tractors/${slugify(variant.baseName)}?sku=${variant.sku}`}
                  >
                    <span
                      aria-hidden="true"
                      className="decide:inline-block decide:h-4 decide:w-4 decide:rounded-full decide:border decide:border-stone-900/20"
                      style={{ backgroundColor: variant.color }}
                    />
                    {'labelKey' in variant ? t(variant.labelKey) : variant.finish}
                  </a>
                </li>
              ))}
            </ul>
            <AddToCart
              sku={selected.sku}
              productName={productName(selected)}
              price={selected.price}
            />
          </div>
        </section>
      </main>
      <Recommendations variant="product" />
    </>
  );
}
