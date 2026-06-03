import LocalizedHead from '../../localized-head';
import ShellFrame from '../../shell-frame';
import { CheckoutPage, Recommendations } from '../../vertical-components';

export default function ShellCheckoutPage() {
  return (
    <ShellFrame boundary="checkout">
      <LocalizedHead />
      <CheckoutPage />
      <Recommendations variant="product" />
    </ShellFrame>
  );
}
