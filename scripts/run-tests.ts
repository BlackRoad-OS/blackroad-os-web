import { spawnSync } from 'node:child_process';

function stripUnsupportedPlaywrightArgs(args: string[]): string[] {
  const filtered: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--filter' || arg === '-f') {
      index += 1;
      continue;
    }

    if (arg.startsWith('--filter=') || arg.startsWith('-f=')) {
      continue;
    }

    filtered.push(arg);
  }

  return filtered;
}

function run(command: string, args: string[]) {
  const result = spawnSync(command, args, { stdio: 'inherit' });

  if (result.error) {
    throw result.error;
  }

  return result.status ?? 1;
}

const cliArgs = process.argv.slice(2);
const playwrightArgs = stripUnsupportedPlaywrightArgs(cliArgs);

const vitestStatus = run('pnpm', ['vitest', 'run', '--passWithNoTests', ...cliArgs]);

if (vitestStatus !== 0) {
  process.exit(vitestStatus);
}

const playwrightStatus = run('pnpm', ['playwright', 'test', ...playwrightArgs]);
process.exit(playwrightStatus);
