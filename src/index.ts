import type { startMonaco as StartMonaco } from "./editor";

export async function startMonaco(
  { onChange, code, language },
) {
  const remoteFile = await fetch(
    `https://unpkg.com/react-cdn-monaco-editor@VERSION/editor.js`,
  );
  const remoteAsText = await remoteFile.text();

  const searchRegExp = /export/gi;
  const replaceWith = "///";
  const replaced = remoteAsText.replace(searchRegExp, replaceWith);

  const stM: typeof StartMonaco = new Function(`return startMonaco; 
  ${replaced}`)();

  return stM({ code, onChange, language });
}
