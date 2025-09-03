import { useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { type DocumentProps, PDFViewer } from "@react-pdf/renderer";
import loadable from "@loadable/component";

import { TreeView } from "./components/tree-view";

import logo from "./logo.png";

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [Component, setComponent] = useState(null);
  const [props, setProps] = useState(null);

  const [selectedTemplate, setSelectedTemplate] = useLocalStorageState<
    string | null
  >("selectedTemplate", {
    defaultValue: null,
  });

  useEffect(() => {
    if (selectedTemplate) {
      setIsLoading(true);

      const load = async () => {
        const Component = loadable<React.ComponentType<DocumentProps>>(
          () => import(`@/${selectedTemplate}`)
        );

        const props = await import(`@/${selectedTemplate}`).then(
          (module) => module.PreviewProps ?? {}
        );

        await Component.load();
        setComponent(Component);
        setProps({
          ...props,
          onRender: () => {
            setIsLoading(false);
          },
        });
      };

      load();
    }
  }, [selectedTemplate]);

  const handleSelectTemplate = useCallback(
    async (file: string) => {
      setSelectedTemplate(file);
    },
    [setSelectedTemplate]
  );

  const fetchTreeData = useCallback(async () => {
    try {
      const response = await fetch("/api/file-tree");
      const data = await response.json();

      setTemplates(data);
    } catch (error) {
      console.error("Error fetching file tree:", error);
    }
  }, []);

  useEffect(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  import.meta.hot?.on("vite:afterUpdate", () => {
    window.location.reload();
  });

  const treeView = useMemo(
    () =>
      templates.map((item) => ({
        ...item,
        ...(!item.children
          ? {
              onClick: () => {
                handleSelectTemplate(item.id);
              },
            }
          : {
              children: item.children.map((child) => ({
                ...child,
                onClick: () => {
                  handleSelectTemplate(child.id);
                },
              })),
            }),
      })),
    [templates, handleSelectTemplate]
  );

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 dark:bg-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
        <button
          type="button"
          className="flex gap-2 items-center cursor-pointer p-4"
          onClick={() => {
            setSelectedTemplate(null);
            setComponent(null);
          }}
        >
          <img src={logo} alt="logo" className="w-10" />
          <h2 className="text-lg font-semibold">React-PDF Preview</h2>
        </button>
        <div className=" h-full flex-1 min-h-0 overflow-y-auto px-4 pt-4">
          <TreeView
            data={treeView}
            initialSelectedItemId={selectedTemplate as string}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 dark:bg-gray-900 dark:text-white">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-4 items-center">
              <img src={logo} alt="logo" className="w-20 animate-spin" />
              <h1 className="">Loading...</h1>
            </div>
          </div>
        )}
        {Component ? (
          <PDFViewer className="w-full h-full">
            <Component {...props} />
          </PDFViewer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-4 items-center">
              <img src={logo} alt="logo" className="w-20" />
              <h1 className="text-2xl font-bold">Welcome to React-PDF</h1>
              <p className="text-sm text-gray-500 max-w-sm text-center">
                To start developing your PDFs, you can create a .jsx or .tsx
                file under your templates folder.
              </p>
              <a
                href="https://react-pdf.org"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
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
