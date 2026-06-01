import { useExploreI18n } from '../tractor-i18n';
import {
  productRecommendations,
  recommendations,
  responsiveImage,
  sizedImage,
} from '../tractor-data';

export interface RecommendationsProps {
  variant?: 'home' | 'product';
}

export default function Recommendations({ variant = 'home' }: RecommendationsProps) {
  const { language, routeSegment, t } = useExploreI18n();
  const items = variant === 'product' ? productRecommendations : recommendations;

  return (
    <section
      className="explore:mx-auto explore:max-w-[calc(1000px+var(--outer-space)*2)] explore:px-[var(--outer-space)]"
      data-modern-boundary-id="explore"
      data-modern-mf-expose="./Recommendations"
    >
      <div className="explore:-mx-4 explore:mb-12 explore:px-4 explore:py-4">
        <h2 className="explore:m-0 explore:text-[1.65rem] explore:font-normal explore:tracking-normal explore:text-stone-950">
          {t('explore.recommendations.title')}
        </h2>
        <ul className="explore:relative explore:mt-9 explore:grid explore:list-none explore:grid-cols-2 explore:gap-10 explore:p-0 explore:min-[500px]:grid-cols-3 explore:min-[1000px]:grid-cols-4">
          {items.map((item) => (
            <li className="explore:min-[500px]:max-[999px]:[&:nth-child(4)]:hidden" key={item.sku}>
              <a
                className="explore:block explore:text-center explore:text-stone-900 explore:no-underline explore:focus-visible:outline explore:focus-visible:outline-2 explore:focus-visible:outline-offset-4 explore:focus-visible:outline-[#ff5a55]"
                href={`/${language}/${routeSegment('tractors')}/${item.slug}?sku=${item.sku}`}
              >
                <img
                  alt=""
                  className="explore:block explore:aspect-square explore:h-auto explore:w-full explore:object-contain"
                  height="220"
                  loading="lazy"
                  sizes="(max-width: 499px) 50vw, (max-width: 999px) 33vw, 220px"
                  src={sizedImage(item.image, 400)}
                  srcSet={responsiveImage(item.image, [400, 800])}
                  width="220"
                />
                <span className="explore:mt-5 explore:block explore:text-[1rem] explore:leading-tight">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
