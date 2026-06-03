import LocalizedHead from '../../../localized-head';
import ShellFrame from '../../../shell-frame';
import { Recommendations, ThanksPage } from '../../../vertical-components';

export default function ShellCheckoutThanksPage() {
  return (
    <ShellFrame boundary="checkout">
      <LocalizedHead />
      <ThanksPage />
      <Recommendations variant="product" />
    </ShellFrame>
  );
}
