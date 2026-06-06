import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packageScope = 'tractor-store-vertical-demo';
const expectedPnpmVersion = '11.5.0';
const tailwindEnabled = true;
const fullStackVerticals = [
  {
    apiPrefix: '/explore-api',
    boundarySurfaces: [
      ['verticals/explore/src/components/footer.tsx', './Footer'],
      ['verticals/explore/src/components/header.tsx', './Header'],
      ['verticals/explore/src/components/home-page.tsx', './HomePage'],
      ['verticals/explore/src/components/product-grid.tsx', './ProductGrid'],
      ['verticals/explore/src/components/recommendations.tsx', './Recommendations'],
      ['verticals/explore/src/components/store-picker.tsx', './StorePicker'],
    ],
    componentPaths: [
      'verticals/explore/src/components/footer.tsx',
      'verticals/explore/src/components/header.tsx',
      'verticals/explore/src/components/home-page.tsx',
      'verticals/explore/src/components/product-grid.tsx',
      'verticals/explore/src/components/recommendations.tsx',
      'verticals/explore/src/components/store-picker.tsx',
    ],
    domain: 'explore',
    exposes: [
      './Footer',
      './Header',
      './HomePage',
      './ProductGrid',
      './Recommendations',
      './Route',
      './StorePicker',
    ],
    group: 'explore',
    id: 'explore',
    localisedUrls: {
      '/nedostupne': {
        cs: '/nedostupne',
        en: '/unavailable',
      },
      '/prodejci': {
        cs: '/prodejci',
        en: '/stores',
      },
      '/stores': {
        cs: '/prodejci',
        en: '/stores',
      },
      '/tractors': {
        cs: '/traktory',
        en: '/tractors',
      },
      '/traktory': {
        cs: '/traktory',
        en: '/tractors',
      },
      '/unavailable': {
        cs: '/nedostupne',
        en: '/unavailable',
      },
    },
    mfName: 'verticalExplore',
    namespace: 'explore',
    packageName: '@tractor-store-vertical-demo/explore',
    path: 'verticals/explore',
    routePagePaths: [
      'verticals/explore/src/routes/[lang]/tractors/page.tsx',
      'verticals/explore/src/routes/[lang]/stores/page.tsx',
      'verticals/explore/src/routes/[lang]/unavailable/page.tsx',
    ],
    stem: 'explore',
    tailwindPrefix: 'explore',
    verticalRefs: [],
  },
  {
    apiPrefix: '/decide-api',
    boundarySurfaces: [['verticals/decide/src/components/product-page.tsx', './ProductPage']],
    componentPaths: ['verticals/decide/src/components/product-page.tsx'],
    domain: 'decide',
    exposes: ['./ProductPage', './Route'],
    group: 'decide',
    id: 'decide',
    localisedUrls: {
      '/nedostupne': {
        cs: '/nedostupne',
        en: '/unavailable',
      },
      '/tractors': {
        cs: '/traktory',
        en: '/tractors',
      },
      '/tractors/:slug': {
        cs: '/traktory/:slug',
        en: '/tractors/:slug',
      },
      '/traktory': {
        cs: '/traktory',
        en: '/tractors',
      },
      '/traktory/:slug': {
        cs: '/traktory/:slug',
        en: '/tractors/:slug',
      },
      '/unavailable': {
        cs: '/nedostupne',
        en: '/unavailable',
      },
    },
    mfName: 'verticalDecide',
    namespace: 'decide',
    packageName: '@tractor-store-vertical-demo/decide',
    path: 'verticals/decide',
    routePagePaths: [
      'verticals/decide/src/routes/[lang]/tractors/page.tsx',
      'verticals/decide/src/routes/[lang]/tractors/[slug]/page.tsx',
      'verticals/decide/src/routes/[lang]/unavailable/page.tsx',
    ],
    stem: 'decide',
    tailwindPrefix: 'decide',
    verticalRefs: ['explore', 'checkout'],
  },
  {
    apiPrefix: '/checkout-api',
    boundarySurfaces: [
      ['verticals/checkout/src/components/add-to-cart.tsx', './AddToCart'],
      ['verticals/checkout/src/components/cart-page.tsx', './CartPage'],
      ['verticals/checkout/src/components/checkout-page.tsx', './CheckoutPage'],
      ['verticals/checkout/src/components/mini-cart.tsx', './MiniCart'],
      ['verticals/checkout/src/components/thanks-page.tsx', './ThanksPage'],
    ],
    componentPaths: [
      'verticals/checkout/src/components/add-to-cart.tsx',
      'verticals/checkout/src/components/cart-page.tsx',
      'verticals/checkout/src/components/checkout-page.tsx',
      'verticals/checkout/src/components/mini-cart.tsx',
      'verticals/checkout/src/components/thanks-page.tsx',
    ],
    domain: 'checkout',
    exposes: [
      './AddToCart',
      './CartPage',
      './CheckoutPage',
      './MiniCart',
      './Route',
      './ThanksPage',
    ],
    group: 'checkout',
    id: 'checkout',
    localisedUrls: {
      '/cart': {
        cs: '/kosik',
        en: '/cart',
      },
      '/checkout': {
        cs: '/pokladna',
        en: '/checkout',
      },
      '/checkout/thank-you': {
        cs: '/pokladna/dekujeme',
        en: '/checkout/thank-you',
      },
      '/checkout/thank-you/:orderId?': {
        cs: '/pokladna/dekujeme/:orderId?',
        en: '/checkout/thank-you/:orderId?',
      },
      '/kosik': {
        cs: '/kosik',
        en: '/cart',
      },
      '/nedostupne': {
        cs: '/nedostupne',
        en: '/unavailable',
      },
      '/pokladna': {
        cs: '/pokladna',
        en: '/checkout',
      },
      '/pokladna/dekujeme': {
        cs: '/pokladna/dekujeme',
        en: '/checkout/thank-you',
      },
      '/pokladna/dekujeme/:orderId?': {
        cs: '/pokladna/dekujeme/:orderId?',
        en: '/checkout/thank-you/:orderId?',
      },
      '/unavailable': {
        cs: '/nedostupne',
        en: '/unavailable',
      },
    },
    mfName: 'verticalCheckout',
    namespace: 'checkout',
    packageName: '@tractor-store-vertical-demo/checkout',
    path: 'verticals/checkout',
    routePagePaths: [
      'verticals/checkout/src/routes/[lang]/cart/page.tsx',
      'verticals/checkout/src/routes/[lang]/checkout/page.tsx',
      'verticals/checkout/src/routes/[lang]/checkout/thank-you/page.tsx',
      'verticals/checkout/src/routes/[lang]/checkout/thank-you/[orderId$]/page.tsx',
      'verticals/checkout/src/routes/[lang]/unavailable/page.tsx',
    ],
    stem: 'checkout',
    tailwindPrefix: 'checkout',
    verticalRefs: [],
  },
];
const shellNamespace = 'shell';
const oldRemotePaths = ['apps/remotes'];

