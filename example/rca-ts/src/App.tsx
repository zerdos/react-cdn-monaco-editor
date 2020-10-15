import React from "react";
import "./App.css";

import { getEditor } from "react-cdn-monaco-editor";

const {useState, useEffect, createElement}  = React;

const MonacoEditor = getEditor({useState, useEffect, createElement} ) as unknown as React.FC<{onChange: (code: string)=>void, value: string}>;


function App() {


  const [code, changeCode] = React.useState(`const foo = "bar";
  console.log("foo");
        `);

  return (
    <div>
      <button
        onClick={() => {
          changeCode("const bar = 'foo';");
        }}
      >
        Reset
      </button>
      <pre>{code}</pre>
    
     <MonacoEditor onChange={changeCode} value={code} />
    </div>
  );
}

export default App;
