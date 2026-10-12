import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test, { after } from 'node:test';

const tempRoot = mkdtempSync(
  path.join(process.env.OWNED_TEMP_DIR ?? tmpdir(), 'tractor-repo-hygiene-')
);
const cleanup = () => rmSync(tempRoot, { force: true, recursive: true });
after(cleanup);
process.once('exit', cleanup);
process.once('SIGINT', () => process.exit(130));
process.once('SIGTERM', () => process.exit(143));
let fixtureId = 0;
function check(
  configured,
  { referenced = false, orphan = false, ignored = false } = {}
) {
  const root = path.join(tempRoot, String(fixtureId));
  fixtureId += 1;
  mkdirSync(path.join(root, 'scripts'), { recursive: true });
  mkdirSync(path.join(root, 'bin'));
  copyFileSync(
    path.join(import.meta.dirname, 'check-repo-hygiene.mts'),
    path.join(root, 'scripts/check-repo-hygiene.mts')
  );
  writeFileSync(
    path.join(root, 'bin/pnpm'),
    `#!${process.execPath}
process.stdout.write(process.env.PATCH_CONFIG_STDOUT);
`,
    { mode: 0o755 }
  );
  execFileSync('git', ['init', '--quiet'], { cwd: root });
  if (referenced || orphan) {
    mkdirSync(path.join(root, 'patches'));
    writeFileSync(
      path.join(root, 'patches/example.patch'),
      'existing patch bytes'
    );
    execFileSync('git', ['add', 'patches/example.patch'], { cwd: root });
  }
  if (ignored) {
    writeFileSync(path.join(root, '.gitignore'), 'ignored.txt\n');
    writeFileSync(path.join(root, 'ignored.txt'), 'tracked ignored file');
    execFileSync('git', ['add', '--force', 'ignored.txt'], { cwd: root });
  }
  return spawnSync(process.execPath, ['scripts/check-repo-hygiene.mts'], {
    cwd: root,
    encoding: 'utf-8',
    env: {
      ...process.env,
      PATCH_CONFIG_STDOUT: configured,
      PATH: `${path.join(root, 'bin')}${path.delimiter}${process.env.PATH}`,
    },
  });
}

for (const absent of ['', 'undefined', 'null', '{}']) {
  test(`accepts absent or empty patch configuration ${JSON.stringify(absent)}`, () => {
    const result = check(absent);
    assert.equal(result.status, 0, result.stderr);
  });
}
test('accepts an existing referenced patch map', () => {
  const result = check('{"example@1.0.0":"patches/example.patch"}', {
    referenced: true,
  });
  assert.equal(result.status, 0, result.stderr);
});
for (const invalid of [
  '[]',
  'false',
  '42',
  '"patches/example.patch"',
  '{"example@1.0.0":42}',
]) {
  test(`rejects malformed patch configuration ${invalid}`, () => {
    const result = check(invalid);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /patchedDependencies must be a map/u);
  });
}
test('still rejects a missing referenced patch', () => {
  const result = check('{"example@1.0.0":"patches/missing.patch"}');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /points to missing patches\/missing.patch/u);
});
test('still rejects an unreferenced tracked patch when the map is absent', () => {
  const result = check('null', { orphan: true });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /is not referenced by patchedDependencies/u);
});
test('still rejects tracked ignored files', () => {
  const result = check('null', { ignored: true });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /tracked file\(s\) match .gitignore/u);
});
