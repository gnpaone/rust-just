#!/usr/bin/env node

import { runJust } from "./index.js";

async function run() {
  const args = process.argv.slice(2);
  const processResult = await runJust(args);

  process.exit(processResult.exitCode ?? 0);
}

void run();
