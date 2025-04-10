import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import tsLint from "typescript-eslint";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import prettierConfig from "eslint-plugin-prettier/recommended";
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next", "next/core-web-vitals"),
  ...compat.plugins("react-refresh", "simple-import-sort", "tailwindcss"),
  ...tsLint.configs.recommended,
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "react/no-unescaped-entities": 0,
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  prettierConfig,
];
