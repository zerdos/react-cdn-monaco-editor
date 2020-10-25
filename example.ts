import { diff, diff_cleanupMerge } from "./diff.js";
// import interact from "./node_modules/@interactjs/interactjs/index.js"

//@ts-ignore
export const run = async (React, ReactDOM, Babel, startMonaco) => {
  const searchRegExp = /import/gi;
  const replaceWith = "///";

  const transpileCode = (code: string) =>
    Babel.transform(code, {
      plugins: [],
      presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
    }).code.replace(searchRegExp, replaceWith);

  const restartCode = async (transpileCode: string) => {


    const restart = new Function(
      "transpileCode",
      `return function(){ ${transpileCode} }`,
    )();
    const dataObj = {
      code: transpileCode
     };

     const body = { results: [dataObj], errors: null, msg: "" };

     const request = new Request(
       "https://my-ts-project.zed-vision.workers.dev",
       {
         body: JSON.stringify(body),
         method: "POST",
         headers: { "content-type": "application/json;charset=UTF-8" },
       },
     );
     restart()

     const response = await fetch(request);
       console.log(response)
  };



  let keystrokeTillNoError = 0;
  let latestCode = "";
  let errorReported = "";
  let busy = 0;
  let latestGoodCode = "";
  let latestBadCode = "";

  (async () => {
    const example = getExampleCode();
    latestGoodCode = example;
    latestBadCode = example;
    const editor = await startMonaco({
      language: "typescript",
      code: example,
      onChange: (code: string) => {
        latestCode = code;
        console.log(code);

        const runner = async (cd: string) => {
          if (busy === 1) return;

          busy = 1;
          const err = await getErrors(editor);
          ///@ts-ignore
          const errorDiv = document.getElementById("error");
          try {
            busy = 0;

            if (cd !== latestCode) return;
            if (err && err.length) {
              if (latestCode != cd) return;
              if (errorReported === cd) return;
      ///@ts-ignore
                
              document.getElementById("root").setAttribute("style","display:block;opacity:0.5");
              const slices = diff(latestGoodCode, cd);
              console.log(slices);

              if (slices.length <= 3) {
                latestBadCode = cd;
                ///@ts-ignore
                window["monaco"].editor.setTheme("hc-black") 
                  return;
              }

              // const oldSlices = diff(latestBadCode, cd);

              // const unMerge = oldSlices.filter((o) => o[0] !== 0);

              // let filtered = slices.filter((t) =>
              //   t[0] === 0 || t[1] === unMerge[0][1]
              // );

              // if (filtered.length > 4) {
              //   filtered = filtered.filter((t) => t[0] === 0);
              // }

              // diff_cleanupMerge(filtered, false);

              // let newStr = "";
              // let offset = 0;
              // filtered.map((t) => {
              //   newStr = newStr + t[1];
              //   if (t[0] !== 0) {
              //     offset = newStr.length;
              //   }
              // });

              // busy = 0;

              // if (newStr !== cd) {
              //   editor.setValue(newStr);
              //   const model = editor.getModel("file:///Main.tsx");

              //   const position = model.getPositionAt(offset);
              //   //  mosel.getC

              //   const validPos = model.validatePosition(position);
              //   editor.setPosition(validPos);

              //   // model.modifyPosition(position)
              //   return;
              // }
              // const errors = err..map((x) => x.messageText)

              //@ts-ignore
              errorDiv.innerHTML = errors[0].messageText;
                 ///@ts-ignore
                
                 document.getElementById("root").setAttribute("style","display:none");

              errorDiv.style.display = "block";
              errorReported = cd;

              //@ts-ignore
              window["monaco"].editor.setTheme("vs-light");
              setTimeout(() => {
                //@ts-ignore
                window["monaco"].editor.setTheme("hc-black");
              }, keystrokeTillNoError++);

              return;
            }
            latestGoodCode = cd;

            errorDiv!.style!.display = "none";
            //@ts-ignore
   
            window["monaco"].editor.setTheme("vs-dark")
            
            //@ts-ignore
            document.getElementById("root").setAttribute("style","display:block");
            keystrokeTillNoError = 0;

            busy = 0;
            restartCode(transpileCode(cd));
          } catch (err) {
            busy = 0;
            if (cd !== latestCode) return;

            ///@ts-ignore
            window["monaco"].editor.setTheme("vs-light");
            setTimeout(() => {
              ///@ts-ignore
              window["monaco"].editor.setTheme("hc-black");
            }, 10);
            console.error(err);
          }
        };
        if (!busy) runner(latestCode);
        else {
          const myCode = code;
          const cl = setInterval(() => {
            if (myCode !== latestCode || !busy) {
              clearInterval(cl);
            }

            if (!busy) runner(latestCode);
          }, 100);
        }
      },
    });
    //
  })();

  restartCode(transpileCode(getExampleCode()));
  //@ts-ignore
  document.getElementById("root").setAttribute("style","display:block");
  // dragElement(document.getElementById("root"));

  async function getErrors(editor: any) {
    const model = editor.getModel("file:///main.tsx");

    //@ts-ignore
    const tsWorker = await window["monaco"].languages.typescript
      .getTypeScriptWorker();
    const modelUri = model?.uri;
    if (!modelUri) return;

    const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics(
      "file:///main.tsx",
    );
    const comp = await (await tsWorker(modelUri))
      .getCompilerOptionsDiagnostics("file:///main.tsx");
    const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics(
      "file:///main.tsx",
    );

    return [...diag, ...comp, ...syntax];
  }

  function getExampleCode() {
    return `import * as React from "react";
import ReactDOM from "react-dom";

const Counter = (
    { initial = 0 }
) => {
    const [clicks, setClicks] = React.useState(initial);

    return <div>
        <p>Clicks: <strong>{clicks}</strong></p>
        <button onClick={() => setClicks(clicks + 1)}>+</button>
        <button onClick={() => setClicks(clicks - 1)}>-</button>
    </div>;
};

ReactDOM.render(
    <Counter initial={0} />,
    document.getElementById("root")
);    
`;
  }
};
