import { useModernI18n } from '@modern-js/plugin-i18n/runtime';

const fieldLoaderImage = '/assets/ultramodern/field-loader.svg';
const vineyardImage = '/assets/ultramodern/vineyard.svg';

export default function StorePicker() {
  const { i18nInstance } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <section className="explore:mx-auto explore:mt-12 explore:max-w-7xl" data-mf-boundary="explore">
      <h2 className="explore:text-3xl explore:font-black explore:tracking-normal explore:text-stone-950">{t('explore.stores.title')}</h2>
      <div className="explore:mt-5 explore:grid explore:gap-4 explore:md:grid-cols-2">
        <article className="explore:rounded-2xl explore:bg-white/90 explore:p-4 explore:shadow-xl explore:shadow-stone-900/10">
          <img alt="" className="explore:aspect-video explore:w-full explore:rounded-xl explore:bg-stone-200 explore:object-cover" src={fieldLoaderImage} />
          <span className="explore:mt-4 explore:block explore:text-xs explore:font-black explore:uppercase explore:tracking-[0.16em] explore:text-emerald-800">{t('explore.stores.northRegion')}</span>
          <strong className="explore:mt-2 explore:block explore:text-2xl explore:font-black">Bohemia Field Supply</strong>
        </article>
        <article className="explore:rounded-2xl explore:bg-white/90 explore:p-4 explore:shadow-xl explore:shadow-stone-900/10">
          <img alt="" className="explore:aspect-video explore:w-full explore:rounded-xl explore:bg-stone-200 explore:object-cover" src={vineyardImage} />
          <span className="explore:mt-4 explore:block explore:text-xs explore:font-black explore:uppercase explore:tracking-[0.16em] explore:text-emerald-800">{t('explore.stores.southRegion')}</span>
          <strong className="explore:mt-2 explore:block explore:text-2xl explore:font-black">Moravia Iron Works</strong>
        </article>
      </div>
    </section>
  );
}
