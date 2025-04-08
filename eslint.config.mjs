import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import prettierConfig from "eslint-plugin-prettier/recommended";
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.config({
    extends: ["next"],
    rules: {
      "import/no-default-export": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "react/prop-types": 0,
      "no-unused-vars": 0,
      "react/no-unescaped-entities": 0,
      "no-useless-escape": "off",
      "no-redeclare": "off",
      "eslint-comments/require-description": "off",
      "no-nested-ternary": "off",
      "react/button-has-type": "off",
      "prefer-named-capture-group": "off",
      "no-await-in-loop": "off",
      "jsx-a11y/no-autofocus": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    plugins: ["react-refresh", "simple-import-sort", "tailwindcss"],
  }),
  prettierConfig,
];
