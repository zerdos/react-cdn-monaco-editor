let cacheM = null;
export const startMonaco = async (code, onChange) => {
    cacheM = cacheM || new Function("  return startMonaco;" +
        (await (await fetch("https://unpkg.com/react-cdn-monaco-editor/editor.js")).text()).replace("export ", ""))();
    await cacheM({ value: code, onChange });
};
//# sourceMappingURL=index.js.map