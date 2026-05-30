import { useModernI18n } from '@modern-js/plugin-i18n/runtime';

const tractors = [
  { badge: 'explore.recommendations.bestRows', image: '/assets/ultramodern/orchard.svg', name: 'Orchard Tractor', slug: 'orchard-tractor' },
  { badge: 'explore.recommendations.aiFirst', image: '/assets/ultramodern/autonomy.svg', name: 'Autonomy Retrofit Kit', slug: 'autonomy-retrofit-kit' },
  { badge: 'explore.recommendations.loaderReady', image: '/assets/ultramodern/field-loader.svg', name: 'Field Loader 112', slug: 'field-loader-112' },
  { badge: 'explore.recommendations.vineyard', image: '/assets/ultramodern/vineyard.svg', name: 'Vineyard Narrow 80', slug: 'vineyard-narrow-80' },
] as const;

export default function Recommendations() {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <section className="explore:mx-auto explore:mt-12 explore:max-w-7xl" data-mf-boundary="explore">
      <h2 className="explore:text-3xl explore:font-black explore:tracking-normal explore:text-stone-950">{t('explore.recommendations.title')}</h2>
      <div className="explore:mt-5 explore:grid explore:gap-4 explore:md:grid-cols-2 explore:xl:grid-cols-4">
        {tractors.map(tractor => (
          <a className="explore:block explore:rounded-2xl explore:bg-white/90 explore:p-4 explore:text-stone-950 explore:no-underline explore:shadow-xl explore:shadow-stone-900/10 explore:transition explore:hover:-translate-y-0.5 explore:hover:shadow-2xl" href={`/${language}/tractors/${tractor.slug}`} key={tractor.slug}>
            <img alt="" className="explore:aspect-video explore:w-full explore:rounded-xl explore:bg-stone-200 explore:object-cover" src={tractor.image} />
            <span className="explore:mt-4 explore:block explore:text-xs explore:font-black explore:uppercase explore:tracking-[0.16em] explore:text-amber-700">{t(tractor.badge)}</span>
            <strong className="explore:mt-2 explore:block explore:text-xl explore:font-black explore:leading-tight">{tractor.name}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
