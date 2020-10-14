import type monaco from "monaco-editor";
import type React from "react";
type monacoType = typeof monaco;

type MonacoEditorProps = {
  width?: string;
  height?: string;
  value?: string;
  language?: "typescript" | "javascript";
  onChange: (code: string) => void;
};

async function startMonaco(
  { onChange, value, language },
) {
  const version = "0.21.2";

  // await loadScript(
  //   "https://unpkg.com/react-cdn-monaco-editor@1.1.1/dts-gen.bundle.js",
  // );
  await loadScript(
    `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js`,
  );

  const vsPath =
    `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs`;

  await loadScript(
    `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js`,
  );

  // @ts-ignore
  require.config({ paths: { "vs": vsPath } });

  return new Promise(function (resolve, reject) {
    // @ts-ignore
    const document = window.document;
    // @ts-ignore
    require(["vs/editor/editor.main"], async function () {
      const monaco = (window as unknown as { monaco: monacoType }).monaco;

      try {
        console.log(":)");
      } catch (e) {
        reject(e);
      }

      const editor = monaco.editor.create(
        document.getElementById("container"),
        {
          model: monaco.editor.createModel(
            value,
            "typescript",
            monaco.Uri.parse("file:///main.tsx"),
          ),
          value: value,
          language: language,
          theme: "vs-dark",
        },
      );

      (async () => {
        const reactDts = await fetch(
          "https://unpkg.com/@types/react@16.9.52/index.d.ts",
        );
        const reactGlobalDts = await fetch(
          "https://unpkg.com/@types/react@16.9.52/global.d.ts",
        );
        const propTypesDTS = await fetch(
          "https://unpkg.com/@types/prop-types@15.7.3/index.d.ts",
        );
        const cssTypeDts = await fetch(
          "https://unpkg.com/csstype@3.0.3/index.d.ts",
        );

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await cssTypeDts.text(),
          "file:///node_modules/@types/csstype/index.d.ts",
        );

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await reactGlobalDts.text(),
          "file:///node_modules/@types/react/global.d.ts",
        );

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await propTypesDTS.text(),
          "file:///node_modules/@types/prop-type/index.d.ts",
        );

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          await reactDts.text(),
          "file:///node_modules/@types/react/index.d.ts",
        );
      })();

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2016,
        allowNonTsExtensions: true,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        typeRoots: ["node_modules/@types"],
        jsx: monaco.languages.typescript.JsxEmit.React,
        jsxFactory: "React.createElement",

        esModuleInterop: true,
      });

      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });

      editor.onDidChangeModelContent((_event) => onChange(editor.getValue()));
      resolve(editor);
    });
  });
}

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function getEditor(
  { createElement, useState, useEffect }: typeof React,
) {
  // const ReactTypeJs = DTSGen.generateIdentifierDeclarationFile("React", React);
  // const dts = generateModuleDeclarationFile(React, "react");
  // console.log(ReactTypeJs);

  // const react = window.React as {
  //   useState: <T>(state: T) => [T, (state: T) => void];
  //   createElement: (el: string, props: unknown, children?: unknown) => unknown;
  //   useEffect: (fn: () => unknown, debts: unknown[]) => unknown;
  // };

  const MonacoEditor: React.FC<MonacoEditorProps> = ({
    width = "600px",
    height = "400px",
    value = "",
    language = "typescript",
    onChange,
  }) => {
    const [editor, setEditor] = useState(null);
    const [editorValue, setEditorValue] = useState(value);

    useEffect(() => {
      if (typeof window === "undefined") return;

      if (!editor) {
        (async () => {
          try {
            const editor = await startMonaco({
              value,
              language,
              onChange: (code) => {
                setEditorValue(code);
                onChange(code);
              },
            });
            setEditor(editor);
          } catch (e) {
            console.log("Error attaching the editor", e);
          }
        })();
        return;
      }

      if (editorValue !== value) {
        editor?.setValue(value);
      }
    }, [value, language]);

    return createElement(
      "div",
      { id: "container", style: { width, height } },
    ) as React.ReactElement;
  };

  return MonacoEditor;
}
