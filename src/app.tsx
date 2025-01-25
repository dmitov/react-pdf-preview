import { PDFViewer } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import loadable from "@loadable/component";
import useLocalStorageState from "use-local-storage-state";
import logo from "./logo.png";

import { TreeView } from "./components/tree-view";

type Template = {
  path: string;
  name: string;
  modifiedTime: Date;
};
type TemplatesData = Record<string, Template[]>;

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [Component, setComponent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorageState(
    "selectedTemplate",
    {
      defaultValue: null,
    }
  );

  useEffect(() => {
    if (selectedTemplate) {
      const Component = loadable(() => import(`@/${selectedTemplate}`));
      setComponent(Component);
    }
  }, [selectedTemplate]);

  const handleSelectTemplate = async (file: string) => {
    setSelectedTemplate(file);
  };

  import.meta.hot.on("pdf-preview:files", async (data: TemplatesData) => {
    setTemplates(data.msg);
  });

  import.meta.hot?.on("vite:afterUpdate", () => {
    window.location.reload();
  });

  const treeView = Object.entries(templates).reduce((acc, [dirPath, files]) => {
    if (dirPath === "_root") {
      return acc.concat(
        files.map(({ file, fileName, modifiedTime }) => ({
          id: file,
          name: fileName,
          modifiedTime,
          onClick: () => handleSelectTemplate(file),
        }))
      );
    }
    return acc.concat([
      {
        id: dirPath,
        name: dirPath,
        children: files.map(({ file, fileName, modifiedTime }) => ({
          id: file,
          name: fileName,
          onClick: () => handleSelectTemplate(file),
          modifiedTime,
        })),
      },
    ]);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 dark:bg-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 p-4 gap-6 flex flex-col">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            setSelectedTemplate(null);
            setComponent(null);
          }}
        >
          <img src={logo} alt="logo" className="w-10" />
          <h2 className="text-lg font-semibold">React-PDF</h2>
        </div>
        <div className="space-y-2">
          <TreeView
            data={treeView}
            initialSelectedItemId={selectedTemplate as string}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 dark:bg-gray-900 dark:text-white">
        {Component ? (
          <PDFViewer className="w-full h-full">
            <Component />
          </PDFViewer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-4 items-center">
              <img src={logo} alt="logo" className="w-20" />
              <h1 className="text-2xl font-bold">Welcome to React-PDF</h1>
              <p className="text-sm text-gray-500 max-w-sm text-center">
                To start developing your pdfs, you can create a .jsx or .tsx
                file under your templates folder.
              </p>
              <a
                href="https://react-pdf.org"
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Check the docs
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
