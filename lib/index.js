export async function startMonaco({ onChange, code, language }) {
    const remoteFile = await fetch(`https://unpkg.com/react-cdn-monaco-editor@1.8.3/editor.js`);
    const remoteAsText = await remoteFile.text();
    const replaced = remoteAsText.replaceAll("export", "");
    const stM = new Function(`return startMonaco; 
  ${replaced}`)();
    return stM({ code, onChange, language });
}
//# sourceMappingURL=index.js.map