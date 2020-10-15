let cacheM;

export const startMonaco = async (code: string, onChange: (code: string)=>void) => {
  cacheM = cacheM ||   "  return startMonaco;" +
  (await (await fetch(
    "https://unpkg.com/react-cdn-monaco-editor/editor.js",
  )).text()).replace("export ", "")
  
  
  const stM =  Function(cacheM)({ code, onChange });

return  stM({ code, onChange });
};