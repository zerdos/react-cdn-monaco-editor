import React from "react";
import { isConstructorDeclaration } from "typescript";
import "./App.css";

import { MonacoEditor } from 'react-cdn-monaco-editor';

function App() {
  const [code, changeCode] = React.useState(`const foo = "bar";
  console.log(foo);
        `);

  return (
    <div>
      <button
        onClick={() => {
          changeCode("const bar = 'fooo';");
        }}
      >
        Reset
      </button>
      <pre>{code}</pre>

      <MonacoEditor
        height="100vh"
        width="50%"
        onChange={changeCode}
        value={code}
      />
    </div>
  );
}

export default App;
