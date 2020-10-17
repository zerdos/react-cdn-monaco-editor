export async function startMonaco({ onChange, code }) {
    const remoteFile = await fetch(`https://unpkg.com/react-cdn-monaco-editor@1.7.1/editor.js`);
    const remoteAsText = await remoteFile.text();
    const replaced = remoteAsText.replaceAll("export", "");
    const stM = new Function(`return startMonaco; 
  ${replaced}`)();
    return stM({ code, onChange });
}
//# sourceMappingURL=index.js.map