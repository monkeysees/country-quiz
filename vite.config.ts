import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

process.env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV || "development", process.cwd(), ""),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: "url",
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                removeTitle: false,
                cleanupIDs: false,
                removeUnknownsAndDefaults: {
                  keepAriaAttrs: true,
                  keepRoleAttr: true,
                },
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  publicDir: "static",
  base: "./"
});
