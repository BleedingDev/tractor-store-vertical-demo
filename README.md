# Tractor Store UltraModern Demo

Standalone Tractor Store demo built on UltraModern.js, Modern.js SSR, Module Federation, Tailwind CSS 4, localized routes, and strict Effect HttpApi BFF surfaces inside each Micro Vertical.

## Workspace

- `apps/shell-super-app` owns route assembly, shared shell chrome, localized URLs, Cloudflare SSR wiring, and federated manifest wiring.
- `verticals/explore` owns the storefront category, listing, recommendations, store picker UI, and Explore Effect API.
- `verticals/decide` owns product detail and decision UI plus Decide Effect API.
- `verticals/checkout` owns cart interactions, basket UI, and Checkout Effect API.
- `packages/shared-*` contain shared contracts and design tokens.

The demo is intentionally close to the original Tractor Store v2 visual design, but it is structured as a full-stack Micro Vertical workspace with SSR and Cloudflare-ready deployment.

## UltraModern Version

The `ultramodern` catalog in `pnpm-workspace.yaml` pins the published BleedingDev framework cohort. App and vertical manifests use `catalog:ultramodern` to share those exact versions.

Each app selects `renderer: 'react'` through `defineConfig` and `presetUltramodernWorkspace` from `@modern-js/ultramodern-app-tools`. The workspace preset reads topology and the development overlay for deployment, service bindings, CORS, build identity, and Zephyr policy. App configs keep their BFF, i18n, Tailwind, and Rsdoctor settings.

Zephyr deployments require both `ZE_CI_TOKEN` and `ZE_FAIL_BUILD=true`. Ordinary builds need no Zephyr credentials.

## Commands

```bash
pnpm install
pnpm check # every gate CI runs; also the pre-push hook
pnpm build
```

Codex skill bodies are installed into `.codex/skills` by default. To skip that agent setup during install:

```bash
ULTRAMODERN_SKIP_CODEX_SKILLS=1 pnpm install
```

Read-only reference repositories are explicit. Run `pnpm agents:refs:install` when local source references are useful.

Run locally:

```bash
pnpm dev
```

Build/deploy Cloudflare workers:

```bash
pnpm cloudflare:build
pnpm cloudflare:deploy
```

## Notes

The app supports English and Czech localized routes. The team boundary overlay is a debug feature and persists locally. Build output, generated Module Federation types, `.codex` evidence, and agent reference repos are intentionally ignored by git.
