import React from "react";

type MonacoEditorProps = {
  width?: string;
  height?: string;
  value?: string;
  language?: "typescript" | "javascript";
  onChange: (code: string) => void;
};
type ReactType = typeof React;

const getMonacoEditor = (React: ReactType) => {
  const MonacoEditor: React.FC<MonacoEditorProps> = ({
    width = "600px",
    height = "400px",
    value = "",
    language = "typescript",
    onChange = (_code) => {},
  }) => {
    const [editor, setEditor] = React.useState<{
      setValue: (code: string) => void;
    } | null>(null);
    const [editorValue, setEditorValue] = React.useState(value);

    React.useEffect(() => {
      if (typeof window === "undefined") return;

      if (!editor) {
        (async () => {
          try {
            const editor = await startMonaco({
              element: "container",
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

    return <div id="container" style={{ width, height }} />;
  };

  return MonacoEditor;
};

export const getEditor = getMonacoEditor;

const startMonaco = ({
  version = "0.21.2",
  element = "container",
  value = "",
  language = "typescript",
  onChange = (_code: string) => {},
}) =>
  new Function(
    "version",
    "element",
    "value",
    "language",
    "onChange",
    `
const startMonaco = async ({version, element, value, language}) => {
  const vsPath = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs';
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js');

  require.config({ paths: { 'vs': vsPath } });

  return new Promise(function(resolve, reject){
  
    require(["vs/editor/editor.main"], function () {
      const editor = monaco.editor.create(document.getElementById("container"), {
        value: \`${value}\`,
        language: \`${language}\`,
        theme: 'vs-dark'
      });

        console.log(monaco.languages.typescript)
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    jsx: monaco.languages.typescript.React,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
   });

   monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

   monaco.languages.typescript.typescriptDefaults.addExtraLib(\`declare module "react"\`)
  
      editor.onDidChangeModelContent((event)=>onChange(editor.getValue()))
      resolve(editor);
    
    });

  }  )

}

return startMonaco({version, element, value, language})
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
`
  )(version, element, value, language, onChange);
