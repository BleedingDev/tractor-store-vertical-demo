import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { autonomousProducts, classicProducts, responsiveImage, sizedImage } from '../tractor-data';

const formatPrice = (price: number) =>
  `${price.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    useGrouping: false,
  })} Ø`;

export default function ProductGrid() {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);
  const products = [...autonomousProducts, ...classicProducts].toSorted(
    (left, right) => right.startPrice - left.startPrice,
  );

  return (
    <main
      className="explore:mx-auto explore:max-w-[calc(1000px+var(--outer-space)*2)] explore:px-[var(--outer-space)] explore:py-4"
      data-modern-boundary-id="explore"
      data-modern-mf-expose="./ProductGrid"
    >
      <div className="explore:flex explore:flex-wrap explore:items-start explore:justify-between explore:gap-4">
        <div>
          <h1 className="explore:m-0 explore:text-[1.5rem] explore:font-normal explore:leading-tight explore:text-stone-950">
            {t('explore.products.title')}
          </h1>
          <p className="explore:mt-5 explore:text-[0.9rem] explore:text-stone-950">
            {t('explore.products.count', { count: products.length })}
          </p>
        </div>
        <nav
          aria-label={t('explore.products.filterLabel')}
          className="explore:flex explore:flex-wrap explore:items-center explore:gap-3 explore:text-[0.85rem]"
        >
          <span>{t('explore.products.filter')}:</span>
          <a
            aria-current="page"
            className="explore:border-b explore:border-stone-950 explore:text-stone-950 explore:no-underline"
            href={`/${language}/tractors`}
          >
            {t('explore.products.all')}
          </a>
          <a
            className="explore:text-stone-950 explore:no-underline"
            href={`/${language}/tractors?category=classic`}
          >
            {t('explore.products.classics')}
          </a>
          <a
            className="explore:text-stone-950 explore:no-underline"
            href={`/${language}/tractors?category=autonomous`}
          >
            {t('explore.products.autonomous')}
          </a>
        </nav>
      </div>
      <ul className="explore:mt-5 explore:grid explore:list-none explore:grid-cols-1 explore:gap-10 explore:p-0 explore:min-[500px]:grid-cols-2 explore:min-[1000px]:grid-cols-3">
        {products.map((product) => (
          <li className="explore:text-center" key={product.id}>
            <a
              className="explore:block explore:text-stone-950 explore:no-underline explore:focus-visible:outline explore:focus-visible:outline-2 explore:focus-visible:outline-offset-4 explore:focus-visible:outline-[#ff5a55]"
              href={`/${language}/tractors/${product.slug}?sku=${product.sku}`}
            >
              <img
                alt=""
                className="explore:mx-auto explore:aspect-square explore:w-full explore:object-contain"
                height="400"
                loading="lazy"
                sizes="(max-width: 499px) calc(100vw - 3rem), (max-width: 999px) 50vw, 307px"
                src={sizedImage(product.image, 400)}
                srcSet={responsiveImage(product.image, [400, 800])}
                width="400"
              />
              <span className="explore:mt-8 explore:block explore:text-[0.95rem]">
                {product.name}
              </span>
              <span className="explore:mt-2 explore:block explore:text-[0.95rem]">
                {formatPrice(product.startPrice)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
