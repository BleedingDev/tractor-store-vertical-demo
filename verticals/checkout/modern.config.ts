import { getBuildConfigEnvironment } from '@modern-js/app-tools-extensions/config';
import { bffPlugin } from '@modern-js/plugin-bff-build-extensions';
import { i18nPlugin } from '@modern-js/plugin-i18n';
import { tanstackRouterPlugin } from '@modern-js/plugin-tanstack';
import {
  defineConfig,
  presetUltramodernWorkspace,
} from '@modern-js/ultramodern-app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

import { ultramodernLocalisedUrls } from './src/routes/ultramodern-route-metadata';

export default defineConfig(
  presetUltramodernWorkspace(
    {
      bff: {
        effect: {
          entry: './api/index',
          openapi: {
            path: '/openapi.json',
          },

          strictEffectApproach: true,
        },
        prefix: '/checkout-api',
        runtimeFramework: 'effect',
      },
      builderPlugins: [pluginTailwindcss()],
      performance: {
        rsdoctor: {
          disableClientServer: true,
          enabled: getBuildConfigEnvironment('ULTRAMODERN_RSDOCTOR') === 'true',
        },
      },
      plugins: [
        tanstackRouterPlugin(),
        i18nPlugin({
          backend: {
            enabled: true,
            loadPath: '/locales/{{lng}}/{{ns}}.json',
          },
          localeDetection: {
            fallbackLanguage: 'en',
            ignoreRedirectRoutes: [
              '/@mf-types',
              '/assets',
              '/bundles',
              '/checkout-api',
              '/locales',
              '/mf-manifest.json',
              '/mf-stats.json',
              '/remoteEntry.js',
              '/robots.txt',
              '/site.webmanifest',
              '/sitemap.xml',
              '/static',
              '/zephyr-manifest.json',
            ],
            languages: ['en', 'cs'],
            localePathRedirect: true,
            localisedUrls: ultramodernLocalisedUrls as Record<
              string,
              Record<string, string>
            >,
          },
          reactI18next: false,
        }),
        bffPlugin(),
        moduleFederationPlugin(),
      ],
      renderer: 'react',
    },
    {
      appId: 'checkout',
      from: import.meta.url,
    }
  )
);
