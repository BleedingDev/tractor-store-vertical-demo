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
          explore: {
            explore: {
              footer: {
                basedOn: 'založeno na',
                projectPrefix: 'projekt společnosti',
                projectSuffix: '',
                techstack: 'technologie',
              },
              header: {
                machines: 'Stroje',
                navigation: 'Hlavní navigace',
                stores: 'Prodejci',
              },
              language: {
                cs: 'Čeština',
                en: 'Angličtina',
                switcher: 'Jazyk',
              },
              products: {
                all: 'Vše',
                autonomous: 'Autonomní',
                classics: 'Klasické',
                count: '{{count}} produktů',
                filter: 'Filtr',
                filterLabel: 'Filtr strojů',
                title: 'Všechny stroje',
              },
              recommendations: {
                aiFirst: 'AI varianta',
                bestRows: 'Nejlepší do úzkých řádků',
                loaderReady: 'Připraveno pro nakladač',
                title: 'Doporučení',
                vineyard: 'Profil pro vinice',
              },
              role: 'procházení',
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
              stores: {
                northRegion: 'Severní region',
                southRegion: 'Jižní region',
                title: 'Prodejci',
              },
              teasers: {
                autonomous: 'Autonomní traktory',
                classic: 'Klasické traktory',
              },
              title: 'Průzkumný remote',
            },
          },
          translation: {
            explore: {
              footer: {
                basedOn: 'založeno na',
                projectPrefix: 'projekt společnosti',
                projectSuffix: '',
                techstack: 'technologie',
              },
              header: {
                machines: 'Stroje',
                navigation: 'Hlavní navigace',
                stores: 'Prodejci',
              },
              language: {
                cs: 'Čeština',
                en: 'Angličtina',
                switcher: 'Jazyk',
              },
              products: {
                all: 'Vše',
                autonomous: 'Autonomní',
                classics: 'Klasické',
                count: '{{count}} produktů',
                filter: 'Filtr',
                filterLabel: 'Filtr strojů',
                title: 'Všechny stroje',
              },
              recommendations: {
                aiFirst: 'AI varianta',
                bestRows: 'Nejlepší do úzkých řádků',
                loaderReady: 'Připraveno pro nakladač',
                title: 'Doporučení',
                vineyard: 'Profil pro vinice',
              },
              role: 'procházení',
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
              stores: {
                northRegion: 'Severní region',
                southRegion: 'Jižní region',
                title: 'Prodejci',
              },
              teasers: {
                autonomous: 'Autonomní traktory',
                classic: 'Klasické traktory',
              },
              title: 'Průzkumný remote',
            },
          },
        },
        en: {
          explore: {
            explore: {
              footer: {
                basedOn: 'based on',
                projectPrefix: 'a',
                projectSuffix: 'project',
                techstack: 'techstack',
              },
              header: {
                machines: 'Machines',
                navigation: 'Main navigation',
                stores: 'Stores',
              },
              language: {
                cs: 'Czech',
                en: 'English',
                switcher: 'Language',
              },
              products: {
                all: 'All',
                autonomous: 'Autonomous',
                classics: 'Classics',
                count: '{{count}} products',
                filter: 'Filter',
                filterLabel: 'Filter machines',
                title: 'All Machines',
              },
              recommendations: {
                aiFirst: 'AI-first option',
                bestRows: 'Best for tight rows',
                loaderReady: 'Loader-ready',
                title: 'Recommendations',
                vineyard: 'Vineyard profile',
              },
              role: 'explore',
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
              stores: {
                northRegion: 'North region',
                southRegion: 'South region',
                title: 'Stores',
              },
              teasers: {
                autonomous: 'Autonomous Tractors',
                classic: 'Classic Tractors',
              },
              title: 'Explore Vertical',
            },
          },
          translation: {
            explore: {
              footer: {
                basedOn: 'based on',
                projectPrefix: 'a',
                projectSuffix: 'project',
                techstack: 'techstack',
              },
              header: {
                machines: 'Machines',
                navigation: 'Main navigation',
                stores: 'Stores',
              },
              language: {
                cs: 'Czech',
                en: 'English',
                switcher: 'Language',
              },
              products: {
                all: 'All',
                autonomous: 'Autonomous',
                classics: 'Classics',
                count: '{{count}} products',
                filter: 'Filter',
                filterLabel: 'Filter machines',
                title: 'All Machines',
              },
              recommendations: {
                aiFirst: 'AI-first option',
                bestRows: 'Best for tight rows',
                loaderReady: 'Loader-ready',
                title: 'Recommendations',
                vineyard: 'Vineyard profile',
              },
              role: 'explore',
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
              stores: {
                northRegion: 'North region',
                southRegion: 'South region',
                title: 'Stores',
              },
              teasers: {
                autonomous: 'Autonomous Tractors',
                classic: 'Classic Tractors',
              },
              title: 'Explore Vertical',
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
