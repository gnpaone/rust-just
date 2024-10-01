#!/usr/bin/env node

import { execa } from "execa";
import { fileURLToPath } from "node:url";
import { getExePath } from "./getExePath.js";

async function run() {
  const exePath = await getExePath();
  
  const args = process.argv.slice(2);
  const processResult = await execa(fileURLToPath(exePath), args, {
    stdio: "inherit"
  });

  process.exit(processResult.exitCode ?? 0);
}

void run();
