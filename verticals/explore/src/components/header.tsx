import { useModernI18n } from '@modern-js/plugin-i18n/runtime';

export default function Header() {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <header className="explore:flex explore:min-w-0 explore:flex-wrap explore:items-center explore:gap-x-8 explore:gap-y-2 explore:md:flex-1" data-mf-boundary="explore">
      <a className="explore:whitespace-nowrap explore:text-xl explore:font-black explore:tracking-normal explore:text-stone-950 explore:no-underline" href={`/${language}`}>Acre & Iron</a>
      <nav aria-label={t('explore.header.navigation')} className="explore:flex explore:items-center explore:gap-5">
        <a className="explore:text-sm explore:font-extrabold explore:text-stone-900 explore:no-underline" href={`/${language}/tractors`}>{t('explore.header.machines')}</a>
        <a className="explore:text-sm explore:font-extrabold explore:text-stone-900 explore:no-underline" href={`/${language}/stores`}>{t('explore.header.stores')}</a>
      </nav>
    </header>
  );
}
