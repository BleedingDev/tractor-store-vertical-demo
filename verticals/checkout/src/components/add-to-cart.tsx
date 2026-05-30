import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { useCartLines } from '../cart-store';

export default function CheckoutAddToCart() {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);
  const cart = useCartLines();

  return (
    <div className="checkout:mt-8 checkout:flex checkout:flex-wrap checkout:gap-3" data-mf-boundary="checkout">
      <button className="checkout:inline-flex checkout:min-h-11 checkout:items-center checkout:justify-center checkout:rounded-full checkout:bg-emerald-800 checkout:px-5 checkout:font-bold checkout:text-white checkout:shadow-lg checkout:shadow-stone-900/10" onClick={cart.addFieldLoader} type="button">
        {t('checkout.actions.addToCart')}
      </button>
      <a className="checkout:inline-flex checkout:min-h-11 checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-900/15 checkout:bg-white/90 checkout:px-5 checkout:font-bold checkout:text-stone-950 checkout:shadow-lg checkout:shadow-stone-900/10" href={`/${language}/cart`}>
        {t('checkout.actions.viewCart')}
      </a>
    </div>
  );
}
