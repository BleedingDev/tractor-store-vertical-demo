// Materializes read-only agent reference repositories as shallow clones under
// the gitignored repos/ directory. They are local state and never enter the
// workspace index (scripts/check-repo-hygiene.mts enforces that).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

type ReferenceRepo = {
  id: string;
  name: string;
  url: string;
  ref: string;
  path: string;
};

const root = path.resolve(import.meta.dirname, '..');
const checkOnly = process.argv.includes('--check');
const configPath = path.join(root, '.agents', 'agent-reference-repos.json');

const truthy = (value: string | undefined) =>
  /^(1|true|yes|on)$/i.test(value ?? '');
const falsy = (value: string | undefined) =>
  /^(0|false|no|off)$/i.test(value ?? '');

function git(args: string[], cwd = root) {
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'utf-8',
    timeout: 600000,
  });
  if (result.error) {
    throw result.error;
  }
  return {
    ok: result.status === 0,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

function assertIgnoredRepoPath(repo: ReferenceRepo) {
  if (
    path.isAbsolute(repo.path) ||
    repo.path.split(/[\\/]+/).includes('..') ||
    !repo.path.startsWith('repos/')
  ) {
    throw new Error(`Unsafe reference repository path: ${repo.path}`);
  }
  if (!git(['check-ignore', '-q', repo.path]).ok) {
    throw new Error(
      `${repo.path} is not gitignored; add repos/ to .gitignore so reference clones stay out of the index.`
    );
  }
}

function verifyClone(repo: ReferenceRepo, target: string) {
  const origin = git(['remote', 'get-url', 'origin'], target);
  const toplevel = git(['rev-parse', '--show-toplevel'], target);
  if (
    !origin.ok ||
    !toplevel.ok ||
    fs.realpathSync(toplevel.stdout) !== fs.realpathSync(target)
  ) {
    throw new Error(
      `${repo.path} exists but is not a clone of ${repo.url}; delete it and run pnpm agents:refs:install.`
    );
  }
  if (origin.stdout !== repo.url) {
    throw new Error(
      `${repo.path} clones ${origin.stdout}, expected ${repo.url}; delete it and run pnpm agents:refs:install.`
    );
  }
  const branch = git(['symbolic-ref', '--short', 'HEAD'], target);
  if (branch.stdout !== repo.ref) {
    throw new Error(
      `${repo.path} is on ${branch.stdout || 'a detached HEAD'}, expected ${repo.ref}; run git -C ${repo.path} switch ${repo.ref} or delete it and run pnpm agents:refs:install.`
    );
  }
}

function main() {
  if (
    truthy(process.env.ULTRAMODERN_SKIP_AGENT_REPOS) ||
    falsy(process.env.ULTRAMODERN_AGENT_REPOS)
  ) {
    console.log(
      '[agent-reference-repos] skipped by ULTRAMODERN_SKIP_AGENT_REPOS'
    );
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  for (const repo of config.repositories as ReferenceRepo[]) {
    assertIgnoredRepoPath(repo);
    const target = path.join(root, repo.path);
    if (fs.existsSync(target)) {
      verifyClone(repo, target);
      continue;
    }
    if (checkOnly) {
      throw new Error(`${repo.path} is missing; run pnpm agents:refs:install.`);
    }
    console.log(
      `[agent-reference-repos] cloning ${repo.url}#${repo.ref} into ${repo.path}`
    );
    const clone = git([
      'clone',
      '--depth',
      '1',
      '--branch',
      repo.ref,
      repo.url,
      target,
    ]);
    if (!clone.ok) {
      throw new Error(
        `git clone ${repo.url}#${repo.ref} failed: ${clone.stderr}`
      );
    }
  }
}

try {
  main();
} catch (error) {
  console.error(`[agent-reference-repos] ${(error as Error).message}`);
  process.exitCode = 1;
}
