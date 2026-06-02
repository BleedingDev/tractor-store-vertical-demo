import { Link } from '@modern-js/plugin-tanstack/runtime';
import { tractorRouteTo, tractorRoutes } from '@tractor-store-vertical-demo/shared-contracts';
import { useExploreI18n } from '../tractor-i18n';
import { logoUrl } from '../tractor-data';

export default function Header() {
  const { language, t } = useExploreI18n();

  return (
    <header
      className="explore:grid explore:min-w-0 explore:flex-1 explore:grid-cols-[1fr_auto] explore:items-center explore:gap-x-6 explore:gap-y-4 explore:min-[1000px]:grid-cols-[auto_1fr]"
      data-modern-boundary-id="explore"
      data-modern-mf-expose="./Header"
    >
      <Link
        className="explore:block explore:no-underline"
        {...tractorRouteTo(tractorRoutes.home(language))}
      >
        <img
          alt={t('explore.header.logoAlt')}
          className="explore:block explore:h-auto explore:w-[170px] explore:min-[500px]:w-[270px]"
          height="77"
          src={logoUrl}
          width="270"
        />
      </Link>
      <nav
        aria-label={t('explore.header.navigation')}
        className="explore:col-span-2 explore:flex explore:items-center explore:justify-center explore:gap-16 explore:min-[1000px]:col-span-1"
      >
        <Link
          className="explore:bg-stone-50/80 explore:px-5 explore:py-2 explore:text-[0.7rem] explore:font-bold explore:uppercase explore:tracking-[0.42em] explore:text-stone-800 explore:no-underline explore:hover:text-[#ff5a55] explore:focus-visible:outline explore:focus-visible:outline-2 explore:focus-visible:outline-offset-4 explore:focus-visible:outline-[#ff5a55]"
          {...tractorRouteTo(tractorRoutes.tractors(language))}
        >
          {t('explore.header.machines')}
        </Link>
        <Link
          className="explore:bg-stone-50/80 explore:px-5 explore:py-2 explore:text-[0.7rem] explore:font-bold explore:uppercase explore:tracking-[0.42em] explore:text-stone-800 explore:no-underline explore:hover:text-[#ff5a55] explore:focus-visible:outline explore:focus-visible:outline-2 explore:focus-visible:outline-offset-4 explore:focus-visible:outline-[#ff5a55]"
          {...tractorRouteTo(tractorRoutes.stores(language))}
        >
          {t('explore.header.stores')}
        </Link>
      </nav>
    </header>
  );
}
