// @ts-check

import globals from "globals"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import love from "eslint-config-love"

import nodePlugin from "eslint-plugin-n"
import pluginPromise from "eslint-plugin-promise"
import pluginSecurity from "eslint-plugin-security"

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },

      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { ...love, files: ["**/*.js", "**/*.ts"] },

  nodePlugin.configs["flat/recommended-script"],
  pluginPromise.configs["flat/recommended"],
  pluginSecurity.configs.recommended,

  eslintPluginPrettierRecommended,

  {
    rules: {
      "eslint-comments/require-description": "off",
      "eslint-comments/no-unused-disable": "off",
      "@eslint-community/eslint-comments/require-description": "off",
      "@eslint-community/eslint-comments/no-unused-disable": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      strict: "off",
      "no-implicit-globals": "off",
      "no-console": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "n/no-unsupported-features/node-builtins": "off",
      "n/no-unpublished-import": "off",
      "n/no-missing-import": "off",
      eqeqeq: "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-useless-assignment": "off",
      radix: "off",
    },
  }
)
