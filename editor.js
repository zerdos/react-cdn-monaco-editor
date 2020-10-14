var __awaiter = (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) },
    typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }),
    g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) {
      try {
        if (
          f = 1,
            y && (t = op[0] & 2
              ? y["return"]
              : op[0]
              ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
              : y.next) && !(t = t.call(y, op[1])).done
        ) {
          return t;
        }
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !(t = _.trys, t = t.length > 0 && t[t.length - 1]) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
// type ReactType = typeof React;
export var getEditor = function (React) {
  // const ReactTypeJs = DTSGen.generateIdentifierDeclarationFile("React", React);
  // const dts = generateModuleDeclarationFile(React, "react");
  // console.log(ReactTypeJs);
  var MonacoEditor = function (_a) {
    var _b = _a.width,
      width = _b === void 0 ? "600px" : _b,
      _c = _a.height,
      height = _c === void 0 ? "400px" : _c,
      _d = _a.value,
      value = _d === void 0 ? "" : _d,
      _e = _a.language,
      language = _e === void 0 ? "typescript" : _e,
      _f = _a.onChange,
      onChange = _f === void 0 ? function (_code) {} : _f;
    var _g = React.useState(null), editor = _g[0], setEditor = _g[1];
    var _h = React.useState(value), editorValue = _h[0], setEditorValue = _h[1];
    React.useEffect(function () {
      if (typeof window === "undefined") {
        return;
      }
      if (!editor) {
        (function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var editor_1, e_1;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4, /*yield*/
                    startMonaco({
                      element: "container",
                      value: value,
                      language: language,
                      onChange: function (code) {
                        setEditorValue(code);
                        onChange(code);
                      },
                    }),
                  ];
                case 1:
                  editor_1 = _a.sent();
                  setEditor(editor_1);
                  return [3, /*break*/ 3];
                case 2:
                  e_1 = _a.sent();
                  console.log("Error attaching the editor", e_1);
                  return [3, /*break*/ 3];
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        })();
        return;
      }
      if (editorValue !== value) {
        editor === null || editor === void 0 ? void 0 : editor.setValue(value);
      }
    }, [value, language]);
    return React.createElement(
      "div",
      { id: "container", style: { width: width, height: height } },
    );
  };
  return MonacoEditor;
};
var startMonaco = function (_a) {
  var _b = _a.version,
    version = _b === void 0 ? "0.21.2" : _b,
    _c = _a.element,
    element = _c === void 0 ? "container" : _c,
    _d = _a.value,
    value = _d === void 0 ? "" : _d,
    _e = _a.language,
    language = _e === void 0 ? "typescript" : _e,
    _f = _a.onChange,
    onChange = _f === void 0 ? function (_code) {} : _f;
  return new Function(
    "version",
    "element",
    "value",
    "language",
    "onChange",
    "\nconst startMonaco = async ({version, element, value, language}) => {\n  const vsPath = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/" +
      version +
      "/min/vs';\n  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/" +
      version +
      "/min/vs/loader.min.js');\n  const DTSGen = (await import('https://unpkg.com/react-cdn-monaco-editor@1.1.1/dts-gen.bundle.js'));\n\n  require.config({ paths: { 'vs': vsPath } });\n\n  return new Promise(function(resolve, reject){\n  \n    require([\"vs/editor/editor.main\"], function () {\n\n\n\n      const editor = monaco.editor.create(document.getElementById(\"container\"), {\n        model: monaco.editor.createModel(`" +
      value +
      '`, "typescript", monaco.Uri.parse("file:///main.tsx")),\n        value: `' +
      value + "`,\n        language: `" + language +
      '`,\n        theme: \'vs-dark\'\n      });\n\n\n      monaco.editor.createModel( DTSGen.generateIdentifierDeclarationFile("React", React) + `\n      declare module "react" {\n       export = React;\n       export as namespace React;\n      } `, "typescript", monaco.Uri.parse("file:///index.d.ts"));\n\n\n\n        console.log(monaco.languages.typescript)\n  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({\n   \n    target: monaco.languages.typescript.ScriptTarget.ES2016,\n    allowNonTsExtensions: true,\n    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,\n    module: monaco.languages.typescript.ModuleKind.CommonJS,\n    noEmit: true,\n    typeRoots: ["node_modules/@types"],\n    jsx: monaco.languages.typescript.JsxEmit.React,\n    jsxFactory: \'React.createElement\',\n\n    esModuleInterop: true\n   });\n\n   monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({\n    noSemanticValidation: true,\n    noSyntaxValidation: true,\n  });\n\n  \n      editor.onDidChangeModelContent((event)=>onChange(editor.getValue()))\n      resolve(editor);\n    \n    });\n\n  }  )\n\n}\n\nreturn startMonaco({version, element, value, language})\nfunction loadScript(src) {\n  return new Promise(function (resolve, reject) {\n    var s;\n    s = document.createElement(\'script\');\n    s.src = src;\n    s.onload = resolve;\n    s.onerror = reject;\n    document.head.appendChild(s);\n  });\n}\n',
  )(version, element, value, language, onChange);
};
//# sourceMappingURL=editor.js.map
