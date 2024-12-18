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
      "@typescript-eslint/no-magic-numbers": "off",
      "n/no-missing-import": [
        "error",
        {
          tryExtensions: [".ts", ".js", ".json"],
          ignoreTypeImport: true,
        },
      ],
    },
  }
)
