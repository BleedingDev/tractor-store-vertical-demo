import { useModernI18n } from '@modern-js/plugin-i18n/runtime';

export default function Footer() {
  const { i18nInstance } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <footer
      className="explore:mx-auto explore:mb-8 explore:mt-4 explore:max-w-[calc(1000px+var(--outer-space)*2)] explore:overflow-hidden explore:pt-[30px]"
      data-mf-boundary="explore"
      data-mf-expose="./Footer"
      data-mf-remote="explore"
    >
      <div className="explore:min-h-[135px] explore:border-t explore:border-[#eeebe2] explore:px-[var(--outer-space)] explore:py-12 explore:shadow-[0_10px_20px_10px_rgba(235,91,89,0.12)] explore:mix-blend-darken explore:min-[1000px]:flex explore:min-[1000px]:items-start explore:min-[1000px]:px-[calc(var(--outer-space)*2)] explore:min-[1000px]:max-[1099px]:px-[var(--outer-space)]">
        <div className="explore:flex explore:flex-1 explore:gap-5">
          <img
            alt=""
            className="explore:mt-1 explore:h-auto explore:w-[45px]"
            height="45"
            src="https://blueprint.the-tractor.store/cdn/img/neulandlogo.svg"
            width="45"
          />
          <p className="explore:m-0 explore:text-[0.95rem] explore:leading-snug">
            {t('explore.footer.basedOn')}{' '}
            <a
              className="explore:text-[#ff5a55]"
              href="https://github.com/FlorianRappl/module-federation-tractor-v2"
            >
              the tractor store 2.0
            </a>
            <br />
            {t('explore.footer.projectPrefix')}{' '}
            <a className="explore:text-[#ff5a55]" href="https://www.neuland-bfi.de/">
              neuland
            </a>{' '}
            {t('explore.footer.projectSuffix')}
          </p>
        </div>
        <div className="explore:mt-8 explore:flex-1 explore:min-[1000px]:mt-0">
          <h2 className="explore:m-0 explore:text-[0.95rem] explore:font-normal explore:text-[#ff5a55]">
            {t('explore.footer.techstack')}
          </h2>
          <p className="explore:m-0 explore:text-[0.95rem]">
            SSR, Module Federation, React, Effect BFF, Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
