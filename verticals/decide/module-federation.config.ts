// @effect-diagnostics nodeBuiltinImport:off processEnv:off
import { createRequire } from 'node:module';
import { createModuleFederationConfig } from '@module-federation/modern-js-v3';
import { dependencies } from './package.json';

const require = createRequire(import.meta.url);
const pluginI18nVersion = (require('@modern-js/plugin-i18n/package.json') as { version: string })
  .version;
const pluginTanstackVersion = (
  require('@modern-js/plugin-tanstack/package.json') as { version: string }
).version;
const runtimeVersion = (require('@modern-js/runtime/package.json') as { version: string }).version;
const reactVersion = (require('react/package.json') as { version: string }).version;
const reactDomVersion = (require('react-dom/package.json') as { version: string }).version;

const envValue = (name: string) => {
  const value = process.env[name]?.trim();
  return value !== undefined && value.length > 0 ? value : undefined;
};

const cloudflareDeployEnabled = process.env['MODERNJS_DEPLOY'] === 'cloudflare';
const cloudflareWorkersDevSubdomain = envValue('ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN');
const requireCloudflarePublicUrls =
  process.env['ULTRAMODERN_CLOUDFLARE_REQUIRE_PUBLIC_URLS'] === 'true';

const remoteManifest = (
  remoteName: string,
  publicUrlEnv: string,
  manifestEnv: string,
  workerName: string,
  localPort: number,
) => {
  const manifest = envValue(manifestEnv);
  if (manifest !== undefined) {
    return manifest;
  }

  const publicUrl = envValue(publicUrlEnv);
  if (publicUrl !== undefined) {
    return `${remoteName}@${publicUrl.replace(/\/+$/u, '')}/mf-manifest.json`;
  }

  if (cloudflareDeployEnabled && cloudflareWorkersDevSubdomain !== undefined) {
    return `${remoteName}@https://${workerName}.${cloudflareWorkersDevSubdomain}.workers.dev/mf-manifest.json`;
  }

  if (cloudflareDeployEnabled && requireCloudflarePublicUrls) {
    throw new Error(
      `Cloudflare deploy needs ${publicUrlEnv}, ${manifestEnv}, or ULTRAMODERN_CLOUDFLARE_WORKERS_DEV_SUBDOMAIN for remote ${remoteName}.`,
    );
  }

  return `${remoteName}@http://localhost:${localPort}/mf-manifest.json`;
};

export default createModuleFederationConfig({
  bridge: {
    enableBridgeRouter: false,
  },
  dev: {
    disableDynamicRemoteTypeHints: true,
  },
  dts: {
    displayErrorInTerminal: true,
    generateTypes: {
      compilerInstance: '--package typescript -- tsc',
    },
  },
  exposes: {
    './ProductPage': './src/components/product-page.tsx',
    './Route': './src/federation-entry.tsx',
  },
  filename: 'remoteEntry.js',
  name: 'verticalDecide',
  remotes: {
    checkout: remoteManifest(
      'verticalCheckout',
      'ULTRAMODERN_PUBLIC_URL_CHECKOUT',
      'VERTICAL_CHECKOUT_MF_MANIFEST',
      'tractor-store-vertical-demo-checkout',
      3023,
    ),
    explore: remoteManifest(
      'verticalExplore',
      'ULTRAMODERN_PUBLIC_URL_EXPLORE',
      'VERTICAL_EXPLORE_MF_MANIFEST',
      'tractor-store-vertical-demo-explore',
      3021,
    ),
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
  treeShakingSharedExcludePlugins: ['RspackModuleFederationPlugin'],
});
