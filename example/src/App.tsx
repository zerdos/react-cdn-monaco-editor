import React from "react";
import "./App.css";
import { getCodeTemplate } from "./getCodeTemplate";
import { MonacoEditor } from "./MonacoEditor";

function App() {
  const [code, changeCode] = React.useState(getCodeTemplate());

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

      <MonacoEditor onChange={changeCode} code={code} />
    </div>
  );
}

export default App;
