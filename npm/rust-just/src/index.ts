#!/usr/bin/env node

import { execa } from "execa";
import type { Options as ExecaOptions } from "execa";
import { fileURLToPath } from "node:url";
import { getExePath } from "./getExePath.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

async function run() {
  const exePath = await getExePath();

  const argv = yargs(hideBin(process.argv))
    .option('execaoptions', {
      type: 'string',
      description: 'Execa options in JSON format',
    })
    .coerce('execaoptions', (arg: string) => {
      try {
        return JSON.parse(arg) as ExecaOptions;
      } catch (e) {
        throw new Error("Invalid JSON format in --execaoptions");
      }
    })
    .parserConfiguration({
      'unknown-options-as-args': true,
    })
    .help(false)
    .version(false)
    .parseSync() as {
      _: (string | number)[];
      execaoptions?: string;
    };

  const args = argv._;

  const execaOptions: ExecaOptions = {
    stdio: "inherit",
    reject: false,
    ...(argv.execaoptions || {}),
  };
  
  const processResult = await execa(fileURLToPath(exePath), args, execaOptions);

  process.exit(processResult.exitCode ?? 0);
}

void run();
