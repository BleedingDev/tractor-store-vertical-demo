// @effect-diagnostics processEnv:off
import { appTools, defineConfig, presetUltramodern } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
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

const appId = 'explore';
const cloudflareWorkerName = 'tractor-store-vertical-demo-explore';
const port = Number(process.env['VERTICAL_EXPLORE_PORT'] ?? 3021);
const envValue = (name: string) => {
  const value = process.env[name]?.trim();
  return value !== undefined && value.length > 0 ? value : undefined;
};
const configuredSiteUrl = envValue('MODERN_PUBLIC_SITE_URL');
const configuredCloudflareUrl = envValue('ULTRAMODERN_PUBLIC_URL_EXPLORE');
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
    `Cloudflare deploy for ${appId} needs ULTRAMODERN_PUBLIC_URL_EXPLORE, MODERN_PUBLIC_SITE_URL, or ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN.`,
  );
}
const workerShimPath = (fileName: string) =>
  new URL(`../../tools/cloudflare-worker-shims/${fileName}`, import.meta.url).pathname;

export default defineConfig(
  presetUltramodern(
    {
      bff: {
        effect: {
          entry: './api/effect/index',
          openapi: {
            path: '/openapi.json',
          },
        },
        prefix: '/explore-api',
        runtimeFramework: 'effect',
      },
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
        splitRouteChunks: false,
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
              '/explore-api',
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
        bffPlugin(),
        moduleFederationPlugin(),
        zephyrRspackPlugin(),
      ],
      tools: {
        autoprefixer: {
          overrideBrowserslist: ['defaults'],
        },
        bundlerChain: (chain) => {
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
          mode: 'string',
          moduleFederationAppSSR: true,
        },
      },
      source: {
        globalVars: {
          ULTRAMODERN_SITE_URL: siteUrl,
        },
        mainEntryName: 'index',
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