const readText = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf-8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const sortObjectKeys = (value) => {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .toSorted(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, sortObjectKeys(entry)]),
    );
  }
  return value;
};

const stableJson = (value) => JSON.stringify(sortObjectKeys(value));
const assertExists = (relativePath) => {
  assert(fs.existsSync(path.join(root, relativePath)), `Missing ${relativePath}`);
};
const assertNotExists = (relativePath) => {
  assert(!fs.existsSync(path.join(root, relativePath)), `Unexpected ${relativePath}`);
};
const expectedWorkerName = (packageSuffix) => `${packageScope}-${packageSuffix}`.slice(0, 63);
const expectedChunkLoadingGlobal = (mfName) =>
  `__ULTRAMODERN_${mfName
    .replaceAll(/([a-z0-9])([A-Z])/gu, '$1_$2')
    .replaceAll(/[^A-Za-z0-9]+/gu, '_')
    .replaceAll(/^_+|_+$/gu, '')
    .toUpperCase()}_LOADED_CHUNKS__`;
const expectedModernPackageSourceSpecifier = '3.2.0-ultramodern.108';
const expectedCloudflareCompatibilityDate = '2026-06-02';
const expectedCloudflareCompatibilityFlags = ['nodejs_compat', 'global_fetch_strictly_public'];
const expectedCloudflareSecurityHeaders = {
  contentTypeOptions: 'nosniff',
  permissionsPolicy: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  referrerPolicy: 'strict-origin-when-cross-origin',
};
const expectedModernPackageSpecifier = (packageName) => {
  if (packageSource.strategy !== 'install') {
    return 'workspace:*';
  }
  const alias = packageSource.modernPackages?.aliases?.[packageName];
  const specifier = packageSource.modernPackages?.specifier;
  return alias ? `npm:${alias}@${specifier}` : specifier;
};

const activePnpmVersion = execFileSync('pnpm', ['--version'], {
  cwd: root,
  encoding: 'utf-8',
  stdio: ['ignore', 'pipe', 'pipe'],
}).trim();

assert(
  activePnpmVersion === expectedPnpmVersion,
  `Generated workspace requires pnpm ${expectedPnpmVersion}; active pnpm is ${activePnpmVersion}. Run mise install, then rerun pnpm from the activated shell.`,
);

