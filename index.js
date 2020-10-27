export const startMonaco = async ({ onChange, language, code }) => {
    const remoteFile = await fetch(`https://unpkg.com/react-cdn-monaco-editor@2.4.2/editor.js`);
    const remoteAsText = await remoteFile.text();
    const searchRegExp = /export/gi;
    const replaceWith = "";
    const replaced = remoteAsText.replace(searchRegExp, replaceWith);
    const stM = new Function(`return startMonaco; 
  ${replaced}`)();
    return stM({ code, onChange, language });
};
//# sourceMappingURL=index.js.map