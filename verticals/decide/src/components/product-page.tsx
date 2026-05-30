import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { AddToCart, Recommendations } from './vertical-components';

const fieldLoaderImage = '/assets/ultramodern/field-loader.svg';

export default function DecideProductPage() {
  const { i18nInstance } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <>
      <section className="decide:mx-auto decide:mt-10 decide:grid decide:max-w-7xl decide:items-center decide:gap-8 decide:md:grid-cols-[1fr_0.95fr] decide:lg:gap-14" data-mf-boundary="decide" data-mf-remote="decide" data-mf-expose="./ProductPage">
        <img alt="" className="decide:aspect-[1/0.9] decide:w-full decide:rounded-3xl decide:border-[18px] decide:border-amber-200 decide:bg-stone-200 decide:object-cover decide:shadow-2xl decide:shadow-stone-900/20" src={fieldLoaderImage} />
        <div>
          <p className="decide:text-xs decide:font-black decide:uppercase decide:tracking-[0.18em] decide:text-emerald-800">{t('decide.product.eyebrow')}</p>
          <h1 className="decide:mt-3 decide:text-5xl decide:font-black decide:leading-none decide:tracking-normal decide:text-stone-950 decide:md:text-7xl">Field Loader 112</h1>
          <p className="decide:mt-5 decide:max-w-2xl decide:text-lg decide:leading-8 decide:text-stone-600">{t('decide.product.lede')}</p>
          <div className="decide:mt-8 decide:grid decide:gap-4 decide:sm:grid-cols-3">
            <article className="decide:rounded-2xl decide:bg-white/90 decide:p-5 decide:shadow-xl decide:shadow-stone-900/10"><span className="decide:block decide:text-sm decide:font-bold decide:text-stone-500">{t('decide.product.price')}</span><strong className="decide:mt-2 decide:block decide:text-lg decide:font-black">EUR 42,500</strong></article>
            <article className="decide:rounded-2xl decide:bg-white/90 decide:p-5 decide:shadow-xl decide:shadow-stone-900/10"><span className="decide:block decide:text-sm decide:font-bold decide:text-stone-500">{t('decide.product.power')}</span><strong className="decide:mt-2 decide:block decide:text-lg decide:font-black">112 hp</strong></article>
            <article className="decide:rounded-2xl decide:bg-white/90 decide:p-5 decide:shadow-xl decide:shadow-stone-900/10"><span className="decide:block decide:text-sm decide:font-bold decide:text-stone-500">{t('decide.product.availability')}</span><strong className="decide:mt-2 decide:block decide:text-lg decide:font-black">{t('decide.product.inStock')}</strong></article>
          </div>
          <AddToCart />
        </div>
      </section>
      <Recommendations />
    </>
  );
}
