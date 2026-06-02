#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const sourceRoots = ['apps', 'verticals'];
const languageConditionalPattern =
  /\b(language|locale|lng|currentLanguage)\s*={0,2}={1,2}\s*['"][a-z-]+['"]\s*\?\s*([^:;\n]+)\s*:\s*([^;\n})]+)/gu;
const allowedLanguageConditionalBranches = new Set([
  "'page'",
  '"page"',
  'undefined',
  'null',
  'true',
  'false',
]);
const visibleCopyAttributes = new Set(['alt', 'aria-label', 'label', 'placeholder', 'title']);

const fail = (message) => {
  throw new Error(message);
};

const walk = (directory, files = []) => {
  if (!fs.existsSync(directory)) {
    return files;
  }
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.output') {
      continue;
    }
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(entryPath, files);
    } else {
      files.push(entryPath);
    }
  }
  return files;
};

const relative = (filePath) => path.relative(root, filePath).replaceAll('\\', '/');

const isSourceFile = (filePath) => /\.(?:ts|tsx|js|jsx)$/u.test(filePath);

const isLocaleJson = (filePath) => {
  const normalized = relative(filePath);
  return /\/locales\/(en|cs)\/[^/]+\.json$/u.test(normalized);
};

const readText = (filePath) => fs.readFileSync(filePath, 'utf-8');

const branchIsUserCopy = (branch) => {
  const value = branch.trim().replace(/,$/u, '');
  if (allowedLanguageConditionalBranches.has(value)) {
    return false;
  }
  return /^['"][^'"]{2,}['"]$/u.test(value);
};

const checkRuntimeResources = (filePath, text) => {
  if (!relative(filePath).endsWith('/src/modern.runtime.ts')) {
    return;
  }
  if (/initOptions\s*:\s*\{[\s\S]*?\bresources\s*:/u.test(text)) {
    fail(
      `${relative(filePath)} must not inline i18n resources in modern.runtime.ts; use locale JSON files.`,
    );
  }
};

const checkLanguageConditionals = (filePath, text) => {
  for (const match of text.matchAll(languageConditionalPattern)) {
    const [, name, whenTrue = '', whenFalse = ''] = match;
    if (branchIsUserCopy(whenTrue) || branchIsUserCopy(whenFalse)) {
      fail(
        `${relative(filePath)} contains manual ${name} copy branching. Put user-facing copy in i18n JSON resources.`,
      );
    }
  }
};

const checkLiteralVisibleAttributes = (filePath, text) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) {
    return;
  }
  for (const attribute of visibleCopyAttributes) {
    const pattern = new RegExp(`\\b${attribute}=["'][^"'{}]*[A-Za-z][^"'{}]*["']`, 'u');
    if (pattern.test(text)) {
      fail(
        `${relative(filePath)} contains literal ${attribute} copy. Use t(...) or route metadata for visible text.`,
      );
    }
  }
};

const checkSplitPhraseKeys = (filePath, text) => {
  if (/t\(\s*['"][^'"]+\.(?:prefix|suffix|before|after)['"]\s*\)/u.test(text)) {
    fail(
      `${relative(filePath)} uses split phrase translation keys. Keep translator-owned phrases whole.`,
    );
  }
};

const checkBoundaryAttributes = (filePath, text) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) {
    return;
  }
  if (/\bdata-mf-(?:remote|expose)=/u.test(text)) {
    fail(
      `${relative(filePath)} uses legacy data-mf-* boundary attributes. Use data-modern-boundary-id and data-modern-mf-expose.`,
    );
  }
};

const visitLocaleKeys = (value, visitor, pathParts = []) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    const nextPath = [...pathParts, key];
    visitor(key, child, nextPath);
    visitLocaleKeys(child, visitor, nextPath);
  }
};

const checkPluralResources = (filePath, json) => {
  const language = relative(filePath).split('/locales/')[1]?.split('/')[0];
  const requiredSuffixes = language === 'cs' ? ['one', 'few', 'many', 'other'] : ['one', 'other'];
  const groups = new Map();

  visitLocaleKeys(json, (key, value, pathParts) => {
    if (typeof value === 'string' && value.includes('{{count}}')) {
      const suffixMatch = key.match(/^(.*)_(one|few|many|other)$/u);
      if (!suffixMatch) {
        fail(
          `${relative(filePath)} key ${pathParts.join('.')} contains {{count}} but is not plural-suffixed.`,
        );
      }
      const [, base = '', suffix = ''] = suffixMatch;
      const parentPath = pathParts.slice(0, -1).join('.');
      const groupKey = `${parentPath}.${base}`;
      const existing = groups.get(groupKey) ?? new Set();
      existing.add(suffix);
      groups.set(groupKey, existing);
    }
  });

  for (const [group, suffixes] of groups) {
    for (const suffix of requiredSuffixes) {
      if (!suffixes.has(suffix)) {
        fail(`${relative(filePath)} plural group ${group} is missing _${suffix}.`);
      }
    }
  }
};

const sourceFiles = sourceRoots.flatMap((sourceRoot) =>
  walk(path.join(root, sourceRoot)).filter((filePath) => isSourceFile(filePath)),
);
for (const filePath of sourceFiles) {
  const text = readText(filePath);
  checkRuntimeResources(filePath, text);
  checkLanguageConditionals(filePath, text);
  checkLiteralVisibleAttributes(filePath, text);
  checkSplitPhraseKeys(filePath, text);
  checkBoundaryAttributes(filePath, text);
}

const localeFiles = sourceRoots.flatMap((sourceRoot) =>
  walk(path.join(root, sourceRoot)).filter((filePath) => isLocaleJson(filePath)),
);
for (const filePath of localeFiles) {
  checkPluralResources(filePath, JSON.parse(readText(filePath)));
}

console.log('UltraModern i18n and boundary guardrails validated');
