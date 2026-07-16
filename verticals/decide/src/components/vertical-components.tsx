import { createFederatedComponents } from '../federated-components';

const RemoteUnavailable = () => (
  <div
    className="decide:rounded-xl decide:border decide:border-red-900/20 decide:bg-red-50 decide:px-4 decide:py-3 decide:text-sm decide:font-semibold decide:text-red-900"
    data-modern-remote-unavailable="decide"
  >
    Vertical unavailable
  </div>
);

export const { AddToCart, Recommendations } = createFederatedComponents(<RemoteUnavailable />);
