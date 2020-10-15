import React from "react";
import "./App.css";

const codeTemplate = `import React from "react";


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
`;

const MonacoEditor: React.FC<
  { code: string; onChange: (code: string) => void }
> = ({ code, onChange }) => {
  React.useEffect(() => {
    const once = async () => {
      const startMonaco = new Function(
        "  return startMonaco;" +
          (await (await fetch(
            "https://unpkg.com/react-cdn-monaco-editor/editor.js",
          )).text()).replace("export ", ""),
      )();

      await startMonaco({ code, onChange });
    };

    once();
  }, [code, onChange]);

  return <div style={{ height: "100vh", width: "50%" }} id="container" />;
};
function App() {
  const [code, changeCode] = React.useState(codeTemplate);

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
