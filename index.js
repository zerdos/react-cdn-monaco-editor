const getEdit = (await (await fetch("https://unpkg.com/react-cdn-monaco-editor/editor.js")).text()).replace("export function", "function");
export const MonacoEditor = new Function("  return getEditor;" + getEdit)()();
export const getEditor = () => MonacoEditor;
//# sourceMappingURL=index.js.map