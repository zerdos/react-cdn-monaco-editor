import React from 'react';
import './App.css';
import { MonacoEditor } from 'react-cdn-monaco-editor';

function App() {
  const [code, changeCode] = React.useState("");

  return (
    <div> <pre>{code}</pre>
      <MonacoEditor 
        height="100vh" 
        width="50%" 
        onChange={changeCode}
        value={`const foo = "bar";
        console.log(foo);
              `} />
      
    </div>
  );
}

export default App;

