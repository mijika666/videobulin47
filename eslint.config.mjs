// Next.js 16 起 eslint-config-next 直接导出 flat config，不再需要 FlatCompat。
// 参考 node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // eslint-config-next 的默认忽略项
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 本仓库的本地构建与调试产物
    ".next-home/**",
    ".dev-home/**",
    ".build-home/**",
    ".vercel-home/**",
    ".edge-*/**",
    "dev-server*.log",
    "home-*.png",
    "pricing-*.png",
    "shot.png",
    "screenshot.png",
  ]),
]);

export default eslintConfig;
