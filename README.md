# Tractor Store UltraModern Demo

Standalone Tractor Store demo built on UltraModern.js, Modern.js SSR, Module
Federation, Tailwind CSS 4, localized routes, and Effect BFF handlers inside
each Micro Vertical.

## Workspace

- `apps/shell-super-app` owns route assembly, shared shell chrome, localized
  URLs, Cloudflare SSR wiring, and federated manifest wiring.
- `verticals/explore` owns the storefront category, listing, recommendations,
  store picker UI, and Explore Effect API.
- `verticals/decide` owns product detail and decision UI plus Decide Effect API.
- `verticals/checkout` owns cart interactions, basket UI, and Checkout Effect
  API.
- `packages/shared-*` contain shared contracts, design tokens, and Effect API
  helpers.

The demo is intentionally close to the original Tractor Store v2 visual design,
but it is structured as a full-stack Micro Vertical workspace with SSR and
Cloudflare-ready deployment.

## Website

Stable demo URL:

```text
https://tractor-store-vertical-demo-shell-super-app.edution.workers.dev
```

The Cloudflare worker names are fixed in `topology/reference-topology.json`, so
the public website URL stays stable across redeploys.

## UltraModern Version

This repository is pinned to BleedingDev UltraModern packages:

```text
3.2.0-ultramodern.61
```

Generated apps and verticals use `npm:@bleedingdev/...@3.2.0-ultramodern.61`
aliases for the Modern.js packages that are part of the UltraModern canary
line.

## Commands

```bash
pnpm install
pnpm ultramodern:check
pnpm typecheck
pnpm build
```

For a lighter install without local reference repositories:

```bash
ULTRAMODERN_SKIP_AGENT_REPOS=1 pnpm install
```

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

The app supports English and Czech localized routes. The team boundary overlay
is a debug feature and persists locally. Build output, generated Module
Federation types, `.codex` evidence, and agent reference repos are intentionally
ignored by git.
