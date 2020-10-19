export async function startMonaco({ onChange, code, language }) {
    const remoteFile = await fetch(`https://unpkg.com/react-cdn-monaco-editor@1.9.9/editor.js`);
    const remoteAsText = await remoteFile.text();
    const searchRegExp = /export/gi;
    const replaceWith = "";
    const replaced = remoteAsText.replace(searchRegExp, replaceWith);
    const stM = new Function(`return startMonaco; 
  ${replaced}`)();
    return stM({ code, onChange, language });
}
//# sourceMappingURL=index.js.map