import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import process from "node:process";

export default defineConfig(({ mode }) => ({
  test: {
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
