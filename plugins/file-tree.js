import fs from "fs";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";

/**
 * @typedef {Object} TreeDataItem
 * @property {string} id
 * @property {string} name
 * @property {string} [modifiedTime]
 * @property {TreeDataItem[]} [children]
 */

const ALLOWED_EXTENSIONS = new Set([".tsx", ".jsx"]);

/**
 * @param {string} dir
 * @returns {import("vite").Plugin}
 */
export default function fileTreePlugin(dir) {
  const projectRoot = process.cwd();

  /**
   * @param {string} basePath
   * @param {string} dirPath
   * @returns {TreeDataItem[]}
   */
  const getFileTree = (basePath, dirPath) => {
    try {
      return fs
        .readdirSync(dirPath)
        .map((fileName) => {
          const filePath = path.join(dirPath, fileName);
          const stats = fs.statSync(filePath);
          const isDirectory = stats.isDirectory();

          // Generate ID relative to the requested base path
          const relativePath = path.relative(basePath, filePath);

          const item = {
            id: relativePath.split(path.sep).join("/"),
            name: fileName,
            modifiedTime: stats.mtime.toISOString(),
          };

          if (isDirectory) {
            const children = getFileTree(basePath, filePath);
            if (children.length > 0) {
              item.children = children.sort((a, b) => {
                // Directories first, then alphabetical
                const aIsDir = !!a.children;
                const bIsDir = !!b.children;
                if (aIsDir === bIsDir) return a.name.localeCompare(b.name);
                return aIsDir ? -1 : 1;
              });
            } else {
              return null;
            }
          } else {
            const ext = path.extname(fileName);
            if (!ALLOWED_EXTENSIONS.has(ext)) return null;
          }

          return item;
        })
        .filter((item) => item !== null)
        .sort((a, b) => {
          const aIsDir = !!a.children;
          const bIsDir = !!b.children;
          if (aIsDir && !bIsDir) return -1;
          if (!aIsDir && bIsDir) return 1;
          return a.name.localeCompare(b.name);
        });
    } catch (error) {
      console.error("Error reading directory:", error);
      return [];
    }
  };

  return {
    name: "vite-plugin-file-tree",
    configureServer(server) {
      server.middlewares.use("/api/file-tree", (req, res) => {
        const basePath = path.resolve(dir);

        try {
          const treeData = getFileTree(basePath, basePath);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(treeData));
        } catch (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Unable to generate file tree" }));
        }
      });
    },
  };
}


