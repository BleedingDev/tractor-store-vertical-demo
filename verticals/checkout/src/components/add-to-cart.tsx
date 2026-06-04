import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { useCartLines } from '../cart-store';

export interface CheckoutAddToCartProps {
  price?: number;
  productName?: string;
  sku?: string;
}

export default function CheckoutAddToCart({
  price = 7750,
  productName = 'Holland Hamster Polder Green',
  sku = 'CL-08-GR',
}: CheckoutAddToCartProps) {
  const { i18nInstance, language } = useModernI18n();
  const t = i18nInstance['t'].bind(i18nInstance);
  const cart = useCartLines();

  return (
    <div
      className="checkout:mt-8 checkout:px-0 checkout:py-0"
      data-mf-boundary="checkout"
      data-mf-expose="./AddToCart"
      data-mf-remote="checkout"
    >
      <div className="checkout:flex checkout:items-start checkout:justify-between checkout:gap-6 checkout:text-[1rem]">
        <span>{price.toLocaleString('de-DE', { useGrouping: false })} Ø</span>
        <span className="checkout:text-right checkout:text-[#45aa4f]">
          {t('checkout.product.stockShipping')}
        </span>
      </div>
      <a
        className="checkout:mt-8 checkout:flex checkout:min-h-12 checkout:w-full checkout:items-center checkout:justify-center checkout:rounded-full checkout:bg-stone-800 checkout:px-5 checkout:text-[0.9rem] checkout:font-bold checkout:uppercase checkout:tracking-[0.42em] checkout:text-white checkout:no-underline checkout:shadow-[0_0_14px_rgba(0,0,0,0.18)] checkout:focus-visible:outline checkout:focus-visible:outline-2 checkout:focus-visible:outline-offset-4 checkout:focus-visible:outline-[#f6cf45]"
        href={`/${language}/cart?sku=${sku}`}
        onClick={() => cart.addProduct({ id: sku, name: productName, price })}
      >
        {t('checkout.actions.addToCart')}
      </a>
    </div>
  );
}
