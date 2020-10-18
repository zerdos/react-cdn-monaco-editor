import type { startMonaco as StartMonaco } from "./editor";

export async function startMonaco(
  { onChange, code, language },
) {
  const remoteFile = await fetch(
    `https://unpkg.com/react-cdn-monaco-editor@VERSION/editor.js`,
  );
  const remoteAsText = await remoteFile.text();

  const replaced = remoteAsText.replaceAll("export", "");

  const stM: typeof StartMonaco = new Function(`return startMonaco; 
  ${replaced}`)();

  return stM({ code, onChange, language });
}
