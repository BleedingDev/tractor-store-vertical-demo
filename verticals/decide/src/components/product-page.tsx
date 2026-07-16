import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import {
  findListedTractorBySlug,
  findTractorVariant,
  responsiveImage,
  sizedImage,
  tractorProductVariants,
} from '@tractor-store-vertical-demo/shared-contracts/tractor-catalog';
import { AddToCart, Recommendations } from './vertical-components';

export interface DecideProductPageProps {
  sku?: string;
  slug?: string;
}

export default function DecideProductPage({ sku, slug }: DecideProductPageProps) {
  const { language, t } = useModernI18n();
  const selected =
    findTractorVariant(sku) ??
    findTractorVariant(findListedTractorBySlug(slug)?.sku) ??
    tractorProductVariants[0];
  if (selected === undefined) {
    return null;
  }
  const variants = tractorProductVariants.filter((product) => product.id === selected.id);

  return (
    <>
      <main
        className="decide:mx-auto decide:max-w-[calc(1000px+var(--outer-space)*2)] decide:px-[var(--outer-space)]"
        data-modern-boundary-id="decide"
        data-modern-mf-expose="./ProductPage"
      >
        <section className="decide:mb-4 decide:grid decide:items-center decide:justify-between decide:gap-10 decide:max-[499px]:[grid-template-areas:'image'_'information'] decide:min-[500px]:max-[999px]:grid-cols-[1fr_3fr_1fr] decide:min-[500px]:max-[999px]:[grid-template-areas:'._image_.'_'._information_.'] decide:min-[1000px]:min-h-[clamp(400px,calc(70vh-400px),650px)] decide:min-[1000px]:grid-cols-[4fr_5fr] decide:min-[1000px]:[grid-template-areas:'image_information'] decide:min-[1000px]:gap-[10%]">
          <img
            alt={selected.cartName}
            className="decide:[grid-area:image] decide:block decide:aspect-square decide:h-auto decide:w-full decide:object-contain"
            fetchPriority="high"
            height="400"
            sizes="(max-width: 767px) 80vw, 400px"
            src={sizedImage(selected.image, 400)}
            srcSet={responsiveImage(selected.image, [400, 800])}
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
                    href={`/${language}/tractors/${variant.slug}?sku=${variant.sku}`}
                  >
                    <span
                      aria-hidden="true"
                      className="decide:inline-block decide:h-4 decide:w-4 decide:rounded-full decide:border decide:border-stone-900/20"
                      style={{ backgroundColor: variant.color }}
                    />
                    {typeof variant.labelKey === 'string'
                      ? t(variant.labelKey)
                      : variant.variantLabel}
                  </a>
                </li>
              ))}
            </ul>
            <AddToCart
              image={sizedImage(selected.image, 200)}
              price={selected.price}
              productName={selected.cartName}
              sku={selected.sku}
              slug={selected.slug}
            />
          </div>
        </section>
      </main>
      <Recommendations variant="product" />
    </>
  );
}
