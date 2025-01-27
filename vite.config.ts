import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dynamicImport from "vite-plugin-dynamic-import";

import fileTreePlugin from "./plugins/file-tree";

export default defineConfig({
  root: "./src",
  resolve: {
    alias: { "@": process.cwd() + "/templates" },
  },
  plugins: [
    react(),
    tailwindcss(),
    fileTreePlugin("./templates"),
    dynamicImport({
      filter(id) {
        if (id.includes("node_modules")) {
          return false;
        }
      },
    }),
  ],
});
