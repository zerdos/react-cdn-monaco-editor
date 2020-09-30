import React, { useRef, useEffect } from "react";
import { MonacoEditorProps } from "./types";

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  width = "100%",
  height = "100%",
  // value = "",
  // language = "javascript",
  // theme = null,
  // options = {},
  // overrideServices = {},
  // editorDidMount = () => {},
  // editorWillMount = () => {},
  // onChange = () => {},
}) => {
  const editorElementRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      editorRef.current = await startMonaco({
        element: editorElementRef.current as HTMLDivElement,
      });
    };
    init();
  });
  
  return <div ref={editorElementRef} style={{ width, height }} />;
};

//   editor?: monaco.editor.IStandaloneCodeEditor;

//   private containerElement?: HTMLDivElement;

//   private _subscription: monaco.IDisposable;

//   private __prevent_trigger_change_event?: boolean;

//   constructor(props: MonacoEditorProps) {
//     super(props);
//     this.containerElement = undefined;
//   }

//   componentDidMount() {
//     this.initMonaco();
//   }

//   componentDidUpdate(prevProps: MonacoEditorProps) {
//     const { value, language, theme, height, options, width } = this.props;

//     const { editor } = this;
//     const model = editor.getModel();

//     if (this.props.value != null && this.props.value !== model.getValue()) {
//       this.__prevent_trigger_change_event = true;
//       this.editor.pushUndoStop();
//       // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
//       // @ts-expect-error
//       model.pushEditOperations(
//         [],
//         [
//           {
//             range: model.getFullModelRange(),
//             text: value,
//           },
//         ]
//       );
//       this.editor.pushUndoStop();
//       this.__prevent_trigger_change_event = false;
//     }
//     if (prevProps.language !== language) {
//       monaco.editor.setModelLanguage(model, language);
//     }
//     if (prevProps.theme !== theme) {
//       monaco.editor.setTheme(theme);
//     }
//     if (editor && (width !== prevProps.width || height !== prevProps.height)) {
//       editor.layout();
//     }
//     if (prevProps.options !== options) {
//       // Don't pass in the model on update because monaco crashes if we pass the model
//       // a second time. See https://github.com/microsoft/monaco-editor/issues/2027
//       const { model: _model, ...optionsWithoutModel } = options;
//       editor.updateOptions(optionsWithoutModel);
//     }
//   }

//   componentWillUnmount() {
//     this.destroyMonaco();
//   }

//   assignRef = (component: HTMLDivElement) => {
//     this.containerElement = component;
//   };

//   destroyMonaco() {
//     if (this.editor) {
//       this.editor.dispose();
//       const model = this.editor.getModel();
//       if (model) {
//         model.dispose();
//       }
//     }
//     if (this._subscription) {
//       this._subscription.dispose();
//     }
//   }

//   initMonaco() {
//     const value =
//       this.props.value != null ? this.props.value : this.props.defaultValue;
//     const { language, theme, overrideServices } = this.props;
//     if (this.containerElement) {
//       // Before initializing monaco editor
//       const options = { ...this.props.options, ...this.editorWillMount() };
//       this.editor = monaco.editor.create(
//         this.containerElement,
//         {
//           value,
//           language,
//           ...options,
//           ...(theme ? { theme } : {}),
//         },
//         overrideServices
//       );
//       // After initializing monaco editor
//       this.editorDidMount(this.editor);
//     }
//   }

//   editorWillMount() {
//     const { editorWillMount } = this.props;
//     const options = editorWillMount(monaco);
//     return options || {};
//   }

//   editorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
//     this.props.editorDidMount(editor, monaco);

//     this._subscription = editor.onDidChangeModelContent((event) => {
//       if (!this.__prevent_trigger_change_event) {
//         this.props.onChange(editor.getValue(), event);
//       }
//     });
//   }

//   render() {
//     const { width, height } = this.props;
//     const fixedWidth = processSize(width);
//     const fixedHeight = processSize(height);
//     const style = {
//       width: fixedWidth,
//       height: fixedHeight,
//     };

//     return (
//       <div
//         ref={this.assignRef}
//         style={style}
//         className="react-monaco-editor-container"
//       />
//     );
//   }
// }

function startMonaco({
  version = "0.21.2",
  element,
}: {
  version?: string;
  element: HTMLDivElement;
}) {
  return new Promise((resolve, reject) => {
    const load = async () => {
      const vsPath = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs`;

      await loadScript(`${vsPath}/loader.min.js`);

      // let require: {config} (debts: string[], fn: ()=>void)=>void ?
      //@ts-ignore
      this.require.config({ paths: { vs: vsPath } });
      //@ts-ignore
      this.require(["vs/editor/editor.main"], function () {
        //@ts-ignore
        const editor = monaco.editor.create(element, {
          value: `function x() {
  console.log("Hello world!");
  }`,
          language: "typescript",
          theme: "vs-dark",
        });

        resolve(editor);
      });
    };
    try {
      load();
    } catch (e) {
      reject(e);
    }
  });

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
}
