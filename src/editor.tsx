import type monaco from "monaco-editor";

type monacoType = typeof monaco;

export async function startMonaco(
  { onChange, code, language },
) {
  const monacoLang = language || "typescript";
  if (
    window && window["monaco"] && window["monaco"]["editor"]
  ) {
    return window["monaco"]["editor"];
  }
  return new Promise<monaco.editor.IStandaloneCodeEditor>(
    async function (resolve, reject) {
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
            formatOnType: true,
            //       glyphMargin: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            autoIndent: "full",
            autoClosingQuotes: "always",
            lineNumbers: "off",
            autoClosingBrackets: "always",
            autoClosingOvertype: "always",

            codeLens: true,
            autoSurround: "brackets",
            acceptSuggestionOnCommitCharacter: true,
            trimAutoWhitespace: true,
            codeActionsOnSaveTimeout: 100,
            model: monaco.editor.createModel(
              code,
              monacoLang,
              monaco.Uri.parse(
                monacoLang === "typescript"
                  ? "file:///main.tsx"
                  : "file:///main.html",
              ),
            ),
            value: code,
            language: monacoLang,
            theme: "vs-dark",
          },
        );

        // editor.deltaDecorations([], [
        //   {
        //     range: new monaco.Range(3, 1, 3, 1),
        //     options: {
        //       isWholeLine: true,
        //       className: "myContentClass",
        //       glyphMarginClassName: "myGlyphMarginClass",
        //     },
        //   },
        // ]);

        if (monacoLang !== "html") {
          (async () => {
            const reactDts = await fetch(
              "https://unpkg.com/@types/react@latest/index.d.ts",
            );
            const reactDOMDts = await fetch(
              "https://unpkg.com/@types/react-dom@latest/index.d.ts",
            );
            const reactGlobalDts = await fetch(
              "https://unpkg.com/@types/react@latest/global.d.ts",
            );
            const propTypesDTS = await fetch(
              "https://unpkg.com/@types/prop-types@latest/index.d.ts",
            );
            const cssTypeDts = await fetch(
              "https://unpkg.com/csstype@latest/index.d.ts",
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

            monaco.languages.typescript.typescriptDefaults.addExtraLib(
              await reactDOMDts.text(),
              "file:///node_modules/@types/react-dom/index.d.ts",
            );
          })();
        }

        if (monacoLang === "typescript") {
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            allowUmdGlobalAccess: true,
            strict: true,
            allowJs: true,
            noEmitOnError: true,
            allowSyntheticDefaultImports: true,
            moduleResolution:
              monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            typeRoots: ["node_modules/@types"],
            jsx: monaco.languages.typescript.JsxEmit.React,
            jsxFactory: "React.createElement",
            jsxFragmentFactory: "React.Fragment",

            esModuleInterop: true,
          });

          monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
          });
        }

        editor.onDidChangeModelContent((_event) => onChange(editor.getValue()));
        resolve(editor);
      });
    },
  );
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
