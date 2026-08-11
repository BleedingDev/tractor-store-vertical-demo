import { useModernI18n } from '@modern-js/plugin-i18n/runtime';

import { responsiveImage, sizedImage, teasers } from '../tractor-data';
import Recommendations from './recommendations';

export default function HomePage() {
  const { language, t } = useModernI18n();

  return (
    <div>
      <main
        className="explore:mx-auto explore:mt-12 explore:grid explore:max-w-[calc(1000px+var(--outer-space)*2)] explore:grid-cols-1 explore:gap-x-4 explore:gap-y-6 explore:px-[var(--outer-space)] explore:min-[500px]:grid-cols-2"
        data-modern-boundary-id="explore"
        data-modern-mf-expose="./HomePage"
      >
        {teasers.map((teaser) => (
          <a
            className="explore:block explore:text-center explore:text-stone-900 explore:no-underline explore:focus-visible:outline explore:focus-visible:outline-2 explore:focus-visible:outline-offset-4 explore:focus-visible:outline-[#ff5a55]"
            href={`/${language}/tractors`}
            key={teaser.slug}
          >
            <img
              alt=""
              className="explore:aspect-[16/9] explore:w-full explore:object-cover"
              fetchPriority="high"
              height="281"
              sizes="(max-width: 499px) calc(100vw - 3rem), 500px"
              src={sizedImage(teaser.image, 500)}
              srcSet={responsiveImage(teaser.image, [500, 1000])}
              width="500"
            />
            <span className="explore:mt-4 explore:block explore:text-[1rem]">
              {t(`explore.teasers.${teaser.slug}`)}
            </span>
          </a>
        ))}
      </main>
      <Recommendations />
    </div>
  );
}
