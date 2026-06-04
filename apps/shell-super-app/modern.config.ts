// @effect-diagnostics processEnv:off
import { appTools, defineConfig, presetUltramodern } from '@modern-js/app-tools';
import { i18nPlugin } from '@modern-js/plugin-i18n';
import { tanstackRouterPlugin } from '@modern-js/plugin-tanstack';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';
import { withZephyr as withZephyrRspack } from 'zephyr-rspack-plugin';
import { ultramodernLocalisedUrls } from './src/routes/ultramodern-route-metadata';

type ZephyrRspackConfig = Parameters<ReturnType<typeof withZephyrRspack>>[0];

const zephyrEnabled = process.env['ULTRAMODERN_ZEPHYR'] !== 'false';
const cloudflareDeployEnabled = process.env['MODERNJS_DEPLOY'] === 'cloudflare';

const zephyrRspackPlugin = () => ({
  name: 'ultramodern-zephyr-rspack-plugin',
  pre: ['@modern-js/plugin-module-federation-config'],
  setup(api: {
    modifyRspackConfig: (
      handler: (config: ZephyrRspackConfig) => ZephyrRspackConfig | Promise<ZephyrRspackConfig>,
    ) => void;
  }) {
    if (!zephyrEnabled) {
      return;
    }
    api.modifyRspackConfig((config) => withZephyrRspack()(config));
  },
});

const appId = 'shell-super-app';
const cloudflareWorkerName = 'tractor-store-vertical-demo-shell-super-app';
const port = Number(process.env['SHELL_SUPER_APP_PORT'] ?? 3020);
const envValue = (name: string) => {
  const value = process.env[name]?.trim();
  return value !== undefined && value.length > 0 ? value : undefined;
};
const configuredSiteUrl = envValue('MODERN_PUBLIC_SITE_URL');
const configuredCloudflareUrl = envValue('ULTRAMODERN_PUBLIC_URL_SHELL_SUPER_APP');
const cloudflareWorkersDevSubdomain = envValue('ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN');
const inferredCloudflareUrl =
  cloudflareDeployEnabled && cloudflareWorkersDevSubdomain !== undefined
    ? `https://${cloudflareWorkerName}.${cloudflareWorkersDevSubdomain}.workers.dev`
    : undefined;
const siteUrl =
  configuredCloudflareUrl ||
  configuredSiteUrl ||
  inferredCloudflareUrl ||
  `http://localhost:${port}`;
if (
  cloudflareDeployEnabled &&
  process.env['ULTRAMODERN_CLOUDFLARE_REQUIRE_PUBLIC_URLS'] === 'true' &&
  configuredCloudflareUrl === undefined &&
  configuredSiteUrl === undefined &&
  inferredCloudflareUrl === undefined
) {
  throw new Error(
    `Cloudflare deploy for ${appId} needs ULTRAMODERN_PUBLIC_URL_SHELL_SUPER_APP, MODERN_PUBLIC_SITE_URL, or ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN.`,
  );
}
const cloudflareAppUrl = (workerName: string) =>
  cloudflareDeployEnabled && cloudflareWorkersDevSubdomain !== undefined
    ? `https://${workerName}.${cloudflareWorkersDevSubdomain}.workers.dev`
    : undefined;
const exploreUrl =
  process.env['ULTRAMODERN_PUBLIC_URL_EXPLORE']?.trim() ??
  cloudflareAppUrl('tractor-store-vertical-demo-explore') ??
  'http://localhost:3021';
const decideUrl =
  process.env['ULTRAMODERN_PUBLIC_URL_DECIDE']?.trim() ??
  cloudflareAppUrl('tractor-store-vertical-demo-decide') ??
  'http://localhost:3022';
const checkoutUrl =
  process.env['ULTRAMODERN_PUBLIC_URL_CHECKOUT']?.trim() ??
  cloudflareAppUrl('tractor-store-vertical-demo-checkout') ??
  'http://localhost:3023';
