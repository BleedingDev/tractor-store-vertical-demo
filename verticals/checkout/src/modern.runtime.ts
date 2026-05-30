import { defineRuntimeConfig } from '@modern-js/runtime';
import { createInstance } from 'i18next';
import { ultramodernRouteNamespace } from './routes/ultramodern-route-metadata';

const i18nInstance = createInstance();

export default defineRuntimeConfig({
  i18n: {
    i18nInstance,
    initOptions: {
      defaultNS: ultramodernRouteNamespace,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      ns: [ultramodernRouteNamespace, 'translation'],
      resources: {
              "cs": {
                      "checkout": {
                              "checkout": {
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "role": "pokladna",
                                      "routes": {
                                              "cart": "Košík",
                                              "checkout": "Pokladna",
                                              "home": "Domů",
                                              "listing": "Traktory",
                                              "productDetail": "Detail traktoru",
                                              "storePicker": "Výběr prodejce",
                                              "thankYou": "Potvrzení objednávky",
                                              "unavailable": "Nedostupné"
                                      },
                                      "title": "Pokladní remote",
                                      "actions": {
                                              "addToCart": "Přidat do košíku",
                                              "remove": "Odebrat",
                                              "viewCart": "Zobrazit košík"
                                      },
                                      "cart": {
                                              "empty": "Košík je prázdný.",
                                              "title": "Váš košík",
                                              "total": "Celkem"
                                      }
                              }
                      },
                      "translation": {
                              "checkout": {
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "role": "pokladna",
                                      "routes": {
                                              "cart": "Košík",
                                              "checkout": "Pokladna",
                                              "home": "Domů",
                                              "listing": "Traktory",
                                              "productDetail": "Detail traktoru",
                                              "storePicker": "Výběr prodejce",
                                              "thankYou": "Potvrzení objednávky",
                                              "unavailable": "Nedostupné"
                                      },
                                      "title": "Pokladní remote",
                                      "actions": {
                                              "addToCart": "Přidat do košíku",
                                              "remove": "Odebrat",
                                              "viewCart": "Zobrazit košík"
                                      },
                                      "cart": {
                                              "empty": "Košík je prázdný.",
                                              "title": "Váš košík",
                                              "total": "Celkem"
                                      }
                              }
                      }
              },
              "en": {
                      "checkout": {
                              "checkout": {
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "role": "checkout",
                                      "routes": {
                                              "cart": "Cart",
                                              "checkout": "Checkout",
                                              "home": "Home",
                                              "listing": "Tractors",
                                              "productDetail": "Tractor detail",
                                              "storePicker": "Store picker",
                                              "thankYou": "Order confirmation",
                                              "unavailable": "Unavailable"
                                      },
                                      "title": "Checkout Vertical",
                                      "actions": {
                                              "addToCart": "Add to cart",
                                              "remove": "Remove",
                                              "viewCart": "View cart"
                                      },
                                      "cart": {
                                              "empty": "Your cart is empty.",
                                              "title": "Your cart",
                                              "total": "Total"
                                      }
                              }
                      },
                      "translation": {
                              "checkout": {
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "role": "checkout",
                                      "routes": {
                                              "cart": "Cart",
                                              "checkout": "Checkout",
                                              "home": "Home",
                                              "listing": "Tractors",
                                              "productDetail": "Tractor detail",
                                              "storePicker": "Store picker",
                                              "thankYou": "Order confirmation",
                                              "unavailable": "Unavailable"
                                      },
                                      "title": "Checkout Vertical",
                                      "actions": {
                                              "addToCart": "Add to cart",
                                              "remove": "Remove",
                                              "viewCart": "View cart"
                                      },
                                      "cart": {
                                              "empty": "Your cart is empty.",
                                              "title": "Your cart",
                                              "total": "Total"
                                      }
                              }
                      }
              }
      },
      supportedLngs: ['en', 'cs'],
    },
  },
  router: {
    framework: 'tanstack',
  },
});
