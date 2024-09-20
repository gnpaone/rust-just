import { execa, type Options as ExecaOptions, type ExecaReturnValue, } from "execa";
import { fileURLToPath } from "node:url";
import { getExePath } from "./getExePath.js";
import type { Options } from "./options.js";
import { optionsToStringArgs } from "./optionsToStringArgs.js";

export type { Options } from "./options.js";

/**
 * Utility function to check if an argument exists in the predefined Options.
 * @param arg - The argument to check
 * @param optionsKeys - The list of keys from the Options type
 * @returns True if the argument exists in Options, false otherwise
 */
function isOptionKey(arg: string, optionsKeys: string[]): boolean {
  return optionsKeys.includes(arg);
}
/**
 * Runs `just` with the provided options as a JavaScript object.
 *
 * @param options - The options to pass to `just`.
 * These get transformed into an array strings.
 * - Values that are `true` will be passed as flags (`--flag`).
 * - Values that are `false` or `null` will be ignored.
 * - All other values will be passed as options (`--option value`).
 *
 * @param execaOptions - Options to pass to {@link execa}.
 */
export async function runJust(options: Options, execaOptions?: ExecaOptions): Promise<ExecaReturnValue<string>>;
/**
 * Runs the `just` with the provided arguments.
 *
 * @param args - The arguments to pass to `just`.
 * These should be in an array of string format.
 * Every option and their value should be its own entry in the array.
 *
 * @param execaOptions - Options to pass to {@link execa}.
 *
 * @returns A promise that resolves when the `just` has finished running.
 *
 * @example
 * Options with values
 * ```typescript
 * await runJust(["--evaluate", "foo"]);
 * ```
 * 
 * @example
 * Options with array type values
 * ```typescript
 * await runJust(["--set", "'<VARIABLE>' '<VALUE>'"]);
 * ```
 *
 * @example
 * Boolean flags
 * ```typescript
 * await runJust(["--version"]);
 * ```
 * 
 * @example
 * Justfile functions
 * ```typescript
 * await runJust(["foo"]);
 * ```
 */
export async function runJust(args: string[], execaOptions?: ExecaOptions): Promise<ExecaReturnValue<string>>;
export async function runJust(argsOrOptions: Options | string[], execaOptions?: ExecaOptions): Promise<ExecaReturnValue<string>> {
  const exePath = await getExePath();
  let args: string[] = [];

  const optionsKeys = Object.keys({ ...new (class implements Options {}) });

  if (Array.isArray(argsOrOptions)) {
    args = argsOrOptions;
  } else {
    const knownArgs = optionsToStringArgs(argsOrOptions);

    for (const [key, value] of Object.entries(argsOrOptions)) {
      const hyphenCaseKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();

      if (!isOptionKey(hyphenCaseKey, optionsKeys)) {
        if (value === true) {
          args.push(key);
        } else if (value !== false && value !== null) {
          args.push(key, String(value));
        }
      }
    }

    args = [...knownArgs, ...args];
  }

  return execa(fileURLToPath(exePath), args, {
    stdio: "inherit",
    ...execaOptions,
  });
}
