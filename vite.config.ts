import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  esbuild: {
    jsxImportSource: "jsx-dom",
    jsx: "automatic",
  },
});
