import { getBuildConfigEnvironment, resolveEffectTsgoCompiler } from '@modern-js/app-tools/config';
import { createRequire } from 'node:module';
import { createModuleFederationConfig } from '@module-federation/modern-js-v3';
import { dependencies } from './package.json';

const cloudflareDeployEnabled = getBuildConfigEnvironment('MODERNJS_DEPLOY') === 'cloudflare';
const cloudflareWorkersDevSubdomain = getBuildConfigEnvironment(
  'ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN',
)?.trim();
const requireCloudflarePublicUrls =
  getBuildConfigEnvironment('ULTRAMODERN_CLOUDFLARE_REQUIRE_PUBLIC_URLS') === 'true';

const createRemoteManifestUrl = (options: {
  manifestEnv: string;
  mfName: string;
  port: number;
  publicUrlEnv: string;
  workerName: string;
}) => {
  const configuredManifest = getBuildConfigEnvironment(options.manifestEnv)?.trim();
  if (configuredManifest !== undefined && configuredManifest.length > 0) {
    return configuredManifest;
  }

  const configuredPublicUrl = getBuildConfigEnvironment(options.publicUrlEnv)?.trim();
  if (configuredPublicUrl !== undefined && configuredPublicUrl.length > 0) {
    return `${options.mfName}@${configuredPublicUrl.replace(/\/+$/u, '')}/mf-manifest.json`;
  }

  if (
    cloudflareDeployEnabled &&
    cloudflareWorkersDevSubdomain !== undefined &&
    cloudflareWorkersDevSubdomain.length > 0
  ) {
    return `${options.mfName}@https://${options.workerName}.${cloudflareWorkersDevSubdomain}.workers.dev/mf-manifest.json`;
  }

  if (cloudflareDeployEnabled && requireCloudflarePublicUrls) {
    throw new Error(
      `Cloudflare deploy needs ${options.publicUrlEnv}, ${options.manifestEnv}, or ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN for remote ${options.mfName}.`,
    );
  }

  return `${options.mfName}@http://localhost:${options.port}/mf-manifest.json`;
};

const require = createRequire(import.meta.url);
const pluginI18nVersion = (require('@modern-js/plugin-i18n/package.json') as { version: string })
  .version;
const pluginTanstackVersion = (
  require('@modern-js/plugin-tanstack/package.json') as { version: string }
).version;
const runtimeVersion = (require('@modern-js/runtime/package.json') as { version: string }).version;
const reactVersion = (require('react/package.json') as { version: string }).version;
const reactDomVersion = (require('react-dom/package.json') as { version: string }).version;

const tsgoCompilerInstance = resolveEffectTsgoCompiler({ from: import.meta.url });

const moduleFederationConfig: Parameters<typeof createModuleFederationConfig>[0] =
  createModuleFederationConfig({
    dts: {
      displayErrorInTerminal: true,
      generateTypes: {
        compilerInstance: tsgoCompilerInstance,
      },
      tsConfigPath: './tsconfig.mf-types.json',
    },
    exposes: {
      './ProductPage': './src/components/product-page.tsx',
      './Route': './src/federation-entry.tsx',
    },
    filename: 'remoteEntry.js',
    name: 'verticalDecide',
    remotes: {
      checkout: createRemoteManifestUrl({
        manifestEnv: 'VERTICAL_CHECKOUT_MF_MANIFEST',
        mfName: 'verticalCheckout',
        port: 3023,
        publicUrlEnv: 'ULTRAMODERN_PUBLIC_URL_CHECKOUT',
        workerName: 'tractor-store-vertical-demo-checkout',
      }),
      explore: createRemoteManifestUrl({
        manifestEnv: 'VERTICAL_EXPLORE_MF_MANIFEST',
        mfName: 'verticalExplore',
        port: 3021,
        publicUrlEnv: 'ULTRAMODERN_PUBLIC_URL_EXPLORE',
        workerName: 'tractor-store-vertical-demo-explore',
      }),
    },
    shared: {
      '@modern-js/plugin-i18n/runtime/no-react-i18next': {
        requiredVersion: pluginI18nVersion,
        singleton: true,
        treeShaking: false,
      },
      '@modern-js/plugin-tanstack/runtime': {
        requiredVersion: pluginTanstackVersion,
        singleton: true,
        treeShaking: false,
      },
      '@modern-js/runtime': {
        requiredVersion: runtimeVersion,
        singleton: true,
        treeShaking: false,
      },
      '@tanstack/react-router': {
        requiredVersion: dependencies['@tanstack/react-router'],
        singleton: true,
        treeShaking: false,
      },
      react: {
        requiredVersion: reactVersion,
        singleton: true,
        treeShaking: false,
      },
      'react-dom': {
        requiredVersion: reactDomVersion,
        singleton: true,
        treeShaking: false,
      },
      'react-dom/client': {
        requiredVersion: reactDomVersion,
        singleton: true,
        treeShaking: false,
      },
    },
  });

export default moduleFederationConfig;
