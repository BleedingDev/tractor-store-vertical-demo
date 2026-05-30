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
                      "shell": {
                              "shell": {
                                      "hero": {
                                              "eyebrow": "Federovaný obchod s traktory",
                                              "lede": "Full-stack Micro Vertical ukázka, kde Procházení, Rozhodování a Pokladna vycházejí samostatně, ale skládají jeden obchod.",
                                              "primary": "Zobrazit Field Loader",
                                              "secondary": "Porovnat stroje"
                                      },
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "remotes": {
                                              "checkout": "Checkout remote",
                                              "decide": "Decide remote",
                                              "explore": "Explore remote"
                                      },
                                      "boundaries": {
                                              "checkout": "pokladna",
                                              "decide": "rozhodování",
                                              "explore": "procházení",
                                              "toggle": "zobrazit hranice týmů"
                                      },
                                      "routes": {
                                              "cart": "Košík",
                                              "home": "Domů",
                                              "listing": "Traktory",
                                              "productDetail": "Detail traktoru",
                                              "storePicker": "Prodejci"
                                      },
                                      "title": "Acre & Iron"
                              },
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
                              },
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
                              },
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
                              "shell": {
                                      "hero": {
                                              "eyebrow": "Federovaný obchod s traktory",
                                              "lede": "Full-stack Micro Vertical ukázka, kde Procházení, Rozhodování a Pokladna vycházejí samostatně, ale skládají jeden obchod.",
                                              "primary": "Zobrazit Field Loader",
                                              "secondary": "Porovnat stroje"
                                      },
                                      "language": {
                                              "cs": "Čeština",
                                              "en": "Angličtina",
                                              "switcher": "Jazyk"
                                      },
                                      "remotes": {
                                              "checkout": "Checkout remote",
                                              "decide": "Decide remote",
                                              "explore": "Explore remote"
                                      },
                                      "boundaries": {
                                              "checkout": "pokladna",
                                              "decide": "rozhodování",
                                              "explore": "procházení",
                                              "toggle": "zobrazit hranice týmů"
                                      },
                                      "routes": {
                                              "cart": "Košík",
                                              "home": "Domů",
                                              "listing": "Traktory",
                                              "productDetail": "Detail traktoru",
                                              "storePicker": "Prodejci"
                                      },
                                      "title": "Acre & Iron"
                              },
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
                              },
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
                              },
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
                      "shell": {
                              "shell": {
                                      "hero": {
                                              "eyebrow": "Federated tractor commerce",
                                              "lede": "A full-stack Micro Vertical reference where Explore, Decide, and Checkout ship independently but compose into one storefront.",
                                              "primary": "View Field Loader",
                                              "secondary": "Compare machines"
                                      },
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "remotes": {
                                              "checkout": "Checkout Vertical",
                                              "decide": "Decide Vertical",
                                              "explore": "Explore Vertical"
                                      },
                                      "boundaries": {
                                              "checkout": "checkout",
                                              "decide": "decide",
                                              "explore": "explore",
                                              "toggle": "show team boundaries"
                                      },
                                      "routes": {
                                              "cart": "Cart",
                                              "home": "Home",
                                              "listing": "Tractors",
                                              "productDetail": "Tractor detail",
                                              "storePicker": "Stores"
                                      },
                                      "title": "Acre & Iron"
                              },
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
                              },
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
                              },
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
                              "shell": {
                                      "hero": {
                                              "eyebrow": "Federated tractor commerce",
                                              "lede": "A full-stack Micro Vertical reference where Explore, Decide, and Checkout ship independently but compose into one storefront.",
                                              "primary": "View Field Loader",
                                              "secondary": "Compare machines"
                                      },
                                      "language": {
                                              "cs": "Czech",
                                              "en": "English",
                                              "switcher": "Language"
                                      },
                                      "remotes": {
                                              "checkout": "Checkout Vertical",
                                              "decide": "Decide Vertical",
                                              "explore": "Explore Vertical"
                                      },
                                      "boundaries": {
                                              "checkout": "checkout",
                                              "decide": "decide",
                                              "explore": "explore",
                                              "toggle": "show team boundaries"
                                      },
                                      "routes": {
                                              "cart": "Cart",
                                              "home": "Home",
                                              "listing": "Tractors",
                                              "productDetail": "Tractor detail",
                                              "storePicker": "Stores"
                                      },
                                      "title": "Acre & Iron"
                              },
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
                              },
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
                              },
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
