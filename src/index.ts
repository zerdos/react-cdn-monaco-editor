export const getEditor = async (React) => {
  const getEdit =
    (await (await fetch("https://unpkg.com/react-cdn-monaco-editor/editor.js"))
      .text()).replace("export function", "function");
  return new Function("  return getEditor;" + getEdit)()(React);
};
