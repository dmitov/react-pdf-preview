import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import folderWatcherPlugin from "./plugins/folder-watcher";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig({
  root: "./src",
  resolve: {
    alias: { "@": process.cwd() },
  },
  plugins: [
    react(),
    folderWatcherPlugin("../templates"),
    dynamicImport({
      filter(id) {
        if (id.includes("node_modules")) {
          return false;
        }
      },
    }),
  ],
});
