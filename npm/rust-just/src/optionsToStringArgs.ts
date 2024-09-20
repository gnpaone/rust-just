import type { Options } from "./options.js";

/**
 * Transforms a JavaScript object of options into an array
 * of strings that can be passed to {@link execa} for calling `just`
 *
 * @param options The options to transform
 * @returns The options as an array of strings
 */
export function optionsToStringArgs(options: Options): string[] {
  const args: string[] = [];

  for (const [key, value] of Object.entries(options)) {
    const hyphenCaseKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();

    if (
      (key === 'list' || key === 'shellCommand' || key === 'command') &&
      typeof value === 'string' &&
      value.trim().length > 0
    ) {
      const values = value.match(/'([^']+)'/g)?.map(v => v.replace(/'/g, '')) || [];
      if (values.length > 0) {
        args.push(`--${hyphenCaseKey}`, ...values);
      }
    } else if (key === 'set' && typeof value === 'string') {
      const values = value.match(/'([^']+)'/g)?.map(v => v.replace(/'/g, '')) || [];
      if (values.length === 2) {
        args.push(`--${hyphenCaseKey}`, values[0], values[1]);
      }
    } else if (key === 'verbose' && typeof value === 'number') {
      for (let i = 0; i < value; i++) {
        args.push(`--${hyphenCaseKey}`);
      }
    } else if (value === true) {
      args.push(`--${hyphenCaseKey}`);
    } else if (value === false || value === null) {
      continue;
    } else {
      args.push(`--${hyphenCaseKey}`, String(value));
    }
  }

  return args;
}
