import React from "react";
import "./App.css";

import { getEditor } from "react-cdn-monaco-editor";

let MonacoEditor: React.FC<{height: string, width: string, onChange: (code: string)=>void, value: string}>;


function App() {

  const [monacoLoaded, setLoaded ] = React.useState (false);

  React.useEffect(()=>{


    (async()=>{

        MonacoEditor = await getEditor();
        setLoaded(true);
    })()


  }, [])

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

      {monacoLoaded && <MonacoEditor
        height="100vh"
        width="50%"
        onChange={changeCode}
        value={code}
      />}
    </div>
  );
}

export default App;