const requiredPaths = [
  'AGENTS.md',
  '.gitignore',
  'package.json',
  'pnpm-workspace.yaml',
  'tsconfig.base.json',
  'oxlint.config.ts',
  'oxfmt.config.ts',
  '.github/renovate.json',
  '.github/workflows/ultramodern-workspace-gates.yml',
  'topology/reference-topology.json',
  'topology/ownership.json',
  'topology/local-overlays/development.json',
  '.modernjs/ultramodern-workspace-template-manifest.json',
  '.modernjs/ultramodern-package-source.json',
  '.modernjs/ultramodern-generated-contract.json',
  'scripts/assert-mf-types.mjs',
  'scripts/bootstrap-agent-skills.mjs',
  'scripts/proof-cloudflare-version.mjs',
  'scripts/setup-agent-reference-repos.mjs',
  'apps/shell-super-app/package.json',
  'apps/shell-super-app/modern.config.ts',
  'apps/shell-super-app/module-federation.config.ts',
  'apps/shell-super-app/src/modern-app-env.d.ts',
  'apps/shell-super-app/src/modern.runtime.ts',
  'apps/shell-super-app/src/effect/recommendations-client.ts',
  'apps/shell-super-app/locales/en/translation.json',
  `apps/shell-super-app/locales/en/${shellNamespace}.json`,
  'apps/shell-super-app/locales/cs/translation.json',
  `apps/shell-super-app/locales/cs/${shellNamespace}.json`,
  'apps/shell-super-app/src/routes/index.css',
  'apps/shell-super-app/src/routes/layout.tsx',
  'apps/shell-super-app/src/routes/ultramodern-route-metadata.ts',
  'apps/shell-super-app/src/routes/[lang]/page.tsx',
  'packages/shared-contracts/src/index.ts',
  'packages/shared-design-tokens/src/index.ts',
  'packages/shared-design-tokens/src/tokens.css',
  'packages/shared-effect-api/src/index.ts',
];

for (const vertical of fullStackVerticals) {
  requiredPaths.push(
    `${vertical.path}/package.json`,
    `${vertical.path}/modern.config.ts`,
    `${vertical.path}/module-federation.config.ts`,
    `${vertical.path}/api/effect/index.ts`,
    `${vertical.path}/shared/effect/api.ts`,
    `${vertical.path}/src/effect/${vertical.stem}-client.ts`,
    `${vertical.path}/src/modern-app-env.d.ts`,
    `${vertical.path}/src/modern.runtime.ts`,
    `${vertical.path}/src/federation-entry.tsx`,
    ...vertical.componentPaths,
    `${vertical.path}/locales/en/translation.json`,
    `${vertical.path}/locales/en/${vertical.namespace}.json`,
    `${vertical.path}/locales/cs/translation.json`,
    `${vertical.path}/locales/cs/${vertical.namespace}.json`,
    `${vertical.path}/src/routes/index.css`,
    `${vertical.path}/src/routes/layout.tsx`,
    `${vertical.path}/src/routes/ultramodern-route-metadata.ts`,
    `${vertical.path}/src/routes/[lang]/page.tsx`,
    ...vertical.routePagePaths,
  );
}

if (tailwindEnabled) {
  requiredPaths.push(
    'apps/shell-super-app/postcss.config.mjs',
    'apps/shell-super-app/tailwind.config.ts',
    ...fullStackVerticals.flatMap((vertical) => [
      `${vertical.path}/postcss.config.mjs`,
      `${vertical.path}/tailwind.config.ts`,
    ]),
  );
}

for (const requiredPath of requiredPaths) {
  assertExists(requiredPath);
}
for (const oldRemotePath of oldRemotePaths) {
  assertNotExists(oldRemotePath);
}
assertNotExists('services/service-recommendations-effect');
assertNotExists('tools/cloudflare-worker-shims/fs-promises.mjs');
assertNotExists('tools/cloudflare-worker-shims/loadable-server.mjs');
assertNotExists('tools/cloudflare-worker-shims/path.mjs');

const rootPackage = readJson('package.json');
const packageSource = readJson('.modernjs/ultramodern-package-source.json');
const generatedContract = readJson('.modernjs/ultramodern-generated-contract.json');
const topology = readJson('topology/reference-topology.json');
const ownership = readJson('topology/ownership.json');
const overlay = readJson('topology/local-overlays/development.json');

