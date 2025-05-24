import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vitest from "@vitest/eslint-plugin";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: "./tsconfig.json" }
    },
    plugins: { "@typescript-eslint": tsPlugin, vitest },
    env: { node: true, "vitest/globals": true },
    rules: { "@typescript-eslint/no-floating-promises": "error" }
  }
];
