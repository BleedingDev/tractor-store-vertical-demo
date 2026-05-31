/// <reference types='@modern-js/app-tools/types' />

declare const ULTRAMODERN_SITE_URL: string;
declare const ULTRAMODERN_EXPLORE_URL: string;
declare const ULTRAMODERN_DECIDE_URL: string;
declare const ULTRAMODERN_CHECKOUT_URL: string;
declare module '*.svg' {
  const url: string;
  export default url;
}

declare module 'explore/Footer' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/Header' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/Recommendations' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'explore/StorePicker' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'decide/ProductPage' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/AddToCart' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/CartPage' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/CheckoutPage' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/MiniCart' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}

declare module 'checkout/ThanksPage' {
  const Component: import('react').ComponentType<Record<string, never>>;
  export default Component;
}
