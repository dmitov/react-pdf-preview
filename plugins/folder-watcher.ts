import path from "path";
import fs from "fs";
import chokidar from "chokidar";

interface FileInfo {
  file: string;
  fileName: string;
  modifiedTime: Date;
}

function getAllFiles(dir: string): Record<string, FileInfo[]> {
  const result: Record<string, FileInfo[]> = {};

  function processDirectory(currentDir: string, relativePath: string = "") {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    const files = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))
      )
      .map((entry) => ({
        file: path.join(currentDir, entry.name).replace("../templates/", ""),
        fileName: entry.name,
        modifiedTime: fs.statSync(path.join(currentDir, entry.name)).mtime,
      }))
      .sort((a, b) => b.modifiedTime.getTime() - a.modifiedTime.getTime());

    if (files.length > 0) {
      result[relativePath || "_root"] = files;
    }

    entries
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        const nextDir = path.join(currentDir, entry.name);
        const nextRelativePath = relativePath
          ? path.join(relativePath, entry.name)
          : entry.name;
        processDirectory(nextDir, nextRelativePath);
      });
  }

  processDirectory(dir);
  return Object.keys(result)
    .sort((a, b) => (b === "_root" ? 0 : b.localeCompare(a)))
    .reverse()
    .reduce((Obj, key) => {
      //@ts-ignore
      Obj[key] = result[key];
      return Obj;
    }, {});
}

const folderWatcher = (templateFolder: string) => ({
  name: "configure-server",
  //@ts-ignore
  handleHotUpdate({ server, modules }) {
    const files = getAllFiles(templateFolder);
    server.ws.send("pdf-preview:files", { msg: files });

    return modules;
  },
  //@ts-ignore
  configureServer(server) {
    return () => {
      server.ws.on("connection", () => {
        const templatesDir = path.resolve(templateFolder);

        const refreshFiles = () => {
          const files = getAllFiles(templateFolder);
          server.ws.send("pdf-preview:files", { msg: files });
        };

        const watcher = chokidar.watch(`${templatesDir}`, {
          persistent: true,
        });

        watcher.on("add", refreshFiles);
        watcher.on("change", refreshFiles);
        watcher.on("unlink", refreshFiles);
        watcher.on("unlinkDir", refreshFiles);

        setTimeout(() => {
          refreshFiles();
        }, 1000);
        server.httpServer?.on("close", () => watcher.close());
      });
    };
  },
});

export default folderWatcher;
