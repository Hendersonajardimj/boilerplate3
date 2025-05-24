/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  // Let ESLint parse TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },

  // Environments (globals)
  env: {
    node: true,
    'vitest/globals': true        // makes `expect`, `describe`, etc. legal
  },

  // Plug-ins
  plugins: [
    '@typescript-eslint',
    'vitest'
  ],

  // Base rule-sets
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vitest/recommended',
    'prettier'                    // turns off rules that clash with Prettier
  ],

  // Local tweaks
  rules: {
    '@typescript-eslint/no-floating-promises': 'error'
  }
};
