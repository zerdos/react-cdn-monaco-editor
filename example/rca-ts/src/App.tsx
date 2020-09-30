import React, {useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { MonacoEditor } from 'react-cdn-monaco-editor';

function App() {
  return (
    <div>
      <MonacoEditor 
        height="100vh" 
        width="50%" 
        onChange={(code)=>{console.log(code)}}
        value={`const foo = "bar";
console.log(foo);
      `} />
       
  
    </div>
  );
}

export default App;

