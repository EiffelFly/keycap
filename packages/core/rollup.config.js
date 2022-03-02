import packageJson from "./package.json";
import {
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  babel,
  typescript,
  resolve,
  dts
} from "../../rollup.config";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        strict: true,
        sourcemap: true,
        exports: "auto",
      },
      {
        file: packageJson.module,
        format: "esm",
        strict: true,
        sourcemap: true,
      },
    ],
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
