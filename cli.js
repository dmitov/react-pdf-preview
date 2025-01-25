#!/usr/bin/env node

import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import dynamicImport from 'vite-plugin-dynamic-import';
import folderWatcherPlugin from './plugins/folder-watcher.js';
import tailwindcss from '@tailwindcss/vite'
import { Command } from 'commander';

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .name('my-vite-cli')
  .description('CLI for Vite with template watching')
  .option('--dir <path>', 'path to templates directory', 'src/templates')
  .option('--port <port>', 'port to run on', '3000')
  .parse();

const options = program.opts();

async function startServer() {
  try {
    const server = await createServer({
      root: path.join(__dirname, 'src'),
      server: {
        port: options.port,
      },
      resolve: {
        alias: { "@": process.cwd() },
      },
      plugins: [
        react(),
        tailwindcss(),
        folderWatcherPlugin(options.dir),
        dynamicImport({
          filter(id) {
            if (id.includes("node_modules")) {
              return false;
            }
          },
        }),
      ],
    });

    await server.listen();
    server.printUrls();
  } catch (error) {
    console.error("Error starting Vite server:", error);
    process.exit(1);
  }
}

startServer();
