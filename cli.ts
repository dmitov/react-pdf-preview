import { Command } from "commander";
import { createServer, } from "vite";
import folderWatcherPlugin from "./plugins/folder-watcher";
import dynamicImport from "vite-plugin-dynamic-import";
import react from "@vitejs/plugin-react";

const program = new Command();

program
  .name("react-pdf-preview")
  .description("CLI to run React PDF Preview")
  .version("1.0.0")
  .option("-p, --port <number>", "port to run the server on", "3000")
  .option(
    "-t, --templates <path>",
    "path to component templates",
    "./templates"
  )
  .action(async (options) => {
    process.env.PORT = options.port;
    process.env.TEMPLATES_PATH = options.templates;

    console.log(process.cwd() + options.templates );
    try {
      const app = await createServer({
        // configFile: "./vite.config.ts",
        root: "./src",
        server: {
          port: options.port,
        },
        resolve: {
          alias: { "@": options.templates },
        },
        plugins: [
          react(),
          folderWatcherPlugin(options.templates),
          dynamicImport({
            filter(id) {
              if (id.includes("node_modules")) {
                return false;
              }
            },
          }),
        ],
      });

      await app.listen();

      console.log(app.config);

      app.printUrls();
      app.bindCLIShortcuts({ print: true });

      console.log(`Server running on port ${options.port}`);
      console.log(`Using templates from: ${options.templates}`);
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  });

program.parse();
