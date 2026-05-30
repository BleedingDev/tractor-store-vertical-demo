import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { useCartLines } from '../cart-store';

export default function CheckoutMiniCart() {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);
  const cart = useCartLines();
  const count = cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <a className="checkout:inline-flex checkout:h-10 checkout:shrink-0 checkout:items-center checkout:justify-center checkout:rounded-full checkout:border checkout:border-stone-900/15 checkout:bg-white checkout:px-4 checkout:text-sm checkout:font-extrabold checkout:text-stone-950 checkout:no-underline checkout:shadow-lg checkout:shadow-stone-900/5" data-mf-boundary="checkout" href={`/${language}/cart`}>
      {t('checkout.cart.title')} ({count})
    </a>
  );
}