assert(rootPackage.private === true, 'Root package must be private');
assert(rootPackage.packageManager === `pnpm@${expectedPnpmVersion}`, 'Root must pin pnpm');
assert(rootPackage.modernjs?.preset === 'presetUltramodern', 'Root must declare presetUltramodern');
assert(
  rootPackage.modernjs?.packageSource?.config === './.modernjs/ultramodern-package-source.json',
  'Root must point at package source metadata',
);
assert(
  rootPackage.modernjs?.packageSource?.strategy === packageSource.strategy,
  'Root package source strategy must match metadata',
);
assert(
  packageSource.strategy === 'workspace' || packageSource.strategy === 'install',
  'Package source strategy must be workspace or install',
);
assert(
  packageSource.generatedWorkspacePackages?.specifier === 'workspace:*',
  'Generated workspace packages must keep workspace:* links',
);
assert(
  packageSource.modernPackages?.specifier === expectedModernPackageSourceSpecifier,
  'Install package source must match the proven BleedingDev cohort',
);
assert(
  rootPackage.scripts?.build ===
    'ULTRAMODERN_ZEPHYR=false pnpm -r --filter "./verticals/*" run build && ULTRAMODERN_ZEPHYR=false pnpm --filter "./apps/shell-super-app" run build && pnpm ultramodern:assert-mf-types',
  'Root build script must build verticals before shell',
);
assert(
  rootPackage.scripts?.['ultramodern:check'] ===
    'node ./scripts/validate-ultramodern-workspace.mjs',
  'Root must expose ultramodern:check',
);
assert(
  rootPackage.scripts?.['ultramodern:assert-mf-types'] === 'node ./scripts/assert-mf-types.mjs',
  'Root must expose ultramodern:assert-mf-types',
);
assert(
  rootPackage.scripts?.['cloudflare:deploy']?.includes('run cloudflare:deploy'),
  'Root must expose cloudflare:deploy',
);
assert(
  rootPackage.scripts?.['cloudflare:proof'] ===
    'node ./scripts/proof-cloudflare-version.mjs --out .codex/reports/cloudflare-version-proof/public-url-proof.json',
  'Root must expose cloudflare:proof',
);
assert(
  rootPackage.scripts?.['skills:install'] === 'node ./scripts/bootstrap-agent-skills.mjs',
  'Root must expose skills:install',
);
assert(
  rootPackage.scripts?.['skills:check'] === 'node ./scripts/bootstrap-agent-skills.mjs --check',
  'Root must expose skills:check',
);
assert(
  rootPackage.scripts?.postinstall ===
    'node ./scripts/bootstrap-agent-skills.mjs && node ./scripts/setup-agent-reference-repos.mjs',
  'Root postinstall must bootstrap agent skills, initialize git/hooks, and install reference repositories',
);

const expectedAppIds = ['shell-super-app', ...fullStackVerticals.map((vertical) => vertical.id)];
assert(
  JSON.stringify(generatedContract.apps?.map((app) => app.id)) === JSON.stringify(expectedAppIds),
  'Generated contract must contain shell plus the Tractor full-stack verticals',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.owner?.id === 'shared-design-tokens',
  'CSS federation must declare shared design token ownership',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.role === 'shared-design-tokens',
  'CSS federation must mark shared-design-tokens as token owner',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.rootSelector === ':root',
  'Shared design tokens must declare their root selector',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.classPrefix === '--um-',
  'Shared design tokens must declare their CSS custom property prefix',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.layers?.owned?.includes(
    'ultramodern-shared-tokens',
  ),
  'Shared design tokens must own the shared token CSS layer',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.entrypoints?.css?.includes(
    'packages/shared-design-tokens/src/tokens.css',
  ),
  'Shared design tokens must declare their CSS entrypoint',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.assets?.exports?.includes('./tokens.css'),
  'Shared design tokens must export their CSS asset',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.dedupe?.duplicateBaseStylesAllowed === false,
  'Shared design token CSS must be deduplicated',
);
assert(
  generatedContract.cssFederation?.sharedDesignTokens?.ssr?.firstPaintRequired === true,
  'Shared design token CSS must be required for SSR first paint',
);

