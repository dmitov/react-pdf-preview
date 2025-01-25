import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dynamicImport from "vite-plugin-dynamic-import";

import folderWatcherPlugin from "./plugins/folder-watcher";

export default defineConfig({
  root: "./src",
  resolve: {
    alias: { "@": process.cwd() },
  },
  plugins: [
    react(),
    tailwindcss(),
    folderWatcherPlugin("./templates"),
    dynamicImport({
      filter(id) {
        if (id.includes("node_modules")) {
          return false;
        }
      },
    }),
  ],
});
