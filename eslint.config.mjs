import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
   {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",     // ❌ allow unused variables
      "@typescript-eslint/no-explicit-any": "off",    // ❌ allow use of `any`
      "prefer-const": "off",                           // ❌ allow `let` even if unused
      "@next/next/no-html-link-for-pages": "off",     // ❌ allow <a> tags for routing
    },
  },
];

export default eslintConfig;