const shellPackage = readJson('apps/shell-super-app/package.json');
const shellModernConfig = readText('apps/shell-super-app/modern.config.ts');
const expectedZephyrDependencies = Object.fromEntries(
  fullStackVerticals.map((vertical) => [vertical.domain, `${vertical.packageName}@workspace:*`]),
);
assert(
  JSON.stringify(shellPackage['zephyr:dependencies']) ===
    JSON.stringify(expectedZephyrDependencies),
  'Shell Zephyr dependencies must reference every Tractor vertical package',
);
assert(
  shellPackage.devDependencies?.['@modern-js/app-tools'] ===
    expectedModernPackageSpecifier('@modern-js/app-tools'),
  'Shell app-tools dependency must match package source metadata',
);
assert(
  shellPackage.dependencies?.['@modern-js/plugin-bff'] ===
    expectedModernPackageSpecifier('@modern-js/plugin-bff'),
  'Shell plugin-bff dependency must match package source metadata',
);
assert(
  shellPackage.dependencies?.['@modern-js/plugin-i18n'] ===
    expectedModernPackageSpecifier('@modern-js/plugin-i18n'),
  'Shell plugin-i18n dependency must match package source metadata',
);
assert(
  shellPackage.dependencies?.['@modern-js/plugin-tanstack'] ===
    expectedModernPackageSpecifier('@modern-js/plugin-tanstack'),
  'Shell plugin-tanstack dependency must match package source metadata',
);
assert(
  shellPackage.dependencies?.['@modern-js/runtime'] ===
    expectedModernPackageSpecifier('@modern-js/runtime'),
  'Shell runtime dependency must match package source metadata',
);
assert(!shellModernConfig.includes('filenameHash'), 'Shell must not disable filename hashing');
assert(
  !shellModernConfig.includes('shellStylesheetPlugin'),
  'Shell must not inject remote CSS through a local stylesheet plugin',
);
assert(
  !shellModernConfig.includes('cloudflare-worker-shims') &&
    !shellModernConfig.includes('resolve.alias.set'),
  'Shell must not use app-local Cloudflare Worker aliases',
);
assert(
  shellModernConfig.includes(`compatibilityDate: '${expectedCloudflareCompatibilityDate}'`),
  'Shell modern.config.ts must pin the generated Cloudflare compatibility date',
);
const shellContract = generatedContract.apps?.find((app) => app.id === 'shell-super-app');
assert(
  shellContract?.deploy?.cloudflare?.workerName === expectedWorkerName('shell-super-app'),
  'Shell Cloudflare workerName is incorrect',
);
assert(
  shellContract?.deploy?.cloudflare?.publicUrlEnv === 'ULTRAMODERN_PUBLIC_URL_SHELL_SUPER_APP',
  'Shell Cloudflare public URL env is incorrect',
);
assert(
  shellContract?.deploy?.cloudflare?.compatibilityDate === expectedCloudflareCompatibilityDate,
  'Shell Cloudflare compatibilityDate is incorrect',
);
assert(
  stableJson(shellContract?.deploy?.cloudflare?.compatibilityFlags) ===
    stableJson(expectedCloudflareCompatibilityFlags),
  'Shell Cloudflare compatibility flags are incorrect',
);
assert(
  stableJson(shellContract?.deploy?.cloudflare?.security?.headers) ===
    stableJson(expectedCloudflareSecurityHeaders),
  'Shell Cloudflare security headers are incorrect',
);
assert(
  shellContract?.deploy?.worker?.compatibilityDate === expectedCloudflareCompatibilityDate,
  'Shell worker compatibilityDate is incorrect',
);
assert(
  shellContract?.config?.rspack?.output?.uniqueName === 'shellSuperApp',
  'Shell Rspack uniqueName must isolate runtime chunks',
);
assert(
  shellContract?.config?.rspack?.output?.chunkLoadingGlobal ===
    expectedChunkLoadingGlobal('shellSuperApp'),
  'Shell Rspack chunkLoadingGlobal must isolate split chunks',
);
assert(
  topology.shell?.cloudflare?.workerName === expectedWorkerName('shell-super-app'),
  'Shell topology Cloudflare workerName is incorrect',
);
assert(
  topology.shell?.cloudflare?.compatibilityDate === expectedCloudflareCompatibilityDate,
  'Shell topology Cloudflare compatibilityDate is incorrect',
);
assert(
  stableJson(topology.shell?.cloudflare?.compatibilityFlags) ===
    stableJson(expectedCloudflareCompatibilityFlags),
  'Shell topology Cloudflare compatibility flags are incorrect',
);
assert(
  shellContract?.styling?.federation?.owner?.id === 'shell-super-app',
  'Shell CSS federation owner is missing',
);
assert(
  shellContract?.styling?.federation?.role === 'shell-base-overlay',
  'Shell must own base and overlay CSS',
);
assert(
  shellContract?.styling?.federation?.rootSelector === '[data-app-id="shell-super-app"]',
  'Shell CSS root selector is incorrect',
);
assert(
  shellContract?.styling?.federation?.classPrefix === 'shell:',
  'Shell CSS class prefix is incorrect',
);
assert(
  shellContract?.styling?.federation?.layers?.owned?.includes('ultramodern-shell-base'),
  'Shell must own the base CSS layer',
);
assert(
  shellContract?.styling?.federation?.layers?.owned?.includes('ultramodern-shell-overlay'),
  'Shell must own the overlay CSS layer',
);
assert(
  shellContract?.styling?.federation?.entrypoints?.css?.includes('src/routes/index.css'),
  'Shell CSS entrypoint is missing',
);
assert(
  shellContract?.styling?.federation?.assets?.shared?.some((asset) =>
    asset.endsWith('/shared-design-tokens/tokens.css'),
  ),
  'Shell must import the shared design token CSS asset',
);
assert(
  shellContract?.styling?.federation?.dedupe?.duplicateBaseStylesAllowed === false,
  'Shell CSS contract must forbid duplicated base styles',
);
assert(
  shellContract?.styling?.federation?.ssr?.firstPaintRequired === true,
  'Shell CSS must be required for SSR first paint',
);
assert(
  topology.shell?.verticalRefs?.join(',') ===
    fullStackVerticals.map((vertical) => vertical.id).join(','),
  'Topology shell verticalRefs must match Tractor verticals',
);
assert(
  topology.verticals?.length === fullStackVerticals.length,
  'Topology must contain only Tractor verticals',
);
assert(!('remotes' in topology), 'Topology must not expose legacy remotes; use verticals');
assert(!('effectServices' in topology), 'Default APIs must be vertical-owned, not effectServices');

