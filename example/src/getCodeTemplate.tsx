export function getCodeTemplate() {
  return `import React from "react";


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
}
