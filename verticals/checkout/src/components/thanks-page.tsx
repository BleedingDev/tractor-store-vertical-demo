import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import type { JSX } from 'react';

import { useLastOrder } from '../cart-store';

const formatPrice = (price: number) =>
  `${price.toLocaleString('de-DE', { useGrouping: false })} Ø`;

export default function CheckoutThanksPage(
  props: Record<string, never>
): JSX.Element {
  void props;
  const { t } = useModernI18n();
  const order = useLastOrder();

  return (
    <main
      className="checkout:mx-auto checkout:max-w-[calc(1000px+var(--outer-space)*2)] checkout:px-[var(--outer-space)] checkout:py-4"
      data-modern-boundary-id="checkout"
      data-modern-mf-expose="./ThanksPage"
    >
      <section className="checkout:rounded-lg checkout:border checkout:border-stone-200 checkout:bg-white checkout:p-6 checkout:shadow-[0_10px_30px_rgba(28,25,23,0.08)]">
        <h1 className="checkout:m-0 checkout:text-[1.7rem] checkout:font-normal checkout:text-stone-950">
          {t('checkout.thanks.title')}
        </h1>
        {order === undefined ? (
          <p className="checkout:mt-3 checkout:text-stone-700">
            {t('checkout.thanks.empty')}
          </p>
        ) : (
          <>
            <p className="checkout:mt-3 checkout:text-stone-700">
              {t('checkout.thanks.orderNumber')}: <strong>{order.id}</strong>
            </p>
            <ul className="checkout:mt-6 checkout:list-none checkout:p-0">
              {order.lines.map((line) => (
                <li
                  className="checkout:flex checkout:items-center checkout:gap-4 checkout:border-b checkout:border-stone-200 checkout:py-4"
                  key={line.id}
                >
                  <img
                    alt=""
                    className="checkout:aspect-square checkout:w-16 checkout:object-contain"
                    height="64"
                    src={line.image}
                    width="64"
                  />
                  <div className="checkout:min-w-0 checkout:flex-1">
                    <strong className="checkout:block checkout:font-normal">
                      {line.name}
                    </strong>
                    <span className="checkout:block checkout:text-sm checkout:text-stone-600">
                      {line.id} × {line.quantity}
                    </span>
                  </div>
                  <span>{formatPrice(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <p className="checkout:mt-5 checkout:text-right checkout:text-[1rem] checkout:font-bold">
              {t('checkout.cart.total')}: {formatPrice(order.total)}
            </p>
          </>
        )}
      </section>
    </main>
  );
}
