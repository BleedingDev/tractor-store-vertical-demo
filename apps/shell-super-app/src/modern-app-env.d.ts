/// <reference types='@modern-js/app-tools/types' />

import type { ComponentType } from 'react';

declare global {
  const ULTRAMODERN_SITE_URL: string;
}
declare module '*.svg' {
  const url: string;
  export default url;
}

declare module 'explore/Footer' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/Header' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/Recommendations' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/StorePicker' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'decide/ProductPage' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/AddToCart' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/CartPage' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/CheckoutPage' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/MiniCart' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/ThanksPage' {
  const Component: ComponentType<Record<string, never>>;
  export default Component;
}
