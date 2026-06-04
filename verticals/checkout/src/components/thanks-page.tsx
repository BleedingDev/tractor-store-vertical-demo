export default function CheckoutThanksPage() {
  return (
    <section
      className="checkout:rounded-2xl checkout:bg-white/90 checkout:p-5 checkout:shadow-xl checkout:shadow-stone-900/10"
      data-mf-boundary="checkout"
      data-mf-remote="checkout"
      data-mf-expose="./ThanksPage"
    >
      <h2 className="checkout:text-2xl checkout:font-black">Checkout Vertical ThanksPage</h2>
      <p className="checkout:mt-2 checkout:text-stone-600">
        Module Federation surface owned by tractor-checkout.
      </p>
    </section>
  );
}