for (const vertical of fullStackVerticals) {
  for (const [surfacePath, expose] of vertical.boundarySurfaces) {
    const source = readText(surfacePath);
    assert(
      source.includes(`data-modern-boundary-id="${vertical.id}"`),
      `${surfacePath} must declare its team boundary`,
    );
    assert(
      source.includes(`data-modern-mf-expose="${expose}"`),
      `${surfacePath} must declare its exposed Module Federation component`,
    );
    assert(
      !source.includes('data-mf-boundary') &&
        !source.includes('data-mf-remote') &&
        !source.includes('data-mf-expose'),
      `${surfacePath} must use the modern Module Federation CSS marker contract`,
    );
  }

  const packageJson = readJson(`${vertical.path}/package.json`);
  const modernConfig = readText(`${vertical.path}/modern.config.ts`);
  assert(packageJson.name === vertical.packageName, `${vertical.id} package name is incorrect`);
  assert(
    packageJson.devDependencies?.['@modern-js/app-tools'] ===
      expectedModernPackageSpecifier('@modern-js/app-tools'),
    `${vertical.id} app-tools dependency must match package source metadata`,
  );
  assert(
    packageJson.dependencies?.['@modern-js/plugin-bff'] ===
      expectedModernPackageSpecifier('@modern-js/plugin-bff'),
    `${vertical.id} plugin-bff dependency must match package source metadata`,
  );
  assert(
    packageJson.dependencies?.['@modern-js/plugin-i18n'] ===
      expectedModernPackageSpecifier('@modern-js/plugin-i18n'),
    `${vertical.id} plugin-i18n dependency must match package source metadata`,
  );
  assert(
    packageJson.dependencies?.['@modern-js/plugin-tanstack'] ===
      expectedModernPackageSpecifier('@modern-js/plugin-tanstack'),
    `${vertical.id} plugin-tanstack dependency must match package source metadata`,
  );
  assert(
    packageJson.dependencies?.['@modern-js/runtime'] ===
      expectedModernPackageSpecifier('@modern-js/runtime'),
    `${vertical.id} runtime dependency must match package source metadata`,
  );
  assert(
    !modernConfig.includes('filenameHash'),
    `${vertical.id} must not disable filename hashing`,
  );
  assert(
    !modernConfig.includes('cloudflare-worker-shims') &&
      !modernConfig.includes('resolve.alias.set'),
    `${vertical.id} must not use app-local Cloudflare Worker aliases`,
  );
  assert(
    modernConfig.includes(`compatibilityDate: '${expectedCloudflareCompatibilityDate}'`),
    `${vertical.id} modern.config.ts must pin the generated Cloudflare compatibility date`,
  );
  assert(
    packageJson.scripts?.['cloudflare:deploy'] ===
      'ULTRAMODERN_CLOUDFLARE_REQUIRE_PUBLIC_URLS=true pnpm run cloudflare:build && wrangler deploy --config .output/wrangler.json',
    `${vertical.id} must expose cloudflare:deploy through Wrangler`,
  );
  assert(
    packageJson.scripts?.['cloudflare:proof']?.includes(`--app ${vertical.id}`),
    `${vertical.id} must expose cloudflare:proof`,
  );
  assert(
    packageJson.dependencies?.['@modern-js/plugin-bff'],
    `${vertical.id} must depend on plugin-bff`,
  );
  assert(
    packageJson.exports?.['./effect/client'] === `./src/effect/${vertical.stem}-client.ts`,
    `${vertical.id} must export its Effect client`,
  );
  assert(
    packageJson.exports?.['./shared/effect/api'] === './shared/effect/api.ts',
    `${vertical.id} must export its Effect API contract`,
  );
  const expectedVerticalZephyrDependencies = Object.fromEntries(
    fullStackVerticals
      .filter((candidate) => vertical.verticalRefs.includes(candidate.id))
      .map((candidate) => [candidate.domain, `${candidate.packageName}@workspace:*`]),
  );
  assert(
    JSON.stringify(packageJson['zephyr:dependencies']) ===
      JSON.stringify(expectedVerticalZephyrDependencies),
    `${vertical.id} Zephyr dependencies must match declared vertical refs`,
  );

  const contractEntry = generatedContract.apps?.find((app) => app.id === vertical.id);
  assert(
    contractEntry?.path === vertical.path,
    `${vertical.id} generated contract path is incorrect`,
  );
  assert(contractEntry?.kind === 'vertical', `${vertical.id} generated contract kind is incorrect`);
  assert(
    contractEntry?.deploy?.cloudflare?.workerName === expectedWorkerName(vertical.id),
    `${vertical.id} Cloudflare workerName is incorrect`,
  );
  assert(
    contractEntry?.deploy?.cloudflare?.publicUrlEnv ===
      `ULTRAMODERN_PUBLIC_URL_${vertical.id.replaceAll('-', '_').toUpperCase()}`,
    `${vertical.id} Cloudflare public URL env is incorrect`,
  );
  assert(
    contractEntry?.deploy?.cloudflare?.compatibilityDate === expectedCloudflareCompatibilityDate,
    `${vertical.id} Cloudflare compatibilityDate is incorrect`,
  );
  assert(
    stableJson(contractEntry?.deploy?.cloudflare?.compatibilityFlags) ===
      stableJson(expectedCloudflareCompatibilityFlags),
    `${vertical.id} Cloudflare compatibility flags are incorrect`,
  );
  assert(
    stableJson(contractEntry?.deploy?.cloudflare?.security?.headers) ===
      stableJson(expectedCloudflareSecurityHeaders),
    `${vertical.id} Cloudflare security headers are incorrect`,
  );
  assert(
    contractEntry?.deploy?.worker?.compatibilityDate === expectedCloudflareCompatibilityDate,
    `${vertical.id} worker compatibilityDate is incorrect`,
  );
  assert(
    contractEntry?.deploy?.cloudflare?.routes?.effectReadiness ===
      `${vertical.apiPrefix}/effect/${vertical.stem}/readiness`,
    `${vertical.id} Cloudflare proof readiness route is incorrect`,
  );
  assert(
    contractEntry?.moduleFederation?.name === vertical.mfName,
    `${vertical.id} MF name is incorrect`,
  );
  assert(
    contractEntry?.config?.rspack?.output?.uniqueName === vertical.mfName,
    `${vertical.id} Rspack uniqueName must match its MF name`,
  );
  assert(
    contractEntry?.config?.rspack?.output?.chunkLoadingGlobal ===
      expectedChunkLoadingGlobal(vertical.mfName),
    `${vertical.id} Rspack chunkLoadingGlobal must isolate split chunks`,
  );
  assert(
    JSON.stringify(contractEntry?.moduleFederation?.exposes) === JSON.stringify(vertical.exposes),
    `${vertical.id} MF exposes are incorrect`,
  );
  assert(
    contractEntry?.moduleFederation?.dts?.compilerInstance === '--package typescript -- tsc',
    `${vertical.id} must keep mandatory DTS compiler`,
  );
  assert(
    JSON.stringify(contractEntry?.moduleFederation?.verticalRefs ?? []) ===
      JSON.stringify(vertical.verticalRefs),
    `${vertical.id} MF verticalRefs are incorrect`,
  );
  assert(
    JSON.stringify((contractEntry?.moduleFederation?.remotes ?? []).map((remote) => remote.id)) ===
      JSON.stringify(vertical.verticalRefs),
    `${vertical.id} MF consumed verticals are incorrect`,
  );
  assert(
    contractEntry?.effect?.prefix === vertical.apiPrefix,
    `${vertical.id} Effect API prefix is incorrect`,
  );
  assert(
    contractEntry?.effect?.group === vertical.group,
    `${vertical.id} Effect group is incorrect`,
  );
  assert(
    contractEntry?.effect?.readiness?.endpoint === `/effect/${vertical.stem}/readiness`,
    `${vertical.id} readiness endpoint is incorrect`,
  );
  assert(
    contractEntry?.effect?.operations?.readiness?.path === `/effect/${vertical.stem}/readiness`,
    `${vertical.id} readiness operation is missing`,
  );
  assert(
    contractEntry?.effect?.requestContext?.propagatedHeaders?.includes('traceparent'),
    `${vertical.id} trace context propagation is missing`,
  );
  assert(
    Object.keys(contractEntry?.effect?.domainOperations ?? {}).length >= 3,
    `${vertical.id} domain operations are missing`,
  );
  assert(
    contractEntry?.i18n?.languages?.includes('en') &&
      contractEntry?.i18n?.languages?.includes('cs'),
    `${vertical.id} must declare i18n languages`,
  );
  assert(
    contractEntry?.i18n?.namespace === vertical.namespace,
    `${vertical.id} i18n namespace is incorrect`,
  );
  assert(
    stableJson(contractEntry?.i18n?.localisedUrls) === stableJson(vertical.localisedUrls),
    `${vertical.id} localisedUrls must come from route metadata`,
  );
  assert(
    contractEntry?.routes?.source === 'route-owned',
    `${vertical.id} routes must be route-owned`,
  );
  assert(
    contractEntry?.routes?.metadataExport === './src/routes/ultramodern-route-metadata',
    `${vertical.id} route metadata export is incorrect`,
  );
  assert(
    contractEntry?.styling?.federation?.owner?.id === vertical.id,
    `${vertical.id} CSS federation owner is missing`,
  );
  assert(
    contractEntry?.styling?.federation?.role === 'vertical-css',
    `${vertical.id} must own only vertical CSS`,
  );
  assert(
    contractEntry?.styling?.federation?.rootSelector === `[data-app-id="${vertical.id}"]`,
    `${vertical.id} CSS root selector is incorrect`,
  );
  assert(
    contractEntry?.styling?.federation?.classPrefix === `${vertical.domain}:`,
    `${vertical.id} CSS class prefix is incorrect`,
  );
  assert(
    contractEntry?.styling?.federation?.layers?.owned?.includes(
      `ultramodern-vertical-${vertical.domain}`,
    ),
    `${vertical.id} vertical CSS layer is missing`,
  );
  assert(
    !contractEntry?.styling?.federation?.layers?.owned?.includes('ultramodern-shell-base'),
    `${vertical.id} must not own shell base CSS`,
  );
  assert(
    contractEntry?.styling?.federation?.entrypoints?.federationEntry === 'src/federation-entry.tsx',
    `${vertical.id} CSS contract must include federation entry`,
  );
  assert(
    contractEntry?.styling?.federation?.assets?.shared?.some((asset) =>
      asset.endsWith('/shared-design-tokens/tokens.css'),
    ),
    `${vertical.id} must import shared design token CSS`,
  );
  assert(
    contractEntry?.styling?.federation?.dedupe?.runtimeLoad === 'once-per-content-hash',
    `${vertical.id} CSS dedupe strategy is incorrect`,
  );
  assert(
    contractEntry?.styling?.federation?.ssr?.verticalCss === 'federated-manifest-owned-css',
    `${vertical.id} SSR CSS loading contract is incorrect`,
  );

  const topologyEntry = topology.verticals?.find(
    (verticalEntry) => verticalEntry.id === vertical.id,
  );
  assert(topologyEntry?.kind === 'vertical', `${vertical.id} topology kind is incorrect`);
  assert(
    topologyEntry?.package === vertical.packageName,
    `${vertical.id} topology package is incorrect`,
  );
  assert(
    topologyEntry?.cloudflare?.workerName === expectedWorkerName(vertical.id),
    `${vertical.id} topology Cloudflare workerName is incorrect`,
  );
  assert(
    topologyEntry?.cloudflare?.compatibilityDate === expectedCloudflareCompatibilityDate,
    `${vertical.id} topology Cloudflare compatibilityDate is incorrect`,
  );
  assert(
    stableJson(topologyEntry?.cloudflare?.compatibilityFlags) ===
      stableJson(expectedCloudflareCompatibilityFlags),
    `${vertical.id} topology Cloudflare compatibility flags are incorrect`,
  );
  assert(
    topologyEntry?.moduleFederation?.name === vertical.mfName,
    `${vertical.id} topology MF name is incorrect`,
  );
  assert(
    JSON.stringify(topologyEntry?.moduleFederation?.exposes) === JSON.stringify(vertical.exposes),
    `${vertical.id} topology exposes are incorrect`,
  );
  assert(
    JSON.stringify(topologyEntry?.moduleFederation?.verticalRefs ?? []) ===
      JSON.stringify(vertical.verticalRefs),
    `${vertical.id} topology verticalRefs are incorrect`,
  );
  assert(
    topologyEntry?.api?.effect?.bff?.prefix === vertical.apiPrefix,
    `${vertical.id} topology API prefix is incorrect`,
  );
  assert(
    topologyEntry?.api?.effect?.serverEntry === `${vertical.path}/api/effect/index.ts`,
    `${vertical.id} topology server entry is incorrect`,
  );
  assert(
    topologyEntry?.api?.effect?.readiness?.endpoint === `/effect/${vertical.stem}/readiness`,
    `${vertical.id} topology readiness endpoint is incorrect`,
  );
  assert(
    Object.keys(topologyEntry?.api?.effect?.domainOperations ?? {}).length >= 3,
    `${vertical.id} topology domain operations are missing`,
  );

  assert(
    ownership.owners?.some((owner) => owner.id === vertical.id && owner.path === vertical.path),
    `${vertical.id} ownership entry is missing`,
  );
  assert(overlay.ports?.[vertical.id], `${vertical.id} development port is missing`);
  assert(
    overlay.manifests?.[vertical.id]?.includes('/mf-manifest.json'),
    `${vertical.id} development manifest is missing`,
  );
  assert(
    overlay.apis?.[vertical.id]?.endsWith(vertical.apiPrefix),
    `${vertical.id} development API URL is missing`,
  );
}

console.log('UltraModern workspace scaffold validated');
