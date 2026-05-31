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
        cs: {
          checkout: {
            checkout: {
              actions: {
                addToCart: 'Přidat do košíku',
                checkout: 'Pokladna',
                continueShopping: 'Pokračovat v nákupu',
                remove: 'Odebrat',
                viewCart: 'Zobrazit košík',
              },
              cart: {
                empty: 'Košík je prázdný.',
                title: 'Košík',
                total: 'Celkem',
              },
              language: {
                cs: 'Čeština',
                en: 'Angličtina',
                switcher: 'Jazyk',
              },
              product: {
                stockShipping: '8 skladem, doprava zdarma',
              },
              role: 'pokladna',
              routes: {
                cart: 'Košík',
                checkout: 'Pokladna',
                home: 'Domů',
                listing: 'Traktory',
                productDetail: 'Detail traktoru',
                storePicker: 'Výběr prodejce',
                thankYou: 'Potvrzení objednávky',
                unavailable: 'Nedostupné',
              },
              title: 'Pokladní remote',
            },
          },
          translation: {
            checkout: {
              actions: {
                addToCart: 'Přidat do košíku',
                checkout: 'Pokladna',
                continueShopping: 'Pokračovat v nákupu',
                remove: 'Odebrat',
                viewCart: 'Zobrazit košík',
              },
              cart: {
                empty: 'Košík je prázdný.',
                title: 'Košík',
                total: 'Celkem',
              },
              language: {
                cs: 'Čeština',
                en: 'Angličtina',
                switcher: 'Jazyk',
              },
              product: {
                stockShipping: '8 skladem, doprava zdarma',
              },
              role: 'pokladna',
              routes: {
                cart: 'Košík',
                checkout: 'Pokladna',
                home: 'Domů',
                listing: 'Traktory',
                productDetail: 'Detail traktoru',
                storePicker: 'Výběr prodejce',
                thankYou: 'Potvrzení objednávky',
                unavailable: 'Nedostupné',
              },
              title: 'Pokladní remote',
            },
          },
        },
        en: {
          checkout: {
            checkout: {
              actions: {
                addToCart: 'Add to basket',
                checkout: 'Checkout',
                continueShopping: 'Continue shopping',
                remove: 'Remove',
                viewCart: 'View cart',
              },
              cart: {
                empty: 'Your cart is empty.',
                title: 'Basket',
                total: 'Total',
              },
              language: {
                cs: 'Czech',
                en: 'English',
                switcher: 'Language',
              },
              product: {
                stockShipping: '8 in stock, free shipping',
              },
              role: 'checkout',
              routes: {
                cart: 'Cart',
                checkout: 'Checkout',
                home: 'Home',
                listing: 'Tractors',
                productDetail: 'Tractor detail',
                storePicker: 'Store picker',
                thankYou: 'Order confirmation',
                unavailable: 'Unavailable',
              },
              title: 'Checkout Vertical',
            },
          },
          translation: {
            checkout: {
              actions: {
                addToCart: 'Add to basket',
                checkout: 'Checkout',
                continueShopping: 'Continue shopping',
                remove: 'Remove',
                viewCart: 'View cart',
              },
              cart: {
                empty: 'Basket is empty.',
                title: 'Basket',
                total: 'Total',
              },
              language: {
                cs: 'Czech',
                en: 'English',
                switcher: 'Language',
              },
              product: {
                stockShipping: '8 in stock, free shipping',
              },
              role: 'checkout',
              routes: {
                cart: 'Cart',
                checkout: 'Checkout',
                home: 'Home',
                listing: 'Tractors',
                productDetail: 'Tractor detail',
                storePicker: 'Store picker',
                thankYou: 'Order confirmation',
                unavailable: 'Unavailable',
              },
              title: 'Checkout Vertical',
            },
          },
        },
      } as unknown as Record<string, Record<string, string>>,
      supportedLngs: ['en', 'cs'],
    },
  },
  router: {
    framework: 'tanstack',
  },
});
