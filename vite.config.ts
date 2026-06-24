import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
    }),
    cssInjectedByJs({
      jsAssetsFilterFunction: (output) =>
        output.type === "chunk" &&
        (output.fileName === "vue.js" || output.fileName === "vue.cjs"),
    }),
  ],

  build: {
    sourcemap: true,

    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        vue: resolve(__dirname, "src/vue/index.ts"),
      },
      formats: ["es", "cjs"],

      fileName: (format, name) =>
        `${name}.${format === "es" ? "js" : "cjs"}`,
    },

    rollupOptions: {
      external: ["vue"],
    },

    emptyOutDir: true,
  },
});