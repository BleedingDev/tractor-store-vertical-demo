#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(import.meta.dirname, '..');
const contractPath = path.join(workspaceRoot, '.modernjs/ultramodern-generated-contract.json');
const defaultOut = path.join(
  workspaceRoot,
  '.codex/reports/cloudflare-version-proof/public-url-proof.json',
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function parseArgs(argv) {
  const parsed = {
    appId: undefined,
    out: defaultOut,
    requirePublicUrls: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--app') {
      parsed.appId = argv[index + 1];
      index += 1;
    } else if (arg === '--out') {
      parsed.out = argv[index + 1];
      index += 1;
    } else if (arg === '--require-public-urls') {
      parsed.requirePublicUrls = true;
    } else if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printHelp() {
  process.stdout.write(`Usage:
  node scripts/proof-cloudflare-version.mjs [--app explore] [--out evidence.json] [--require-public-urls]

Set each app's public URL using the contract env key, for example:
  ULTRAMODERN_PUBLIC_URL_EXPLORE=https://explore.example.workers.dev
`);
}

function joinUrl(baseUrl, routePath) {
  return new URL(routePath, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
}

function normalizeUrlWithTrailingSlash(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

async function fetchText(url) {
  const response = await fetch(url);
  return {
    accessControlAllowOrigin: response.headers.get('access-control-allow-origin'),
    body: await response.text(),
    contentType: response.headers.get('content-type'),
    ok: response.ok,
    status: response.status,
  };
}

function parseMaybeJson(body) {
  try {
    return JSON.parse(body);
  } catch {
    return;
  }
}

function markerFromJson(value) {
  if (!value || typeof value !== 'object') {
    return;
  }
  if (value.marker && typeof value.marker.build === 'string') {
    return value.marker.build;
  }
  if (typeof value.build === 'string') {
    return value.build;
  }
  for (const nested of Object.values(value)) {
    if (Array.isArray(nested)) {
      for (const item of nested) {
        const marker = markerFromJson(item);
        if (marker) {
          return marker;
        }
      }
    } else {
      const marker = markerFromJson(nested);
      if (marker) {
        return marker;
      }
    }
  }
  return;
}

function extractUiMarker(html) {
  return html.match(/data-build-marker=["']([^"']+)["']/u)?.[1];
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function validateApp(app, publicUrl) {
  const cloudflare = app.deploy?.cloudflare;
  const routes = cloudflare?.routes ?? {};
  const evidence = {
    appId: app.id,
    assertions: [],
    publicUrl,
    publicUrlEnv: cloudflare?.publicUrlEnv,
    workerName: cloudflare?.workerName,
  };

  const ssrRoute = routes.ssr ?? '/en';
  const ssr = await fetchText(joinUrl(publicUrl, ssrRoute));
  evidence.assertions.push({
    route: ssrRoute,
    status: ssr.ok ? 'pass' : 'fail',
    statusCode: ssr.status,
    type: 'ssr',
  });
  assert(ssr.ok, `${app.id} SSR route returned HTTP ${ssr.status}`);

  const uiMarker = extractUiMarker(ssr.body);
  evidence.assertions.push({
    actual: uiMarker,
    expected: app.marker?.build,
    status: uiMarker === app.marker?.build ? 'pass' : 'fail',
    type: 'ui-marker',
  });
  assert(uiMarker === app.marker?.build, `${app.id} UI marker mismatch`);

  const cssRootSelector = app.styling?.federation?.rootSelector;
  const expectedAppId = cssRootSelector?.match(/data-app-id="([^"]+)"/u)?.[1];
  evidence.assertions.push({
    expected: cssRootSelector,
    status: expectedAppId && ssr.body.includes(`data-app-id="${expectedAppId}"`) ? 'pass' : 'fail',
    type: 'css-root-marker',
  });
  assert(
    expectedAppId && ssr.body.includes(`data-app-id="${expectedAppId}"`),
    `${app.id} SSR response is missing CSS root marker ${cssRootSelector}`,
  );

  const manifestRoute = routes.mfManifest ?? '/mf-manifest.json';
  const manifest = await fetchText(joinUrl(publicUrl, manifestRoute));
  const manifestJson = parseMaybeJson(manifest.body);
  evidence.assertions.push({
    route: manifestRoute,
    status: manifest.ok ? 'pass' : 'fail',
    statusCode: manifest.status,
    type: 'mf-manifest',
  });
  assert(manifest.ok, `${app.id} MF manifest returned HTTP ${manifest.status}`);
  evidence.assertions.push({
    actual: manifest.accessControlAllowOrigin,
    route: manifestRoute,
    status: manifest.accessControlAllowOrigin === '*' ? 'pass' : 'fail',
    type: 'mf-manifest-cors',
  });
  assert(
    manifest.accessControlAllowOrigin === '*',
    `${app.id} MF manifest is missing Cloudflare CORS headers`,
  );
  const expectedPublicPath = normalizeUrlWithTrailingSlash(publicUrl);
  const manifestPublicPath = manifestJson?.metaData?.publicPath;
  evidence.assertions.push({
    actual: manifestPublicPath,
    expected: expectedPublicPath,
    status: manifestPublicPath === expectedPublicPath ? 'pass' : 'fail',
    type: 'mf-manifest-public-path',
  });
  assert(
    manifestPublicPath === expectedPublicPath,
    `${app.id} MF manifest publicPath must resolve remote assets from ${expectedPublicPath}`,
  );

  const localeRoute = routes.locale ?? `/locales/en/${app.i18n?.namespace}.json`;
  const locale = await fetchText(joinUrl(publicUrl, localeRoute));
  const localeJson = parseMaybeJson(locale.body);
  evidence.assertions.push({
    namespace: app.i18n?.namespace,
    route: localeRoute,
    status:
      locale.ok && localeJson && Object.hasOwn(localeJson, app.i18n?.namespace) ? 'pass' : 'fail',
    statusCode: locale.status,
    type: 'i18n-marker',
  });
  assert(locale.ok, `${app.id} locale JSON returned HTTP ${locale.status}`);
  evidence.assertions.push({
    actual: locale.accessControlAllowOrigin,
    route: localeRoute,
    status: locale.accessControlAllowOrigin === '*' ? 'pass' : 'fail',
    type: 'i18n-cors',
  });
  assert(
    locale.accessControlAllowOrigin === '*',
    `${app.id} locale JSON is missing Cloudflare CORS headers`,
  );
  assert(
    localeJson && Object.hasOwn(localeJson, app.i18n?.namespace),
    `${app.id} locale JSON is missing namespace ${app.i18n?.namespace}`,
  );

  if (routes.effectReadiness) {
    const readiness = await fetchText(joinUrl(publicUrl, routes.effectReadiness));
    const readinessJson = parseMaybeJson(readiness.body);
    const apiMarker = markerFromJson(readinessJson);
    evidence.assertions.push({
      actual: apiMarker,
      expected: app.marker?.build,
      route: routes.effectReadiness,
      status: readiness.ok && apiMarker === app.marker?.build ? 'pass' : 'fail',
      statusCode: readiness.status,
      type: 'api-marker',
    });
    assert(readiness.ok, `${app.id} Effect readiness returned HTTP ${readiness.status}`);
    assert(apiMarker === app.marker?.build, `${app.id} API marker mismatch`);
  }

  return evidence;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    printHelp();
    return 0;
  }

  const contract = readJson(contractPath);
  const apps = args.appId ? contract.apps.filter((app) => app.id === args.appId) : contract.apps;
  assert(apps.length > 0, `No generated app matched ${args.appId}`);

  const results = [];
  const skipped = [];
  for (const app of apps) {
    const publicUrlEnv = app.deploy?.cloudflare?.publicUrlEnv;
    const publicUrl = publicUrlEnv && process.env[publicUrlEnv];
    if (!publicUrl) {
      const skippedEntry = {
        appId: app.id,
        publicUrlEnv,
        reason: 'public URL environment variable is not set',
        status: args.requirePublicUrls ? 'fail' : 'skipped',
      };
      skipped.push(skippedEntry);
      if (args.requirePublicUrls) {
        throw new Error(`${app.id} requires ${publicUrlEnv}`);
      }
      continue;
    }
    results.push(await validateApp(app, publicUrl));
  }

  const report = {
    contractPath,
    generatedAt: new Date().toISOString(),
    results,
    schemaVersion: 1,
    skipped,
    status: results.length > 0 ? 'pass' : 'skipped',
  };

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`[cloudflare-version-proof] ${report.status}: ${args.out}\n`);
  return 0;
}

main().then(
  (exitCode) => {
    process.exitCode = exitCode;
  },
  (error) => {
    process.stderr.write(`[cloudflare-version-proof] ${error.message}\n`);
    process.exitCode = 1;
  },
);
