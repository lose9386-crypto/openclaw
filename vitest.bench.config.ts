import codspeedPlugin from "@codspeed/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [codspeedPlugin()],
  resolve: {
    alias: {
      "openclaw/plugin-sdk": path.join(repoRoot, "src", "plugin-sdk", "index.ts"),
    },
  },
  test: {
    benchmark: {
      include: ["src/**/*.bench.ts"],
    },
  },
});
