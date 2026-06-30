import '@modern-js/app-tools/types';
import type React from 'react';

declare global {
  const ULTRAMODERN_SITE_URL: string;
}

declare module 'explore/Footer' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/Header' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/HomePage' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/ProductGrid' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/Recommendations' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/StorePicker' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'decide/ProductPage' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/AddToCart' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/CartPage' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/CheckoutPage' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/MiniCart' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/ThanksPage' {
  const Component: React.ComponentType<Record<string, never>>;
  export default Component;
}
