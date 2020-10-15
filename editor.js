export async function startMonaco({ onChange, value }) {
    const version = "0.21.2";
    // await loadScript(
    //   "https://unpkg.com/react-cdn-monaco-editor@1.1.1/dts-gen.bundle.js",
    // );
    await loadScript(`https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js`);
    const vsPath = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs`;
    await loadScript(`https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js`);
    // @ts-ignore
    require.config({ paths: { "vs": vsPath } });
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        const document = window.document;
        // @ts-ignore
        require(["vs/editor/editor.main"], async function () {
            const monaco = window.monaco;
            try {
                console.log(":)");
            }
            catch (e) {
                reject(e);
            }
            const editor = monaco.editor.create(document.getElementById("container"), {
                model: monaco.editor.createModel(value, "typescript", monaco.Uri.parse("file:///main.tsx")),
                value: value,
                language: "typescript",
                theme: "vs-dark",
            });
            (async () => {
                const reactDts = await fetch("https://unpkg.com/@types/react@16.9.52/index.d.ts");
                const reactGlobalDts = await fetch("https://unpkg.com/@types/react@16.9.52/global.d.ts");
                const propTypesDTS = await fetch("https://unpkg.com/@types/prop-types@15.7.3/index.d.ts");
                const cssTypeDts = await fetch("https://unpkg.com/csstype@3.0.3/index.d.ts");
                monaco.languages.typescript.typescriptDefaults.addExtraLib(await cssTypeDts.text(), "file:///node_modules/@types/csstype/index.d.ts");
                monaco.languages.typescript.typescriptDefaults.addExtraLib(await reactGlobalDts.text(), "file:///node_modules/@types/react/global.d.ts");
                monaco.languages.typescript.typescriptDefaults.addExtraLib(await propTypesDTS.text(), "file:///node_modules/@types/prop-type/index.d.ts");
                monaco.languages.typescript.typescriptDefaults.addExtraLib(await reactDts.text(), "file:///node_modules/@types/react/index.d.ts");
            })();
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2016,
                allowNonTsExtensions: true,
                moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
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
//# sourceMappingURL=editor.js.map