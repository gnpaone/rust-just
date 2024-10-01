import { defineConfig, type Options } from "tsup";
import { dependencies } from "./package.json";

const baseOptions: Options = {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  minify: false,
  external: Object.keys(dependencies),
  sourcemap: true,
  target: "es2020",
  tsconfig: "tsconfig.json",
  keepNames: true,
  treeshake: true,
};

export default [
  defineConfig({
    ...baseOptions,
    outDir: "lib",
    entry: ["src/index.ts"],
    dts: false,
    sourcemap: false,
    format: "esm",
  }),
];
