import { createFederatedComponents } from '../federated-components';

const RemoteUnavailable = () => (
  <div
    className="shell:rounded-xl shell:border shell:border-red-900/20 shell:bg-red-50 shell:px-4 shell:py-3 shell:text-sm shell:font-semibold shell:text-red-900"
    data-modern-remote-unavailable="shell-super-app"
  >
    Vertical unavailable
  </div>
);

export const {
  CartPage,
  CheckoutPage,
  Footer,
  Header,
  HomePage,
  MiniCart,
  ProductGrid,
  ProductPage,
  Recommendations,
  StorePicker,
  ThanksPage,
} = createFederatedComponents(<RemoteUnavailable />);
