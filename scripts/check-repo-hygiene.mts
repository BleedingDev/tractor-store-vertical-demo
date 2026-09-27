#!/usr/bin/env node
// Fails when the index tracks ignored files, when a patches/* file is not
// referenced by pnpm patchedDependencies, or when patchedDependencies points
// at a missing file.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const run = (command: string, args: string[]) =>
  execFileSync(command, args, { cwd: root, encoding: 'utf8' });
const lines = (output: string) => output.split('\n').filter(Boolean);

const errors: string[] = [];

const trackedIgnored = lines(
  run('git', ['ls-files', '-ci', '--exclude-standard'])
);
if (trackedIgnored.length > 0) {
  const roots = [
    ...new Set(
      trackedIgnored.map((file) => file.split('/').slice(0, 2).join('/'))
    ),
  ];
  errors.push(
    `${trackedIgnored.length} tracked file(s) match .gitignore (under ${roots.join(', ')}). ` +
      'Untrack them with `git rm -r --cached <path>` or stop ignoring them.'
  );
}

const configured = run('pnpm', [
  'config',
  'get',
  'patchedDependencies',
  '--json',
]).trim();
const patchedDependencies: Record<string, string> =
  configured === '' || configured === 'undefined' ? {} : JSON.parse(configured);
const referenced = new Set<string>();
for (const [dependency, patchPath] of Object.entries(patchedDependencies)) {
  const absolute = path.resolve(root, patchPath);
  referenced.add(absolute);
  if (!existsSync(absolute)) {
    errors.push(
      `patchedDependencies["${dependency}"] points to missing ${path.relative(root, absolute)}. ` +
        'Restore the patch file or remove the entry.'
    );
  }
}

for (const patchFile of lines(run('git', ['ls-files', 'patches']))) {
  if (!referenced.has(path.resolve(root, patchFile))) {
    errors.push(
      `${patchFile} is not referenced by patchedDependencies, so pnpm never applies it. ` +
        'Delete it or register it under patchedDependencies in pnpm-workspace.yaml.'
    );
  }
}

for (const error of errors) {
  console.error(`repo-hygiene: ${error}`);
}
process.exitCode = errors.length > 0 ? 1 : 0;
