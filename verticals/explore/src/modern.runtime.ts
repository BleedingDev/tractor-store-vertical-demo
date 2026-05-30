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
                      "explore": {
                              "explore": {
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "role": "procházení",
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
                                      "title": "Průzkumný remote",
                                      "header": {
                                              "machines": "Stroje",
                                              "navigation": "Hlavní navigace",
                                              "stores": "Prodejci"
                                      },
                                      "recommendations": {
                                              "aiFirst": "AI varianta",
                                              "bestRows": "Nejlepší do úzkých řádků",
                                              "loaderReady": "Připraveno pro nakladač",
                                              "title": "Porovnat alternativy",
                                              "vineyard": "Profil pro vinice"
                                      },
                                      "stores": {
                                              "northRegion": "Severní region",
                                              "southRegion": "Jižní region",
                                              "title": "Prodejci"
                                      }
                              }
                      },
                      "translation": {
                              "explore": {
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "role": "procházení",
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
                                      "title": "Průzkumný remote",
                                      "header": {
                                              "machines": "Stroje",
                                              "navigation": "Hlavní navigace",
                                              "stores": "Prodejci"
                                      },
                                      "recommendations": {
                                              "aiFirst": "AI varianta",
                                              "bestRows": "Nejlepší do úzkých řádků",
                                              "loaderReady": "Připraveno pro nakladač",
                                              "title": "Porovnat alternativy",
                                              "vineyard": "Profil pro vinice"
                                      },
                                      "stores": {
                                              "northRegion": "Severní region",
                                              "southRegion": "Jižní region",
                                              "title": "Prodejci"
                                      }
                              }
                      }
              },
              "en": {
                      "explore": {
                              "explore": {
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "role": "explore",
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
                                      "title": "Explore Vertical",
                                      "header": {
                                              "machines": "Machines",
                                              "navigation": "Main navigation",
                                              "stores": "Stores"
                                      },
                                      "recommendations": {
                                              "aiFirst": "AI-first option",
                                              "bestRows": "Best for tight rows",
                                              "loaderReady": "Loader-ready",
                                              "title": "Compare alternatives",
                                              "vineyard": "Vineyard profile"
                                      },
                                      "stores": {
                                              "northRegion": "North region",
                                              "southRegion": "South region",
                                              "title": "Stores"
                                      }
                              }
                      },
                      "translation": {
                              "explore": {
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "role": "explore",
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
                                      "title": "Explore Vertical",
                                      "header": {
                                              "machines": "Machines",
                                              "navigation": "Main navigation",
                                              "stores": "Stores"
                                      },
                                      "recommendations": {
                                              "aiFirst": "AI-first option",
                                              "bestRows": "Best for tight rows",
                                              "loaderReady": "Loader-ready",
                                              "title": "Compare alternatives",
                                              "vineyard": "Vineyard profile"
                                      },
                                      "stores": {
                                              "northRegion": "North region",
                                              "southRegion": "South region",
                                              "title": "Stores"
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
