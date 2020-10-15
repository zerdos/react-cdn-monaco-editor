let cacheM = null

export const startMonaco = async (code: string, onChange: (code: string)=>void) => {
  cacheM = cacheM || await new Function(
    "  return startMonaco;" +
      (await (await fetch(
        "https://unpkg.com/react-cdn-monaco-editor/editor.js",
      )).text()).replace("export ", ""),
  )();

return ( await cacheM)({ value: code, onChange });
};