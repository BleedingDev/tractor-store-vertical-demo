import { defineConfig } from 'oxlint';
import core from 'ultracite/oxlint/core';
import react from 'ultracite/oxlint/react';

export default defineConfig({
  env: {
    browser: true,
    node: true,
  },
  extends: [core, react],
  rules: {
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
      },
    ],
  },
  ignorePatterns: [
    '.agents',
    'dist',
    'node_modules',
    '.modern',
    '.modernjs',
    '**/routeTree.gen.ts',
  ],
});
