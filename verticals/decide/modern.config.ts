// @effect-diagnostics processEnv:off
import {
  appTools,
  defineConfig,
  presetUltramodern,
} from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { i18nPlugin } from '@modern-js/plugin-i18n';
import { tanstackRouterPlugin } from '@modern-js/plugin-tanstack';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';
import { withZephyr as withZephyrRspack } from 'zephyr-rspack-plugin';
import { ultramodernLocalisedUrls } from './src/routes/ultramodern-route-metadata';

type ZephyrRspackConfig = Parameters<ReturnType<typeof withZephyrRspack>>[0];

const zephyrEnabled = process.env['ULTRAMODERN_ZEPHYR'] !== 'false';
const cloudflareDeployEnabled =
  process.env['MODERNJS_DEPLOY'] === 'cloudflare';

const zephyrRspackPlugin = () => ({
  name: 'ultramodern-zephyr-rspack-plugin',
  pre: ['@modern-js/plugin-module-federation-config'],
  setup(api: {
    modifyRspackConfig: (
      handler: (
        config: ZephyrRspackConfig,
      ) => ZephyrRspackConfig | Promise<ZephyrRspackConfig>,
    ) => void;
  }) {
    if (!zephyrEnabled) {
      return;
    }
    api.modifyRspackConfig(config => withZephyrRspack()(config));
  },
});

const appId = 'decide';
const cloudflareWorkerName = 'tractor-store-vertical-demo-decide';
const port = Number(process.env['VERTICAL_DECIDE_PORT'] ?? 3022);
const configuredSiteUrl = process.env['MODERN_PUBLIC_SITE_URL']?.trim();
const configuredCloudflareUrl =
  process.env['ULTRAMODERN_PUBLIC_URL_DECIDE']?.trim();
const siteUrl =
  configuredSiteUrl || configuredCloudflareUrl || `http://localhost:${port}`;

export default defineConfig(
  presetUltramodern(
    {
      bff: {
        effect: {
          openapi: {
            path: '/openapi.json',
          },
        },
        prefix: '/decide-api',
        runtimeFramework: 'effect',
      },
      output: {
        assetPrefix: siteUrl,
        disableTsChecker: true,
        distPath: {
          html: './',
        },
        polyfill: 'off',
        splitRouteChunks: false,
      },
      performance: {
        rsdoctor: {
          enabled: process.env['ULTRAMODERN_RSDOCTOR'] === 'true',
          disableClientServer: true,
        },
      },
      html: {
        outputStructure: 'flat',
      },
      plugins: [
        appTools(),
        tanstackRouterPlugin(),
        i18nPlugin({
          backend: {
            enabled: true,
          },
          reactI18next: false,
          localeDetection: {
            fallbackLanguage: 'en',
            languages: ['en', 'cs'],
            localePathRedirect: true,
            localisedUrls: ultramodernLocalisedUrls as Record<string, Record<string, string>>,
            ignoreRedirectRoutes: [
              '/@mf-types',
              '/assets',
              '/bundles',
              '/decide-api',
              '/locales',
              '/mf-manifest.json',
              '/mf-stats.json',
              '/remoteEntry.js',
              '/static',
              '/zephyr-manifest.json',
            ],
          },
        }),
        bffPlugin(),
        moduleFederationPlugin(),
        zephyrRspackPlugin(),
      ],
      tools: {
        autoprefixer: {
          overrideBrowserslist: ['defaults'],
        },
        bundlerChain: chain => {
          chain.ignoreWarnings([
            {
              message: /the request of a dependency is an expression/u,
              module: /modern-js-plugin-i18n/u,
            },
          ]);
        },
      },
      ...(cloudflareDeployEnabled
        ? {
            deploy: {
              target: 'cloudflare',
              worker: {
                name: cloudflareWorkerName,
                ssr: true,
              },
            },
          }
        : {}),
      server: {
        port,
        publicDir: ['./locales', './assets'],
        ssr: {
          mode: 'stream',
          moduleFederationAppSSR: true,
        },
      },
      source: {
        mainEntryName: 'index',
        globalVars: {
          ULTRAMODERN_SITE_URL: siteUrl,
        },
      },
    },
    {
      appId,
      enableBffRequestId: true,
      enableModuleFederationSSR: true,
      enableTelemetryExporters: true,
      telemetryFailLoudStartup: false,
    },
  ),
);
