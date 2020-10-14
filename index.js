var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var version = "0.21.2";
export function getEditor(_react) {
    // const ReactTypeJs = DTSGen.generateIdentifierDeclarationFile("React", React);
    // const dts = generateModuleDeclarationFile(React, "react");
    // console.log(ReactTypeJs);
    var _this = this;
    var react = _react;
    var MonacoEditor = function (_a) {
        var _b = _a.width, width = _b === void 0 ? "600px" : _b, _c = _a.height, height = _c === void 0 ? "400px" : _c, _d = _a.value, value = _d === void 0 ? "" : _d, _e = _a.language, language = _e === void 0 ? "typescript" : _e, onChange = _a.onChange;
        var _f = react.useState(null), editor = _f[0], setEditor = _f[1];
        var _g = react.useState(value), editorValue = _g[0], setEditorValue = _g[1];
        react.useEffect(function () {
            if (typeof window === "undefined")
                return;
            if (!editor) {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var editor_1, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, startMonaco({
                                        value: value,
                                        language: language,
                                        onChange: function (code) {
                                            setEditorValue(code);
                                            onChange(code);
                                        },
                                    })];
                            case 1:
                                editor_1 = _a.sent();
                                setEditor(editor_1);
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                console.log("Error attaching the editor", e_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
                return;
            }
            if (editorValue !== value) {
                editor === null || editor === void 0 ? void 0 : editor.setValue(value);
            }
        }, [value, language]);
        return react.createElement("div", { id: "container", style: { width: width, height: height } });
    };
    return MonacoEditor;
}
var startMonaco = function (_a) {
    var onChange = _a.onChange, value = _a.value, language = _a.language;
    return __awaiter(void 0, void 0, void 0, function () {
        var vsPath, reactDts, reactGlobalDts, propTypesDTS, cssTypeDts;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // await loadScript(
                //   "https://unpkg.com/react-cdn-monaco-editor@1.1.1/dts-gen.bundle.js",
                // );
                return [4 /*yield*/, loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/" + version + "/min/vs/loader.min.js")];
                case 1:
                    // await loadScript(
                    //   "https://unpkg.com/react-cdn-monaco-editor@1.1.1/dts-gen.bundle.js",
                    // );
                    _b.sent();
                    vsPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/" + version + "/min/vs";
                    return [4 /*yield*/, loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/" + version + "/min/vs/loader.min.js")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, fetch("https://unpkg.com/@types/react@16.9.52/index.d.ts")];
                case 3:
                    reactDts = _b.sent();
                    return [4 /*yield*/, fetch("https://unpkg.com/@types/react@16.9.52/global.d.ts")];
                case 4:
                    reactGlobalDts = _b.sent();
                    return [4 /*yield*/, fetch("https://unpkg.com/@types/prop-types@15.7.3/index.d.ts")
                        // 
                    ];
                case 5:
                    propTypesDTS = _b.sent();
                    return [4 /*yield*/, fetch("https://unpkg.com/csstype@3.0.3/index.d.ts")];
                case 6:
                    cssTypeDts = _b.sent();
                    // @ts-ignore
                    require.config({ paths: { "vs": vsPath } });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // @ts-ignore
                            var document = window.document;
                            // @ts-ignore
                            require(["vs/editor/editor.main"], function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var monaco, editor, _a, _b, _c, _d, _e, _f, _g, _h;
                                    return __generator(this, function (_j) {
                                        switch (_j.label) {
                                            case 0:
                                                monaco = window.monaco;
                                                try {
                                                    console.log(":)");
                                                }
                                                catch (e) {
                                                    reject(e);
                                                }
                                                editor = monaco.editor.create(document.getElementById("container"), {
                                                    model: monaco.editor.createModel(value, "typescript", monaco.Uri.parse("file:///main.tsx")),
                                                    value: value,
                                                    language: language,
                                                    theme: "vs-dark",
                                                });
                                                _b = (_a = monaco.languages.typescript.typescriptDefaults).addExtraLib;
                                                return [4 /*yield*/, cssTypeDts.text()];
                                            case 1:
                                                _b.apply(_a, [_j.sent(), "file:///node_modules/@types/csstype/index.d.ts"]);
                                                _d = (_c = monaco.languages.typescript.typescriptDefaults).addExtraLib;
                                                return [4 /*yield*/, reactGlobalDts.text()];
                                            case 2:
                                                _d.apply(_c, [_j.sent(), "file:///node_modules/@types/react/global.d.ts"]);
                                                _f = (_e = monaco.languages.typescript.typescriptDefaults).addExtraLib;
                                                return [4 /*yield*/, propTypesDTS.text()];
                                            case 3:
                                                _f.apply(_e, [_j.sent(), "file:///node_modules/@types/prop-type/index.d.ts"]);
                                                _h = (_g = monaco.languages.typescript.typescriptDefaults).addExtraLib;
                                                return [4 /*yield*/, reactDts.text()];
                                            case 4:
                                                _h.apply(_g, [_j.sent(), "file:///node_modules/@types/react/index.d.ts"]);
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
                                                editor.onDidChangeModelContent(function (_event) { return onChange(editor.getValue()); });
                                                resolve(editor);
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        })];
            }
        });
    });
};
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
//# sourceMappingURL=index.js.map