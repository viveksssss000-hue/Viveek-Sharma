import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The CMS editor bundle is vendored, not authored here - see README,
    // "Updating the editor". Linting minified third-party code produces
    // thousands of warnings about code nobody is going to change.
    "public/admin/sveltia-cms.js",
  ]),
]);

export default eslintConfig;
