import React from "react";
type MonacoEditorProps = {
  width?: string;
  height?: string;
  value?: string;
  language?: "typescript" | "javascript";
  onChange: (code: string) => void;
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  width = "600px",
  height = "400px",
  value = "",
  language = "typescript",
  onChange = (_code) => {},
}) => {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      const monaco = await startMonaco({
        element: "container",
        value,
        language,
        onChange,
      });
      console.log(monaco);
    };
    init();
  });

  return <div id="container" style={{ width, height }} />;
};

const startMonaco = ({
  version = "0.21.2",
  element = "container",
  value = "",
  language = "typescript",
  onChange = (_code) => {},
}) =>
  new Function(
    "version",
    "element",
    "value",
    "language",
    "onChange",
    `
const startMonaco = async ({version, element, value, language, onChange}) => {
  const vsPath = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs';
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js');

  require.config({ paths: { 'vs': vsPath } });
  
  require(["vs/editor/editor.main"], function () {
    const editor = monaco.editor.create(document.getElementById("container"), {
      value: \`${value}\`,
      language: \`${language}\`,
      theme: 'vs-dark'
    });

    editor.onDidChangeModelContent((event)=>(${onChange})(editor.getValue()))
  });
}

return startMonaco({version, element, value, language, onChange})
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
  )({ version, element, value, language, onChange });
