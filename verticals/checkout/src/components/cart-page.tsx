import { Link } from '@modern-js/plugin-tanstack/runtime';
import { useCheckoutI18n } from '../tractor-i18n';
import { useCartLines } from '../cart-store';
import type { CartLine } from '../cart-store';

const productImage = (sku: string) =>
  `https://blueprint.the-tractor.store/cdn/img/product/200/${sku}.webp`;

const defaultLine: CartLine = {
  id: 'CL-08-GR',
  name: 'Holland Hamster Polder Green',
  price: 7750,
  quantity: 1,
  slug: 'holland-hamster',
};

const formatPrice = (price: number) => `${price.toLocaleString('de-DE', { useGrouping: false })} Ø`;

export default function CheckoutCartPage() {
  const { language, routeSegment, t } = useCheckoutI18n();
  const cart = useCartLines();
  const lines = cart.lines.length > 0 ? cart.lines : [defaultLine];
  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);

  return (
    <main
      className="checkout:mx-auto checkout:max-w-[calc(1000px+var(--outer-space)*2)] checkout:px-[var(--outer-space)] checkout:py-4"
      data-modern-boundary-id="checkout"
      data-modern-mf-expose="./CartPage"
    >
      <h1 className="checkout:m-0 checkout:text-[1.7rem] checkout:font-normal checkout:text-stone-950">
        {t('checkout.cart.title')}
      </h1>
      <ul className="checkout:mt-8 checkout:list-none checkout:p-0">
        {lines.map((line) => (
          <li
            className="checkout:mb-8 checkout:flex checkout:flex-wrap checkout:items-center checkout:gap-8 checkout:text-[1rem] checkout:text-stone-950"
            key={line.id}
          >
            <img
              alt=""
              className="checkout:block checkout:aspect-square checkout:w-[150px] checkout:basis-[150px] checkout:object-contain checkout:pr-8 checkout:max-[760px]:w-[110px] checkout:max-[760px]:basis-[110px] checkout:max-[760px]:pr-2"
              height="150"
              src={productImage(line.id)}
              width="150"
            />
            <div className="checkout:flex checkout:flex-1 checkout:flex-wrap checkout:items-center checkout:justify-end checkout:gap-4">
              <Link
                className="checkout:min-w-[300px] checkout:flex-grow checkout:pr-8 checkout:text-stone-950 checkout:no-underline checkout:max-[760px]:min-w-0 checkout:max-[760px]:basis-full checkout:max-[760px]:pr-0"
                to={`/${language}/${routeSegment('tractors')}/${line.slug}?sku=${line.id}`}
              >
                <strong className="checkout:block checkout:font-normal">{line.name}</strong>
                <span className="checkout:block">{line.id}</span>
              </Link>
              <span className="checkout:flex checkout:items-center checkout:gap-4">
                {line.quantity}
              </span>
              <button
                aria-label={t('checkout.actions.remove')}
                className="checkout:flex checkout:h-[33px] checkout:w-[33px] checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-300 checkout:bg-white checkout:text-3xl checkout:leading-none checkout:text-stone-900 checkout:shadow-sm"
                onClick={() => cart.remove(line.id)}
                type="button"
              >
                ×
              </button>
              <span className="checkout:basis-[100px] checkout:text-right">
                {formatPrice(line.price)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <hr className="checkout:my-8 checkout:h-0.5 checkout:border-0 checkout:bg-stone-900" />
      <p className="checkout:text-right checkout:text-[1rem] checkout:font-bold">
        {t('checkout.cart.total')}: {formatPrice(total)}
      </p>
      <div className="checkout:mt-12 checkout:flex checkout:flex-row-reverse checkout:flex-wrap checkout:items-center checkout:justify-between checkout:gap-8">
        <Link
          className="checkout:inline-flex checkout:min-h-12 checkout:items-center checkout:justify-center checkout:rounded-full checkout:bg-stone-800 checkout:px-9 checkout:text-[0.9rem] checkout:font-bold checkout:uppercase checkout:tracking-[0.42em] checkout:text-white checkout:no-underline checkout:shadow-[0_0_14px_rgba(0,0,0,0.18)]"
          to={`/${language}/${routeSegment('checkout')}`}
        >
          {t('checkout.actions.checkout')}
        </Link>
        <Link
          className="checkout:inline-flex checkout:min-h-12 checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-300 checkout:bg-white checkout:px-9 checkout:text-[0.9rem] checkout:font-bold checkout:uppercase checkout:tracking-[0.42em] checkout:text-stone-900 checkout:no-underline checkout:shadow-[0_0_14px_rgba(0,0,0,0.08)]"
          to={`/${language}/${routeSegment('tractors')}`}
        >
          {t('checkout.actions.continueShopping')}
        </Link>
      </div>
    </main>
  );
}
