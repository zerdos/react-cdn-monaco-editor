import React from "react";
import "./App.css";

const MonacoEditor: React.FC<{code: string, onChange: (newcode: string)=>void}> = ({code, onChange}) => {

  React.useEffect(()=>{

      const once = async ()=>{

        const getEdit =
        (await (await fetch("https://unpkg.com/react-cdn-monaco-editor/editor.js"))
          .text()).replace("export function", "function");
                  const startMonaco = new Function(  "  return startMonaco;" + (await  (await fetch("https://unpkg.com/react-cdn-monaco-editor/editor.js")).text()).replace("export ", ""))();

         await startMonaco({value: `import React from "react";


function App() {


const [code, changeCode] = React.useState("const foo = 42;");

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
  
   <footer>the end</footer>
  </div>
);
}

export default App;
`
, onChange: (code: string)=>console.log("code")});

      }
      once();

    },[]);

     return <div style ={{height: "100vh", width:"50%"}} id ="container"></div>
  
  }
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
    
     <MonacoEditor onChange={changeCode} code={code} />
    </div>
  );
}

export default App;