const workerShimPath = (fileName: string) =>
  new URL(`../../tools/cloudflare-worker-shims/${fileName}`, import.meta.url).pathname;
const cssAsset = (baseUrl: string) =>
  `${baseUrl.replace(/\/+$/u, '')}/static/css/async/async-index.css`;

const shellStylesheetPlugin = () => ({
  name: 'tractor-store-shell-stylesheet-plugin',
  setup(api: {
    modifyHtmlPartials: (
      handler: (context: {
        partials: {
          head: {
            append: (html: string) => void;
          };
        };
      }) => void,
    ) => void;
  }) {
    api.modifyHtmlPartials(({ partials }) => {
      partials.head.append(
        '<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous" />',
      );
      partials.head.append(`<link href="${cssAsset(siteUrl)}" rel="stylesheet" />`);
      partials.head.append(`<link href="${cssAsset(exploreUrl)}" rel="stylesheet" />`);
      partials.head.append(`<link href="${cssAsset(decideUrl)}" rel="stylesheet" />`);
      partials.head.append(`<link href="${cssAsset(checkoutUrl)}" rel="stylesheet" />`);
    });
  },
});

export default defineConfig(
  presetUltramodern(
    {
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
      html: {
        outputStructure: 'flat',
      },
      output: {
        assetPrefix: siteUrl,
        disableTsChecker: true,
        distPath: {
          html: './',
        },
        filenameHash: false,
        polyfill: 'off',
        splitRouteChunks: true,
      },
      performance: {
        rsdoctor: {
          disableClientServer: true,
          enabled: process.env['ULTRAMODERN_RSDOCTOR'] === 'true',
        },
      },
      plugins: [
        appTools(),
        tanstackRouterPlugin(),
        i18nPlugin({
          backend: {
            enabled: true,
          },
          localeDetection: {
            fallbackLanguage: 'en',
            ignoreRedirectRoutes: [
              '/@mf-types',
              '/assets',
              '/bundles',
              '/shell-super-app-api',
              '/locales',
              '/mf-manifest.json',
              '/mf-stats.json',
              '/remoteEntry.js',
              '/static',
              '/zephyr-manifest.json',
            ],
            languages: ['en', 'cs'],
            localePathRedirect: true,
            localisedUrls: ultramodernLocalisedUrls as Record<string, Record<string, string>>,
          },
          reactI18next: false,
        }),
        moduleFederationPlugin(),
        shellStylesheetPlugin(),
        zephyrRspackPlugin(),
      ],
      server: {
        port,
        publicDir: ['./locales', './assets'],
        ssr: {
          mode: 'string',
          moduleFederationAppSSR: true,
        },
      },
      source: {
        globalVars: {
          ULTRAMODERN_CHECKOUT_URL: checkoutUrl,
          ULTRAMODERN_DECIDE_URL: decideUrl,
          ULTRAMODERN_EXPLORE_URL: exploreUrl,
          ULTRAMODERN_SITE_URL: siteUrl,
        },
        mainEntryName: 'index',
      },
      tools: {
        autoprefixer: {
          overrideBrowserslist: ['defaults'],
        },
        bundlerChain: (chain) => {
          chain.output
            .uniqueName('shellSuperApp')
            .chunkLoadingGlobal('__ULTRAMODERN_SHELL_SUPER_APP_LOADED_CHUNKS__');
          chain.ignoreWarnings([
            {
              message: /the request of a dependency is an expression/u,
              module: /modern-js-plugin-i18n/u,
            },
          ]);
          if (cloudflareDeployEnabled) {
            chain.resolve.alias.set('@loadable/server$', workerShimPath('loadable-server.mjs'));
            chain.resolve.alias.set('fs/promises$', workerShimPath('fs-promises.mjs'));
            chain.resolve.alias.set('path$', workerShimPath('path.mjs'));
          }
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
