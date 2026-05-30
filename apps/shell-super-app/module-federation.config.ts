// @effect-diagnostics nodeBuiltinImport:off processEnv:off
import { createRequire } from 'node:module';
import { createModuleFederationConfig } from '@module-federation/modern-js-v3';
import { dependencies } from './package.json';

const require = createRequire(import.meta.url);
const pluginI18nVersion = (require('@modern-js/plugin-i18n/package.json') as { version: string }).version;
const pluginTanstackVersion = (require('@modern-js/plugin-tanstack/package.json') as { version: string }).version;
const runtimeVersion = (require('@modern-js/runtime/package.json') as { version: string }).version;
const reactVersion = (require('react/package.json') as { version: string }).version;
const reactDomVersion = (require('react-dom/package.json') as { version: string }).version;

export default createModuleFederationConfig({
  treeShakingSharedExcludePlugins: ['RspackModuleFederationPlugin'],
  dev: {
    disableDynamicRemoteTypeHints: true,
  },
  dts: {
    displayErrorInTerminal: true,
    generateTypes: {
      compilerInstance: '--package typescript -- tsc',
    },
  },
  filename: 'remoteEntry.js',
  name: 'shellSuperApp',
  remotes: {
    explore:
      process.env['VERTICAL_EXPLORE_MF_MANIFEST'] ??
      (process.env['ULTRAMODERN_PUBLIC_URL_EXPLORE']?.trim()
        ? `verticalExplore@${process.env['ULTRAMODERN_PUBLIC_URL_EXPLORE']!.trim().replace(/\/+$/u, '')}/mf-manifest.json`
        : undefined) ??
      'verticalExplore@http://localhost:3021/mf-manifest.json',
    decide:
      process.env['VERTICAL_DECIDE_MF_MANIFEST'] ??
      (process.env['ULTRAMODERN_PUBLIC_URL_DECIDE']?.trim()
        ? `verticalDecide@${process.env['ULTRAMODERN_PUBLIC_URL_DECIDE']!.trim().replace(/\/+$/u, '')}/mf-manifest.json`
        : undefined) ??
      'verticalDecide@http://localhost:3022/mf-manifest.json',
    checkout:
      process.env['VERTICAL_CHECKOUT_MF_MANIFEST'] ??
      (process.env['ULTRAMODERN_PUBLIC_URL_CHECKOUT']?.trim()
        ? `verticalCheckout@${process.env['ULTRAMODERN_PUBLIC_URL_CHECKOUT']!.trim().replace(/\/+$/u, '')}/mf-manifest.json`
        : undefined) ??
      'verticalCheckout@http://localhost:3023/mf-manifest.json',
  },
  shared: {
    '@modern-js/plugin-i18n/runtime': {
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
