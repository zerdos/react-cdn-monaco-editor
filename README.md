<p align="center"><img src="https://user-images.githubusercontent.com/2723376/55211710-2f76e000-5228-11e9-887b-67faca78c4b9.png" width="150" height="150" /></p>

<h1 align="center">react-monaco-editor</h1>

<div align="center">

[Monaco Editor](https://github.com/Microsoft/monaco-editor) for React.

It uses CDN to load and start the editor, so you won't have any issues with slowing down your build pipeline.

## Examples

To build the examples locally, run:

```bash
yarn
cd example/rca-ts
yarn
yarn start
```

## Installation

```bash
yarn add react-cdn-monaco-editor
```

## Using with Webpack

```js
import React from 'react';
import { render } from 'react-dom';
import {MonacoEditor} from 'cdn-react-monaco-editor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };

    return (
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={(code)=>console.log(code)}
      />
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
```
