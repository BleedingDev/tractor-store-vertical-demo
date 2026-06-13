#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, expect } from '@playwright/test';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultShellUrl = 'https://tractor-store-vertical-demo-shell-super-app.edution.workers.dev';
const defaultOut = path.join(
  workspaceRoot,
  '.codex/reports/workflow-proof/public-shell-workflow-proof.json',
);
const cartStorageKey = 'ultramodern-tractor-cart';
const orderStorageKey = 'ultramodern-tractor-last-order';
const product = {
  detailName: 'Sapphire Sunworker 460R',
  gridName: 'Sapphire Sunworker 460R',
  image: 'https://blueprint.the-tractor.store/cdn/img/product/200/AU-04-RD.webp',
  price: 8500,
  sku: 'AU-04-RD',
  slug: 'sapphire-sunworker-460r',
  variant: 'Sapphire Sunworker 460R',
};

function parseArgs(argv) {
  const parsed = {
    headed: false,
    out: defaultOut,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--headed') {
      parsed.headed = true;
    } else if (arg === '--out') {
      parsed.out = argv[index + 1];
      index += 1;
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
  pnpm proof:workflow [--out evidence.json] [--headed]

Environment:
  ULTRAMODERN_PUBLIC_URL_SHELL_SUPER_APP  Shell URL to test.
                                             Defaults to ${defaultShellUrl}
`);
}

function joinUrl(baseUrl, routePath) {
  return new URL(routePath, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString();
}

async function writeEvidence(out, evidence) {
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, `${JSON.stringify(evidence, null, 2)}\n`);
}

async function findSystemChrome() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const shellUrl = process.env.ULTRAMODERN_PUBLIC_URL_SHELL_SUPER_APP ?? defaultShellUrl;
  const evidence = {
    assertions: [],
    product,
    shellUrl,
    startedAt: new Date().toISOString(),
  };

  const browser = await chromium.launch({
    executablePath: await findSystemChrome(),
    headless: !args.headed,
  });
  const context = await browser.newContext({ viewport: { height: 900, width: 1280 } });
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);

  try {
    await page.goto(joinUrl(shellUrl, '/en/tractors'), { waitUntil: 'domcontentloaded' });
    await page.evaluate(
      ([cartKey, orderKey]) => {
        window.localStorage.removeItem(cartKey);
        window.localStorage.removeItem(orderKey);
      },
      [cartStorageKey, orderStorageKey],
    );

    const productGrid = page.locator(
      '[data-modern-boundary-id="explore"][data-modern-mf-expose="./ProductGrid"]',
    );
    await expect(productGrid).toBeVisible();
    await expect(page.getByRole('heading', { name: 'All Machines' })).toBeVisible();
    await expect(page.getByText('23 products')).toBeVisible();
    await expect(page.locator('[data-modern-mf-expose="./CheckoutPage"]')).toHaveCount(0);
    await expect(page.getByText('Checkout Vertical CheckoutPage')).toHaveCount(0);
    evidence.assertions.push({
      route: '/en/tractors',
      status: 'pass',
      type: 'product-grid-not-checkout',
    });

    await page.getByRole('link', { name: new RegExp(product.gridName, 'u') }).click();
    await expect(page).toHaveURL(
      new RegExp(`/en/tractors/${product.slug}\\?sku=${product.sku}$`, 'u'),
    );
    await expect(
      page.locator('[data-modern-boundary-id="decide"][data-modern-mf-expose="./ProductPage"]'),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: product.gridName })).toBeVisible();
    await expect(page.getByRole('link', { exact: true, name: product.variant })).toBeVisible();
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => undefined);
    evidence.assertions.push({
      route: `/en/tractors/${product.slug}?sku=${product.sku}`,
      status: 'pass',
      type: 'product-detail',
    });

    await page.getByRole('link', { name: 'Add to basket' }).click();
    await expect(page).toHaveURL(new RegExp(`/en/cart\\?sku=${product.sku}$`, 'u'));
    const cartPage = page.locator(
      '[data-modern-boundary-id="checkout"][data-modern-mf-expose="./CartPage"]',
    );
    await expect(cartPage).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Basket' })).toBeVisible();
    await expect(cartPage.getByText(product.detailName)).toBeVisible();
    await expect(cartPage.getByText(product.sku)).toBeVisible();

    const cartLines = await page.evaluate((key) => {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    }, cartStorageKey);
    const cartLine = cartLines.find((line) => line.id === product.sku);
    if (cartLine === undefined) {
      throw new Error(
        `Cart storage is missing ${product.sku}; expected ${cartStorageKey} to contain ${product.detailName}`,
      );
    }
    expect(cartLine).toMatchObject({
      id: product.sku,
      image: product.image,
      name: product.detailName,
      price: product.price,
      quantity: expect.any(Number),
      slug: product.slug,
    });
    expect(cartLine.quantity).toBeGreaterThanOrEqual(1);
    evidence.assertions.push({
      cartLine,
      route: `/en/cart?sku=${product.sku}`,
      status: 'pass',
      type: 'cart-product-match',
    });

    await page.getByRole('link', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(new RegExp('/en/checkout$', 'u'));
    const checkoutPage = page.locator(
      '[data-modern-boundary-id="checkout"][data-modern-mf-expose="./CheckoutPage"]',
    );
    await expect(checkoutPage).toBeVisible();
    const checkoutForm = page.getByRole('button', { name: 'Place order' });
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Delivery address')).toBeVisible();
    await expect(checkoutPage.getByText(product.detailName)).toBeVisible();
    await expect(checkoutPage.getByText(product.sku)).toBeVisible();
    await expect(checkoutForm).toBeVisible();
    evidence.assertions.push({
      route: '/en/checkout',
      status: 'pass',
      type: 'checkout-page',
    });

    await page.getByLabel('Name').fill('Workflow Proof');
    await page.getByLabel('Email').fill('workflow-proof@example.com');
    await page.getByLabel('Delivery address').fill('100 Tractor Test Lane');
    await checkoutForm.click();
    await expect(page).toHaveURL(new RegExp('/en/checkout/thank-you/tractor-[a-z0-9]+$', 'u'));
    const thanksPage = page.locator(
      '[data-modern-boundary-id="checkout"][data-modern-mf-expose="./ThanksPage"]',
    );
    await expect(thanksPage).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thank you for your order' })).toBeVisible();
    await expect(thanksPage.getByText(product.detailName)).toBeVisible();
    await expect(thanksPage.getByText(new RegExp(`${product.sku} × \\d+`, 'u'))).toBeVisible();
    await expect(page.getByLabel('Basket (0)')).toBeVisible();

    const lastOrder = await page.evaluate((key) => {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    }, orderStorageKey);
    expect(lastOrder).toMatchObject({
      lines: [
        {
          id: product.sku,
          name: product.detailName,
        },
      ],
    });
    evidence.assertions.push({
      order: lastOrder,
      route: '/en/checkout/thank-you',
      status: 'pass',
      type: 'thank-you-page',
    });

    evidence.finishedAt = new Date().toISOString();
    evidence.status = 'pass';
    await writeEvidence(args.out, evidence);
    process.stdout.write(`Workflow proof passed: ${args.out}\n`);
  } catch (error) {
    const screenshot = args.out.replace(/\.json$/u, '.failure.png');
    await page.screenshot({ fullPage: true, path: screenshot }).catch(() => undefined);
    evidence.error = error instanceof Error ? error.message : String(error);
    evidence.finishedAt = new Date().toISOString();
    evidence.screenshot = screenshot;
    evidence.status = 'fail';
    await writeEvidence(args.out, evidence);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});
