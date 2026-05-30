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
                      "decide": {
                              "decide": {
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "role": "rozhodování",
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
                                      "title": "Rozhodovací remote",
                                      "product": {
                                              "availability": "Dostupnost",
                                              "eyebrow": "Detail stroje",
                                              "inStock": "Skladem",
                                              "lede": "Traktor připravený pro nakladač na krmivo, seno, štěrk a zimní údržbu cest.",
                                              "power": "Výkon",
                                              "price": "Cena"
                                      }
                              }
                      },
                      "translation": {
                              "decide": {
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "role": "rozhodování",
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
                                      "title": "Rozhodovací remote",
                                      "product": {
                                              "availability": "Dostupnost",
                                              "eyebrow": "Detail stroje",
                                              "inStock": "Skladem",
                                              "lede": "Traktor připravený pro nakladač na krmivo, seno, štěrk a zimní údržbu cest.",
                                              "power": "Výkon",
                                              "price": "Cena"
                                      }
                              }
                      }
              },
              "en": {
                      "decide": {
                              "decide": {
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "role": "decide",
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
                                      "title": "Decide Vertical",
                                      "product": {
                                              "availability": "Availability",
                                              "eyebrow": "Machine detail",
                                              "inStock": "In stock",
                                              "lede": "A loader-ready tractor for feed, hay, gravel, and winter road work.",
                                              "power": "Power",
                                              "price": "Price"
                                      }
                              }
                      },
                      "translation": {
                              "decide": {
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "role": "decide",
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
                                      "title": "Decide Vertical",
                                      "product": {
                                              "availability": "Availability",
                                              "eyebrow": "Machine detail",
                                              "inStock": "In stock",
                                              "lede": "A loader-ready tractor for feed, hay, gravel, and winter road work.",
                                              "power": "Power",
                                              "price": "Price"
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
