import React from 'react';

import './reset.css';


type MonacoEditorProps = {
    width?: string;
    height?: string;
  };
  

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
    width = "600px",
    height = "400px",
    // value = "",
    // language = "javascript",
    // theme = null,
    // options = {},
    // overrideServices = {},
    // editorDidMount = () => {},
    // editorWillMount = () => {},
    // onChange = () => {},
  }) => {
    const editorElementRef = React.useRef(null);
    
  
    React.useEffect(() => {
      
      if (typeof window === "undefined") return;
      const init = async () => {
        await startMonaco({element: "container"});
      };
      init();
    });
  
    return <div className="reset"> <div  id="container" style={{ width, height }} /></div>;
  };
  


const startMonaco = ({
    version = "0.21.2",
    element = "container"
  }) => (new Function("version", "element",`
  const startMonaco = async (version, element) => {
    const vsPath = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs';
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${version}/min/vs/loader.min.js');
  
    require.config({ paths: { 'vs': vsPath } });
    
    require(["vs/editor/editor.main"], function () {
      const editor = monaco.editor.create(document.getElementById(element), {
        value: 'function x() {console.log("Hello world!");}',
        language: 'typescript',
        theme: 'vs-dark'
      });
    });
  }
  return startMonaco(version, element)
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s;
      s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  `))(version, element);
  
