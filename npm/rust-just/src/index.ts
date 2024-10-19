#!/usr/bin/env node

import { execa } from "execa";
import { fileURLToPath } from "node:url";
import { getExePath } from "./getExePath.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Invalid JSON format in --options");
    process.exit(1);
  }
}

async function run() {
  const exePath = await getExePath();

  const argv = yargs(hideBin(process.argv))
    .option('execaoptions', {
      type: 'string',
      description: 'Execa options in JSON format',
    })
    .parserConfiguration({
      'unknown-options-as-args': true,
    })
    .help(false)
    .version(false)
    .parse();

  const args = argv._;

  let execaOptions = {
    stdio: "inherit",
    reject: false,
  };

  if (argv.execaoptions) {
    const userOptions = safeParse(argv.execaoptions);
    execaOptions = { ...execaOptions, ...userOptions };
  }
  
  const processResult = await execa(fileURLToPath(exePath), args, execaOptions);

  process.exit(processResult.exitCode ?? 0);
}

void run();
