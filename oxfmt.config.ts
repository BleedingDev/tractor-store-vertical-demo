import { defineConfig } from 'oxfmt';
import ultracite from 'ultracite/oxfmt';

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    '.agents',
    '**/*.json',
    'dist',
    'node_modules',
    '.modern',
    '.modernjs',
    '**/routeTree.gen.ts',
    '.output',
    '**/modern-tanstack/**',
    '**/routeTree.gen.*',
    'repos/**',
  ],
  singleQuote: true,
});
