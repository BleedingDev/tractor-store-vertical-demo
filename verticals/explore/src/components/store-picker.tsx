import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { responsiveImage, sizedImage, stores } from '../tractor-data';

export default function StorePicker() {
  const { i18nInstance } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);

  return (
    <section
      className="explore:mx-auto explore:max-w-[calc(1000px+var(--outer-space)*2)] explore:px-[var(--outer-space)] explore:py-8"
      data-mf-boundary="explore"
    >
      <h1 className="explore:m-0 explore:text-[1.5rem] explore:font-normal explore:text-stone-950">
        {t('explore.stores.title')}
      </h1>
      <ul className="explore:my-16 explore:flex explore:list-none explore:flex-wrap explore:justify-between explore:gap-8 explore:p-0">
        {stores.map((store) => (
          <li
            className="explore:flex-1 explore:basis-[28rem] explore:text-stone-950"
            key={store.id}
          >
            <img
              alt=""
              className="explore:aspect-[16/9] explore:w-full explore:object-cover"
              height="281"
              loading="lazy"
              sizes="(max-width: 499px) calc(100vw - 3rem), 500px"
              src={sizedImage(store.image, 500)}
              srcSet={responsiveImage(store.image, [500, 1000])}
              width="500"
            />
            <h2 className="explore:mt-4 explore:text-[1.2rem] explore:font-normal">{store.name}</h2>
            <p className="explore:mt-2 explore:text-[0.95rem]">
              {store.street}
              <br />
              {store.city}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
