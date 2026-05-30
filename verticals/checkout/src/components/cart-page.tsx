import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { useCartLines } from '../cart-store';

export default function CheckoutCartPage() {
  const { i18nInstance } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);
  const cart = useCartLines();

  return (
    <section className="checkout:mx-auto checkout:mt-10 checkout:max-w-7xl" data-mf-boundary="checkout" data-mf-remote="checkout" data-mf-expose="./CartPage">
      <h1 className="checkout:text-5xl checkout:font-black checkout:leading-none checkout:tracking-normal checkout:text-stone-950 checkout:md:text-7xl">{t('checkout.cart.title')}</h1>
      <div className="checkout:mt-8 checkout:rounded-2xl checkout:bg-white/90 checkout:p-5 checkout:shadow-xl checkout:shadow-stone-900/10">
        {cart.lines.length === 0 ? (
          <p>{t('checkout.cart.empty')}</p>
        ) : (
          <>
            {cart.lines.map(line => (
              <article className="checkout:grid checkout:gap-4 checkout:border-t checkout:border-stone-900/10 checkout:py-4 checkout:first:border-t-0 checkout:sm:grid-cols-[1fr_auto] checkout:sm:items-center" key={line.id}>
                <div>
                  <strong className="checkout:text-lg checkout:font-black">{line.name}</strong>
                  <p className="checkout:text-stone-600">EUR {line.price.toLocaleString('en-US')}</p>
                </div>
                <div className="checkout:flex checkout:flex-wrap checkout:items-center checkout:gap-2">
                  <button className="checkout:inline-flex checkout:size-9 checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-900/15 checkout:bg-white checkout:font-black" onClick={() => cart.decrement(line.id)} type="button">-</button>
                  <span className="checkout:min-w-6 checkout:text-center checkout:font-black">{line.quantity}</span>
                  <button className="checkout:inline-flex checkout:size-9 checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-900/15 checkout:bg-white checkout:font-black" onClick={() => cart.increment(line.id)} type="button">+</button>
                  <button className="checkout:inline-flex checkout:min-h-10 checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-900/15 checkout:bg-white checkout:px-4 checkout:font-bold checkout:text-stone-950" onClick={() => cart.remove(line.id)} type="button">
                    {t('checkout.actions.remove')}
                  </button>
                </div>
              </article>
            ))}
            <p><strong>{t('checkout.cart.total')}: EUR {cart.total.toLocaleString('en-US')}</strong></p>
          </>
        )}
      </div>
    </section>
  );
}
