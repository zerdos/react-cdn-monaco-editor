let cacheM;
export const startMonaco = async (code, onChange) => {
    cacheM = cacheM || "  return startMonaco;" +
        (await (await fetch("https://unpkg.com/react-cdn-monaco-editor/editor.js")).text()).replace("export ", "");
    const stM = Function(cacheM)({ code, onChange });
    return stM({ code, onChange });
};
//# sourceMappingURL=index.js.map