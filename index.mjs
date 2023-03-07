#!/usr/bin/env node
import { spawn } from 'child_process';
import { dirname } from 'path';
import { setTimeout } from 'timers/promises';
import kill from 'tree-kill';

const [executablePath, timeLimitInSeconds] = process.argv.slice(2);
const executableArguments = process.argv.slice(4);

const { log } = console;

if (!executablePath || !timeLimitInSeconds || isNaN(timeLimitInSeconds)) {
  log(`
    Usage: npx start-process-then-kill-it <path-to-executable> <time-limit-in-seconds> [<executable-arguments-1> <executable-arguments-2> <executable-arguments-n>]

  `);
  process.exit(1);
}

log(`Starting the process and killing it after ${timeLimitInSeconds} seconds.`)

const executableFolderPath = dirname(executablePath);
const executableProcess = spawn(`${executablePath} ${executableArguments.join(' ')}`, { cwd: executableFolderPath, shell: true }, log);
await setTimeout(timeLimitInSeconds * 1_000);
kill(executableProcess.pid);
log(`Done`);
