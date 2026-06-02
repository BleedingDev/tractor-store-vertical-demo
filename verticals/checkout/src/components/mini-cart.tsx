import { Link } from '@modern-js/plugin-tanstack/runtime';
import { tractorRouteTo, tractorRoutes } from '@tractor-store-vertical-demo/shared-contracts';
import { useCheckoutI18n } from '../tractor-i18n';
import { useCartLines } from '../cart-store';

export default function CheckoutMiniCart() {
  const { language, t } = useCheckoutI18n();
  const cart = useCartLines();
  const count = cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <Link
      aria-label={`${t('checkout.cart.title')} (${count})`}
      className="checkout:relative checkout:inline-flex checkout:h-16 checkout:w-16 checkout:shrink-0 checkout:items-center checkout:justify-center checkout:border checkout:border-stone-200 checkout:bg-white checkout:text-stone-900 checkout:no-underline checkout:shadow-[0_10px_24px_rgba(28,25,23,0.1)] checkout:focus-visible:outline checkout:focus-visible:outline-2 checkout:focus-visible:outline-offset-4 checkout:focus-visible:outline-[#f6cf45]"
      data-modern-boundary-id="checkout"
      data-modern-mf-expose="./MiniCart"
      {...tractorRouteTo(tractorRoutes.cart(language))}
    >
      <svg
        aria-hidden="true"
        className="checkout:h-7 checkout:w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 ? (
        <span className="checkout:absolute checkout:right-2 checkout:top-2 checkout:flex checkout:h-5 checkout:min-w-5 checkout:items-center checkout:justify-center checkout:rounded-full checkout:bg-[#ff5a55] checkout:px-1 checkout:text-[0.7rem] checkout:font-bold checkout:text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
