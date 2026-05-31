/// <reference types='@modern-js/app-tools/types' />

import type { ComponentType } from 'react';

type RemoteComponent = ComponentType<Record<string, never>>;

declare global {
  const ULTRAMODERN_SITE_URL: string;
}

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module 'explore/Footer' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'explore/Header' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'explore/Recommendations' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'explore/StorePicker' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'checkout/AddToCart' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'checkout/CartPage' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'checkout/CheckoutPage' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'checkout/MiniCart' {
  const Component: RemoteComponent;
  export default Component;
}

declare module 'checkout/ThanksPage' {
  const Component: RemoteComponent;
  export default Component;
}
