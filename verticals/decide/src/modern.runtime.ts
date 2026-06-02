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
          decide: {
            decide: {
              language: {
                cs: 'Čeština',
                en: 'Angličtina',
                switcher: 'Jazyk',
              },
              product: {
                availability: 'Dostupnost',
                eyebrow: 'Detail stroje',
                features: {
                  comfort: 'Ergonomický návrh zaměřený na pohodlí a efektivitu obsluhy',
                  landscapes: 'Optimalizovaný pro tulipánová pole a různorodou evropskou krajinu',
                  quality: 'Nizozemské zpracování pro přesnost a kvalitu',
                },
                inStock: 'Skladem',
                lede: 'Traktor připravený pro nakladač na krmivo, seno, štěrk a zimní údržbu cest.',
                power: 'Výkon',
                price: 'Cena',
                variants: {
                  polderGreen: 'Polder Green',
                  tulipMagenta: 'Tulipánová magenta',
                },
              },
              role: 'rozhodování',
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
              title: 'Rozhodovací remote',
            },
          },
          translation: {
            decide: {
              language: {
                cs: 'Čeština',
                en: 'Angličtina',
                switcher: 'Jazyk',
              },
              product: {
                availability: 'Dostupnost',
                eyebrow: 'Detail stroje',
                features: {
                  comfort: 'Ergonomický návrh zaměřený na pohodlí a efektivitu obsluhy',
                  landscapes: 'Optimalizovaný pro tulipánová pole a různorodou evropskou krajinu',
                  quality: 'Nizozemské zpracování pro přesnost a kvalitu',
                },
                inStock: 'Skladem',
                lede: 'Traktor připravený pro nakladač na krmivo, seno, štěrk a zimní údržbu cest.',
                power: 'Výkon',
                price: 'Cena',
                variants: {
                  polderGreen: 'Polder Green',
                  tulipMagenta: 'Tulipánová magenta',
                },
              },
              role: 'rozhodování',
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
              title: 'Rozhodovací remote',
            },
          },
        },
        en: {
          decide: {
            decide: {
              language: {
                cs: 'Czech',
                en: 'English',
                switcher: 'Language',
              },
              product: {
                availability: 'Availability',
                eyebrow: 'Machine detail',
                features: {
                  comfort: 'Ergonomic design with a focus on operator comfort and efficiency',
                  landscapes: 'Optimized for tulip fields and versatile European landscapes',
                  quality: 'Dutch craftsmanship for precision and quality',
                },
                inStock: 'In stock',
                lede: 'A loader-ready tractor for feed, hay, gravel, and winter road work.',
                power: 'Power',
                price: 'Price',
                variants: {
                  polderGreen: 'Polder Green',
                  tulipMagenta: 'Tulip Magenta',
                },
              },
              role: 'decide',
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
              title: 'Decide Vertical',
            },
          },
          translation: {
            decide: {
              language: {
                cs: 'Czech',
                en: 'English',
                switcher: 'Language',
              },
              product: {
                availability: 'Availability',
                eyebrow: 'Machine detail',
                features: {
                  comfort: 'Ergonomic design with a focus on operator comfort and efficiency',
                  landscapes: 'Optimized for tulip fields and versatile European landscapes',
                  quality: 'Dutch craftsmanship for precision and quality',
                },
                inStock: 'In stock',
                lede: 'A loader-ready tractor for feed, hay, gravel, and winter road work.',
                power: 'Power',
                price: 'Price',
                variants: {
                  polderGreen: 'Polder Green',
                  tulipMagenta: 'Tulip Magenta',
                },
              },
              role: 'decide',
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
              title: 'Decide Vertical',
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
